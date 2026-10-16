/*
  هيرو الاستوديو: مشهد three.js إجرائي (لابتوب وجوال بشاشات تعرض لقطات من مشاريعنا الحقيقية، مؤشر ثلاثي الأبعاد، رموز </>، خطوط سرعة)
  تقوده نسبة تمرير الهيرو p (0..1) عبر أربع محطات: البداية، التصميم، السرعة، الطلبات. يُحمَّل بعد اكتمال الصفحة، ويتوقف خارج الشاشة،
  والصورة الثابتة تبقى فوقه حتى يجهز أول مقطع فتتلاشى دون أن يلاحظ الزائر الانتقال.
*/
import * as THREE from './vendor/three.module.min.js';

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), lerp = (a, b, k) => a + (b - a) * k;
const sm = (x) => { x = clamp(x); return x * x * (3 - 2 * x); };

/* بعض المتصفحات القديمة (Safari قبل 16) بلا roundRect */
if (!CanvasRenderingContext2D.prototype.roundRect) CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); this.moveTo(x + r, y); this.arcTo(x + w, y, x + w, y + h, r); this.arcTo(x + w, y + h, x, y + h, r); this.arcTo(x, y + h, x, y, r); this.arcTo(x, y, x + w, y, r); this.closePath(); };

const CORAL = 0xff6a3d, INK = 0x12141c;
const LAPTOP_CLIPS = ['chocolate', 'perfume', 'tekton', 'furniture'];       // شاشة اللابتوب في كل محطة
const PHONE_SHOTS = ['chocolate', 'mozaik', 'khayt', 'chat'];               // شاشة الجوال: لقطات ثم محادثة

/* ---------------- مساعدات الأشكال ---------------- */
function rrShape(w, h, r) {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s;
}
const rrGeo = (w, h, r, depth, bev = .02) => new THREE.ExtrudeGeometry(rrShape(w, h, r), { depth, bevelEnabled: bev > 0, bevelThickness: bev, bevelSize: bev, bevelSegments: 2, curveSegments: 10 });
function rrPlane(w, h, r) {
  const g = new THREE.ShapeGeometry(rrShape(w, h, r), 10), p = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + w / 2) / w, (p.getY(i) + h / 2) / h); return g;
}
function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return { tex: t, canvas: c }; }

