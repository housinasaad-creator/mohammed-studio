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
  $('#nav').innerHTML = ['works', 'services', 'process', 'contact'].map((k) => `<a href="#${k}" data-k="${k}">${esc(t.nav[k])}</a>`).join('');
  $('#lang').textContent = t.switchTo; $('#lang').setAttribute('aria-label', t.switchTo); $('#hdrCta').textContent = t.cta;
  const h = t.hero;
  $('#hBadge').textContent = h.badge; $('#h1a').textContent = h.h1a; $('#h1b').textContent = h.h1b; $('#hSub').textContent = h.sub;
  $('#hCta').textContent = t.cta; $('#hCta2').textContent = h.cta2; $('#hFacts').innerHTML = h.facts.map((f) => `<li>${esc(f)}</li>`).join('');
  const w = t.works, vis = WORKS.filter((x) => !x.hidden);
  $('#wKicker').textContent = w.kicker; $('#wH2').textContent = w.h2; $('#gClient').textContent = w.client; $('#gShow').textContent = w.showcase;
  $('#wClient').innerHTML = vis.filter((x) => x.group === 'client').map((x, i) => card(x, i, t)).join('');
  $('#wShow').innerHTML = vis.filter((x) => x.group === 'showcase').map((x, i) => card(x, i, t)).join('');
  $('#gClient').hidden = !$('#wClient').children.length; $('#wClient').hidden = $('#gClient').hidden;
  const s = t.services; $('#sKicker').textContent = s.kicker; $('#sH2').textContent = s.h2;
  $('#sList').innerHTML = s.items.map(([n, d], i) => `<li class="rv" style="--d:${i * .06}s"><h3>${esc(n)}</h3><p>${esc(d)}</p></li>`).join('');
  const p = t.process; $('#pKicker').textContent = p.kicker; $('#pH2').textContent = p.h2;
  $('#pList').innerHTML = p.items.map(([n, d], i) => `<li class="rv" style="--d:${i * .07}s"><h3>${esc(n)}</h3><p>${esc(d)}</p></li>`).join('');
  const c = t.contact; $('#cKicker').textContent = c.kicker; $('#cH2').textContent = c.h2; $('#cLead').textContent = c.lead;
  const wa = CONFIG.WA_NUMBER ? `<a class="btn btn-lg" href="https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(c.waMsg)}" target="_blank" rel="noopener">${esc(c.wa)}</a>` : '';
  $('#cBtns').innerHTML = `<a class="btn btn-lg" href="${esc(CONFIG.LINKEDIN)}" target="_blank" rel="noopener">${esc(c.linkedin)}</a>${wa}`;
  $('#fBrand').textContent = CONFIG.BRAND; $('#fTag').textContent = t.footer.tag;
  $('#fCredit').textContent = `© ${CONFIG.YEAR} ${CONFIG.BRAND}. ${t.footer.rights}. ${t.footer.credit} ${CONFIG.CREDIT}.`;
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
  ['works', 'services', 'process', 'contact'].forEach((id) => spy.observe($('#' + id)));
}
render();
