/*
  أربع تمريرات فقط للهيرو (خمس محطات = البداية + أربع وقفات): كل تمريرة (عجلة أو سحب إصبع أو سهم/مسافة أو نقطة) تحرّك الصفحة
  تلقائياً بنعومة إلى المحطة التالية فيجري تسلسل الصور وحده بين محطة وأخرى ثم يقف، وبعد المحطة الرابعة يكمل الموقع تمريره عادياً.
  الرجوع للأعلى هو نفس الحركة عكسياً (الصور نفسها)، وتمريرة جديدة أثناء الحركة تغيّر الهدف فوراً بدون انتظار.
  لا يملك أي منطق للصور: الصفحة تتحرّك فقط، وhero-seq.js يرسم الإطار حسب موضع التمرير (انظر sceneP في app.js).
*/
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
/* منحنيات زمنية محدودة المدة (لا ذيل طويل): تبدأ وتنتهي بنعومة قصيرة؛ والمقاطعة في منتصف الحركة تستعمل easeOut كي لا تتوقف السرعة */
const easeIO = (u) => (u < 0.5 ? 0.5 * Math.pow(2 * u, 1.6) : 1 - 0.5 * Math.pow(2 * (1 - u), 1.6)), easeO = (u) => 1 - Math.pow(1 - u, 1.8);   // أُسّ 1.6 بدل 2: ذيل التباطؤ الأخير أقصر

