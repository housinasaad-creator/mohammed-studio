/*
  هيرو الاستوديو كتسلسل صور مُصوَّر مسبقاً (scroll-scrub) بدل فيديو أو مشهد ثلاثي الأبعاد حي.
  الكيبورد المضاء رُسم خارج الاتصال بدقة عالية: الإطار i يمثّل تقدّم المشهد p = i/(N-1). السكرول يحرّك p بنعومة (تنعيم أسّي)
  فيظهر النزول والصعود متطابقين تماماً وكأنه مشهد ثلاثي الأبعاد حي، ويعمل على الآيفون (لا WebGL ولا فك ترميز فيديو ولا seek).
  الإطارات WebP تُحمَّل تدريجياً (متباعدة أولاً ثم تتكاثف) وتُفكّ حول الموضع الحالي فقط (ImageBitmap)، والإطار المعروض
  مزيج متدرّج بين أقرب إطارين مفكوكين فيبدو الحركة سلسة حتى مع إطارات قليلة. dispose() يحرّر كل شيء من الذاكرة.
  الواجهة تطابق hero3d.js القديم (createHero → setProgress / setActive / setChat / resize / dispose).
*/
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const BASE = 'assets/seq/', EXT = 'webp';
const SPEC = { desktop: { n: 300, w: 1920, h: 1080 }, phone: { n: 300, w: 720, h: 1280 } };
const pad = (i) => String(i + 1).padStart(4, '0');

