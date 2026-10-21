/*
  هيرو الاستوديو (الوضع الليلي): كيبورد ميكانيكي مضاء مبنيّ كله بالكود في three.js، ولا شيء غيره في المشهد.
  تقوده نسبة تمرير الهيرو p (0..1) عبر أربع محطات: لقطة واسعة تنزلق فوق الأزرار، ثم زوم عنيف عليها وهي تُضغط،
  ثم تخرج الكبسات من أماكنها وتنفصل فيظهر تحتها الساق والنابض وعلبة المفتاح والإضاءة، ثم تعود وتنتهي الكاميرا عند زر Enter.
  يُحمَّل بعد اكتمال الصفحة ويتوقف خارج الشاشة، والصورة الثابتة تبقى فوقه حتى يجهز أول إطار.
*/
import * as THREE from './vendor/three.module.min.js';

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), lerp = (a, b, k) => a + (b - a) * k;
const sm = (x) => { x = clamp(x); return x * x * (3 - 2 * x); };
const outCubic = (x) => 1 - Math.pow(1 - clamp(x), 3);
const outBack = (x) => { x = clamp(x); const c1 = 1.55, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };

if (!CanvasRenderingContext2D.prototype.roundRect) CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); this.moveTo(x + r, y); this.arcTo(x + w, y, x + w, y + h, r); this.arcTo(x + w, y + h, x, y + h, r); this.arcTo(x, y + h, x, y, r); this.arcTo(x, y, x + w, y, r); this.closePath(); };

/* ---------------- تخطيط الكيبورد 60% (61 زراً) ---------------- */
const ROWS = [
  [['`', 1], ['1', 1], ['2', 1], ['3', 1], ['4', 1], ['5', 1], ['6', 1], ['7', 1], ['8', 1], ['9', 1], ['0', 1], ['-', 1], ['=', 1], ['BACK', 2]],
  [['TAB', 1.5], ['Q', 1], ['W', 1], ['E', 1], ['R', 1], ['T', 1], ['Y', 1], ['U', 1], ['I', 1], ['O', 1], ['P', 1], ['[', 1], [']', 1], ['\\', 1.5]],
  [['CAPS', 1.75], ['A', 1], ['S', 1], ['D', 1], ['F', 1], ['G', 1], ['H', 1], ['J', 1], ['K', 1], ['L', 1], [';', 1], ["'", 1], ['ENTER', 2.25]],
  [['SHIFT', 2.25], ['Z', 1], ['X', 1], ['C', 1], ['V', 1], ['B', 1], ['N', 1], ['M', 1], [',', 1], ['.', 1], ['/', 1], ['SHIFT', 2.75]],
  [['Ctrl', 1.25], ['Win', 1.25], ['Alt', 1.25], ['</>', 6.25], ['Alt', 1.25], ['Fn', 1.25], ['Menu', 1.25], ['Ctrl', 1.25]]
];
const KEYS = []; { let idx = 0; ROWS.forEach((row, r) => { let x = -7.5; row.forEach(([label, w]) => { KEYS.push({ label, w, x: x + w / 2, z: (r - 2), row: r, idx: idx++ }); x += w; }); }); }
const WIDTHS = [...new Set(KEYS.map((k) => k.w))].sort((a, b) => a - b);
KEYS.forEach((k) => { k.cls = WIDTHS.indexOf(k.w); const h = Math.sin(k.idx * 127.1) * 43758.5453; k.r1 = h - Math.floor(h); const h2 = Math.sin(k.idx * 311.7 + 4.1) * 12543.7; k.r2 = h2 - Math.floor(h2); const h3 = Math.sin(k.idx * 74.7 + 9.3) * 3758.9; k.r3 = h3 - Math.floor(h3); });
const keyOf = (label) => KEYS.find((k) => k.label === label);
const FOCUS = keyOf('J'), ENTER = keyOf('ENTER');
const TYPED = [['A', .295], ['S', .312], ['D', .329], ['F', .346], ['G', .363], ['H', .38], ['J', .397], ['K', .414], ['L', .431]];   // صفّ الحروف يُضغط واحداً بعد الآخر أمام الكاميرا في المحطة الثانية

