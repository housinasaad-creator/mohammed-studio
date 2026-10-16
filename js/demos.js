/* أربع عيّنات حركة تفاعلية (بناء موقع من الكود، تحميص القهوة، اثنتا عشرة ساعة من العطر على الجلد، ذوبان الشوكولا). canvas 2D فقط، ولا تعمل إلا وهي ظاهرة على الشاشة. */
import { esc, ICON, reduced } from './shared.js';

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), lerp = (a, b, k) => a + (b - a) * k, sm = (x) => { x = clamp(x); return x * x * (3 - 2 * x); };
const hex = (s) => [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)];
const mixc = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
const rgb = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const light = (c, k) => mixc(c, [255, 255, 255], k), dark = (c, k) => mixc(c, [0, 0, 0], k);
function ramp(stops, x) { if (x <= stops[0][0]) return stops[0][1]; for (let i = 1; i < stops.length; i++) if (x <= stops[i][0]) { const [x0, c0] = stops[i - 1], [x1, c1] = stops[i]; return mixc(c0, c1, (x - x0) / (x1 - x0)); } return stops[stops.length - 1][1]; }
function rr(c, x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
const W = 480, H = 360;
function setup(canvas) { const d = Math.min(devicePixelRatio || 1, 2); canvas.width = W * d; canvas.height = H * d; const c = canvas.getContext('2d'); c.setTransform(d, 0, 0, d, 0, 0); return c; }
/* هزّة خفيفة وثابتة (عشوائية قابلة للتكرار) كي لا يتغيّر شكل الحبّة بين إطار وآخر */
const rnd = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

/* ---------------------------------------- القهوة ---------------------------------------- */
const COFFEE = [[150, hex('#7e9150')], [168, hex('#c1b44c')], [186, hex('#b9803b')], [204, hex('#7d4a25')], [222, hex('#4a2a15')], [240, hex('#1d100a')]];
function drawBean(c, x, y, rx, ry, rot, col, open, wr, gloss) {
  c.save(); c.translate(x, y); c.rotate(rot);
  const g = c.createRadialGradient(-rx * .35, -ry * .45, 3, 0, 0, rx * 1.15); g.addColorStop(0, rgb(light(col, .38))); g.addColorStop(.55, rgb(col)); g.addColorStop(1, rgb(dark(col, .5)));
  c.fillStyle = g; c.beginPath(); c.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); c.fill();
  if (wr > .02) { c.strokeStyle = rgb(dark(col, .35), .5 * wr); c.lineWidth = 1.2; for (let k = 0; k < 8; k++) { const yy = -ry * .78 + k * (ry * 1.56 / 7), xx = rx * Math.sqrt(Math.max(0, 1 - (yy / ry) ** 2)) * .8; c.beginPath(); c.moveTo(-xx, yy); c.quadraticCurveTo(0, yy + (rnd(k) - .5) * 9, xx, yy + (rnd(k + 9) - .5) * 5); c.stroke(); } }
  c.lineCap = 'round'; c.strokeStyle = rgb(dark(col, .78)); c.lineWidth = 2.2 + open * 7; c.beginPath(); c.moveTo(-rx * .84, 0); c.bezierCurveTo(-rx * .3, -ry * .3, rx * .3, ry * .3, rx * .84, 0); c.stroke();
  c.strokeStyle = rgb(light(col, .3), .35); c.lineWidth = 1.2; c.beginPath(); c.moveTo(-rx * .8, -2 - open * 2); c.bezierCurveTo(-rx * .3, -ry * .3 - 2, rx * .3, ry * .3 - 2, rx * .8, -2 - open * 2); c.stroke();
  if (gloss > .02) { c.fillStyle = `rgba(255,255,255,${.3 * gloss})`; c.beginPath(); c.ellipse(-rx * .38, -ry * .46, rx * .28, ry * .13, -.5, 0, Math.PI * 2); c.fill(); }
  c.restore();
}
function coffee(card, d) {
  const cv = card.querySelector('canvas'), c = setup(cv), rng = card.querySelector('input'), val = card.querySelector('.dv-n'), stg = card.querySelector('.dv-s'), cks = [...card.querySelectorAll('.ck-i')];
  const S = { T: 150, auto: !reduced, u: 0, pulse: 0, ring: 0, parts: [], smoke: [], prev: 150 };
  const stage = (T) => clamp(Math.floor((T - 150) / 18), 0, 5);
  const set = (T, fromUser) => { if (fromUser) S.auto = false; S.prev = S.T; S.T = T; rng.value = T; rng.style.setProperty('--p', ((T - 150) / 90 * 100).toFixed(1) + '%'); val.textContent = Math.round(T); stg.textContent = d.stages[stage(T)]; cks[0].classList.toggle('on', T >= 196); cks[1].classList.toggle('on', T >= 224);
    for (const k of [196, 224]) if (S.prev < k && T >= k) { S.pulse = 1; S.ring = 1; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + rnd(i) * .4; S.parts.push({ x: 240, y: 175, vx: Math.cos(a) * (70 + rnd(i + 3) * 60), vy: Math.sin(a) * (70 + rnd(i + 5) * 60), l: 1 }); } } };
  rng.addEventListener('input', () => set(+rng.value, true)); set(150);
  let time = 0;
  return {
    tick(dt) {
      time += dt;
      if (S.auto) { S.u = (S.u + dt / 11) % 1; const u = S.u; set(u < .8 ? 150 + 90 * sm(u / .8) : u < .92 ? 240 : 150 + 0, false); if (u >= .92) S.prev = 150; }
      S.pulse = Math.max(0, S.pulse - dt * 2.2); S.ring = Math.max(0, S.ring - dt * 1.6);
      const T = S.T, col = ramp(COFFEE, T), heat = clamp((T - 150) / 90);
      c.clearRect(0, 0, W, H);
      const gl = c.createRadialGradient(240, 185, 10, 240, 185, 190); gl.addColorStop(0, `rgba(255,${Math.round(150 - heat * 70)},60,${.1 + heat * .24})`); gl.addColorStop(1, 'rgba(255,106,61,0)'); c.fillStyle = gl; c.fillRect(0, 0, W, H);
      c.strokeStyle = 'rgba(255,255,255,.14)'; c.lineWidth = 3; c.beginPath(); c.arc(240, 185, 148, 0, Math.PI * 2); c.stroke();
      c.setLineDash([2, 13]); c.lineDashOffset = -time * 26; c.strokeStyle = 'rgba(255,106,61,.55)'; c.lineWidth = 2.4; c.beginPath(); c.arc(240, 185, 134, 0, Math.PI * 2); c.stroke(); c.setLineDash([]);
      for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2 + time * .55; drawBean(c, 240 + Math.cos(a) * 112, 185 + Math.sin(a) * 112, 17, 12, a * 2.1, col, clamp((T - 190) / 40) * .6, 1 - clamp((T - 150) / 55), clamp((T - 212) / 22)); }
      if (T > 204 && Math.random() < dt * (3 + (T - 204) * .45)) S.smoke.push({ x: 226 + Math.random() * 28, y: 130, r: 8 + Math.random() * 8, l: 1, vx: (Math.random() - .5) * 14 });
      S.smoke = S.smoke.filter((p) => (p.l -= dt * .45) > 0); for (const p of S.smoke) { p.y -= dt * 34; p.x += p.vx * dt; p.r += dt * 12; c.fillStyle = `rgba(230,225,215,${.1 * p.l})`; c.beginPath(); c.arc(p.x, p.y, p.r, 0, Math.PI * 2); c.fill(); }
      const sc = 1 + .16 * heat + S.pulse * .08; drawBean(c, 240, 185, 62 * sc, 45 * sc, -.4 + Math.sin(time * .8) * .12, col, clamp((T - 190) / 40) + S.pulse * .35, 1 - clamp((T - 150) / 55), clamp((T - 212) / 22));
      if (S.ring > 0) { c.strokeStyle = `rgba(255,214,150,${S.ring * .8})`; c.lineWidth = 3; c.beginPath(); c.arc(240, 185, 70 + (1 - S.ring) * 78, 0, Math.PI * 2); c.stroke(); }
      S.parts = S.parts.filter((p) => (p.l -= dt * 1.7) > 0); for (const p of S.parts) { p.x += p.vx * dt; p.y += p.vy * dt; c.fillStyle = `rgba(255,222,160,${p.l})`; c.beginPath(); c.arc(p.x, p.y, 2.6 * p.l + .5, 0, Math.PI * 2); c.fill(); }
    }
  };
}