/* weight(s0, s1): عدد الإطارات التي تقطعها الحركة بين موضعين (0..1) فتُحسب المدة منه: الحركة الأطول تأخذ وقتاً أطول لكن ليس خطياً */
export function initHeroSteps({ hero, stick, hdr = () => 0, stops = 5, weight = () => 100, locked = () => false, onStage }) {
  const LAST = stops - 1;
  let stage = 0, ty = 0, y = 0, y0 = 0, t0 = 0, dur = 1, ease = easeIO, anim = false, raf = 0, settleT = 0, touching = false, lastW = 0, wheelOn = false;
  const span = () => Math.max(1, hero.offsetHeight - stick.offsetHeight);
  const base = () => hero.getBoundingClientRect().top + scrollY - hdr();
  const stageY = (k) => base() + span() * (k / LAST);
  const nearest = () => { let b = 0, d = Infinity; for (let k = 0; k <= LAST; k++) { const dd = Math.abs(scrollY - stageY(k)); if (dd < d) { d = dd; b = k; } } return b; };
  const stepOn = () => !locked();
  const inHero = () => scrollY <= stageY(LAST) + 2;
  const canStep = (dir) => stepOn() && inHero() && !(dir > 0 && scrollY >= stageY(LAST) - 2 && !anim) && !(dir < 0 && scrollY <= stageY(0) + 2 && !anim);

  function tick(now) {
    raf = 0; if (!anim) return;
    const u = clamp((now - t0) / (dur * 1000));
    y = y0 + (ty - y0) * ease(u); scrollTo({ top: y, behavior: 'instant' });
    if (u >= 1) { y = ty; scrollTo({ top: ty, behavior: 'instant' }); anim = false; return; }
    raf = requestAnimationFrame(tick);
  }
  function goTo(k) {
    k = clamp(k, 0, LAST); stage = k; const from = anim ? y : scrollY, to = stageY(k), sp = span(), b = base();
    if (Math.abs(to - from) < 1) { ty = to; anim = false; onStage && onStage(k); return; }
    ease = anim ? easeO : easeIO;                                           // أثناء الحركة: نكمل بسرعة متصلة (easeOut) وليس من الصفر
    y0 = from; ty = to; t0 = performance.now(); y = from;
    dur = clamp(0.7 + 0.8 * Math.sqrt(Math.abs(weight((from - b) / sp, (to - b) / sp)) / 100), 0.6, 2.1) * (anim ? 0.8 : 1);
    anim = true; if (!raf) raf = requestAnimationFrame(tick);
    onStage && onStage(k);
  }
  const go = (dir) => goTo(stage + dir);

  /* ---------------- عجلة الماوس: كل نقرة = وقفة (قاعدة 110ms تمنع تكرار ذيل اللوحة) ---------------- */
  let owned = false;                                                       // ذيل اللوحة (قصور ذاتي) يبقى ملكاً للتمريرة التي بدأت الوقفة فلا ينزلق بعدها خارج الهيرو
  function onWheel(e) {
    if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const now = performance.now(), fresh = now - lastW > 110; lastW = now; const dir = e.deltaY > 0 ? 1 : -1;
    if (fresh) owned = false;
    if (!canStep(dir)) { if (owned) e.preventDefault(); return; }
    e.preventDefault(); owned = true; if (fresh) go(dir);
  }
  function wheelWatch() { const near = scrollY <= stageY(LAST) + 1200; if (near && !wheelOn) { addEventListener('wheel', onWheel, { passive: false }); wheelOn = true; } else if (!near && wheelOn) { removeEventListener('wheel', onWheel); wheelOn = false; } }

  /* ---------------- اللمس: سحب عمودي واحد = وقفة ---------------- */
  let ty0 = 0, tx0 = 0, tState = '';
  hero.addEventListener('touchstart', (e) => { touching = true; if (e.touches.length !== 1) { tState = 'native'; return; } ty0 = e.touches[0].clientY; tx0 = e.touches[0].clientX; tState = stepOn() ? 'pending' : 'native'; }, { passive: true });
  hero.addEventListener('touchmove', (e) => {
    if (tState === 'native' || e.touches.length !== 1) return;
    if (tState === 'pending') {
      const dy = e.touches[0].clientY - ty0, dx = e.touches[0].clientX - tx0; if (Math.abs(dy) < 6 && Math.abs(dx) < 6) return;
      const dir = dy < 0 ? 1 : -1; if (Math.abs(dx) > Math.abs(dy) || !canStep(dir)) { tState = 'native'; return; }
      tState = 'done'; if (e.cancelable) e.preventDefault(); go(dir); return;
    }
    if (e.cancelable) e.preventDefault();
  }, { passive: false });
  const touchEnd = () => { touching = false; tState = ''; };
  hero.addEventListener('touchend', touchEnd, { passive: true }); hero.addEventListener('touchcancel', touchEnd, { passive: true });

  /* ---------------- لوحة المفاتيح ---------------- */
  addEventListener('keydown', (e) => {
    if (!stepOn() || e.altKey || e.ctrlKey || e.metaKey) return;
    const tg = e.target || {}, tag = tg.tagName || '';
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || tg.isContentEditable || (e.key === ' ' && /^(BUTTON|A)$/.test(tag))) return;
    const fwd = e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey), back = e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey);
    if (!fwd && !back) return; const dir = fwd ? 1 : -1; if (!canStep(dir)) return; e.preventDefault(); if (!e.repeat) go(dir);
  });

  /* لو استقرت الصفحة بين محطتين (سحب شريط التمرير أو استعادة الموضع) تنتقل لأقرب محطة */
  addEventListener('scroll', () => {
    wheelWatch(); clearTimeout(settleT); if (anim) return;
    settleT = setTimeout(() => {
      if (anim || touching || !stepOn() || !inHero()) { if (!anim && !inHero()) stage = LAST; return; }
      if (scrollY <= stageY(0) + 3) { stage = 0; return; }                  // فوق بداية الهيرو أو عندها: لا نسحب الصفحة
      const k = nearest(); stage = k; if (Math.abs(scrollY - stageY(k)) > 3) goTo(k); else onStage && onStage(k);
    }, 220);
  }, { passive: true });
  wheelWatch();

  return { jump(k) { if (stepOn()) goTo(k); }, get stage() { return stage; }, get animating() { return anim; } };
}
