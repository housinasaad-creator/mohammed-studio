/* بطاقة المشروع: مقطع قصير يعمل عند ظهوره (يُحمَّل ويتوقف حسب الشاشة)، زر «افتح الموقع» وزر «المزيد» لصفحة الشرح */
import { esc, href, ICON } from './shared.js';

export function workCard(w, t, i = 0) {
  const [name, who, desc] = t.works.items[w.id];
  const more = href('work.html', { id: w.id });
  const badge = w.wip ? `<span class="wipb">${esc(t.works.wip)}</span>` : w.group === 'real' ? `<span class="realb">${esc(t.case.real)}</span>` : '';
  const media = `<video muted loop playsinline preload="none" disablepictureinpicture width="960" height="600" poster="assets/shots/${w.id}-d.webp" data-src="assets/clips/${w.id}.mp4" aria-hidden="true"></video><span class="ph"><img src="assets/shots/${w.id}-m.webp" width="330" height="715" alt="" loading="lazy" decoding="async"></span>${badge}`;
  return `<article class="work rv" style="--d:${(i % 2) * .08}s"><a class="shot" href="${esc(more)}" aria-label="${esc(name)} · ${esc(t.works.more)}">${media}</a>`
    + `<div class="body"><p class="who">${esc(who)}</p><h4>${esc(name)}</h4><p>${esc(desc)}</p><div class="tags">${w.tags.map((x) => `<span>${esc(x)}</span>`).join('')}</div>`
    + `<div class="wbtns"><a class="btn btn-sm" href="${esc(w.url)}" target="_blank" rel="noopener">${esc(t.works.open)}<span class="bi">${ICON.ext}</span></a><a class="btn btn-sm btn-line" href="${esc(more)}">${esc(t.works.more)}<span class="bi">${ICON.arrow}</span></a></div></div></article>`;
}