/* ---------------------------------------- العطر: اثنتا عشرة ساعة ---------------------------------------- */
const NOTE_COL = [hex('#ffcf6e'), hex('#ff6f91'), hex('#d29a52')];
const inten = (h) => [Math.exp(-h / .85), h < 3.2 ? .85 * Math.exp(-(((h - 3.2) / 1.4) ** 2)) : .85 * Math.exp(-(((h - 3.2) / 3.8) ** 2)), (1 / (1 + Math.exp(-(h - 3.4) / 1.1))) * (1 - .42 * h / 12)];
function perfume(card, d) {
  const cv = card.querySelector('canvas'), c = setup(cv), rng = card.querySelector('input'), val = card.querySelector('.dv-n'), btn = card.querySelector('.pl'), lis = [...card.querySelectorAll('.notes li')];
  const S = { h: 0, play: !reduced, hold: 0, parts: [], dom: 0 };
  const setH = (h, user) => { if (user) { S.play = false; paint(); } S.h = h; rng.value = h; rng.style.setProperty('--p', (h / 12 * 100).toFixed(1) + '%'); val.textContent = String(Math.floor(h)).padStart(2, '0'); };
  const paint = () => { btn.classList.toggle('on', S.play); btn.setAttribute('aria-label', S.play ? d.pause : d.play); btn.querySelector('span').textContent = S.play ? d.pause : d.play; };
  rng.addEventListener('input', () => setH(+rng.value, true));
  btn.addEventListener('click', () => { if (!S.play && S.h >= 11.95) setH(0); S.play = !S.play; paint(); });
  setH(0); paint(); let time = 0;
  return {
    tick(dt) {
      time += dt;
      if (S.play) { if (S.hold > 0) { S.hold -= dt; if (S.hold <= 0) setH(0); } else { const n = S.h + dt * 12 / 15; if (n >= 12) { setH(12); S.hold = 1.4; } else setH(n); } }
      const I = inten(S.h), dom = I[0] > I[1] && I[0] > I[2] ? 0 : I[1] > I[2] ? 1 : 2; if (dom !== S.dom) S.dom = dom; lis.forEach((li, i) => li.classList.toggle('on', i === dom));
      const col = NOTE_COL[dom], tot = I[0] + I[1] + I[2];
      c.clearRect(0, 0, W, H);
      /* قارورة */
      c.fillStyle = 'rgba(0,0,0,.28)'; c.beginPath(); c.ellipse(120, 308, 62, 8, 0, 0, Math.PI * 2); c.fill();
      rr(c, 60, 150, 120, 154, 24); c.fillStyle = 'rgba(255,255,255,.07)'; c.fill();
      c.save(); rr(c, 60, 150, 120, 154, 24); c.clip(); const ly = 300 - 128 * (.62 + .2 * (1 - S.h / 12) * .4);
      const lg = c.createLinearGradient(0, ly, 0, 304); lg.addColorStop(0, rgb(light(col, .15), .95)); lg.addColorStop(1, rgb(dark(col, .35), .95)); c.fillStyle = lg;
      c.beginPath(); c.moveTo(56, 310); c.lineTo(56, ly); for (let x = 56; x <= 184; x += 8) c.lineTo(x, ly + Math.sin(x * .09 + time * 2.2) * 2.4); c.lineTo(184, 310); c.closePath(); c.fill(); c.restore();
      rr(c, 60, 150, 120, 154, 24); c.strokeStyle = 'rgba(255,255,255,.4)'; c.lineWidth = 2.5; c.stroke();
      rr(c, 70, 162, 11, 120, 6); c.fillStyle = 'rgba(255,255,255,.22)'; c.fill();
      rr(c, 100, 124, 40, 28, 4); c.fillStyle = 'rgba(255,255,255,.14)'; c.fill(); c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 2; c.stroke();
      const cg = c.createLinearGradient(94, 0, 146, 0); cg.addColorStop(0, '#9c7a2e'); cg.addColorStop(.45, '#f1d98a'); cg.addColorStop(1, '#8a6a22'); rr(c, 92, 80, 56, 46, 6); c.fillStyle = cg; c.fill();
      rr(c, 82, 214, 76, 40, 4); c.strokeStyle = 'rgba(244,239,230,.55)'; c.lineWidth = 1.4; c.stroke(); c.fillStyle = 'rgba(244,239,230,.55)'; c.fillRect(94, 230, 52, 2); c.fillRect(104, 240, 32, 2);
      /* أبخرة */
      if (Math.random() < dt * (2 + tot * 9)) S.parts.push({ x: 108 + Math.random() * 24, y: 78, vx: (Math.random() - .5) * 18, r: 6 + Math.random() * 7, l: 1, col });
      S.parts = S.parts.filter((p) => (p.l -= dt * .38) > 0);
      for (const p of S.parts) { p.y -= dt * 38; p.x += p.vx * dt + Math.sin(p.y * .05 + p.r) * .35; p.r += dt * 9; const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r); g.addColorStop(0, rgb(p.col, .26 * p.l)); g.addColorStop(1, rgb(p.col, 0)); c.fillStyle = g; c.beginPath(); c.arc(p.x, p.y, p.r, 0, Math.PI * 2); c.fill(); }
      /* المخطط */
      const x0 = 236, x1 = 462, y0 = 262, y1 = 66, X = (h) => x0 + (x1 - x0) * h / 12, Y = (v) => y0 - (y0 - y1) * v;
      c.strokeStyle = 'rgba(255,255,255,.16)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y0); c.stroke();
      c.font = '600 12px IBM Plex Sans Arabic, system-ui, sans-serif'; c.fillStyle = 'rgba(200,203,216,.8)'; c.textAlign = 'center';
      for (let h = 0; h <= 12; h += 3) { c.fillText(h + '', X(h), y0 + 20); c.beginPath(); c.moveTo(X(h), y0); c.lineTo(X(h), y0 + 5); c.stroke(); }
      for (let k = 0; k < 3; k++) {
        c.beginPath(); c.moveTo(X(0), y0); for (let i = 0; i <= 72; i++) { const h = i / 6; c.lineTo(X(h), Y(inten(h)[k])); } c.lineTo(X(12), y0); c.closePath(); c.fillStyle = rgb(NOTE_COL[k], .2); c.fill();
        c.beginPath(); for (let i = 0; i <= 72; i++) { const h = i / 6; i ? c.lineTo(X(h), Y(inten(h)[k])) : c.moveTo(X(h), Y(inten(h)[k])); } c.strokeStyle = rgb(NOTE_COL[k]); c.lineWidth = 2.4; c.lineJoin = 'round'; c.stroke();
      }
      c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 1.5; c.setLineDash([4, 5]); c.beginPath(); c.moveTo(X(S.h), y0); c.lineTo(X(S.h), y1 - 6); c.stroke(); c.setLineDash([]);
      for (let k = 0; k < 3; k++) { c.fillStyle = rgb(NOTE_COL[k]); c.strokeStyle = '#12141c'; c.lineWidth = 2.5; c.beginPath(); c.arc(X(S.h), Y(I[k]), 5.5, 0, Math.PI * 2); c.stroke(); c.fill(); }
    }
  };
}

