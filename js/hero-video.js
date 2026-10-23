/*
  هيرو الاستوديو كفيديو حقيقي بأربع وقفات (خمس محطات = البداية + أربع تمريرات).
  المشهد مُصوَّر مسبقاً بدقة عالية ومقسوم إلى ثمانية مقاطع قصيرة: f0..f3 للأمام من محطة إلى التي تليها، وr0..r3 هي نفس الإطارات بترتيب معكوس
  (الرجوع = تشغيل مقطع للأمام وليس تشغيلاً عكسياً ولا seek، فلا أخطاء بصرية عند الصعود). آخر إطار من مقطع هو أول إطار من المقطع التالي.
  العرض كله على لوحة canvas واحدة: عند كل وقفة تبقى آخر صورة مرسومة عليها، والمقطع التالي لا يظهر إلا حين يكون إطاره جاهزاً، فلا وميض ولا تبديل عناصر.
  المقاطع تُحمَّل كـ Blob إلى الذاكرة (لا يتقطّع التشغيل بسبب الشبكة) وفي أي لحظة يوجد عنصر فيديو واحد يعمل + عنصرا فيديو جاهزان للمقطعين المحتملين التاليين.
  تمريرة جديدة أثناء الحركة تغيّر الهدف فوراً: بنفس الاتجاه تسرّع المقطع الجاري وتتابع، وبالاتجاه المعاكس تنقلب الحركة من نفس الإطار إلى المقطع المرآة.
  الصفحة تتحرك مع زمن المقطع (الفصول النصية تتبدّل معه)، وبعد المحطة الرابعة يكمل الموقع تمريره عادياً. dispose() يحرّر كل شيء من الذاكرة.
*/
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const BASE = 'assets/hv/', FR1 = 1 / 60, ORDER = ['f0', 'f1', 'r0', 'f2', 'r1', 'f3', 'r2', 'r3'];
const SPEC = { desktop: { w: 2560, h: 1440 }, phone: { w: 1080, h: 1920 } };
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));