/* ---------------- محادثة واتساب على شاشة الجوال (تُرسَم على canvas وتُعاد عند تغيّر الخطوة أو اللغة) ---------------- */
function drawChat(g, W, H, step, texts) {
  const font = '"IBM Plex Sans Arabic", system-ui, sans-serif', rtl = (s) => /[؀-ۿ]/.test(s);
  g.clearRect(0, 0, W, H); g.fillStyle = '#efe6d9'; g.fillRect(0, 0, W, H);
  g.fillStyle = 'rgba(18,20,28,.045)'; for (let y = 200; y < H; y += 46) for (let x = (y / 46) % 2 ? 0 : 23; x < W; x += 46) { g.beginPath(); g.arc(x, y, 3, 0, 6.3); g.fill(); }
  g.fillStyle = '#12141c'; g.fillRect(0, 0, W, 190);
  g.fillStyle = '#ff6a3d'; g.beginPath(); g.arc(86, 126, 38, 0, 6.3); g.fill(); g.fillStyle = '#12141c'; g.font = `700 40px ${font}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('M', 86, 128);
  g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.fillStyle = '#f4efe6'; g.font = `700 34px ${font}`; g.fillText('MOHAMMED', 144, 122); g.fillStyle = '#25d366'; g.font = `500 24px ${font}`; g.fillText('online', 144, 156);
  const bubble = (txt, right, y, fill) => {
    g.font = `600 33px ${font}`; const maxW = 400, isR = rtl(txt), words = txt.split(' '), lines = []; let cur = '';
    for (const w of words) { const t = cur ? cur + ' ' + w : w; if (g.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; } lines.push(cur);
    const bw = Math.min(maxW, Math.max(...lines.map((l) => g.measureText(l).width))) + 52, bh = lines.length * 46 + 50, bx = right ? W - 36 - bw : 36;
    g.save(); g.shadowColor = 'rgba(0,0,0,.18)'; g.shadowBlur = 8; g.shadowOffsetY = 3; g.fillStyle = fill; g.beginPath(); g.roundRect(bx, y, bw, bh, 26); g.fill(); g.restore();
    g.fillStyle = '#12141c'; g.direction = isR ? 'rtl' : 'ltr'; g.textAlign = isR ? 'right' : 'left';
    lines.forEach((l, i) => g.fillText(l, isR ? bx + bw - 26 : bx + 26, y + 58 + i * 46)); g.direction = 'ltr'; g.textAlign = 'left';
    return bh;
  };
  let y = 250;
  if (step >= 1) y += bubble(texts[0], true, y, '#d9fdd3') + 26;
  if (step === 2) { g.fillStyle = '#fff'; g.beginPath(); g.roundRect(36, y, 138, 70, 28); g.fill(); g.fillStyle = '#12141c'; for (let i = 0; i < 3; i++) { g.globalAlpha = .35 + .3 * i; g.beginPath(); g.arc(75 + i * 28, y + 35, 8, 0, 6.3); g.fill(); } g.globalAlpha = 1; }
  if (step >= 3) bubble(texts[1], false, y, '#ffffff');
  g.fillStyle = '#f7f4ee'; g.fillRect(0, H - 150, W, 150); g.fillStyle = '#ffffff'; g.beginPath(); g.roundRect(30, H - 118, W - 150, 78, 39); g.fill(); g.fillStyle = '#25d366'; g.beginPath(); g.arc(W - 70, H - 79, 40, 0, 6.3); g.fill();
}

export async function createHero({ canvas, lite = false, saveData = false, onReady }) {
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl'); if (!gl) throw new Error('no webgl');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lite, alpha: true, powerPreference: 'high-performance' });
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05; renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.setClearColor(0, 0);
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(28, 1, .5, 200); scene.add(camera);
  let dpr = Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 1.8);

  /* بيئة انعكاسات: استوديو بألواح ضوء ناعمة */
  { const s = new THREE.Scene(); s.add(new THREE.Mesh(new THREE.SphereGeometry(60, 24, 12), new THREE.MeshBasicMaterial({ color: 0x6c6a66, side: THREE.BackSide })));
    const panel = (w, h, pos, col, k) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(k), side: THREE.DoubleSide })); m.position.set(...pos); m.lookAt(0, 0, 0); s.add(m); };
    panel(40, 24, [0, 30, 8], 0xfff6ea, 3.2); panel(14, 22, [-24, 10, 14], 0xffffff, 3); panel(6, 26, [26, 8, 2], 0xffd9c2, 2.4); panel(30, 8, [0, -6, -30], 0xff8a55, 1.3); panel(30, 12, [0, 12, 34], 0xeef2ff, 1.3);
    const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(s, .03).texture; pm.dispose(); scene.environmentIntensity = 1.45; }
  scene.add(new THREE.HemisphereLight(0xfff4e6, 0x8a7f72, .75)); const key = new THREE.DirectionalLight(0xfff1de, 1.6); key.position.set(-8, 14, 10); scene.add(key);

  const M = {
    alu: new THREE.MeshStandardMaterial({ color: 0xdfe2ea, metalness: .9, roughness: .27 }),
    aluD: new THREE.MeshStandardMaterial({ color: 0x8b909c, metalness: .9, roughness: .38 }),
    glass: new THREE.MeshStandardMaterial({ color: 0x07080c, metalness: .2, roughness: .22 }),
    phone: new THREE.MeshStandardMaterial({ color: 0x2c2f3a, metalness: .85, roughness: .34 }),
    coral: new THREE.MeshStandardMaterial({ color: CORAL, metalness: .05, roughness: .36 }),
    ink: new THREE.MeshStandardMaterial({ color: INK, metalness: .25, roughness: .45 }),
    paper: new THREE.MeshStandardMaterial({ color: 0xf2ece0, metalness: 0, roughness: .6 }),
    sky: new THREE.MeshStandardMaterial({ color: 0x4d7cff, metalness: .05, roughness: .4 }),
    mint: new THREE.MeshStandardMaterial({ color: 0x2fc58a, metalness: .05, roughness: .4 }),
    line: new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: .55 })
  };

  /* ---------------- شاشات الفيديو: عنصران يتناوبان مع تلاشٍ بينهما ---------------- */
  const vids = [0, 1].map(() => { const v = document.createElement('video'); v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto'; v.setAttribute('playsinline', ''); v.setAttribute('muted', ''); return v; });
  const vtex = vids.map((v) => { const t = new THREE.VideoTexture(v); t.colorSpace = THREE.SRGBColorSpace; t.minFilter = THREE.LinearFilter; t.generateMipmaps = false; return t; });
  const screenMat = (map) => new THREE.MeshBasicMaterial({ map, toneMapped: false, transparent: true, opacity: 0, depthWrite: false });

  /* ---------------- اللابتوب ---------------- */
  const laptop = new THREE.Group(); scene.add(laptop);
  const baseG = rrGeo(6.5, 4.3, .3, .16, .02); baseG.rotateX(-Math.PI / 2); laptop.add(new THREE.Mesh(baseG, M.alu));
  const kb = canvasTex(1024, 360, (g, w, h) => { g.clearRect(0, 0, w, h); g.fillStyle = '#14161d'; [14, 14, 14, 13, 10].forEach((n, r) => { const y = 16 + r * 68, kh = r === 0 ? 44 : 60, gap = 9, kw = (w - 32 - (n - 1) * gap) / n; for (let i = 0; i < n; i++) { g.beginPath(); g.roundRect(16 + i * (kw + gap), y, kw, kh, 9); g.fill(); } }); });
  const deck = new THREE.Mesh(new THREE.PlaneGeometry(5.7, 2.0), new THREE.MeshStandardMaterial({ map: kb.tex, transparent: true, metalness: .3, roughness: .5 })); deck.rotation.x = -Math.PI / 2; deck.position.set(0, .186, -.55); laptop.add(deck);
  const pad = new THREE.Mesh(rrPlane(2.1, 1.25, .12), new THREE.MeshStandardMaterial({ color: 0xaeb3be, metalness: .85, roughness: .22 })); pad.rotation.x = -Math.PI / 2; pad.position.set(0, .187, 1.35); laptop.add(pad);
  const hinge = new THREE.Mesh(new THREE.CylinderGeometry(.08, .08, 5.2, 14), M.aluD); hinge.rotation.z = Math.PI / 2; hinge.position.set(0, .22, -2.12); laptop.add(hinge);
  const lid = new THREE.Group(); lid.position.set(0, .25, -2.1); laptop.add(lid);
  const lidG = rrGeo(6.5, 4.25, .24, .09, .02); lidG.translate(0, 2.125, 0); lid.add(new THREE.Mesh(lidG, M.alu));
  const bez = new THREE.Mesh(rrPlane(6.34, 4.1, .16), M.glass); bez.position.set(0, 2.14, .113); lid.add(bez);
  const dark = new THREE.Mesh(new THREE.PlaneGeometry(5.96, 3.725), new THREE.MeshBasicMaterial({ color: 0x0a0b10, toneMapped: false })); dark.position.set(0, 2.245, .117); lid.add(dark);
  const scrA = new THREE.Mesh(new THREE.PlaneGeometry(5.96, 3.725), screenMat(vtex[0])), scrB = new THREE.Mesh(new THREE.PlaneGeometry(5.96, 3.725), screenMat(vtex[1]));
  scrA.position.set(0, 2.245, .118); scrB.position.set(0, 2.245, .119); lid.add(scrA, scrB);
  const camDot = new THREE.Mesh(new THREE.CircleGeometry(.04, 12), new THREE.MeshBasicMaterial({ color: 0x1b1d26 })); camDot.position.set(0, 4.14, .12); lid.add(camDot);
  lid.rotation.x = -.21;
  /* مؤشر ثلاثي الأبعاد يتحرك على الشاشة */
  const curS = new THREE.Shape(); [[0, 0], [0, -1.5], [.36, -1.17], [.6, -1.72], [.82, -1.62], [.58, -1.08], [1.02, -1.08]].forEach(([x, y], i) => (i ? curS.lineTo(x * .8, y * .8) : curS.moveTo(x * .8, y * .8)));
  const cursor = new THREE.Mesh(new THREE.ExtrudeGeometry(curS, { depth: .07, bevelEnabled: true, bevelThickness: .03, bevelSize: .03, bevelSegments: 2 }), M.coral); cursor.position.set(0, 2.2, .5); cursor.rotation.z = .12; lid.add(cursor);

  /* ---------------- الجوال ---------------- */
  const phone = new THREE.Group(); scene.add(phone);
  const bodyG = rrGeo(1.5, 3.1, .26, .16, .03); bodyG.translate(0, 0, -.08); phone.add(new THREE.Mesh(bodyG, M.phone));
  const pA = new THREE.Mesh(rrPlane(1.38, 2.98, .2), new THREE.MeshBasicMaterial({ color: 0x0b0c10, toneMapped: false })), pB = new THREE.Mesh(rrPlane(1.38, 2.98, .2), new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false, transparent: true, opacity: 0, depthWrite: false }));
  pA.position.z = .125; pB.position.z = .127; phone.add(pA, pB);
  const isl = new THREE.Mesh(rrPlane(.4, .11, .055), new THREE.MeshBasicMaterial({ color: 0x050507 })); isl.position.set(0, 1.36, .13); phone.add(isl);
  for (const [y, h, sx] of [[.55, .36, 1], [.05, .22, -1], [-.3, .22, -1]]) { const b = new THREE.Mesh(new THREE.BoxGeometry(.05, h, .06), M.aluD); b.position.set(.79 * sx, y, -.02); phone.add(b); }
  const chat = canvasTex(660, 1428, () => {}); let chatTexts = ['', ''], chatStep = -1;
  const paintChat = (step) => { chatStep = step; drawChat(chat.canvas.getContext('2d'), 660, 1428, step, chatTexts); chat.tex.needsUpdate = true; };

  /* ---------------- زينة تعبّر عن الاستوديو (نفس أشكال الصفحة: دائرة، مربع، زائد، مثلث، متعرّج، نقاط) ---------------- */
  const decor = [], addDecor = (obj, o) => { obj.userData = { ...o, base: obj.position.clone() }; scene.add(obj); decor.push(obj); return obj; };
  const glyph = new THREE.Group(); { const cap = (len, rot, x, y) => { const m = new THREE.Mesh(new THREE.CapsuleGeometry(.13, len, 6, 12), M.coral); m.rotation.z = rot; m.position.set(x, y, 0); glyph.add(m); };
    cap(.95, 2.2, -2.0, .33); cap(.95, -2.2, -2.0, -.33); cap(1.5, -.28, 0, 0); cap(.95, -2.2, 2.0, .33); cap(.95, 2.2, 2.0, -.33); }
  glyph.position.set(4.2, 5.2, -5.2); glyph.scale.setScalar(.8); addDecor(glyph, { amp: .18, sp: .7, ph: 0, rot: 0 });
  const ringD = addDecor(new THREE.Mesh(new THREE.TorusGeometry(.9, .09, 12, 48), M.coral), { amp: .25, sp: .6, ph: 1.2, rot: .3 }); ringD.position.set(6.4, 5.0, -4.2);
  const sq = addDecor(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.1, 1.1, 1.1)), M.line), { amp: .22, sp: .5, ph: 2.1, rot: .35 }); sq.position.set(7.4, 3.9, -2.5);
  const plus = new THREE.Group(); [[1.1, .3], [.3, 1.1]].forEach(([w, h]) => plus.add(new THREE.Mesh(new THREE.BoxGeometry(w, h, .3), M.coral))); plus.position.set(7.8, .2, -1.5); addDecor(plus, { amp: .2, sp: .8, ph: 3.3, rot: .4 });
  const tri = addDecor(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.ConeGeometry(.7, 1.2, 3)), M.line), { amp: .26, sp: .55, ph: 4.2, rot: .5 }); tri.position.set(9.4, 2.2, -4.5);
  const zig = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([[-1.4, 0, 0], [-.7, .5, 0], [0, -.5, 0], [.7, .5, 0], [1.4, -.1, 0]].map((p) => new THREE.Vector3(...p)), false, 'catmullrom', .1), 40, .07, 8), M.ink); zig.position.set(5.2, -.5, 4.2); addDecor(zig, { amp: .15, sp: .9, ph: 5.1, rot: 0 });
  const dots = new THREE.Group(); for (let i = 0; i < 9; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(.09, 10, 8), M.coral); d.position.set((i % 3) * .5, Math.floor(i / 3) * .5, 0); dots.add(d); } dots.position.set(8.4, 6.0, -1); addDecor(dots, { amp: .2, sp: .65, ph: 2.6, rot: .2 });
  if (lite) [plus, tri, zig, dots].forEach((o) => { o.visible = false; });

  /* عيّنات ألوان تطفو فوق اللابتوب في محطة التصميم */
  const sw = new THREE.Group(); scene.add(sw); const swatches = [M.coral, M.ink, M.paper, M.sky, M.mint].map((m, i) => { const s = new THREE.Mesh(rrGeo(.75, .75, .16, .12, .02), m); s.userData = { a: i / 5 * Math.PI * 2 }; sw.add(s); return s; });
  sw.position.set(0, 4.9, 0);
  /* خطوط السرعة في محطة السرعة */
  const NL = lite ? 24 : 46, lp = new Float32Array(NL * 6), lseed = []; for (let i = 0; i < NL; i++) lseed.push([(Math.random() - .5) * 26, Math.random() * 8 - .5, Math.random() * 26 - 14, .6 + Math.random() * 1.2]);
  const lgeo = new THREE.BufferGeometry(); lgeo.setAttribute('position', new THREE.BufferAttribute(lp, 3)); const lmat = new THREE.LineBasicMaterial({ color: CORAL, transparent: true, opacity: 0 }); const lines = new THREE.LineSegments(lgeo, lmat); lines.frustumCulled = false; scene.add(lines);
  /* ظلال التماس */
  const shTex = canvasTex(256, 256, (g) => { const r = g.createRadialGradient(128, 128, 8, 128, 128, 126); r.addColorStop(0, 'rgba(18,20,28,.5)'); r.addColorStop(1, 'rgba(18,20,28,0)'); g.fillStyle = r; g.fillRect(0, 0, 256, 256); }).tex;
  const shadow = (w, h) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false, toneMapped: false, opacity: .55 })); m.rotation.x = -Math.PI / 2; m.position.y = -.02; scene.add(m); return m; };
  shadow(10.5, 8); const shP = shadow(3.2, 3.2);

  /* ---------------- القوام ---------------- */
  const loader = new THREE.TextureLoader(), phoneTex = {};
  const getPhoneTex = (k, cb) => { if (k === 'chat') { cb && cb(); return chat.tex; } if (phoneTex[k]) { cb && cb(); return phoneTex[k]; } const t = loader.load(`assets/shots/${k}-m.webp`, () => cb && cb()); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return (phoneTex[k] = t); };

  /* ---------------- مفاتيح الكاميرا: مركز كل محطة ---------------- */
  /* الكاميرا تدور حول المنتج بدل التكبير: عرض اللابتوب ثابت تقريباً كي لا يغطي النص. ph = موضع الجوال أمام زاوية اللابتوب السفلية */
  const KEYS = [
    { cam: [3.4, 4.0, 15.6], look: [.2, 2.0, .4], ph: [2.9, 1.65, 3.3], phRy: -.38, phS: .86, lapRy: -.2, lapX: 0 },
    { cam: [-3.2, 3.6, 15.4], look: [-.9, 2.3, .2], ph: [3.5, 1.65, 3.1], phRy: -.45, phS: .86, lapRy: -.04, lapX: 0 },
    { cam: [7.6, 3.1, 12.8], look: [2.3, 1.9, 1.9], ph: [3.1, 1.85, 3.3], phRy: -.3, phS: 1.1, lapRy: -.42, lapX: 1.8 },
    { cam: [4.6, 2.5, 12.9], look: [3.0, 1.95, 3.0], ph: [3.0, 1.95, 3.1], phRy: -.06, phS: 1.2, lapRy: -.5, lapX: 7.4 }
  ];
  const state = { p: 0, ps: 0, t: 0, mx: 0, my: 0, active: true, ready: false, clipSlot: 0, clipIdx: -1, clipTok: 0, phIdx: -1, phNext: null, phMix: 1, lapMix: 1 };
  function sample(p) {
    const f = clamp(p * 4 - .5, 0, 3), i = Math.min(2, Math.floor(f)), k = sm((f - i - .12) / .76), a = KEYS[i], b = KEYS[i + 1], L = (x, y) => lerp(x, y, k), V = (u, v) => u.map((x, j) => L(x, v[j]));
    return { cam: V(a.cam, b.cam), look: V(a.look, b.look), fov: 27, ph: V(a.ph, b.ph), phRy: L(a.phRy, b.phRy), phS: L(a.phS, b.phS), lapRy: L(a.lapRy, b.lapRy), lapX: L(a.lapX, b.lapX) };
  }
  const wch = (p, i) => { const q = p * 4 - i; return sm((q + .12) / .22) * sm((1.12 - q) / .22); };

  /* ---------------- تبديل مقطع شاشة اللابتوب وشاشة الجوال ---------------- */
  let clipReadyCb = null;
  function setClip(idx) {
    if (idx === state.clipIdx || saveData) return; const first = state.clipIdx < 0; state.clipIdx = idx; const tok = ++state.clipTok, slot = 1 - state.clipSlot, v = vids[slot];
    v.src = `assets/clips/${LAPTOP_CLIPS[idx]}.mp4`; v.load();
    v.addEventListener('canplay', () => { if (tok !== state.clipTok) return; v.currentTime = 0; (state.active ? v.play() : Promise.resolve()).catch(() => {}); state.clipSlot = slot; state.lapMix = first ? 1 : 0; clipReadyCb && clipReadyCb(); clipReadyCb = null; }, { once: true });
  }
  function setPhone(idx, cb) {
    const first = state.phIdx < 0; state.phIdx = idx; const k = PHONE_SHOTS[idx]; if (k === 'chat') { chatStep = -1; paintChat(0); }
    const tex = getPhoneTex(k, cb);
    if (first) { pA.material.map = tex; pA.material.color.set(0xffffff); pA.material.needsUpdate = true; state.phNext = null; return; }
    pB.material.map = tex; pB.material.needsUpdate = true; pB.material.opacity = 0; state.phMix = 0; state.phNext = tex;
  }

  /* ---------------- الحجم ---------------- */
  let W = 1, H = 1;
  function resize() {
    W = canvas.clientWidth || innerWidth; H = canvas.clientHeight || innerHeight; renderer.setPixelRatio(dpr); renderer.setSize(W, H, false); camera.aspect = W / H;
    const asp = W / H, g = lerp(1, .62, clamp((1.15 - asp) / .5)); camera.userData.f = Math.max(1, 1.6 / asp) * g; camera.userData.pk = lerp(1, .86, clamp((1.15 - asp) / .5));
    const land = W / H > 1.15; camera.setViewOffset(W, H, land ? -W * .2 : 0, land ? 0 : H * .23, W, H); camera.updateProjectionMatrix();
  }
  resize();

  /* ---------------- حلقة الرسم ---------------- */
  let raf = 0, last = 0, ft = [], chatT = 0;
  const onMove = (e) => { state.mx = e.clientX / innerWidth - .5; state.my = e.clientY / innerHeight - .5; };
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) addEventListener('pointermove', onMove, { passive: true });
  function frame(now) {
    raf = 0; if (!state.active) return; raf = requestAnimationFrame(frame);
    const dt = Math.min(.05, (now - last) / 1000 || .016); last = now; state.t += dt; const t = state.t;
    state.ps += (state.p - state.ps) * (1 - Math.exp(-dt * 6.5)); const p = state.ps, s = sample(p);
    laptop.rotation.y = s.lapRy + Math.sin(t * .4) * .03; laptop.position.set(s.lapX, Math.sin(t * .9) * .05, 0);
    const f = camera.userData.f || 1; camera.position.set(s.look[0] + (s.cam[0] - s.look[0]) * f + state.mx * .9, s.look[1] + (s.cam[1] - s.look[1]) * f - state.my * .5, s.look[2] + (s.cam[2] - s.look[2]) * f); camera.lookAt(s.look[0], s.look[1], s.look[2]);
    if (Math.abs(camera.fov - s.fov) > .01) { camera.fov = s.fov; camera.updateProjectionMatrix(); }
    phone.position.set(s.ph[0], s.ph[1] + Math.sin(t * 1.1 + 1) * .09, s.ph[2]); phone.rotation.set(Math.sin(t * .6) * .03, s.phRy + Math.sin(t * .5) * .05, .05 - p * .05); phone.scale.setScalar(s.phS * (camera.userData.pk || 1));
    shP.position.set(phone.position.x, -.02, phone.position.z); shP.scale.setScalar(s.phS * (camera.userData.pk || 1)); shP.material.opacity = clamp(.5 - (phone.position.y - 1.5) * .12);
    /* شاشة اللابتوب: مقطع المحطة الحالية يتلاشى فوق السابق */
    const ci = Math.min(3, Math.floor(p * 4 + .0001)); if (ci !== state.clipIdx) setClip(ci);
    state.lapMix = Math.min(1, state.lapMix + dt * 2.2); const cur = state.clipSlot === 0 ? scrA : scrB, prev = state.clipSlot === 0 ? scrB : scrA;
    const have = state.clipIdx >= 0 && vids[state.clipSlot].readyState >= 2; cur.material.opacity = have ? sm(state.lapMix) : 0; prev.material.opacity = have ? 1 - sm(state.lapMix) : 0;
    scrA.visible = vids[0].readyState >= 2; scrB.visible = vids[1].readyState >= 2; cur.renderOrder = 2; prev.renderOrder = 1; if (state.lapMix >= 1) { const pv = vids[1 - state.clipSlot]; if (!pv.paused) pv.pause(); }
    /* شاشة الجوال */
    const pi = p < .3 ? 0 : p < .5 ? 1 : p < .72 ? 2 : 3; if (pi !== state.phIdx) setPhone(pi);
    if (state.phNext) { state.phMix = Math.min(1, state.phMix + dt * 2.4); pB.material.opacity = sm(state.phMix); if (state.phMix >= 1) { pA.material.map = state.phNext; pA.material.color.set(0xffffff); pA.material.needsUpdate = true; pB.material.opacity = 0; state.phNext = null; } }
    if (state.phIdx === 3) { chatT += dt; const st = chatT < .6 ? 0 : chatT < 1.4 ? 1 : chatT < 2.7 ? 2 : chatT < 7.5 ? 3 : (chatT = 0); if (st !== chatStep) paintChat(st); } else chatT = 0;
    /* المؤشر والعيّنات والخطوط حسب المحطة */
    const w1 = wch(p, 1), w2 = wch(p, 2), cw = Math.max(w1, 1 - sm(p / .14)), cp = (t * .2) % 1, ph2 = cp < .5 ? cp * 2 : 1 - (cp - .5) * 2;
    cursor.visible = cw > .02; cursor.scale.setScalar(cw * .55 * (1 - ((t * .9) % 1 > .88 ? .22 : 0))); cursor.position.set(lerp(-2.1, 1.7, sm(ph2)), 2.9 - sm(ph2) * 1.0 + Math.sin(cp * 12.566) * .18, .5);
    sw.visible = w1 > .02; sw.scale.setScalar(.2 + .8 * w1); swatches.forEach((m, i) => { const a = m.userData.a + t * .6; m.position.set(Math.cos(a) * 2.7, Math.sin(a * 1.3) * .5, Math.sin(a) * 1.6); m.rotation.set(.32, t * .7 + i, .08 * (i - 2)); });
    lmat.opacity = w2 * .55; lines.visible = w2 > .02;
    if (lines.visible) { for (let i = 0; i < NL; i++) { const [x, y, z0, len] = lseed[i], z = ((z0 + t * (9 + len * 5)) % 26) - 14, o = i * 6; lp[o] = x; lp[o + 1] = y; lp[o + 2] = z; lp[o + 3] = x; lp[o + 4] = y; lp[o + 5] = z - len * 2.2; } lgeo.attributes.position.needsUpdate = true; }
    for (const d of decor) { const u = d.userData; d.position.y = u.base.y + Math.sin(t * u.sp + u.ph) * u.amp; d.rotation.y += dt * u.rot; d.rotation.x = Math.sin(t * u.sp * .8 + u.ph) * .25; }
    renderer.render(scene, camera);
    ft.push(dt); if (ft.length >= 60) { const a = ft.reduce((x, y) => x + y, 0) / ft.length; ft.length = 0; if (a > .021 && dpr > 1) { dpr = Math.max(1, dpr - .25); resize(); } }
  }

  /* الصورة الثابتة تبقى حتى يجهز أول مقطع وأول لقطة جوال (أو تنتهي مهلة 3.5 ثانية) */
  const ready = new Promise((res) => { let n = 0; const one = () => { if (++n >= 2) res(); }; clipReadyCb = one; if (saveData) one(); setPhone(0, one); setTimeout(res, 3500); });
  const api = {
    setProgress(p) { state.p = clamp(p); },
    setActive(on) { if (on === state.active && (raf || !on)) return; state.active = on; if (on) { last = performance.now(); raf = raf || requestAnimationFrame(frame); vids[state.clipSlot].src && vids[state.clipSlot].play().catch(() => {}); } else vids.forEach((v) => v.pause()); },
    setChat(texts) { chatTexts = texts; if (state.phIdx === 3) paintChat(Math.max(0, chatStep)); else chatStep = -1; },
    resize,
    /* يحرّر كل شيء (سياق WebGL والقوام والفيديو) حين يبتعد الزائر عن الهيرو كثيراً */
    dispose() {
      state.dead = true; state.active = false; cancelAnimationFrame(raf); raf = 0; removeEventListener('pointermove', onMove);
      vids.forEach((v) => { v.pause(); v.removeAttribute('src'); v.load(); }); vtex.forEach((t) => t.dispose());
      Object.values(phoneTex).forEach((t) => t.dispose()); chat.tex.dispose(); kb.tex.dispose(); shTex.dispose();
      scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); const m = o.material; if (m) (Array.isArray(m) ? m : [m]).forEach((x) => x.dispose()); });
      scene.environment && scene.environment.dispose(); renderer.dispose(); renderer.forceContextLoss(); if (window.__hero === api) window.__hero = null;
    }
  };
  setClip(0); raf = requestAnimationFrame(frame); window.__hero = api;
  ready.then(() => { if (state.dead) return; state.ready = true; onReady && onReady(); });
  return api;
}
