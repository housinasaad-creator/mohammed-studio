/* قسم «ما نقدّمه»: قائمة خمس خدمات على اليسار ولوحة على اليمين ترسم الخدمة المختارة بحركة صغيرة بلا كلمات (صفحة تتمرّر، موقع بعدة صفحات، متجر تصله رسالته على واتساب، مجسّم ثلاثي الأبعاد، حجز موعد). تتبدّل وحدها كل ست ثوانٍ حتى يضغط الزائر، ولا تتحرك إلا وهي ظاهرة. */
import { $, $$, esc, reduced } from './shared.js';

const X = (cls, l, t, w, h, inner = '', extra = '') => `<b class="x ${cls}" style="--l:${l};--t:${t};--w:${w};--h:${h};${extra}">${inner}</b>`;
const WIN = (body) => `<div class="bw"><div class="bar"><i></i><i></i><i></i><b></b></div><div class="bc">${body}</div></div>`;

function sceneLanding() {
  const cards = [0, 1, 2].map((i) => X('w', 5 + i * 31.5, 32, 28, 8, X('c r o', 12, 22, 22) + X('gd', 12, 62, 70, 10) + X('g', 12, 80, 46, 8))).join('');
  return `<div class="sc sc-a">${WIN(`<div class="pg">${X('k z', 0, 0, 100, 4.2)}${X('c r o', 3, .8, 4)}${X('ik r', 14, 1.5, 10, 1.2)}${X('ik r', 27, 1.5, 12, 1.2)}${X('ik r', 42, 1.5, 9, 1.2)}${X('c r', 80, 1, 16, 2.2)}
    ${X('k', 5, 8, 50, 3.2)}${X('k', 5, 12.2, 38, 3.2)}${X('gd', 5, 17.4, 46, 1.2)}${X('gd', 5, 19.6, 34, 1.2)}${X('c r', 5, 23, 22, 3.2)}${X('hv', 60, 7, 36, 19)}
    ${cards}${X('c', 5, 46, 90, 10, X('k r', 8, 38, 30, 24))}${X('p', 5, 60, 43, 10)}${X('p', 52, 60, 43, 10)}${X('g', 5, 73, 60, 1.2)}${X('g', 5, 75.4, 52, 1.2)}${X('g', 5, 77.8, 58, 1.2)}${X('k z', 0, 92, 100, 8)}</div>
    <i class="sbar"><u></u></i>`)}</div>`;
}
function sceneSite() {
  const pills = [30, 46, 62, 78].map((l, i) => X(`pl r p${i + 1}`, l, 4.8, 13, 3.4)).join('');
  const pg1 = X('hv', 0, 0, 44, 100) + X('k', 50, 6, 46, 10) + X('k', 50, 20, 34, 10) + X('gd', 50, 40, 44, 4) + X('gd', 50, 48, 40, 4) + X('gd', 50, 56, 36, 4) + X('c r', 50, 72, 24, 14);
  const pg2 = [0, 1, 2].map((i) => X('w', i * 34, 8, 30, 84, X('c r o', 14, 12, 30) + X('gd', 14, 50, 72, 7) + X('g', 14, 64, 56, 7) + X('g', 14, 78, 40, 7))).join('');
  const sq = ['c', 'k', 'bl', 'm', 'y', 'gd'].map((k, i) => X(k, (i % 3) * 34, Math.floor(i / 3) * 52, 30, 46)).join('');
  const pg4 = X('w', 0, 6, 56, 16) + X('w', 0, 28, 56, 16) + X('w', 0, 50, 56, 30) + X('c r', 0, 86, 24, 12) + X('k', 64, 6, 36, 74, X('c r o', 38, 32, 24) + X('ik z', 12, 14, 76, 4, '', 'border-radius:2px') + X('ik z', 12, 80, 50, 4, '', 'border-radius:2px'));
  return `<div class="sc sc-b">${WIN(`${X('k z', 0, 0, 100, 13)}${X('c r o', 3, 2.2, 6)}${pills}<div class="pgs g1">${pg1}</div><div class="pgs g2">${pg2}</div><div class="pgs g3">${sq}</div><div class="pgs g4">${pg4}</div>`)}</div>`.replace('</div>`', '</div>') + '</div>';
}
function sceneStore() {
  const tint = ['#ffe1d6', '#dbe8ff', '#d6f3e6', '#fff0cc'], shapes = [X('c r o', 30, 18, 40), X('bl', 30, 22, 40, 56, '', 'transform:rotate(45deg) scale(.7);height:auto;aspect-ratio:1;border-radius:6px'), X('m', 24, 20, 52, 60, '', 'clip-path:polygon(50% 0,100% 100%,0 100%);height:auto;aspect-ratio:1.1'), X('y r o', 30, 20, 40)];
  const prod = [[4, 19], [52, 19], [4, 60], [52, 60]].map(([l, t], i) => X('w', l, t, 44, 36, X('', 8, 9, 84, 52, shapes[i], `background:${tint[i]};border-radius:5px`) + X('k', 8, 72, 42, 9) + X('c r o', 76, 66, 16))).join('');
  return `<div class="sc sc-c">${WIN(`${X('k z', 0, 0, 100, 13)}${X('c r o', 3, 2.2, 6)}${prod}${X('k bag', 84, 2.2, 12, 8, X('c r o cnt', 70, -40, 55))}${X('c r o fly', 20, 30, 5)}<div class="wab"><b></b><b></b><i class="tk"></i></div>`)}</div>`;
}
function sceneCube() {
  return `<div class="sc sc-d"><div class="st3"><i class="orb"></i><i class="sh"></i><div class="cube"><i class="f f1"><u></u></i><i class="f f2"></i><i class="f f3"><u></u></i><i class="f f4"></i><i class="f f5"></i><i class="f f6"></i></div><b class="sp s1"></b><b class="sp s2"></b><b class="sp s3"></b></div></div>`;
}
function sceneBooking() {
  const dots = Array.from({ length: 28 }, (_, i) => `<i class="${[3, 4, 8, 9, 10, 15, 16, 17, 22, 23].includes(i) ? 'a ' : ''}${i === 16 ? 's' : ''}"></i>`).join('');
  return `<div class="sc sc-e">${WIN(`${X('k z', 0, 0, 100, 13)}${X('c r o', 3, 2.2, 6)}${X('ik r', 30, 4.8, 22, 3.4)}${X('ik r', 56, 4.8, 12, 3.4)}<div class="cal">${dots}</div>${X('w r sl s1', 66, 22, 30, 13)}${X('w r sl s2', 66, 40, 30, 13)}${X('w r sl s3', 66, 58, 30, 13)}<div class="wab wab2"><b></b><b></b><i class="tk"></i></div>`)}</div>`;
}
export const SCENES = [sceneLanding, sceneSite, sceneStore, sceneCube, sceneBooking];