/* ---------------- مساعدات الأشكال ---------------- */
function rrShape(w, h, r) {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s;
}
function mergeGeos(list) {
  const gs = list.map((g) => (g.index ? g.toNonIndexed() : g)); let n = 0; gs.forEach((g) => { n += g.attributes.position.count; });
  const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3); let o = 0;
  gs.forEach((g) => { pos.set(g.attributes.position.array, o * 3); nor.set(g.attributes.normal.array, o * 3); o += g.attributes.position.count; });
  const out = new THREE.BufferGeometry(); out.setAttribute('position', new THREE.BufferAttribute(pos, 3)); out.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); return out;
}
/* الأشكال المبثوقة (Extrude) غير مفهرسة فتظهر الحواف مضلّعة: نلحم الرؤوس المتطابقة ونُسوّي المتجهات العمودية */
function smoothNormals(g) {
  const p = g.attributes.position, n = p.count, acc = new Map(), key = (i) => `${Math.round(p.getX(i) * 2e3)},${Math.round(p.getY(i) * 2e3)},${Math.round(p.getZ(i) * 2e3)}`;
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), f = new THREE.Vector3();
  for (let i = 0; i < n; i += 3) {
    a.fromBufferAttribute(p, i); b.fromBufferAttribute(p, i + 1); c.fromBufferAttribute(p, i + 2); f.subVectors(c, b).cross(a.clone().sub(b));
    for (let j = 0; j < 3; j++) { const k = key(i + j); const v = acc.get(k); if (v) v.add(f); else acc.set(k, f.clone()); }
  }
  const nor = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const v = acc.get(key(i)).clone().normalize(); nor[i * 3] = v.x; nor[i * 3 + 1] = v.y; nor[i * 3 + 2] = v.z; }
  g.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); return g;
}
/* كبسة بحوافّ مستديرة وتدرّج في الأعلى وتقعير خفيف، قاعدتها على y=0 */
function capGeo(w, lite) {
  const W = w - .09, D = .91, H = .58, bev = .07;
  const g = new THREE.ExtrudeGeometry(rrShape(W, D, .12), { depth: H, bevelEnabled: true, bevelThickness: bev, bevelSize: bev * .9, bevelSegments: lite ? 2 : 4, curveSegments: lite ? 6 : 10 });
  g.rotateX(-Math.PI / 2); const p = g.attributes.position, tot = H + bev * 2;
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i) + bev, t = clamp(y / tot), s = lerp(1, .8, t * t);
    let x = p.getX(i) * s, z = p.getZ(i) * s, yy = y;
    if (t > .9) { const rx = x / (W * .4), rz = z / (D * .4), r2 = Math.min(1, rx * rx + rz * rz); yy -= .05 * (1 - r2) * sm((t - .9) / .1); }
    p.setXYZ(i, x, yy, z);
  }
  return smoothNormals(g);
}
function springGeo(lite) {
  class Helix extends THREE.Curve { getPoint(t, v = new THREE.Vector3()) { const a = t * Math.PI * 2 * 6.5; return v.set(Math.cos(a) * .13, t * .56, Math.sin(a) * .13); } }
  return new THREE.TubeGeometry(new Helix(), lite ? 40 : 78, .021, lite ? 4 : 6, false);
}
function stemGeo() {
  const base = new THREE.CylinderGeometry(.15, .15, .3, 14); base.translate(0, .15, 0);
  const a = new THREE.BoxGeometry(.44, .24, .12); a.translate(0, .42, 0); const b = new THREE.BoxGeometry(.12, .24, .44); b.translate(0, .42, 0);
  return mergeGeos([base, a, b]);
}
function housingTopGeo() {
  const sh = rrShape(.64, .64, .07), hole = rrShape(.5, .5, .04); sh.holes.push(new THREE.Path(hole.getPoints(6)));
  const g = new THREE.ExtrudeGeometry(sh, { depth: .3, bevelEnabled: false, curveSegments: 4 }); g.rotateX(-Math.PI / 2); return g;
}
function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; }

