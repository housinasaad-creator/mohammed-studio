/* مشترك بين صفحات الاستوديو: اللغة، الرأس والتذييل، زرّا واتساب والصعود، وتحميل الوسائط عند ظهورها فقط. بلا مكتبات. */
import { CONFIG, T } from './content.js';

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const store = { get(k, d) { try { return localStorage.getItem(k) ?? d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* محجوب */ } } };
export const root = document.documentElement;
export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const saveData = !!(navigator.connection && navigator.connection.saveData);
export const LANGS = Object.keys(T);
root.classList.add('js');

export let lang = 'ar';
{ const q = new URLSearchParams(location.search).get('lang'), s = store.get('ms-lang', ''); lang = T[q] ? q : T[s] ? s : CONFIG.DEFAULT_LANG; }
export const tr = () => T[lang];

/* رابط داخلي يحمل اللغة الحالية (يعمل حتى لو حُجب التخزين المحلي) */
export function href(page, params = {}, hash = '') {
  const q = new URLSearchParams({ ...params, lang }); return `${page}?${q}${hash ? '#' + hash : ''}`;
}
export const waUrl = (msg) => `https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export const ICON = {
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/><path fill="#16a34a" stroke="#16a34a" stroke-width="1.2" stroke-linejoin="round" transform="translate(5.7 5.5) scale(.5)" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
  li: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v6M8 7.5v.01M12 17v-6M12 13.5c0-1.6 1.2-2.5 2.6-2.5S17 11.9 17 13.5V17"/></svg>',
  up: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5.5 11.5L12 5l6.5 6.5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  ext: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
};

const NAV = [['works', 'projects.html', ''], ['why', 'index.html', 'why'], ['services', 'index.html', 'services'], ['about', 'index.html', 'about'], ['contact', 'index.html', 'contact']];

/* الرأس يُبنى مرة واحدة (كي لا يُقطع انزلاق مبدّل اللغة)، وتُحدَّث نصوصه عند تبديل اللغة */
function buildHeader() {
  $('#hdr').innerHTML = `<div class="wrap hdr-in">
    <a class="logo" id="logo" href="index.html" aria-label="MOHAMMED"><img class="logo-mark" src="assets/logo-mark.png" width="217" height="128" alt=""><span class="logo-t"><b>MOHAMMED</b><small>Web Studio</small></span></a>
    <nav class="nav" id="nav" aria-label="main"></nav>
    <div class="hdr-r">
      <div class="langs" id="langs" role="group" aria-label="Language"><i class="thumb"></i>${LANGS.map((k) => `<button type="button" data-l="${k}" lang="${k}" aria-label="${esc(T[k].name)}">${T[k].code}</button>`).join('')}</div>
      <a class="btn btn-sm hdr-cta" id="hdrCta" href="#"></a>
      <button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="nav"><i></i><i></i><i></i></button>
    </div>
  </div><i class="prog" id="prog" aria-hidden="true"></i>`;
}
function labelHeader(active) {
  const t = tr();
  $('#logo').href = href('index.html');
  $('#nav').innerHTML = NAV.map(([k, p, h]) => `<a href="${esc(href(p, {}, h))}" data-k="${k}"${k === active ? ' class="on" aria-current="page"' : ''}>${esc(t.nav[k])}</a>`).join('') + `<a class="btn nav-cta" href="${esc(href('index.html', {}, 'contact'))}">${esc(t.cta)}</a>`;
  const c = $('#hdrCta'); c.textContent = t.cta; c.href = href('index.html', {}, 'contact');
  $('#menuBtn').setAttribute('aria-label', t.menu);
}

function buildFooter() {
  const t = tr(), c = t.contact;
  $('#ftr').innerHTML = `<div class="wrap ftr-in"><div class="ftr-l"><b>${esc(CONFIG.BRAND)}</b><span>${esc(t.footer.tag)}</span></div>
    <div class="ftr-soc">${CONFIG.WA_NUMBER ? `<a href="${esc(waUrl(c.waMsg))}" target="_blank" rel="noopener" aria-label="WhatsApp"><span class="ico-wa">${ICON.wa}</span></a>` : ''}<a href="${esc(CONFIG.INSTAGRAM)}" target="_blank" rel="noopener" aria-label="${esc(c.instagram)}">${ICON.ig}</a><a href="${esc(CONFIG.LINKEDIN)}" target="_blank" rel="noopener" aria-label="${esc(c.linkedin)}">${ICON.li}</a></div>
    <p>${[`© ${CONFIG.YEAR} ${CONFIG.BRAND}`, t.footer.rights, `${t.footer.credit} ${CONFIG.CREDIT}`].map((x) => `<span>${esc(x)}</span>`).join(' · ')}</p></div>`;
}

function buildFabs(hideAt) {
  const t = tr(), c = t.contact;
  const wa = CONFIG.WA_NUMBER ? `<a class="wa-fab" href="${esc(waUrl(c.waMsg))}" target="_blank" rel="noopener" aria-label="${esc(c.wa)}"><span class="wa-tip" aria-hidden="true">${esc(c.waTip)}</span><span class="wa-ico">${ICON.wa}</span></a>` : '';
  $('#waFab').innerHTML = `<button type="button" class="up-fab" id="upFab" aria-label="${esc(t.up)}" tabindex="-1">${ICON.up}</button>${wa}`;
  $('#upFab').addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
  $('#waFab').classList.toggle('no-wa', !CONFIG.WA_NUMBER);
  syncUp();
}
function syncUp() {
  const b = $('#upFab'); if (!b) return; const on = scrollY > 700; b.classList.toggle('show', on); b.tabIndex = on ? 0 : -1;
}

/* مبدّل اللغة: قرص مرجاني بنابض، حرف يُقلَب، وصفحة تتبدّل بدائرة تتسع من مكان الضغط (View Transitions إن وُجدت) */
function syncLangs(flip) {
  $('#langs').style.setProperty('--i', LANGS.indexOf(lang));
  $$('#langs button').forEach((b) => {
    const on = b.dataset.l === lang; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on);
    if (on && flip) { b.classList.remove('flip'); void b.offsetWidth; b.classList.add('flip'); }
  });
}

/* observer واحد لإظهار العناصر .rv عند الوصول إليها */
let rvio = null;
export function reveal(scope = document) {
  const els = $$('.rv:not(.in)', scope); if (!els.length) return;
  if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
  rvio = rvio || new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); rvio.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .06 });
  els.forEach((e) => rvio.observe(e));
}

/* وسائط لا تُحمَّل إلا حين تقترب: الفيديو يُحمَّل ويشتغل عند ظهوره، ويتوقف خارج الشاشة، ويُفرَّغ إن ابتعد كثيراً. مع تقليل الحركة أو توفير البيانات يبقى الغلاف الثابت فقط */
let vio = null, vfar = null;
export function lazyMedia(scope = document) {
  const vids = $$('video[data-src]:not([data-lm])', scope); if (!vids.length) return;
  if (reduced || saveData || !('IntersectionObserver' in window)) { vids.forEach((v) => { v.dataset.lm = 'off'; }); return; }
  vio = vio || new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target; v.__in = e.isIntersecting;
    if (e.isIntersecting && !document.hidden) { if (!v.getAttribute('src')) v.src = v.dataset.src; if (!v.dataset.hold) v.play().catch(() => {}); } else v.pause();
  }), { threshold: .25 });
  vfar = vfar || new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target; if (!e.isIntersecting && v.getAttribute('src')) { v.pause(); v.removeAttribute('src'); v.load(); }
  }), { rootMargin: '160% 0px' });
  vids.forEach((v) => { v.dataset.lm = '1'; vio.observe(v); vfar.observe(v); });
}
document.addEventListener('visibilitychange', () => $$('video[data-lm="1"]').forEach((v) => { if (document.hidden) v.pause(); else if (v.__in && v.getAttribute('src') && !v.dataset.hold) v.play().catch(() => {}); }));

/* shell: يرسم الرأس والتذييل والأزرار العائمة ويربط تبديل اللغة. render(t, lang, instant) يُستدعى للمحتوى، title(t) لعنوان الصفحة */
export function shell({ active = '', render, title, hideFabAt = '', spy = [] }) {
  buildHeader(); labelHeader(active); buildFooter(); buildFabs();
  const apply = (instant) => {
    const t = tr(); root.lang = t.lang; root.dir = t.dir;
    document.title = title ? title(t) : t.title;
    const md = $('meta[name="description"]'); md && (md.content = t.desc);
    $('#skip').textContent = t.skip;
    labelHeader(active); buildFooter(); buildFabs(); watchFab(hideFabAt);
    render && render(t, lang, instant);
    if (instant) $$('.rv').forEach((e) => { const r = e.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) e.classList.add('in'); });
    reveal(); lazyMedia();
  };
  const setLang = (k, btn) => {
    if (k === lang) return;
    const go = () => {
      lang = k; store.set('ms-lang', lang);
      const u = new URL(location.href); u.searchParams.set('lang', lang); history.replaceState(null, '', u);
      apply(true); syncLangs(true);
    };
    const r = btn.getBoundingClientRect(); root.style.setProperty('--vx', `${Math.round(r.left + r.width / 2)}px`); root.style.setProperty('--vy', `${Math.round(r.top + r.height / 2)}px`);
    if (document.startViewTransition && !reduced) { const vt = document.startViewTransition(go); vt.finished.catch(() => {}); } else go();
  };
  $('#langs').addEventListener('click', (e) => { const b = e.target.closest('button'); b && setLang(b.dataset.l, b); });
  const hdr = $('#hdr'), mb = $('#menuBtn'), setMenu = (on) => { hdr.classList.toggle('open', on); mb.setAttribute('aria-expanded', on); };
  mb.addEventListener('click', () => setMenu(!hdr.classList.contains('open')));
  $('#nav').addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  addEventListener('resize', () => { if (innerWidth > 900) setMenu(false); }, { passive: true });

  /* شريط التقدّم وزر الصعود */
  const bar = $('#prog'); let raf = 0;
  const tick = () => { raf = 0; const h = root.scrollHeight - innerHeight; bar.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`; syncUp(); };
  addEventListener('scroll', () => { raf = raf || requestAnimationFrame(tick); }, { passive: true });

  /* تمييز بند القائمة حسب القسم الظاهر (للصفحة الرئيسية) */
  if (spy.length && 'IntersectionObserver' in window) {
    const so = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) $$('#nav a[data-k]').forEach((a) => a.classList.toggle('on', a.dataset.k === en.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
    spy.forEach((id) => { const e = $('#' + id); e && so.observe(e); });
  }
  setTimeout(() => $$('.rv').forEach((e) => e.classList.add('in')), 5000);
  apply(false); syncLangs(false); tick();
}

/* زر واتساب العائم يختفي عند قسم التواصل (فيه زر واتساب أصلاً) */
let fabIo = null;
function watchFab(id) {
  fabIo && fabIo.disconnect(); fabIo = null;
  const el = id && $('#' + id); if (!el || !('IntersectionObserver' in window)) return;
  fabIo = new IntersectionObserver(([e]) => $('#waFab').classList.toggle('hide-wa', e.isIntersecting), { threshold: .25 }); fabIo.observe(el);
}
