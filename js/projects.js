/* صفحة «مشاريعي»: كل الأعمال بمجموعتين (حقيقية / نماذج) مع تصفية، وكل بطاقة بمقطع قصير يعمل عند ظهورها فقط */
import { CONFIG, WORKS } from './content.js';
import { $, $$, esc, shell, href, waUrl, ICON, lazyMedia } from './shared.js';
import { workCard } from './cards.js';

let filter = 'all';
function applyFilter() {
  const f = filter;
  $('#gReal').hidden = $('#wReal').hidden = f === 'show'; $('#gShow').hidden = $('#wShow').hidden = f === 'real';
  $$('#pFilters button').forEach((b) => { const on = b.dataset.f === f; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
  lazyMedia(); $$('.pgrid .rv:not(.in)').forEach((e) => { const r = e.getBoundingClientRect(); if (r.top < innerHeight) e.classList.add('in'); });
}
function render(t) {
  const w = t.works, vis = WORKS.filter((x) => !x.hidden), real = vis.filter((x) => x.group === 'real'), show = vis.filter((x) => x.group === 'show');
  $('#pBack').innerHTML = `<span class="bi">${ICON.back}</span>${esc(t.list.back)}`; $('#pBack').href = href('index.html');
  $('#pKick').textContent = w.kicker; $('#pH1').textContent = w.h2; $('#pLead').textContent = w.lead;
  const counts = { all: vis.length, real: real.length, show: show.length };
  $('#pFilters').innerHTML = ['all', 'real', 'show'].map((k) => `<button type="button" data-f="${k}">${esc(w.filters[k])}<b>${counts[k]}</b></button>`).join('');
  $('#gReal').textContent = w.groups.real; $('#gShow').textContent = w.groups.show;
  $('#wReal').innerHTML = real.map((x, i) => workCard(x, t, i)).join(''); $('#wShow').innerHTML = show.map((x, i) => workCard(x, t, i)).join('');
  const c = t.contact, cs = t.case; $('#cKicker').textContent = c.kicker; $('#cH2').textContent = cs.ctaT; $('#cLead').textContent = cs.ctaP;
  const wu = waUrl(c.waMsg);
  $('#cBtns').innerHTML = (CONFIG.WA_NUMBER ? `<a class="btn btn-lg" href="${esc(wu)}" target="_blank" rel="noopener"><span class="bi ico-wa">${ICON.wa}</span>${esc(c.wa)}</a>` : '')
    + `<a class="btn btn-lg btn-line" href="${esc(CONFIG.INSTAGRAM)}" target="_blank" rel="noopener"><span class="bi">${ICON.ig}</span><span dir="ltr">${esc(CONFIG.INSTAGRAM_SHOW)}</span></a>`
    + `<a class="btn btn-lg btn-line" href="${esc(CONFIG.LINKEDIN)}" target="_blank" rel="noopener"><span class="bi">${ICON.li}</span>${esc(c.linkedin)}</a>`;
  $('#cTel').innerHTML = CONFIG.WA_NUMBER ? `<a dir="ltr" href="${esc(wu)}" target="_blank" rel="noopener">${esc(CONFIG.WA_SHOW)}</a>` : '';
  applyFilter();
}
$('#pFilters').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; filter = b.dataset.f; applyFilter(); });
shell({ active: 'works', render, title: (t) => `${t.works.kicker} · MOHAMMED`, hideFabAt: 'contact' });
