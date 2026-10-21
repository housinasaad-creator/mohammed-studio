/*
  هيرو الاستوديو: فيديو مُصوَّر مسبقاً للكيبورد المضاء (عالي الدقة)، يتحرك بأربع تمريرات فقط:
  كل تمريرة (عجلة أو سحب إصبع أو سهم) تشغّل الفيديو إلى محطته التالية ثم يقف، وبعد المحطة الرابعة يكمل الموقع تمريره عادياً.
  رجوعاً للخلف يُعاد الفيديو بالسحب السريع. بلا فيديو (حركة أقل / توفير بيانات / فشل التحميل) يبقى الهيرو صورة ثابتة والتمرير عادياً.
*/
export const STOPS = [0, 3.4, 6.0, 9.0, 11.6];          // ثواني الفيديو عند المحطات الخمس (البداية + أربع تمريرات)
const LAST = STOPS.length - 1;
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function initHeroVideo({ hero, stick, video, hdr, reduced, saveData }) {
  const phone = matchMedia('(max-width: 760px)').matches, SRC = `assets/hero/hero-${phone ? 'phone' : 'desktop'}.mp4`;
  let stage = 0, animating = false, touching = false, rafId = 0, settleT = 0, ready = false, wanted = false, wheelOn = false, lastW = 0;
  const useVideo = !reduced && !saveData;
  const span = () => Math.max(1, hero.offsetHeight - stick.offsetHeight);
  const base = () => hero.getBoundingClientRect().top + scrollY - hdr();
  const stageY = (k) => base() + span() * (k / LAST);
  const nearest = () => { let b = 0, d = Infinity; for (let k = 0; k <= LAST; k++) { const dd = Math.abs(scrollY - stageY(k)); if (dd < d) { d = dd; b = k; } } return b; };
  const stepOn = () => useVideo && ready && !document.documentElement.classList.contains('noscroll');
  const inHero = () => scrollY <= stageY(LAST) + 2;
  const canStep = (dir) => stepOn() && inHero() && !(dir > 0 && scrollY >= stageY(LAST) - 2) && !(dir < 0 && scrollY <= stageY(0) + 2);

  function load() {
    if (!useVideo || video.getAttribute('src')) return; wanted = true; ready = false;
    video.muted = true; video.playsInline = true; video.preload = 'auto';
    const onOk = () => { if (!wanted) return; video.currentTime = STOPS[stage]; ready = true; stick.classList.add('on3d'); };
    video.addEventListener('loadeddata', onOk, { once: true });
    video.addEventListener('error', () => { ready = false; stick.classList.remove('on3d'); }, { once: true });
    video.src = SRC; video.load();
  }
  function unload() { wanted = false; ready = false; cancelAnimationFrame(rafId); animating = false; video.pause(); video.removeAttribute('src'); video.load(); stick.classList.remove('on3d'); }

  const setY = (y) => scrollTo({ top: y, behavior: 'instant' });
  const finish = (k) => { stage = k; video.currentTime = STOPS[k]; setY(stageY(k)); animating = false; };

  /* تقدّم: الفيديو يعمل بسرعته الطبيعية والصفحة تتبعه */
  function playTo(k) {
    const from = STOPS[stage], to = STOPS[k], y0 = scrollY, y1 = stageY(k); animating = true; let stall = performance.now(), lastT = -1;
    if (Math.abs(video.currentTime - from) > .06) video.currentTime = from;
    video.play().catch(() => finish(k));
    const tick = (now) => {
      if (!animating) return; const t = video.currentTime;
      if (t !== lastT) { lastT = t; stall = now; }
      const u = clamp((t - from) / (to - from));
      if (u >= .995 || video.ended || now - stall > 5000) { video.pause(); finish(k); return; }
      setY(y0 + (y1 - y0) * u); rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
  }
  /* رجوع أو قفز: نسحب زمن الفيديو سريعاً (كل إطار نحدّث الزمن) والصفحة تتبعه */
  function scrubTo(k, ms) {
    const from = video.currentTime, to = STOPS[k], y0 = scrollY, y1 = stageY(k), t0 = performance.now(); animating = true; video.pause();
    const tick = (now) => {
      if (!animating) return; const u = clamp((now - t0) / ms), e = ease(u);
      if (!video.seeking) video.currentTime = from + (to - from) * e;
      setY(y0 + (y1 - y0) * e);
      if (u < 1) rafId = requestAnimationFrame(tick); else finish(k);
    };
    rafId = requestAnimationFrame(tick);
  }
  const go = (dir) => { const k = clamp(stage + dir, 0, LAST); if (k === stage) return; if (dir > 0) playTo(k); else scrubTo(k, Math.max(650, (STOPS[stage] - STOPS[k]) * 520)); };
  const jump = (k) => { if (!stepOn() || animating || k === stage) return; if (k === stage + 1) playTo(k); else scrubTo(k, 1000); };

  function onWheel(e) {
    if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const now = performance.now(), fresh = now - lastW > 110; lastW = now; const dir = e.deltaY > 0 ? 1 : -1;
    if (!canStep(dir)) return; e.preventDefault(); if (!animating && fresh) go(dir);
  }
  function wheelWatch() { const near = scrollY <= stageY(LAST) + 1200; if (near && !wheelOn) { addEventListener('wheel', onWheel, { passive: false }); wheelOn = true; } else if (!near && wheelOn) { removeEventListener('wheel', onWheel); wheelOn = false; } }

  let ty0 = 0, tx0 = 0, tState = '';
  hero.addEventListener('touchstart', (e) => { touching = true; if (e.touches.length !== 1) { tState = 'native'; return; } ty0 = e.touches[0].clientY; tx0 = e.touches[0].clientX; tState = stepOn() ? 'pending' : 'native'; }, { passive: true });
  hero.addEventListener('touchmove', (e) => {
    if (tState === 'native' || e.touches.length !== 1) return;
    if (tState === 'pending') {
      const dy = e.touches[0].clientY - ty0, dx = e.touches[0].clientX - tx0; if (Math.abs(dy) < 6 && Math.abs(dx) < 6) return;
      const dir = dy < 0 ? 1 : -1; if (Math.abs(dx) > Math.abs(dy) || !canStep(dir)) { tState = 'native'; return; }
      tState = 'done'; if (e.cancelable) e.preventDefault(); if (!animating) go(dir); return;
    }
    if (e.cancelable) e.preventDefault();
  }, { passive: false });
  const touchEnd = () => { touching = false; tState = ''; };
  hero.addEventListener('touchend', touchEnd, { passive: true }); hero.addEventListener('touchcancel', touchEnd, { passive: true });

  addEventListener('keydown', (e) => {
    if (!stepOn() || e.altKey || e.ctrlKey || e.metaKey) return;
    const tg = e.target || {}, tag = tg.tagName || '';
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || tg.isContentEditable || (e.key === ' ' && /^(BUTTON|A)$/.test(tag))) return;
    const fwd = e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey), back = e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey);
    if (!fwd && !back) return; const dir = fwd ? 1 : -1; if (!canStep(dir)) return; e.preventDefault(); if (!animating) go(dir);
  });

  /* لو استقرت الصفحة بين محطتين (سحب شريط التمرير أو استعادة الموضع) تنتقل لأقرب محطة، والفيديو يلحق بها */
  addEventListener('scroll', () => {
    wheelWatch(); clearTimeout(settleT); if (animating) return;
    settleT = setTimeout(() => { if (animating || touching || !stepOn() || !inHero()) return; const k = nearest(), y = stageY(k); if (k !== stage || Math.abs(scrollY - y) > 3) scrubTo(k, 500); }, 220);
  }, { passive: true });
  wheelWatch();

  return { load, unload, jump, get stage() { return stage; }, get ready() { return ready; }, pause() { if (!animating) video.pause(); } };
}
