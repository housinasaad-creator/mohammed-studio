/* صفحة تعريف الاستوديو: عرض الأعمال بلغتين. بلا مكتبات؛ المحتوى مرئي حتى لو تعطّل المراقب. */
import { CONFIG, WORKS, T } from './content.js';

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = { get(k, d) { try { return localStorage.getItem(k) ?? d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* محجوب */ } } };
document.documentElement.classList.add('js');

let lang = 'ar';
{ const q = new URLSearchParams(location.search).get('lang'), s = store.get('ms-lang', ''); lang = T[q] ? q : T[s] ? s : CONFIG.DEFAULT_LANG; }

function card(w, i, t) {
  const [name, who, desc] = t.works.items[w.id], hasMob = true;
  const img = `<img src="assets/shots/${w.id}-d.webp" width="960" height="600" alt="${esc(name)}" loading="lazy" decoding="async">`;
  const ph = hasMob ? `<span class="ph"><img src="assets/shots/${w.id}-m.webp" width="330" height="715" alt="" loading="lazy" decoding="async"></span>` : '';
  const shot = w.url ? `<a class="shot" href="${esc(w.url)}" target="_blank" rel="noopener" aria-label="${esc(name)}">${img}${ph}</a>` : `<div class="shot">${img}${ph}</div>`;
  const btn = w.url ? `<a class="btn btn-sm" href="${esc(w.url)}" target="_blank" rel="noopener">${esc(t.works.open)}</a>` : `<span class="note">${esc(t.works.shots)}</span>`;
  return `<article class="work rv" style="--d:${(i % 2) * .08}s">${shot}<div class="body"><p class="who">${esc(who)}</p><h4>${esc(name)}</h4><p>${esc(desc)}</p><div class="tags">${w.tags.map((x) => `<span>${esc(x)}</span>`).join('')}</div>${btn}</div></article>`;
}

function render() {
  const t = T[lang], html = document.documentElement;
  html.lang = t.lang; html.dir = t.dir; document.title = t.title;
  const md = $('meta[name="description"]'); md && (md.content = t.desc);
  $('#skip').textContent = t.skip;
  $('#nav').innerHTML = ['works', 'about', 'services', 'process', 'contact'].map((k) => `<a href="#${k}" data-k="${k}">${esc(t.nav[k])}</a>`).join('');
  $('#lang').textContent = t.switchTo; $('#lang').setAttribute('aria-label', t.switchTo); $('#hdrCta').textContent = t.cta;
  const h = t.hero;
  $('#hBadge').textContent = h.badge; $('#h1a').textContent = h.h1a; $('#h1b').textContent = h.h1b; $('#hSub').textContent = h.sub;
  $('#chat').innerHTML = `<div class="bub me">${esc(h.chat[0])}<i class="ticks"></i></div><div class="typing"><b></b><b></b><b></b></div><div class="bub you">${esc(h.chat[1])}</div>`;
  $('#hCta').textContent = t.cta; $('#hCta2').textContent = h.cta2; $('#hFacts').innerHTML = h.facts.map((f) => `<li>${esc(f)}</li>`).join('');
  const w = t.works, vis = WORKS.filter((x) => !x.hidden);
  $('#wKicker').textContent = w.kicker; $('#wH2').textContent = w.h2; $('#gClient').textContent = w.client; $('#gShow').textContent = w.showcase;
  $('#wClient').innerHTML = vis.filter((x) => x.group === 'client').map((x, i) => card(x, i, t)).join('');
  $('#wShow').innerHTML = vis.filter((x) => x.group === 'showcase').map((x, i) => card(x, i, t)).join('');
  $('#gClient').hidden = !$('#wClient').children.length; $('#wClient').hidden = $('#gClient').hidden;
  const ab = t.about; $('#aKicker').textContent = ab.kicker; $('#aH2').textContent = ab.h2; $('#aText').innerHTML = ab.p.map((x) => `<p>${esc(x)}</p>`).join('');
  $('#aName').textContent = CONFIG.CREDIT; $('#aRole').textContent = ab.role; $('#aChips').innerHTML = ab.chips.map((x) => `<span>${esc(x)}</span>`).join('');
  const s = t.services; $('#sKicker').textContent = s.kicker; $('#sH2').textContent = s.h2;
  $('#sList').innerHTML = s.items.map(([n, d], i) => `<li class="rv" style="--d:${i * .06}s"><h3>${esc(n)}</h3><p>${esc(d)}</p></li>`).join('');
  const p = t.process; $('#pKicker').textContent = p.kicker; $('#pH2').textContent = p.h2;
  $('#pList').innerHTML = p.items.map(([n, d], i) => `<li class="rv" style="--d:${i * .07}s"><h3>${esc(n)}</h3><p>${esc(d)}</p></li>`).join('');
  const c = t.contact; $('#cKicker').textContent = c.kicker; $('#cH2').textContent = c.h2; $('#cLead').textContent = c.lead;
  const waUrl = `https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(c.waMsg)}`;
  const wa = CONFIG.WA_NUMBER ? `<a class="btn btn-lg" href="${waUrl}" target="_blank" rel="noopener">${esc(c.wa)}</a>` : '';
  $('#cBtns').innerHTML = `${wa}<a class="btn btn-lg${wa ? ' btn-line' : ''}" href="${esc(CONFIG.LINKEDIN)}" target="_blank" rel="noopener">${esc(c.linkedin)}</a>`;
  /* الرقم عنصر مستقل بـdir=ltr كي لا ينعكس داخل فقرة عربية */
  const waIco = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/><path fill="#16a34a" stroke="#16a34a" stroke-width="1.2" stroke-linejoin="round" transform="translate(5.7 5.5) scale(.5)" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
  $('#waFab').innerHTML = CONFIG.WA_NUMBER ? `<a class="wa-fab" href="${waUrl}" target="_blank" rel="noopener" aria-label="${esc(c.wa)}"><span class="wa-tip" aria-hidden="true">${esc(c.waTip)}</span><span class="wa-ico">${waIco}</span></a>` : '';
  const tk = t.ticker.map((x) => `<span>${esc(x)}</span>`).join(''); $('#tkTrack').innerHTML = tk + tk;
  $('#cTel').innerHTML = CONFIG.WA_NUMBER ? `<a dir="ltr" href="${waUrl}" target="_blank" rel="noopener">${esc(CONFIG.WA_SHOW)}</a>` : '';
  $('#fBrand').textContent = CONFIG.BRAND; $('#fTag').textContent = t.footer.tag;
  /* ثلاث جمل منفصلة كي لا تختلط الكتل العربية واللاتينية في سطر واحد */
  $('#fCredit').innerHTML = [`© ${CONFIG.YEAR} ${CONFIG.BRAND}`, t.footer.rights, `${t.footer.credit} ${CONFIG.CREDIT}`].map((x) => `<span>${esc(x)}</span>`).join(' · ');
  observe();
}