export function initServices() {
  const root = $('#svx'), vis = $('#svVis'), list = $('#sList'); if (!root) return { render() {} };
  vis.innerHTML = SCENES.map((f) => f()).join('');
  const scenes = $$('.sc', vis); let cur = 0, auto = !reduced, inView = false, items = [];
  function set(i, user) {
    cur = i; if (user) auto = false;
    scenes.forEach((s, k) => s.classList.toggle('on', k === i));
    $$('.svx-b', list).forEach((b, k) => { const on = k === i; b.classList.remove('auto'); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); if (on && auto) { void b.offsetWidth; b.classList.add('auto'); } });
  }
  list.addEventListener('click', (e) => { const b = e.target.closest('.svx-b'); b && set(+b.dataset.i, true); });
  setInterval(() => { if (auto && inView && !document.hidden) set((cur + 1) % scenes.length); }, 6000);
  if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { inView = e.isIntersecting; root.classList.toggle('off', !e.isIntersecting); if (e.isIntersecting && auto) set(cur); }, { rootMargin: '60px' }).observe(root);
  else inView = true;
  return {
    render(t) {
      items = t.services.items;
      list.innerHTML = items.map(([n, d], i) => `<li><button type="button" class="svx-b" data-i="${i}" aria-pressed="false"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t">${esc(n)}</span><span class="d">${esc(d)}</span><i class="bar"></i></button></li>`).join('');
      set(cur);
    }
  };
}