/* ---------------------------------------- الشوكولا: ذوبان ---------------------------------------- */
function choco(card, d) {
  const cv = card.querySelector('canvas'), c = setup(cv), rng = card.querySelector('input'), val = card.querySelector('.dv-n'), stg = card.querySelector('.dv-s');
  const S = { T: 20, auto: !reduced, u: 0, rip: [] };
  const st = (T) => (T < 28 ? 0 : T < 33 ? 1 : 2);
  const set = (T, user) => { if (user) S.auto = false; S.T = T; rng.value = T; rng.style.setProperty('--p', ((T - 20) / 25 * 100).toFixed(1) + '%'); val.textContent = Math.round(T); stg.textContent = d.states[st(T)]; stg.dataset.s = st(T); };
  rng.addEventListener('input', () => set(+rng.value, true)); set(20); let time = 0;
  return {
    tick(dt) {
      time += dt;
      if (S.auto) { S.u = (S.u + dt / 12) % 1; const u = S.u; set(u < .72 ? 20 + 24 * sm(u / .72) : u < .9 ? 44 : 44 - 24 * sm((u - .9) / .1), false); }
      const T = S.T, m = sm((T - 28) / 13), heat = clamp((T - 20) / 25);
      const bg = c.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, rgb(mixc(hex('#1b2230'), hex('#4a2410'), heat), .9)); bg.addColorStop(1, rgb(mixc(hex('#12141c'), hex('#2a120a'), heat), .9)); c.fillStyle = bg; c.fillRect(0, 0, W, H);
      const hg = c.createRadialGradient(240, 300, 20, 240, 300, 260); hg.addColorStop(0, `rgba(255,120,50,${heat * .3})`); hg.addColorStop(1, 'rgba(255,120,50,0)'); c.fillStyle = hg; c.fillRect(0, 0, W, H);
      /* طبق */
      const pg = c.createLinearGradient(0, 292, 0, 316); pg.addColorStop(0, '#efe9dc'); pg.addColorStop(1, '#bdb6a6'); rr(c, 50, 292, 380, 22, 11); c.fillStyle = pg; c.fill();
      c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(240, 322, 190, 7, 0, 0, Math.PI * 2); c.fill();
      /* بركة */
      const pa = sm((m - .1) / .3);
      if (pa > 0) {
        const rx = 24 + 176 * Math.pow(m, 1.1), ry = 3 + 13 * m, pc = c.createLinearGradient(0, 292 - ry, 0, 294 + ry); pc.addColorStop(0, '#5a2e19'); pc.addColorStop(1, '#2e140a');
        c.globalAlpha = pa; c.fillStyle = pc; c.beginPath(); c.ellipse(240, 293, rx, ry, 0, 0, Math.PI * 2); c.fill(); c.globalAlpha = 1;
        c.strokeStyle = `rgba(255,220,180,${.3 * pa})`; c.lineWidth = 2; c.beginPath(); c.ellipse(240, 293 - ry * .2, rx * .7, ry * .55, 0, Math.PI * 1.1, Math.PI * 1.7); c.stroke();
        if (m > .55 && Math.random() < dt * 1.4) S.rip.push({ x: 240 + (Math.random() - .5) * rx * 1.3, r: 2, l: 1 });
        S.rip = S.rip.filter((r) => (r.l -= dt * .9) > 0); for (const r of S.rip) { r.r += dt * 26; c.strokeStyle = `rgba(255,220,180,${.35 * r.l})`; c.lineWidth = 1.4; c.beginPath(); c.ellipse(r.x, 293, r.r, r.r * .26, 0, 0, Math.PI * 2); c.stroke(); }
      }
      /* القطع الثلاث */
      for (let i = 0; i < 3; i++) {
        const cx = 240 + (i - 1) * 88, w = 78 * (1 + .62 * m), h = 78 * (1 - .8 * m) + Math.sin(time * 1.9 + i * 2) * 1.8 * m, x = cx - w / 2, y = 292 - h, rad = 7 + (Math.min(w, h) / 2 - 7) * Math.pow(m, .8);
        const bg2 = c.createLinearGradient(x, y, x + w, y + h); bg2.addColorStop(0, rgb(mixc(hex('#6a3720'), hex('#4a2514'), m))); bg2.addColorStop(1, rgb(mixc(hex('#3b1c0f'), hex('#2c140a'), m)));
        rr(c, x, y, w, h, rad); c.fillStyle = bg2; c.fill();
        const crisp = 1 - clamp(m * 2.4);
        if (crisp > .02) { const ix = x + 11, iy = y + 11, iw = w - 22, ih = h - 22; rr(c, ix, iy, iw, ih, 4); c.fillStyle = `rgba(0,0,0,${.28 * crisp})`; c.fill(); c.strokeStyle = `rgba(255,214,170,${.28 * crisp})`; c.lineWidth = 1.6; c.beginPath(); c.moveTo(ix, iy + ih); c.lineTo(ix, iy); c.lineTo(ix + iw, iy); c.stroke(); c.strokeStyle = `rgba(0,0,0,${.4 * crisp})`; c.beginPath(); c.moveTo(ix + iw, iy); c.lineTo(ix + iw, iy + ih); c.lineTo(ix, iy + ih); c.stroke(); }
        c.fillStyle = `rgba(255,235,215,${.14 + .12 * m})`; c.beginPath(); c.ellipse(x + w * .28, y + Math.max(5, h * .16), w * .2, Math.max(2.5, h * .06), -.18, 0, Math.PI * 2); c.fill();
        if (m > .5) { c.strokeStyle = `rgba(255,150,70,${(m - .5) * .55})`; c.lineWidth = 2; c.beginPath(); for (let k = 0; k <= 12; k++) { const yy = y - 10 - k * 4.5, xx = cx + Math.sin(time * 3 + k * .7 + i) * 6; k ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.stroke(); }
      }
      /* ميزان حرارة */
      const tx = 446, ty0 = 68, ty1 = 252, lv = (T - 20) / 25;
      rr(c, tx - 7, ty0, 14, ty1 - ty0, 7); c.fillStyle = 'rgba(255,255,255,.1)'; c.fill(); c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 2; c.stroke();
      const mh = (ty1 - ty0 - 6) * lv + 4; rr(c, tx - 3.5, ty1 - mh - 3, 7, mh, 3.5); c.fillStyle = '#ff6a3d'; c.fill();
      c.beginPath(); c.arc(tx, ty1 + 12, 13, 0, Math.PI * 2); c.fillStyle = '#ff6a3d'; c.fill(); c.strokeStyle = 'rgba(255,255,255,.35)'; c.stroke();
    }
  };
}

