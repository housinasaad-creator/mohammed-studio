/*
  أربع تمريرات فقط للهيرو (خمس محطات = البداية + أربع وقفات): كل تمريرة (عجلة أو سحب إصبع أو سهم/مسافة أو نقطة) تحرّك الصفحة
  تلقائياً بنعومة إلى المحطة التالية فيجري تسلسل الصور وحده بين محطة وأخرى ثم يقف، وبعد المحطة الرابعة يكمل الموقع تمريره عادياً.
  الرجوع للأعلى هو نفس الحركة عكسياً (الصور نفسها)، وتمريرة جديدة أثناء الحركة تغيّر الهدف فوراً بدون انتظار.
  لا يملك أي منطق للصور: الصفحة تتحرّك فقط، وhero-seq.js يرسم الإطار حسب موضع التمرير (انظر sceneP في app.js).
*/
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
/* تنعيم حرج التخميد (SmoothDamp): الحركة تبدأ وتنتهي بنعومة وتتحمّل تغيير الهدف في منتصفها بسرعة متصلة */
function smoothDamp(cur, target, vel, smoothTime, dt) {
  const w = 2 / smoothTime, x = w * dt, e = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x), ch = cur - target, tmp = (vel + w * ch) * dt;
  vel = (vel - w * tmp) * e; let out = target + (ch + tmp) * e;
  if ((target - cur > 0) === (out > target)) { out = target; vel = 0; }
  return [out, vel];
}

export function initHeroSteps({ hero, stick, hdr = () => 0, stops = 5, smoothTime = 0.46, locked = () => false, onStage }) {
  const LAST = stops - 1;
  let stage = 0, ty = 0, y = 0, vy = 0, anim = false, raf = 0, last = 0, settleT = 0, touching = false, lastW = 0, wheelOn = false;
  const span = () => Math.max(1, hero.offsetHeight - stick.offsetHeight);
  const base = () => hero.getBoundingClientRect().top + scrollY - hdr();
  const stageY = (k) => base() + span() * (k / LAST);
  const nearest = () => { let b = 0, d = Infinity; for (let k = 0; k <= LAST; k++) { const dd = Math.abs(scrollY - stageY(k)); if (dd < d) { d = dd; b = k; } } return b; };
  const stepOn = () => !locked();
  const inHero = () => scrollY <= stageY(LAST) + 2;
  const canStep = (dir) => stepOn() && inHero() && !(dir > 0 && scrollY >= stageY(LAST) - 2 && !anim) && !(dir < 0 && scrollY <= stageY(0) + 2 && !anim);

  function tick(now) {
    raf = 0; if (!anim) return;
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
    [y, vy] = smoothDamp(y, ty, vy, smoothTime, dt);
    scrollTo({ top: y, behavior: 'instant' });
    if (Math.abs(y - ty) < 0.4 && Math.abs(vy) < 6) { y = ty; scrollTo({ top: ty, behavior: 'instant' }); anim = false; vy = 0; return; }
    raf = requestAnimationFrame(tick);
  }
  function goTo(k) {
    k = clamp(k, 0, LAST); stage = k; ty = stageY(k);
    if (!anim) { y = scrollY; vy = 0; anim = true; last = performance.now(); }
    if (!raf) raf = requestAnimationFrame(tick);
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