export function createHero({ canvas, hero, stick, hdr = () => 0, locked = () => false, stops = 5, onReady, onFail }) {
  const phone = matchMedia('(max-width: 760px)').matches, kind = phone ? 'phone' : 'desktop', { w: SW, h: SH } = SPEC[kind], LAST = stops - 1;
  const ctx = canvas.getContext('2d', { alpha: false }); if (!ctx) throw new Error('no 2d');
  ctx.imageSmoothingQuality = 'high';
  const ac = new AbortController(), sig = ac.signal;
  const blobs = new Map(), have = new Set(), prepared = new Map(), vids = new Set();
  let dead = false, ready = false, cw = 0, ch = 0, stage = 0, want = 0, run = null, pending = false, cutting = false, cutId = 0, raf = 0, touching = false, lastW = 0, owned = false, wheelOn = false, settleT = 0;

  /* ---------------- التحميل: كل مقطع Blob في الذاكرة ---------------- */
  function getBlob(name) {
    let p = blobs.get(name);
    if (!p) {
      p = fetch(`${BASE}${kind}/${name}.mp4`, { signal: sig }).then((r) => { if (!r.ok) throw new Error('http ' + r.status); return r.blob(); }).then((b) => { have.add(name); return b; });
      blobs.set(name, p); p.catch(() => { if (blobs.get(name) === p) blobs.delete(name); });
    }
    return p;
  }
  const loaded = (v) => new Promise((res, rej) => {
    let tm = 0; const fin = (e) => { clearTimeout(tm); v.removeEventListener('loadeddata', ok); v.removeEventListener('error', bad); e ? rej(e) : res(v); }, ok = () => fin(), bad = () => fin(new Error('video error'));
    if (v.readyState >= 2) return res(v);
    v.addEventListener('loadeddata', ok); v.addEventListener('error', bad); tm = setTimeout(ok, 2500);   // بعض متصفحات الجوال لا تُظهر الإطار الأول قبل play(): لا ننتظر للأبد
  });
  function mkVideo(name) {
    const v = document.createElement('video'); v.className = 'hv-el'; v.muted = v.defaultMuted = true; v.playsInline = true; v.preload = 'auto'; v.disablePictureInPicture = true; v.disableRemotePlayback = true; v.tabIndex = -1;
    v.setAttribute('aria-hidden', 'true'); v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.dataset.n = name; stick.appendChild(v); vids.add(v);
    v.ready = getBlob(name).then((b) => { if (dead || v.gone) throw new Error('gone'); v.url = URL.createObjectURL(b); v.src = v.url; return loaded(v); });
    v.ready.catch(() => { }); return v;
  }
  function retire(v) {
    if (!v || v.gone) return; v.gone = true; vids.delete(v); for (const [n, p] of prepared) if (p === v) prepared.delete(n);
    try { v.pause(); } catch (e) { } v.removeAttribute('src'); try { v.load(); } catch (e) { } if (v.url) { URL.revokeObjectURL(v.url); v.url = ''; } v.remove();
  }
  /* عند كل وقفة: عنصرا فيديو جاهزان (الأمام والخلف) على الإطار الأول، وما عداهما يُحرَّر */
  function prime() {
    const need = []; if (stage < LAST) need.push('f' + stage); if (stage > 0) need.push('r' + (stage - 1));
    for (const [n, p] of [...prepared]) if (!need.includes(n)) retire(p);
    for (const n of need) if (!prepared.has(n)) prepared.set(n, mkVideo(n));
  }
  const take = (name) => { let v = prepared.get(name); if (v) prepared.delete(name); else v = mkVideo(name); return v; };

  /* ---------------- الرسم ---------------- */
  function draw(v) {
    if (v.readyState < 2 || !v.videoWidth) return false;
    const iw = v.videoWidth, ih = v.videoHeight, s = Math.max(cw / iw, ch / ih), dw = iw * s, dh = ih * s;
    ctx.drawImage(v, (cw - dw) / 2, (ch - dh) / 2, dw, dh); return true;
  }
  function fit() {
    const r = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2), w = Math.max(2, Math.round(r.width * dpr)), h = Math.max(2, Math.round(r.height * dpr)), k = Math.min(1, SW / w, SH / h);
    const nw = Math.max(2, Math.round(w * k)), nh = Math.max(2, Math.round(h * k));
    if (nw !== cw || nh !== ch) { cw = nw; ch = nh; canvas.width = cw; canvas.height = ch; ctx.imageSmoothingQuality = 'high'; if (ready && !busy()) cut(stage); }
    if (ready) { clearTimeout(settleT); settleT = setTimeout(settle, 300); }
  }

  /* ---------------- المحطات والصفحة ---------------- */
  const span = () => Math.max(1, hero.offsetHeight - stick.offsetHeight);
  const base = () => hero.getBoundingClientRect().top + scrollY - hdr();
  const stageY = (k) => base() + span() * (k / LAST);
  const nearest = () => { let b = 0, d = Infinity; for (let k = 0; k <= LAST; k++) { const dd = Math.abs(scrollY - stageY(k)); if (dd < d) { d = dd; b = k; } } return b; };
  const setY = (y) => scrollTo({ top: y, behavior: 'instant' });
  const busy = () => !!(run || pending || cutting);
  const stepOn = () => ready && !dead && !locked();
  const inHero = () => scrollY <= stageY(LAST) + 2;
  const canStep = (dir) => stepOn() && inHero() && !(dir > 0 && want >= LAST && scrollY >= stageY(LAST) - 2 && !busy()) && !(dir < 0 && want <= 0 && scrollY <= stageY(0) + 2 && !busy());
  const rate = () => (run && want !== run.to ? 1.8 : 1);                  // طلب أبعد من نهاية المقطع الجاري: نسرّع قليلاً ثم نتابع بلا انتظار

  /* ---------------- التشغيل ---------------- */
  function begin(v, from, to, t0) {
    run = { v, from, to, dir: to > from ? 1 : -1, D: v.duration || 1.5, y0: stageY(from), y1: stageY(to), lastT: -1, seen: performance.now(), mir: false };
    for (const p of [...prepared.values()]) if (p !== v) retire(p);         // التزمنا باتجاه واحد: نحرّر الفك الجاهز للاتجاه الآخر
    v.playbackRate = rate(); const pr = v.play(); pr && pr.catch && pr.catch(() => { if (run && run.v === v) failRun(); });
    if (!raf) raf = requestAnimationFrame(loop);
  }
  function loop(now) {
    raf = 0; const r = run; if (!r || dead) return; const v = r.v, t = v.currentTime;
    if (t !== r.lastT) { r.lastT = t; r.seen = now; draw(v); }
    setY(r.y0 + (r.y1 - r.y0) * clamp(t / r.D));
    if (v.ended) { arrive(); return; }
    if (!r.mir && now - r.seen > 2500) { failRun(); return; }
    raf = requestAnimationFrame(loop);
  }
  function arrive() {
    const r = run; if (!r) return; run = null; cancelAnimationFrame(raf); raf = 0;
    draw(r.v); setY(stageY(r.to)); stage = r.to; retire(r.v); prime();
    if (want !== stage) next();
  }
  async function next() {
    if (run || pending || cutting || dead || want === stage) return;
    const dir = want > stage ? 1 : -1, v = take(dir > 0 ? 'f' + stage : 'r' + (stage - 1)); pending = true;
    try { await v.ready; } catch (e) { pending = false; retire(v); if (!dead) giveUp(e); return; }
    pending = false; if (dead) { retire(v); return; }
    if (want === stage || (want > stage ? 1 : -1) !== dir) { prepared.set(v.dataset.n, v); if (want !== stage) next(); return; }   // الطلب تغيّر أثناء الانتظار: نعيد المقطع جاهزاً
    begin(v, stage, stage + dir, 0);
  }
  function retarget() {
    const r = run; if (!r || r.mir) return;
    if (r.dir > 0 ? want >= r.to : want <= r.to) r.v.playbackRate = rate(); else mirror();
  }
  /* اتجاه معاكس في منتصف مقطع: نتجمد على الإطار الحالي ثم نكمل من نفس الإطار في المقطع المرآة */
  async function mirror() {
    const r = run; if (!r || r.mir) return; r.mir = true;
    const name = r.dir > 0 ? 'r' + r.from : 'f' + r.to, t = r.v.currentTime; r.v.pause();
    const v2 = prepared.get(name) || mkVideo(name); prepared.set(name, v2);
    try {
      await v2.ready; if (dead || run !== r) return;
      await seek(v2, clamp(r.D - FR1 - t, 0, r.D)); await nextFrame(); if (dead || run !== r) return;
      prepared.delete(name); cancelAnimationFrame(raf); raf = 0; run = null; retire(r.v);
      begin(v2, r.to, r.from, 0); retarget();
    } catch (e) { r.mir = false; if (run === r) { const p = r.v.play(); p && p.catch && p.catch(() => { }); if (!raf) raf = requestAnimationFrame(loop); } }
  }
  const seek = (v, t) => new Promise((res) => { let tm = 0; const fin = () => { clearTimeout(tm); v.removeEventListener('seeked', fin); res(); }; v.addEventListener('seeked', fin); tm = setTimeout(fin, 1500); v.currentTime = t; });
  function failRun() { const r = run; run = null; cancelAnimationFrame(raf); raf = 0; if (r) retire(r.v); cut(clamp(want, 0, LAST)); }
  /* انتقال فوري بلا حركة إلى محطة: آخر إطار من مقطع الوصول إليها (أو أول إطار للمحطة صفر) */
  async function cut(s) {
    const id = ++cutId; cutting = true; if (run) { cancelAnimationFrame(raf); raf = 0; retire(run.v); run = null; } pending = false; want = s;
    const v = mkVideo(s === 0 ? 'f0' : 'f' + (s - 1));
    try {
      await v.ready; if (dead || id !== cutId) { retire(v); return false; }
      if (s > 0) { await seek(v, Math.max(0, v.duration - FR1 + 0.002)); } await nextFrame(); if (dead || id !== cutId) { retire(v); return false; }
      if (!draw(v)) { try { await v.play(); await nextFrame(); v.pause(); } catch (e) { } if (dead || id !== cutId) { retire(v); return false; } if (!draw(v)) throw new Error('no frame'); }   // بعض المتصفحات لا تفك الإطار الأول قبل play()
      retire(v); stage = s; if (ready) setY(stageY(s)); cutting = false; prime(); if (want !== stage) next(); return true;
    } catch (e) { retire(v); if (id === cutId) { cutting = false; if (!dead) giveUp(e); } return false; }
  }
  function giveUp(e) { console.warn('hero video', e); if (!ready) { onFail && onFail(); return; } ready = false; cancelAnimationFrame(raf); raf = 0; run = null; pending = false; cutting = false; onFail && onFail(); }

  function go(dir) {
    const nw = clamp(want + dir, 0, LAST); if (nw === want) return; want = nw;
    if (run) retarget(); else next();
  }
  /* لو استقرت الصفحة بين محطتين (سحب شريط التمرير أو استعادة الموضع) ننتقل لأقرب محطة؛ وإن غادرنا الهيرو للأسفل تُعرض المحطة الأخيرة */
  function settle() {
    if (!ready || dead || busy() || touching || !stepOn()) return;
    if (!inHero()) { if (stage !== LAST) cut(LAST); return; }
    const k = nearest(); if (k !== stage) { cut(k); return; }
    if (scrollY > stageY(0) + 3 && Math.abs(scrollY - stageY(k)) > 3) setY(stageY(k));
  }

  /* ---------------- الإدخال: عجلة الماوس، اللمس، لوحة المفاتيح ---------------- */
  function onWheel(e) {
    if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const now = performance.now(), fresh = now - lastW > 110; lastW = now; const dir = e.deltaY > 0 ? 1 : -1;
    if (fresh) owned = false;                                               // ذيل اللوحة (قصور ذاتي) يبقى ملكاً للتمريرة التي بدأت الوقفة فلا ينزلق بعدها خارج الهيرو
    if (!canStep(dir)) { if (owned) e.preventDefault(); return; }
    e.preventDefault(); owned = true; if (fresh) go(dir);
  }
  function wheelWatch() { const near = scrollY <= stageY(LAST) + 1200; if (near && !wheelOn) { addEventListener('wheel', onWheel, { passive: false }); wheelOn = true; } else if (!near && wheelOn) { removeEventListener('wheel', onWheel); wheelOn = false; } }
  let ty0 = 0, tx0 = 0, tState = '';
  hero.addEventListener('touchstart', (e) => { touching = true; if (e.touches.length !== 1) { tState = 'native'; return; } ty0 = e.touches[0].clientY; tx0 = e.touches[0].clientX; tState = stepOn() ? 'pending' : 'native'; }, { passive: true, signal: sig });
  hero.addEventListener('touchmove', (e) => {
    if (tState === 'native' || e.touches.length !== 1) return;
    if (tState === 'pending') {
      const dy = e.touches[0].clientY - ty0, dx = e.touches[0].clientX - tx0; if (Math.abs(dy) < 6 && Math.abs(dx) < 6) return;
      const dir = dy < 0 ? 1 : -1; if (Math.abs(dx) > Math.abs(dy) || !canStep(dir)) { tState = 'native'; return; }
      tState = 'done'; if (e.cancelable) e.preventDefault(); go(dir); return;
    }
    if (e.cancelable) e.preventDefault();
  }, { passive: false, signal: sig });
  const touchEnd = () => { touching = false; tState = ''; };
  hero.addEventListener('touchend', touchEnd, { passive: true, signal: sig }); hero.addEventListener('touchcancel', touchEnd, { passive: true, signal: sig });
  addEventListener('keydown', (e) => {
    if (!stepOn() || e.altKey || e.ctrlKey || e.metaKey) return;
    const tg = e.target || {}, tag = tg.tagName || '';
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || tg.isContentEditable || (e.key === ' ' && /^(BUTTON|A)$/.test(tag))) return;
    const fwd = e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey), back = e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey);
    if (!fwd && !back) return; const dir = fwd ? 1 : -1; if (!canStep(dir)) return; e.preventDefault(); if (!e.repeat) go(dir);
  }, { signal: sig });
  addEventListener('scroll', () => { wheelWatch(); clearTimeout(settleT); if (busy()) return; settleT = setTimeout(settle, 220); }, { passive: true, signal: sig });

  /* ---------------- الانطلاق ---------------- */
  const ro = 'ResizeObserver' in window ? new ResizeObserver(() => fit()) : null; ro && ro.observe(canvas);
  fit(); wheelWatch();
  const s0 = inHero() ? nearest() : LAST;                                    // العودة للهيرو بعد تفريغه تبدأ من المحطة التي يقف عندها التمرير
  cut(s0).then((ok) => {
    if (!ok || dead) return;
    ready = true; onReady && onReady(); wheelWatch();
    (async () => { const q = ORDER.slice(); const worker = async () => { while (q.length && !dead) { try { await getBlob(q.shift()); } catch (e) { if (dead) return; } } }; await Promise.all([worker(), worker()]); })();
  });

  const api = {
    jump(k) { if (!stepOn()) return; want = clamp(k, 0, LAST); if (run) retarget(); else next(); },
    setActive(on) { if (!on) { clearTimeout(settleT); settleT = setTimeout(settle, 120); } },
    resize: fit,
    stats: () => ({ kind, stage, want, running: !!run, pending, cutting, ready, vids: vids.size, prepared: [...prepared.keys()], have: [...have], t: run ? +run.v.currentTime.toFixed(3) : null, rate: run ? run.v.playbackRate : null }),
    get stage() { return stage; },
    dispose() {
      dead = true; ready = false; cancelAnimationFrame(raf); raf = 0; clearTimeout(settleT); ac.abort(); ro && ro.disconnect(); removeEventListener('wheel', onWheel); wheelOn = false;
      for (const v of [...vids]) retire(v); prepared.clear(); blobs.clear(); have.clear(); ctx.clearRect(0, 0, canvas.width, canvas.height); if (window.__hero === api) window.__hero = null;
    }
  };
  window.__hero = api;
  return api;
}