/* ---------------------------------------- البناء: من الكود إلى موقع حيّ (بصري بلا كلمات) ---------------------------------------- */
const BPAL = ['#ff6a3d', '#7cc4ff', '#9be3a4', '#ffd27a', '#c8cbd8'];
const STAGE_AT = [0, .3, .58, .82];
function build(card, d) {
  const cv = card.querySelector('canvas'), c = cv.getContext('2d'), rng = card.querySelector('input'), btn = card.querySelector('.pl'), icons = [...card.querySelectorAll('.bst')];
  const S = { p: 0, play: !reduced, hold: 0, w: 600, h: 300, parts: [], acc: 0, burst: false, prev: 0 };
  function fit() { const r = cv.getBoundingClientRect(), dp = Math.min(devicePixelRatio || 1, 2); S.w = Math.max(260, Math.round(r.width)); S.h = Math.max(180, Math.round(r.height)); cv.width = Math.round(S.w * dp); cv.height = Math.round(S.h * dp); c.setTransform(dp, 0, 0, dp, 0, 0); }
  fit(); const ro = 'ResizeObserver' in window ? new ResizeObserver(fit) : null; ro && ro.observe(cv);
  const stageOf = (p) => (p >= STAGE_AT[3] ? 3 : p >= STAGE_AT[2] ? 2 : p >= STAGE_AT[1] ? 1 : 0);
  const paint = () => { btn.classList.toggle('on', S.play); btn.setAttribute('aria-label', S.play ? d.pause : d.play); };
  const setP = (p, user) => { if (user) { S.play = false; paint(); } S.p = clamp(p); rng.value = S.p * 100; rng.style.setProperty('--p', (S.p * 100).toFixed(1) + '%'); const st = stageOf(S.p); icons.forEach((b, i) => { b.classList.toggle('on', i === st); b.classList.toggle('done', i < st); }); };
  rng.addEventListener('input', () => setP(+rng.value / 100, true));
  btn.addEventListener('click', () => { if (!S.play && S.p >= .995) setP(0); S.play = !S.play; paint(); });
  icons.forEach((b, i) => b.addEventListener('click', () => { setP(STAGE_AT[i] + (i ? .02 : 0), true); }));
  setP(.0); paint(); let time = 0;
  const ease = sm;
  function drawCode(cp) {
    const sc = clamp(cp.w / 330, .62, 1.25), rh = Math.max(13, Math.min(22, (cp.h - 40) / 14)), rows = Math.max(5, Math.floor((cp.h - 44) / rh));
    rr(c, cp.x, cp.y, cp.w, cp.h, 14); c.fillStyle = '#0e1017'; c.fill(); c.strokeStyle = 'rgba(255,255,255,.16)'; c.lineWidth = 2; c.stroke();
    c.fillStyle = '#181b26'; c.save(); rr(c, cp.x, cp.y, cp.w, cp.h, 14); c.clip(); c.fillRect(cp.x, cp.y, cp.w, 26); c.restore();
    ['#ff5f57', '#febc2e', '#28c840'].forEach((k, i) => { c.fillStyle = k; c.beginPath(); c.arc(cp.x + 16 + i * 15, cp.y + 13, 4.4, 0, 6.3); c.fill(); });
    const rv = S.p * (rows + 3), left = cp.x + 16, top = cp.y + 40; let caret = null;
    for (let i = 0; i < rows; i++) {
      const f = clamp(rv - i); if (f <= 0) break; const y = top + i * rh;
      c.fillStyle = 'rgba(200,203,216,.22)'; rr(c, left, y + rh * .22, 10 * sc, rh * .42, 2); c.fill();
      const ind = Math.floor(rnd(i * 3.1) * 3) * 14 * sc, n = 2 + Math.floor(rnd(i * 5.7 + 2) * 3), segs = []; let tot = 0;
      for (let j = 0; j < n; j++) { const w = (22 + rnd(i * 13.7 + j * 3.3) * 70) * sc, col = BPAL[Math.floor(rnd(i * 9.1 + j * 1.7) * 5)]; segs.push([w, col]); tot += w + 7 * sc; }
      let x = left + 24 * sc + ind, vis = f * tot;
      for (const [w, col] of segs) { const dw = Math.min(w, Math.max(0, vis)); if (dw > 0) { c.fillStyle = col; c.globalAlpha = .9; rr(c, x, y + rh * .2, dw, rh * .5, rh * .25); c.fill(); c.globalAlpha = 1; } vis -= w + 7 * sc; x += w + 7 * sc; if (vis < -6) break; }
      caret = [Math.min(x, cp.x + cp.w - 14), y + rh * .1, rh * .7];
    }
    if (caret && (Math.floor(time * 2) % 2 === 0)) { c.fillStyle = '#ff6a3d'; c.fillRect(caret[0] + 2, caret[1], 3, caret[2]); }
  }
  function drawSite(sp, m, dpl) {
    const p = S.p, ink = '#12141c', paper = '#f7f4ee';
    rr(c, sp.x, sp.y, sp.w, sp.h, 14); c.fillStyle = paper; c.fill(); c.strokeStyle = 'rgba(247,244,238,.9)'; c.lineWidth = 2; c.stroke();
    c.save(); rr(c, sp.x, sp.y, sp.w, sp.h, 14); c.clip();
    c.fillStyle = '#e4dfd3'; c.fillRect(sp.x, sp.y, sp.w, 26);
    const dotsOn = ease((p - .34) / .1);
    ['#ff5f57', '#febc2e', '#28c840'].forEach((k, i) => { c.fillStyle = dotsOn > .5 ? k : '#b9b5aa'; c.beginPath(); c.arc(sp.x + 16 + i * 15, sp.y + 13, 4.4, 0, 6.3); c.fill(); });
    const uw = sp.w * .42, ux = sp.x + (sp.w - uw) / 2; rr(c, ux, sp.y + 6, uw, 14, 7); c.fillStyle = '#fff'; c.fill(); c.strokeStyle = dpl >= .98 ? '#2fc58a' : 'rgba(18,20,28,.2)'; c.lineWidth = 1.6; c.stroke();
    c.fillStyle = dpl >= .98 ? '#2fc58a' : '#b9b5aa'; c.beginPath(); c.arc(ux + 10, sp.y + 13, 3, 0, 6.3); c.fill(); c.fillStyle = 'rgba(18,20,28,.28)'; rr(c, ux + 20, sp.y + 10.5, uw * .5, 5, 2.5); c.fill();
    const X = sp.x + 14, Y = sp.y + 38, CW = sp.w - 28, CH = sp.h - 38 - 14, P = (fx, fy, fw, fh) => [X + fx * CW, Y + fy * CH, fw * CW, fh * CH];
    /* مرحلتا الهيكل واللون: كل عنصر يظهر سلكياً ثم يمتلئ لونه بالتتابع */
    const wa = (k) => ease((p - k * .016) / .04), fa = (k) => ease((p - .3 - k * .014) / .05);
    const frame = (k, [x, y, w, h], r, fill, draw) => {
      const a = wa(k), f = fa(k); if (a <= 0) return;
      c.save(); c.setLineDash([5, 4]); c.lineWidth = 1.6; c.strokeStyle = `rgba(110,115,135,${a * (1 - f * .95)})`; rr(c, x, y, w, h, r); c.stroke(); c.restore();
      if (f > 0) { c.save(); c.globalAlpha = f; const cx = x + w / 2, cy = y + h / 2, s = .93 + .07 * f; c.translate(cx, cy); c.scale(s, s); c.translate(-cx, -cy); if (fill) { rr(c, x, y, w, h, r); c.fillStyle = fill; c.fill(); } draw && draw(x, y, w, h); c.restore(); }
    };
    const shine = (x, y, w, h, r) => { if (m < .05) return; const t = ((time * .55) % 1.7) - .35; c.save(); rr(c, x, y, w, h, r); c.clip(); const g = c.createLinearGradient(x + w * t, 0, x + w * (t + .25), 0); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(.5, `rgba(255,255,255,${.4 * m})`); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(x, y, w, h); c.restore(); };
    frame(0, P(0, 0, 1, .105), 8, ink);
    frame(1, P(.02, .02, .06, .062), 99, '#ff6a3d');
    [[.14, .1], [.26, .12], [.4, .09]].forEach(([fx, fw], i) => frame(2 + i, P(fx, .039, fw, .028), 5, '#3b4052'));
    frame(5, P(.82, .018, .16, .07), 8, '#ff6a3d');
    frame(6, P(.04, .2, .46, .085), 7, ink, (x, y, w, h) => shine(x, y, w, h, 7)); frame(7, P(.04, .31, .33, .085), 7, ink, (x, y, w, h) => shine(x, y, w, h, 7));
    frame(8, P(.04, .44, .4, .034), 5, '#9ea3b6'); frame(9, P(.04, .5, .29, .034), 5, '#9ea3b6');
    const cta = P(.04, .6, .2, .09), pulse = (time * .8) % 1;
    frame(10, cta, 9, '#ff6a3d', (x, y, w, h) => { c.fillStyle = ink; c.globalAlpha = c.globalAlpha * .9; rr(c, x + w * .22, y + h * .38, w * .56, h * .24, h * .12); c.fill(); });
    if (m > .05 && fa(10) > .9) { c.strokeStyle = `rgba(255,106,61,${(1 - pulse) * .7 * m})`; c.lineWidth = 2.4; rr(c, cta[0] - pulse * 9, cta[1] - pulse * 9, cta[2] + pulse * 18, cta[3] + pulse * 18, 9 + pulse * 7); c.stroke(); }
    const hv = P(.58, .16, .4, .5);
    frame(11, hv, 14, null, (x, y, w, h) => {
      const g = c.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, '#ff6a3d'); g.addColorStop(1, '#2a2f45'); rr(c, x, y, w, h, 14); c.fillStyle = g; c.fill();
      c.save(); rr(c, x, y, w, h, 14); c.clip(); const cx = x + w / 2, cy = y + h / 2, R = Math.min(w, h) * .3, a = time * 1.1 * m;
      c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 3; c.beginPath(); c.arc(cx + Math.cos(a) * 6 * m, cy + Math.sin(a) * 6 * m, R, 0, 6.3); c.stroke();
      c.fillStyle = '#12141c'; c.save(); c.translate(cx - R * 1.05, cy + R * .55 + Math.sin(a * 1.3) * 5 * m); c.rotate(a * .6); c.beginPath(); c.moveTo(0, -R * .42); c.lineTo(R * .4, R * .3); c.lineTo(-R * .4, R * .3); c.closePath(); c.fill(); c.restore();
      c.fillStyle = '#ffd27a'; c.save(); c.translate(cx + R * 1.05, cy - R * .55 + Math.cos(a * 1.1) * 5 * m); c.rotate(-a * .8); c.fillRect(-R * .2, -R * .2, R * .4, R * .4); c.restore();
      for (let i = 0; i < 6; i++) { c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.arc(x + w * .14 + (i % 3) * 11, y + h * .84 + Math.floor(i / 3) * 11, 2.4, 0, 6.3); c.fill(); }
      c.restore();
    });
    const cardCols = ['#ff6a3d', '#4d9eff', '#2fc58a'];
    for (let i = 0; i < 3; i++) {
      const fl = Math.sin(time * 2 + i * 1.4) * 3.2 * m, base = P(.04 + i * .325, .76, .29, .21); base[1] += fl - m * 3;
      frame(12 + i, base, 10, '#fff', (x, y, w, h) => {
        c.strokeStyle = ink; c.lineWidth = 2; rr(c, x, y, w, h, 10); c.stroke();
        c.fillStyle = cardCols[i]; c.beginPath(); c.arc(x + w * .16, y + h * .34, Math.min(w, h) * .15, 0, 6.3); c.fill();
        c.fillStyle = '#c3c6d3'; rr(c, x + w * .12, y + h * .62, w * .62, h * .09, 3); c.fill(); rr(c, x + w * .12, y + h * .78, w * .4, h * .09, 3); c.fill();
      });
    }
    /* المؤشر يضغط الزر في مرحلة الحركة */
    if (m > .25) {
      const loop = (time * .45) % 1, k1 = ease(loop / .55), px = lerp(X + CW * .62, cta[0] + cta[2] * .62, k1), py = lerp(Y + CH * .95, cta[1] + cta[3] * .6, k1), click = loop > .6 && loop < .75;
      c.save(); c.globalAlpha = clamp((m - .25) * 3); c.translate(px, py); c.scale(click ? .85 : 1, click ? .85 : 1);
      c.fillStyle = '#ff6a3d'; c.strokeStyle = ink; c.lineWidth = 2.4; c.lineJoin = 'round'; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 22); c.lineTo(6, 17); c.lineTo(10, 26); c.lineTo(14, 24); c.lineTo(10, 15.5); c.lineTo(18, 15.5); c.closePath(); c.fill(); c.stroke(); c.restore();
      if (click) { c.strokeStyle = `rgba(18,20,28,${.6 * (1 - (loop - .6) / .15)})`; c.lineWidth = 2; c.beginPath(); c.arc(cta[0] + cta[2] * .62, cta[1] + cta[3] * .6, 6 + (loop - .6) / .15 * 22, 0, 6.3); c.stroke(); }
    }
    /* النشر: شريط يمتلئ تحت شريط النافذة ثم علامة صحّ خضراء */
    if (dpl > 0) { c.fillStyle = '#ff6a3d'; c.fillRect(sp.x, sp.y + 26, sp.w * Math.min(1, dpl / .8), 4); }
    c.restore();
    if (dpl >= .98) {
      const pop = ease((dpl - .98) / .02) + Math.sin(Math.min(1, (S.p - .98) * 40) * 3) * 0, bx = sp.x + sp.w - 34, by = sp.y + sp.h - 34;
      c.save(); c.translate(bx, by); c.scale(.7 + .3 * pop, .7 + .3 * pop); c.fillStyle = '#2fc58a'; c.strokeStyle = '#12141c'; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, 20, 0, 6.3); c.fill(); c.stroke();
      c.strokeStyle = '#fff'; c.lineWidth = 4.2; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(-8, 1); c.lineTo(-2.5, 7); c.lineTo(9, -6); c.stroke(); c.restore();
    }
  }
  return {
    destroy() { ro && ro.disconnect(); },
    tick(dt) {
      time += dt;
      if (S.play) { if (S.hold > 0) { S.hold -= dt; if (S.hold <= 0) setP(0); } else { const n = S.p + dt / 15; if (n >= 1) { setP(1); S.hold = 2.2; } else setP(n); } }
      const W = S.w, H = S.h, wide = W / H > 1.5;
      const cp = wide ? { x: W * .025, y: H * .06, w: W * .34, h: H * .88 } : { x: W * .035, y: H * .025, w: W * .93, h: H * .29 };
      const sp = wide ? { x: W * .41, y: H * .05, w: W * .565, h: H * .9 } : { x: W * .035, y: H * .345, w: W * .93, h: H * .63 };
      const m = ease((S.p - .56) / .12) * (1 - ease((S.p - .985) / .015) * 0), dpl = ease((S.p - .82) / .15);
      c.clearRect(0, 0, W, H);
      drawCode(cp); drawSite(sp, m, S.p >= .82 ? Math.min(1, (S.p - .82) / .15) : 0);
      /* جسيمات تنساب من الكود إلى الموقع أثناء البناء */
      const moving = S.play || Math.abs(S.p - S.prev) > 1e-4; S.prev = S.p;
      if (moving && S.p < .97) { S.acc += dt; while (S.acc > .07) { S.acc -= .07; S.parts.push({ t: 0, o: (Math.random() - .5) * 18, col: BPAL[Math.floor(Math.random() * 5)] }); } }
      const x0 = wide ? cp.x + cp.w : cp.x + cp.w / 2, y0 = wide ? cp.y + cp.h * .5 : cp.y + cp.h, x1 = wide ? sp.x : sp.x + sp.w / 2, y1 = wide ? sp.y + sp.h * .5 : sp.y;
      S.parts = S.parts.filter((q) => (q.t += dt * 1.4) < 1);
      for (const q of S.parts) { const e = ease(q.t), x = lerp(x0, x1, e) + (wide ? 0 : q.o), y = lerp(y0, y1, e) + (wide ? q.o : 0) + Math.sin(q.t * 9) * 3; c.globalAlpha = Math.sin(q.t * Math.PI); c.fillStyle = q.col; c.beginPath(); c.arc(x, y, 3.2, 0, 6.3); c.fill(); c.globalAlpha = 1; }
    }
  };
}