let io = null;
function observe() {
  const els = $$('.rv:not(.in)'); if (!els.length) return;
  if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
  io = io || new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .06 });
  els.forEach((e) => io.observe(e));
}
setTimeout(() => $$('.rv').forEach((e) => e.classList.add('in')), 4500);

$('#lang').addEventListener('click', () => {
  lang = lang === 'ar' ? 'en' : 'ar'; store.set('ms-lang', lang);
  const u = new URL(location.href); u.searchParams.set('lang', lang); history.replaceState(null, '', u); render();
});
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) $$('#nav a').forEach((a) => a.classList.toggle('on', a.dataset.k === en.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  ['works', 'about', 'services', 'process', 'contact'].forEach((id) => spy.observe($('#' + id)));
}
render();

/* حركة الخلفية خفيفة: تتوقف حين تخرج من الشاشة، وشريط تقدّم التمرير، واختفاء زر واتساب العائم عند قسم التواصل (فيه زر واتساب أصلاً) */
if ('IntersectionObserver' in window) {
  const pauseOff = (el) => new IntersectionObserver(([e]) => el.classList.toggle('off', !e.isIntersecting), { rootMargin: '120px' }).observe(el);
  pauseOff($('#fx')); pauseOff($('#ticker'));
  new IntersectionObserver(([e]) => $('#waFab').classList.toggle('hide', e.isIntersecting), { threshold: .25 }).observe($('#contact'));
}
{
  const bar = $('#prog'); let raf = 0;
  const tick = () => { raf = 0; const h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`; };
  addEventListener('scroll', () => { raf = raf || requestAnimationFrame(tick); }, { passive: true }); tick();
}

/* ميلان ثلاثي الأبعاد للأجهزة يتبع المؤشر (الشاشات التي فيها مؤشر فقط، ويتوقف مع تقليل الحركة) */
if (matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const hero = $('#top'), vis = $('#vis'); let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  const loop = () => {
    cx += (tx - cx) * .09; cy += (ty - cy) * .09;
    vis.style.setProperty('--ry', `${(cx * 15).toFixed(2)}deg`); vis.style.setProperty('--rx', `${(-cy * 11).toFixed(2)}deg`); vis.style.setProperty('--gx', (50 + cx * 70).toFixed(1));
    raf = Math.abs(tx - cx) > .001 || Math.abs(ty - cy) > .001 ? requestAnimationFrame(loop) : 0;
  };
  const go = () => { raf = raf || requestAnimationFrame(loop); };
  hero.addEventListener('pointermove', (e) => { const r = hero.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width - .5; ty = (e.clientY - r.top) / r.height - .5; go(); });
  hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; go(); });
}