/* أطلس الكتابة على الكبسات: خلية 128 بكسل لكل زر، الرموز مرسومة بالمسار كي لا نعتمد على خط */
function legendAtlas() {
  return canvasTex(2048, 1024, (g) => {
    g.clearRect(0, 0, 2048, 1024); g.fillStyle = '#fff'; g.strokeStyle = '#fff'; g.lineWidth = 8; g.lineCap = 'round'; g.lineJoin = 'round'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.shadowColor = 'rgba(255,150,90,.95)'; g.shadowBlur = 10;
    KEYS.forEach((k) => {
      const cx = (k.idx % 16) * 128 + 64, cy = Math.floor(k.idx / 16) * 128 + 64, L = k.label; g.save(); g.translate(cx, cy);
      if (L === 'ENTER') { g.beginPath(); g.moveTo(34, -34); g.lineTo(34, 8); g.lineTo(-30, 8); g.stroke(); g.beginPath(); g.moveTo(-30, 8); g.lineTo(-8, -10); g.lineTo(-8, 26); g.closePath(); g.fill(); }
      else if (L === 'BACK') { g.beginPath(); g.moveTo(34, 0); g.lineTo(-30, 0); g.stroke(); g.beginPath(); g.moveTo(-36, 0); g.lineTo(-12, -22); g.lineTo(-12, 22); g.closePath(); g.fill(); }
      else if (L === 'SHIFT' || L === 'CAPS') { g.beginPath(); g.moveTo(0, -34); g.lineTo(-26, -2); g.lineTo(-10, -2); g.lineTo(-10, 28); g.lineTo(10, 28); g.lineTo(10, -2); g.lineTo(26, -2); g.closePath(); g.lineWidth = 6; g.stroke(); if (L === 'CAPS') { g.fillRect(-14, 38, 28, 6); } }
      else if (L === 'TAB') { g.beginPath(); g.moveTo(-34, 0); g.lineTo(26, 0); g.stroke(); g.beginPath(); g.moveTo(34, 0); g.lineTo(10, -20); g.lineTo(10, 20); g.closePath(); g.fill(); g.fillRect(40, -24, 7, 48); }
      else { const big = L.length === 1; g.font = `700 ${big ? 74 : L.length > 3 ? 40 : 46}px "Segoe UI", system-ui, -apple-system, Arial, sans-serif`; g.fillText(L, 0, big ? 4 : 2); }
      g.restore();
    });
  });
}
const glowTex = () => canvasTex(128, 128, (g) => { const r = g.createRadialGradient(64, 64, 0, 64, 64, 64); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.35, 'rgba(255,255,255,.35)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, 128, 128); });

export async function createHero({ canvas, lite = false, saveData = false, onReady }) {
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl'); if (!gl) throw new Error('no webgl');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lite, alpha: true, powerPreference: 'high-performance' });
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15; renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.setClearColor(0, 0);
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(30, 1, .05, 80); scene.add(camera);
  let dpr = Math.min(window.devicePixelRatio || 1, lite ? 1.4 : 1.8);
  scene.fog = new THREE.Fog(0x07090d, 14, 34);

  /* بيئة انعكاسات: غرفة مظلمة بألواح ضوء برتقالية وباردة */
  { const s = new THREE.Scene(); s.add(new THREE.Mesh(new THREE.SphereGeometry(60, 24, 12), new THREE.MeshBasicMaterial({ color: 0x0b0d13, side: THREE.BackSide })));
    const panel = (w, h, pos, col, k) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(k), side: THREE.DoubleSide })); m.position.set(...pos); m.lookAt(0, 0, 0); s.add(m); };
    panel(36, 10, [0, 26, 10], 0xffe6d0, 3.4); panel(8, 26, [-26, 8, 8], 0xff7a45, 1.4); panel(8, 26, [26, 8, -6], 0x8fb4ff, 1.5); panel(40, 8, [0, 6, -30], 0xff6a3d, 1.2);
    const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(s, .04).texture; pm.dispose(); scene.environmentIntensity = .9; }
  scene.add(new THREE.HemisphereLight(0x7b8bb0, 0x120b08, .55));
  const key = new THREE.DirectionalLight(0xdfe6ff, 1.1); key.position.set(-6, 12, 8); scene.add(key);
  const rim = new THREE.DirectionalLight(0xff7a45, .95); rim.position.set(8, 5, -9); scene.add(rim);
  const eye = new THREE.PointLight(0xfff0e0, 9, 12, 2); camera.add(eye);

  const M = {
    case: new THREE.MeshStandardMaterial({ color: 0x15171d, metalness: .85, roughness: .38 }),
    lip: new THREE.MeshStandardMaterial({ color: 0x1d2028, metalness: .9, roughness: .3 }),
    plate: new THREE.MeshStandardMaterial({ color: 0x4b505e, metalness: .95, roughness: .34 }),
    pcb: new THREE.MeshStandardMaterial({ color: 0x0f3b33, metalness: .2, roughness: .6, emissive: 0x041a16, emissiveIntensity: .6 }),
    cap: new THREE.MeshPhysicalMaterial({ color: 0x1a1d25, metalness: .1, roughness: .6, clearcoat: .3, clearcoatRoughness: .5 }),
    hbot: new THREE.MeshStandardMaterial({ color: 0x242831, metalness: .2, roughness: .55 }),
    htop: new THREE.MeshStandardMaterial({ color: 0xaec3da, metalness: .1, roughness: .15, transparent: true, opacity: .3, depthWrite: false }),
    stem: new THREE.MeshStandardMaterial({ color: 0xff4b2e, metalness: .1, roughness: .35, emissive: 0x6a1204, emissiveIntensity: .5 }),
    spring: new THREE.MeshStandardMaterial({ color: 0xd9dde6, metalness: 1, roughness: .22 })
  };

  /* ---------------- الجسم: علبة، شفة، لوحة، دارة ---------------- */
  const board = new THREE.Group(); scene.add(board);
  const caseG = new THREE.ExtrudeGeometry(rrShape(16.2, 6.1, .5), { depth: .95, bevelEnabled: true, bevelThickness: .05, bevelSize: .05, bevelSegments: 2, curveSegments: 10 }); caseG.rotateX(-Math.PI / 2);
  const caseM = new THREE.Mesh(caseG, M.case); caseM.position.y = -1.0; board.add(caseM);
  const lipSh = rrShape(16.2, 6.1, .5); lipSh.holes.push(new THREE.Path(rrShape(15.55, 5.45, .32).getPoints(10)));
  const lipG = new THREE.ExtrudeGeometry(lipSh, { depth: .62, bevelEnabled: true, bevelThickness: .03, bevelSize: .03, bevelSegments: 2, curveSegments: 10 }); lipG.rotateX(-Math.PI / 2);
  const lip = new THREE.Mesh(lipG, M.lip); lip.position.y = -.05; board.add(lip);
  const plate = new THREE.Mesh(new THREE.BoxGeometry(15.5, .1, 5.45), M.plate); plate.position.y = -.05; board.add(plate);
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(15.3, .07, 5.25), M.pcb); pcb.position.y = -.2; board.add(pcb);

  /* ---------------- الأجزاء المتكررة (instancing): كل مفتاح له كبسة وساق ونابض وعلبتان وإضاءة ---------------- */
  const NK = KEYS.length, dummy = new THREE.Object3D();
  const inst = (geo, mat, n, order = 0) => { const m = new THREE.InstancedMesh(geo, mat, n); m.instanceMatrix.setUsage(THREE.DynamicDrawUsage); m.frustumCulled = false; m.renderOrder = order; board.add(m); return m; };
  const colors = new Float32Array(NK * 3), colAttr = new THREE.InstancedBufferAttribute(colors, 3); colAttr.setUsage(THREE.DynamicDrawUsage);
  const capMeshes = WIDTHS.map((w) => { const n = KEYS.filter((k) => k.w === w).length; const m = inst(capGeo(w, lite), M.cap, n, 0); m.userData.n = 0; return m; });
  KEYS.forEach((k) => { k.ci = capMeshes[k.cls].userData.n++; });
  const hbot = inst(new THREE.BoxGeometry(.66, .42, .66).translate(0, .21, 0), M.hbot, NK);
  const htop = inst(housingTopGeo(), M.htop, NK, 2);
  const stem = inst(stemGeo(), M.stem, NK);
  const spring = inst(springGeo(lite), M.spring, NK);
  /* ضوء الكتابة والهالة والإضاءة السفلية: ألوانها لكل مفتاح تتغيّر مع الموجة */
  const atlas = legendAtlas(), cells = new Float32Array(NK * 2); KEYS.forEach((k) => { cells[k.idx * 2] = (k.idx % 16) / 16; cells[k.idx * 2 + 1] = 1 - (Math.floor(k.idx / 16) + 1) / 8; });
  const legGeo = new THREE.PlaneGeometry(.66, .66); legGeo.rotateX(-Math.PI / 2); legGeo.setAttribute('aCell', new THREE.InstancedBufferAttribute(cells, 2));
  const legMat = new THREE.MeshBasicMaterial({ map: atlas, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
  legMat.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nattribute vec2 aCell;').replace('#include <uv_vertex>', '#ifdef USE_MAP\n vMapUv = ( mapTransform * vec3( uv * vec2( 0.0625, 0.125 ) + aCell, 1.0 ) ).xy;\n#endif');
  };
  const legends = inst(legGeo, legMat, NK, 4);
  const gtex = glowTex(), glowMat = (o) => new THREE.MeshBasicMaterial({ map: gtex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, opacity: o });
  const under = inst(new THREE.PlaneGeometry(1.7, 1.7).rotateX(-Math.PI / 2), glowMat(1), NK, 1);
  const halo = lite ? null : inst(new THREE.PlaneGeometry(1.35, 1.35).rotateX(-Math.PI / 2), glowMat(.26), NK, 5);
  const led = inst(new THREE.CylinderGeometry(.06, .06, .05, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }), NK, 3);
  [legends, under, halo, led].forEach((m) => { if (m) m.instanceColor = colAttr; });

  /* ظل التماس وهالة الأرضية */
  const shTex = canvasTex(256, 256, (g) => { const r = g.createRadialGradient(128, 128, 20, 128, 128, 126); r.addColorStop(0, 'rgba(0,0,0,.85)'); r.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = r; g.fillRect(0, 0, 256, 256); });
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(26, 14), new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false, toneMapped: false, opacity: .9 })); shadow.rotation.x = -Math.PI / 2; shadow.position.y = -2.4; scene.add(shadow);

  /* ---------------- لقطات الكاميرا ----------------
     الزاوية ثابتة طوال المشهد: من اليسار الأمامي وفوق قليلاً، فتظهر صفوف الأزرار مائلة؛ والذي يتغيّر هو نقطة النظر والمسافة (كلها زوم قريب) */
  const DIR = new THREE.Vector3(-.58, .46, .67).normalize();
  const CK = [
    { p: 0.00, look: [-4.8, 1.0, 0.3], dist: 7.0, fov: 26 },
    { p: 0.12, look: [-2.2, 1.1, 0.2], dist: 6.4, fov: 26 },
    { p: 0.25, look: [-4.8, 1.4, 0.1], dist: 4.3, fov: 24 },
    { p: 0.38, look: [-0.8, 1.4, 0.1], dist: 3.6, fov: 22 },
    { p: 0.46, look: [3.0, 1.4, 0.1], dist: 4.0, fov: 24 },
    { p: 0.55, look: [2.6, 3.0, 0.3], dist: 7.6, fov: 26 },
    { p: 0.66, look: [FOCUS.x, 2.5, FOCUS.z], dist: 5.8, fov: 25 },
    { p: 0.76, look: [FOCUS.x + .8, 1.5, 0.1], dist: 7.0, fov: 27 },
    { p: 0.88, look: [ENTER.x - .3, 1.6, 0.1], dist: 5.2, fov: 25 },
    { p: 1.00, look: [ENTER.x, 1.72, 0.0], dist: 3.4, fov: 21 }
  ];
  const lookCurve = new THREE.CatmullRomCurve3(CK.map((k) => new THREE.Vector3(...k.look)), false, 'centripetal'), tmpB = new THREE.Vector3();
  function sample(p) {
    let i = 0; while (i < CK.length - 2 && p > CK[i + 1].p) i++;
    const a = CK[i], b = CK[i + 1], f = clamp((p - a.p) / (b.p - a.p)), u = (i + f) / (CK.length - 1);
    lookCurve.getPoint(u, tmpB); return { look: tmpB, dist: lerp(a.dist, b.dist, sm(f)), fov: lerp(a.fov, b.fov, sm(f)) };
  }

  /* ---------------- الحالة والحركة ---------------- */
  const state = { p: 0, ps: 0, t: 0, mx: 0, my: 0, active: true, ready: false, dead: false };
  const warm = new THREE.Color(0xff6a3d), hot = new THREE.Color(0xffc08a), white = new THREE.Color(0xfff1de), col = new THREE.Color();
  const pressOf = (k, p) => { let v = 0; for (const [l, ps] of TYPED) if (keyOf(l) === k) v = Math.max(v, sm((p - ps) / .008) * (1 - sm((p - ps - .018) / .014))); if (k === ENTER) v = Math.max(v, sm((p - .965) / .02)); return v; };
  const place = (mesh, i, x, y, z, rx, ry, rz, sx = 1, sy = 1, sz = 1) => { dummy.position.set(x, y, z); dummy.rotation.set(rx, ry, rz); dummy.scale.set(sx, sy, sz); dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix); };
  function animate(p, t) {
    const lift0 = .5, drop0 = .735, layers = sm((p - .545) / .09) * (1 - sm((p - .745) / .07));
    caseM.position.y = -1.0 - 1.5 * layers; lip.position.y = -.05 - .9 * layers; pcb.position.y = -.2 - .7 * layers;
    for (const k of KEYS) {
      const dFocus = Math.hypot(k.x - FOCUS.x, (k.z - FOCUS.z) * 1.4) / 9, dl = dFocus * .06 + k.r1 * .025;
      const eUp = outCubic((p - lift0 - dl) / .1), eDn = sm((p - drop0 - (.08 - dl)) / .07), e = eUp * (1 - eDn);
      const press = pressOf(k, p), pr = press * .24, fl = Math.sin(t * 1.15 + k.r2 * 6.28) * .14 * e;
      const X = k.x, Z = k.z, tilt = (k.r1 - .5) * .55 * e, tiltX = (k.r2 - .5) * .45 * e, spin = (k.r3 - .5) * 1.1 * e;
      /* الكبسة */
      place(capMeshes[k.cls], k.ci, X + (k.r1 - .5) * .7 * e, 1.0 + 3.4 * e + fl - pr, Z + (k.r2 - .5) * .7 * e, tiltX, spin, tilt, 1, 1, 1);
      /* الكتابة والهالة تتبعان الكبسة */
      const topY = 1.0 + 3.4 * e + fl - pr + .745;
      place(legends, k.idx, X + (k.r1 - .5) * .7 * e, topY, Z + (k.r2 - .5) * .7 * e, tiltX, spin, tilt);
      if (halo) place(halo, k.idx, X + (k.r1 - .5) * .7 * e, topY + .06, Z + (k.r2 - .5) * .7 * e, 0, 0, 0, 1, 1, 1);
      /* الأجزاء السفلية: الساق ثم النابض ثم العلبة العلوية، وكلٌّ يصعد أقل من الذي فوقه */
      place(stem, k.idx, X, .62 + 1.95 * e + fl * .5 - pr * .6, Z, 0, spin * .6, 0);
      place(spring, k.idx, X, .1 + 1.12 * e + fl * .25, Z, 0, spin * .4, 0, 1, 1 + .42 * e - pr * .6, 1);
      place(htop, k.idx, X, .42 + .35 * e, Z, 0, 0, 0);
      place(hbot, k.idx, X, .0, Z, 0, 0, 0);
      place(led, k.idx, X, .43, Z - .2, 0, 0, 0);
      place(under, k.idx, X, .12, Z, 0, 0, 0, 1, 1, 1);
      /* ألوان الإضاءة: موجة برتقالية تعبر الكيبورد، ووميض عند الضغط، وأبيض دافئ عند Enter في النهاية */
      const wave = .5 + .5 * Math.sin(k.x * .55 - t * 1.5 + p * 9 + k.z * .4), boost = k === ENTER ? sm((p - .86) / .1) : 0;
      const I = (.34 + .5 * wave) * (1 + e * .5) + press * 1.6 + boost * 1.4;
      col.copy(warm).lerp(hot, clamp(wave * .6 + press)).lerp(white, clamp(boost * .85 + press * .35)).multiplyScalar(I);
      colors[k.idx * 3] = col.r; colors[k.idx * 3 + 1] = col.g; colors[k.idx * 3 + 2] = col.b;
    }
    capMeshes.forEach((m) => { m.instanceMatrix.needsUpdate = true; });
    [hbot, htop, stem, spring, legends, under, led].forEach((m) => { m.instanceMatrix.needsUpdate = true; }); if (halo) halo.instanceMatrix.needsUpdate = true; colAttr.needsUpdate = true;
  }

  /* ---------------- الحجم ---------------- */
  let W = 1, H = 1;
  function resize() {
    W = canvas.clientWidth || innerWidth; H = canvas.clientHeight || innerHeight; renderer.setPixelRatio(dpr); renderer.setSize(W, H, false); camera.aspect = W / H;
    const asp = W / H; camera.userData.f = Math.max(1, 1.5 / asp) * lerp(1, .78, clamp((1.15 - asp) / .5));
    const land = asp > 1.15; camera.setViewOffset(W, H, land ? -W * .17 : 0, land ? 0 : H * .2, W, H); camera.updateProjectionMatrix();
  }
  resize();

  /* ---------------- حلقة الرسم ---------------- */
  let raf = 0, last = 0, ft = [];
  const onMove = (e) => { state.mx = e.clientX / innerWidth - .5; state.my = e.clientY / innerHeight - .5; };
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) addEventListener('pointermove', onMove, { passive: true });
  function frame(now) {
    raf = 0; if (!state.active) return; raf = requestAnimationFrame(frame);
    const dt = Math.min(.05, (now - last) / 1000 || .016); last = now; state.t += dt; const t = state.t;
    state.ps += (state.p - state.ps) * (1 - Math.exp(-dt * 6.5)); const p = state.ps, s = sample(p);
    const f = camera.userData.f || 1;
    const d = s.dist * f; camera.position.set(s.look.x + DIR.x * d + state.mx * .5, s.look.y + DIR.y * d - state.my * .3, s.look.z + DIR.z * d);
    camera.lookAt(s.look); if (Math.abs(camera.fov - s.fov) > .01) { camera.fov = s.fov; camera.updateProjectionMatrix(); }
    animate(p, t); renderer.render(scene, camera);
    if (!state.ready) { state.ready = true; requestAnimationFrame(() => { if (!state.dead) onReady && onReady(); }); }
    ft.push(dt); if (ft.length >= 60) { const a = ft.reduce((x, y) => x + y, 0) / ft.length; ft.length = 0; if (a > .021 && dpr > 1) { dpr = Math.max(1, dpr - .25); resize(); } }
  }

  const api = {
    setProgress(p) { state.p = clamp(p); },
    setActive(on) { if (on === state.active && (raf || !on)) return; state.active = on; if (on) { last = performance.now(); raf = raf || requestAnimationFrame(frame); } },
    setChat() { },
    resize,
    /* يحرّر كل شيء (سياق WebGL والقوام والأشكال) حين يبتعد الزائر عن الهيرو كثيراً */
    dispose() {
      state.dead = true; state.active = false; cancelAnimationFrame(raf); raf = 0; removeEventListener('pointermove', onMove);
      atlas.dispose(); gtex.dispose(); shTex.dispose();
      scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); const m = o.material; if (m) (Array.isArray(m) ? m : [m]).forEach((x) => x.dispose()); if (o.dispose && o.isInstancedMesh) o.dispose(); });
      scene.environment && scene.environment.dispose(); renderer.dispose(); renderer.forceContextLoss(); if (window.__hero === api) window.__hero = null;
    }
  };
  state.ps = state.p; animate(0, 0); raf = requestAnimationFrame(frame); window.__hero = api;
  return api;
}