/* ---------------------------------------- التركيب ---------------------------------------- */
export function mountDemos(grid, t, linkOf) {
  const d = t.demos, a = d.coffee, p = d.perfume, ch = d.choco, bd = d.build;
  const range = (min, max, v, step, label) => `<input class="rng" type="range" min="${min}" max="${max}" step="${step}" value="${v}" aria-label="${esc(label)}">`;
  grid.innerHTML = `
  <article class="demo demo-wide rv" data-k="build"><h3 class="sr">${esc(bd.t)}</h3><div class="demo-stage"><canvas aria-hidden="true"></canvas></div>
    <div class="demo-bar"><button type="button" class="pl pl-i" aria-label="${esc(bd.play)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="i-play" d="M8 5v14l11-7z"/><path class="i-pause" d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg></button>
      <div class="bst-row" role="group" aria-label="${esc(bd.t)}">${['<path d="M4 5h16v4H4zM4 12h7v7H4zM14 12h6v7h-6z"/>', '<path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"/>', '<path d="M6 3l12 8-5.2 1.4L10 18z"/>', '<path d="M12 3c3 2 5 5 5 9l-2 3H9l-2-3c0-4 2-7 5-9zM9 15l-2 4 3-1M15 15l2 4-3-1"/><circle cx="12" cy="10" r="1.6"/>'].map((ic, i) => `<button type="button" class="bst" aria-label="${esc(bd.stages[i])}"><svg viewBox="0 0 24 24" aria-hidden="true">${ic}</svg></button>`).join('')}</div>
      <div class="rng-w rng-build">${range(0, 100, 0, .1, bd.p)}</div></div></article>
  <article class="demo rv" data-k="coffee"><div class="demo-stage"><canvas aria-hidden="true"></canvas></div><div class="demo-body"><span class="dn">01</span><h3>${esc(a.t)}</h3><p>${esc(a.p)}</p>
    <div class="dv"><b><span class="dv-n">150</span><i>${esc(a.unit)}</i></b><span class="dv-s"></span></div>
    <div class="rng-w rng-coffee">${range(150, 240, 150, 1, a.t)}<i class="mk" style="--x:51.1%"></i><i class="mk" style="--x:82.2%"></i></div>
    <div class="cks"><span class="ck-i">${esc(a.c1)}</span><span class="ck-i">${esc(a.c2)}</span></div><a class="demo-link" href="${esc(linkOf('hayyak'))}">${esc(d.see)}<span class="bi">${ICON.arrow}</span></a></div></article>
  <article class="demo rv" style="--d:.08s" data-k="perfume"><div class="demo-stage"><canvas aria-hidden="true"></canvas></div><div class="demo-body"><span class="dn">02</span><h3>${esc(p.t)}</h3><p>${esc(p.p)}</p>
    <div class="dv"><b><span class="dv-n">00</span><i>${esc(p.hours)}</i></b><button type="button" class="pl" aria-label="${esc(p.play)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="i-play" d="M8 5v14l11-7z"/><path class="i-pause" d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg><span>${esc(p.play)}</span></button></div>
    <div class="rng-w rng-perf">${range(0, 12, 0, .05, p.t)}</div>
    <ul class="notes">${p.notes.map((n, i) => `<li><i style="background:${['#ffcf6e', '#ff6f91', '#d29a52'][i]}"></i>${esc(n)}</li>`).join('')}</ul><a class="demo-link" href="${esc(linkOf('perfume'))}">${esc(d.see)}<span class="bi">${ICON.arrow}</span></a></div></article>
  <article class="demo rv" style="--d:.16s" data-k="choco"><div class="demo-stage"><canvas aria-hidden="true"></canvas></div><div class="demo-body"><span class="dn">03</span><h3>${esc(ch.t)}</h3><p>${esc(ch.p)}</p>
    <div class="dv"><b><span class="dv-n">20</span><i>${esc(ch.unit)}</i></b><span class="dv-s"></span></div>
    <div class="rng-w rng-choco">${range(20, 45, 20, .5, ch.t)}</div>
    <a class="demo-link" href="${esc(linkOf('chocolate'))}">${esc(d.see)}<span class="bi">${ICON.arrow}</span></a></div></article>`;
  const cards = [...grid.querySelectorAll('.demo')], impl = [build(cards[0], bd), coffee(cards[1], a), perfume(cards[2], p), choco(cards[3], ch)], vis = [false, false, false, false];
  let raf = 0, last = 0, dead = false;
  const loop = (now) => { raf = 0; if (dead || document.hidden || !vis.some(Boolean)) return; const dt = Math.min(.05, (now - last) / 1000 || .016); last = now; impl.forEach((m, i) => vis[i] && m.tick(dt)); raf = requestAnimationFrame(loop); };
  const kick = () => { if (!raf && !dead) { last = performance.now(); raf = requestAnimationFrame(loop); } };
  impl.forEach((m) => m.tick(.016));
  let io = null;
  if ('IntersectionObserver' in window) { io = new IntersectionObserver((es) => { es.forEach((e) => { vis[cards.indexOf(e.target)] = e.isIntersecting; }); kick(); }, { rootMargin: '60px' }); cards.forEach((e) => io.observe(e)); }
  const onVis = () => { if (!document.hidden) kick(); }; document.addEventListener('visibilitychange', onVis);
  return { destroy() { dead = true; cancelAnimationFrame(raf); io && io.disconnect(); impl.forEach((m) => m.destroy && m.destroy()); document.removeEventListener('visibilitychange', onVis); }, running: () => !!raf };
}