export async function createHero({ canvas, lite = false, saveData = false, onReady }) {
  if (saveData) throw new Error('save-data');
  const phone = matchMedia('(max-width: 760px)').matches, kind = phone ? 'phone' : 'desktop', { n: N, w: SW, h: SH } = SPEC[kind];
  const weak = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 2;
  const stride = weak ? 2 : 1;                                       // جهاز ضعيف (4 أنوية أو أقل / رام 2 غيغا أو أقل): كل ثاني إطار فقط؛ غير ذلك كل الإطارات (الحركة أنعم عند مرحلة انفصال الكبسات)
  const MAXB = phone ? 30 : 26;                                      // أقصى عدد إطارات مفكوكة بالذاكرة
  const ctx = canvas.getContext('2d', { alpha: false }); if (!ctx) throw new Error('no 2d');
  const ac = new AbortController();
  const blobs = new Map(), bmps = new Map(), decoding = new Set(), avail = [];   // avail: فهارس الإطارات المحمّلة (مرتبة)
  let target = 0, cur = 0, active = true, dead = false, raf = 0, last = 0, dirty = true, readyFired = false, lastDir = 1, cw = 0, ch = 0;
  const useBitmap = typeof createImageBitmap === 'function';

  /* ---------------- التحميل التدريجي: متباعد أولاً ثم أكثف ---------------- */
  const order = []; { const seen = new Set(), add = (i) => { if (i < 0 || i >= N || seen.has(i)) return; seen.add(i); order.push(i); };
    add(0); add(N - 1); for (const L of [24, 12, 6, 3, 2, 1]) if (L >= stride) for (let i = 0; i < N; i += L) if (i % stride === 0) add(i); }
  let qi = 0, inflight = 0;
  const insertAvail = (i) => { let lo = 0, hi = avail.length; while (lo < hi) { const m = (lo + hi) >> 1; if (avail[m] < i) lo = m + 1; else hi = m; } avail.splice(lo, 0, i); };
  async function fetchOne(i, tries = 2) {
    try { const r = await fetch(`${BASE}${kind}/${pad(i)}.${EXT}`, { signal: ac.signal }); if (!r.ok) throw new Error(r.status); const b = await r.blob(); if (dead) return; blobs.set(i, b); insertAvail(i); dirty = true; wake(); }
    catch (e) { if (!dead && tries > 1 && e.name !== 'AbortError') await fetchOne(i, tries - 1); }
  }
  function pump() { while (!dead && inflight < 5 && qi < order.length) { inflight++; fetchOne(order[qi++]).finally(() => { inflight--; pump(); }); } }

  /* ---------------- فك الترميز حول الموضع الحالي فقط ---------------- */
  const lowerBound = (x) => { let lo = 0, hi = avail.length; while (lo < hi) { const m = (lo + hi) >> 1; if (avail[m] < x) lo = m + 1; else hi = m; } return lo; };
  async function decode(i) {
    decoding.add(i); const b = blobs.get(i); let bm = null;
    try {
      if (useBitmap) bm = await createImageBitmap(b);
      else { const url = URL.createObjectURL(b), im = new Image(); im.src = url; await im.decode(); URL.revokeObjectURL(url); bm = im; }
    } catch (e) { bm = null; }
    decoding.delete(i); if (dead) { bm && bm.close && bm.close(); return; }
    if (bm) { bmps.set(i, bm); dirty = true; } wake();
  }
  function plan() {
    const f = cur, pos = lowerBound(f), need = new Set(), ahead = lastDir > 0 ? [8, 0] : [0, 8];
    for (let k = 0, j = pos; k < 7 + ahead[0] && j < avail.length; k++, j++) need.add(avail[j]);
    for (let k = 0, j = pos - 1; k < 7 + ahead[1] && j >= 0; k++, j--) need.add(avail[j]);
    for (const i of need) if (!bmps.has(i) && !decoding.has(i) && decoding.size < 4) decode(i);
    if (bmps.size > MAXB) {
      const far = [...bmps.keys()].filter((i) => !need.has(i)).sort((a, b) => Math.abs(b - f) - Math.abs(a - f));
      while (bmps.size > MAXB && far.length) { const i = far.shift(), bm = bmps.get(i); bmps.delete(i); bm && bm.close && bm.close(); }
    }
  }

  /* ---------------- الرسم: مزج بين أقرب إطارين مفكوكين ---------------- */
  function nearest(from, dir, max) { for (let k = 0, i = from; k <= max && i >= 0 && i < N; k++, i += dir) if (bmps.has(i)) return i; return -1; }
  function draw(bm, alpha) {
    const iw = bm.width || SW, ih = bm.height || SH, s = Math.max(cw / iw, ch / ih), dw = iw * s, dh = ih * s;
    ctx.globalAlpha = alpha; ctx.drawImage(bm, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }
  function render() {
    const f = cur, span = stride * 3 + 6, A = nearest(Math.floor(f), -1, span), B = nearest(Math.ceil(f), 1, span);
    if (A < 0 && B < 0) return false;
    ctx.fillStyle = '#0e1117'; ctx.globalAlpha = 1;
    if (A < 0 || B < 0 || A === B) { draw(bmps.get(A < 0 ? B : A), 1); }
    else {
      const gap = B - A, t = clamp((f - A) / gap);
      if (gap > stride * 2 + 1) draw(bmps.get(t < .5 ? A : B), 1);           // فجوة كبيرة (أثناء التحميل): الأقرب فقط بلا شبح
      else { draw(bmps.get(A), 1); if (t > .02) draw(bmps.get(B), t); }
    }
    ctx.globalAlpha = 1;
    if (!readyFired) { readyFired = true; requestAnimationFrame(() => { if (!dead) onReady && onReady(); }); }
    return true;
  }
  function tick(now) {
    raf = 0; if (dead || !active) return;
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
    const d = target - cur; let moving = false;
    if (Math.abs(d) > 0.002) { cur += d * (1 - Math.exp(-dt * 9)); lastDir = d > 0 ? 1 : -1; moving = true; } else cur = target;
    if (moving || dirty) { plan(); render(); dirty = false; }
    if (moving || dirty || decoding.size) raf = requestAnimationFrame(tick);
  }
  function wake() { if (!raf && active && !dead) { last = performance.now(); raf = requestAnimationFrame(tick); } }

  /* ---------------- الحجم ---------------- */
  function fit() {
    const r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2), w = Math.max(2, Math.round(r.width * dpr)), h = Math.max(2, Math.round(r.height * dpr)), k = Math.min(1, SW / w, SH / h);
    cw = Math.max(2, Math.round(w * k)); ch = Math.max(2, Math.round(h * k)); if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }
    dirty = true; wake();
  }
  const ro = 'ResizeObserver' in window ? new ResizeObserver(() => fit()) : null; ro && ro.observe(canvas);
  fit(); pump();

  const api = {
    setProgress(p) { target = clamp(p) * (N - 1); wake(); },
    setActive(on) { if (on === active && (raf || !on)) return; active = on; if (on) wake(); },
    setChat() { },
    resize: fit,
    stats: () => ({ kind, N, stride, loaded: avail.length, decoded: bmps.size, cur: +cur.toFixed(2), target: +target.toFixed(2) }),
    /* يحرّر كل شيء (الإطارات المضغوطة والمفكوكة وطلبات الشبكة) حين يبتعد الزائر عن الهيرو كثيراً */
    dispose() {
      dead = true; active = false; cancelAnimationFrame(raf); raf = 0; ac.abort(); ro && ro.disconnect();
      for (const bm of bmps.values()) bm && bm.close && bm.close(); bmps.clear(); blobs.clear(); avail.length = 0; decoding.clear();
      ctx.clearRect(0, 0, canvas.width, canvas.height); if (window.__hero === api) window.__hero = null;
    }
  };
  window.__hero = api;
  return api;
}
