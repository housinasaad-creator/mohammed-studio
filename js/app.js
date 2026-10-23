/* الصفحة الرئيسية: هيرو ثلاثي الأبعاد مع التمرير، ما نشاطك، مشروعان مختاران، عيّنات الحركة، لماذا نحن، الكود، الخدمات، التواصل. المحتوى مرئي حتى لو تعطّل أي مراقب. */
import { CONFIG, WORKS, FEATURED, PICK } from './content.js';
import { $, $$, esc, shell, href, waUrl, ICON, reduced, saveData, lazyMedia, tr, lang, deviceTier } from './shared.js';
import { workCard } from './cards.js';
import { mountDemos } from './demos.js';
import { initServices } from './services.js';

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), smooth = (x) => { x = clamp(x); return x * x * (3 - 2 * x); };

/* ---------------- الهيرو: فصول نصية تتبدّل مع التمرير + مشهد three.js يُحمَّل بعد اكتمال الصفحة ---------------- */
const hero = $('#top'), stick = $('#stick'), N = 4;
let heroP = 0, h3d = null, heroOn = true;
/* الهيرو الآن تسلسل صور مُصوَّر مسبقاً (js/hero-seq.js): خفيف ويعمل على كل الأجهزة بما فيها الآيفون، لذلك لا نتخطّاه على الأجهزة الضعيفة بل نحمّل منه إطاراً أقل (stride)؛ نتخطّاه فقط مع توفير البيانات أو ?hero=off */
const skipHero = saveData || new URLSearchParams(location.search).get('hero') === 'off';
if (skipHero) document.documentElement.classList.add('hero-skip');
function heroHtml(t) {
  const h = t.hero;
  return h.ch.map(([k, title, sub], i) => {
    const head = i === 0 ? `<h1>${esc(title)}</h1>` : `<h2>${esc(title)}</h2>`;
    const extra = i === 0 ? `<div class="h3-cta"><a class="btn btn-lg" href="#contact">${esc(t.cta)}</a><a class="btn btn-line btn-lg" href="${esc(href('projects.html'))}">${esc(h.cta2)}</a></div>`
      : i === 3 ? `<div class="chat"><div class="bub me">${esc(h.chat[0])}<i class="ticks"></i></div><div class="typing"><b></b><b></b><b></b></div><div class="bub you">${esc(h.chat[1])}</div></div><div class="h3-cta">${CONFIG.WA_NUMBER ? `<a class="btn btn-lg" href="${esc(waUrl(t.contact.waMsg))}" target="_blank" rel="noopener">${esc(t.contact.wa)}</a>` : ''}<a class="btn btn-line btn-lg" href="#contact">${esc(t.cta)}</a></div>` : '';
    return `<div class="chap" data-i="${i}"><p class="ck">${esc(k)}</p>${head}<p class="cs">${esc(sub)}</p>${extra}</div>`;
  }).join('');
}
let chaps = [], dots = [];
function heroLayout() {
  if (skipHero) { chaps.forEach((c, i) => { c.classList.toggle('on', i === 0); c.style.opacity = ''; c.style.transform = ''; c.style.pointerEvents = i === 0 ? 'auto' : 'none'; c.inert = i !== 0; }); return; }
  const hdr = $('#hdr').offsetHeight, total = Math.max(1, hero.offsetHeight - stick.offsetHeight);
  heroP = reduced ? 0 : clamp(-(hero.getBoundingClientRect().top - hdr) / total);
  chaps.forEach((c, i) => {
    const q = heroP * N - i, inn = i === 0 ? 1 : smooth(q / .16), out = i === N - 1 ? 1 : smooth((1 - q) / .16), o = Math.min(inn, out);
    c.style.opacity = reduced ? '' : o.toFixed(3); c.style.transform = reduced ? '' : `translate3d(0,${((1 - inn) * 34 - (1 - out) * 34).toFixed(1)}px,0)`;
    const on = o > .5 || reduced; c.classList.toggle('on', on); c.style.pointerEvents = on ? 'auto' : 'none'; c.inert = !on;
  });
  const ai = clamp(Math.floor(heroP * N), 0, N - 1);
  dots.forEach((d, i) => d.classList.toggle('on', i === ai));
  $('#h3Hint').classList.toggle('gone', heroP > .02);
  h3d && h3d.setProgress(heroP);
}
let hraf = 0; addEventListener('scroll', () => { hraf = hraf || requestAnimationFrame(() => { hraf = 0; heroLayout(); }); }, { passive: true });
addEventListener('resize', () => { heroLayout(); h3d && h3d.resize(); }, { passive: true });
$('#h3Dots').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b || reduced) return;
  const total = hero.offsetHeight - stick.offsetHeight, top = hero.getBoundingClientRect().top + scrollY - $('#hdr').offsetHeight;
  scrollTo({ top: top + total * ((+b.dataset.i + .5) / N), behavior: 'smooth' });
});
let heroNear = false, loaded = document.readyState === 'complete', starting = false;
function startHero3d() {
  if (reduced || skipHero || h3d || starting || !hero || !heroNear) return; starting = true;
  let canvas = $('#stage'); if (canvas.dataset.used) { const n = canvas.cloneNode(false); delete n.dataset.used; canvas.replaceWith(n); canvas = n; } canvas.dataset.used = '1';
  import('./hero-seq.js').then((m) => m.createHero({ canvas, lite: innerWidth < 760 || deviceTier !== 'full', saveData, onReady: () => stick.classList.add('on3d') }))
    .then((h) => { if (!heroNear) { h.dispose(); return; } h3d = h; h.setChat(tr().hero.chat); h.setProgress(heroP); h.setActive(heroOn); }).catch((e) => { console.warn('hero3d', e); }).finally(() => { starting = false; });
}
if (!reduced && !skipHero) {
  const go = () => { loaded = true; (window.requestIdleCallback ? requestIdleCallback(startHero3d, { timeout: 1800 }) : setTimeout(startHero3d, 700)); };
  if (loaded) go(); else addEventListener('load', go, { once: true });
}
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => { heroOn = e.isIntersecting; h3d && h3d.setActive(heroOn); $('#fx').classList.toggle('off', !e.isIntersecting); }, { rootMargin: '80px' }).observe(hero);
  /* بعيداً عن الهيرو بأكثر من شاشتين ونصف: يُفرَّغ المشهد كله (سياق الرسم والفيديو)، ويعود حين نقترب */
  new IntersectionObserver(([e]) => {
    heroNear = e.isIntersecting;
    if (!heroNear && h3d) { h3d.dispose(); h3d = null; stick.classList.remove('on3d'); }
    else if (heroNear && !h3d && loaded && !reduced && !skipHero) startHero3d();
  }, { rootMargin: '250% 0px 250% 0px' }).observe(hero);
} else { heroNear = true; }

/* ---------------- ما نشاطك؟ يقترح نوع الموقع ويفتح واتساب برسالة جاهزة؛ يتنقّل وحده حتى يضغط الزائر ---------------- */
let pickI = 0, pickAuto = !reduced, pickOn = false;
function pickOut() {
  const t = tr().pick, p = PICK[pickI], [, title, points, pkg, wa] = t.items[p.id];
  const hrefWa = waUrl(t.waMsg.replace('{x}', wa));
  const btnWa = CONFIG.WA_NUMBER ? `<a class="btn" href="${esc(hrefWa)}" target="_blank" rel="noopener">${esc(t.cta)}</a>` : '';
  const btnEx = p.ex ? `<a class="btn btn-line" href="${esc(p.ex)}" target="_blank" rel="noopener">${esc(t.example)}</a>` : '';
  $('#kOut').innerHTML = `<p class="pk-k">${esc(t.build)}</p><h3>${esc(title)}</h3><ul>${points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><p class="pk-pkg"><span>${esc(t.pkg)}</span><b>${esc(pkg)}</b></p><div class="pk-btns">${btnWa}${btnEx}</div>`;
  $$('#kChips button').forEach((b, i) => { b.classList.toggle('on', i === pickI); b.setAttribute('aria-pressed', i === pickI); });
}
$('#kChips').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; pickAuto = false; pickI = +b.dataset.i; pickOut(); });
setInterval(() => { if (pickAuto && pickOn && !document.hidden) { pickI = (pickI + 1) % PICK.length; pickOut(); } }, 5200);

/* ---------------- الكود: يُكتب سطراً سطراً حين يظهر ---------------- */
const CODE = `// loads only what you can see
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    const v = e.target;
    if (e.isIntersecting) { v.src ||= v.dataset.src; v.play(); }
    else v.pause();
  }
}, { rootMargin: '200px' });

document.querySelectorAll('video[data-src]')
  .forEach((v) => io.observe(v));`;
const TOK = /(\/\/.*$)|('[^']*')|\b(const|for|of|if|else|new)\b|\b(IntersectionObserver|document)\b|(\.(?:observe|play|pause|forEach|querySelectorAll)\b)/gm;
const tokens = []; { let last = 0, m; TOK.lastIndex = 0; while ((m = TOK.exec(CODE))) { if (m.index > last) tokens.push([CODE.slice(last, m.index), '']); tokens.push([m[0], m[1] ? 'c' : m[2] ? 's' : m[3] ? 'k' : m[4] ? 'f' : 'm']); last = m.index + m[0].length; } if (last < CODE.length) tokens.push([CODE.slice(last), '']); }
function codeHtml(n) { let left = n, out = ''; for (const [s, c] of tokens) { if (left <= 0) break; const part = s.slice(0, left); left -= s.length; out += c ? `<span class="t${c}">${esc(part)}</span>` : esc(part); } return out; }
{
  const el = $('#cwCode'), win = $('.codewin'); let started = false;
  const typeIt = () => { if (started) return; started = true; if (reduced) { el.innerHTML = codeHtml(1e5); return; } let n = 0, last = performance.now(); const step = (now) => { n += (now - last) * .075; last = now; el.innerHTML = codeHtml(Math.floor(n)); if (n < CODE.length) requestAnimationFrame(step); else win.classList.add('done'); }; requestAnimationFrame(step); };
  el.innerHTML = reduced ? codeHtml(1e5) : '';
  if ('IntersectionObserver' in window) new IntersectionObserver(([e], o) => { if (e.isIntersecting) { typeIt(); o.disconnect(); } }, { threshold: .4 }).observe(win); else typeIt();
}

/* ---------------- رسم المحتوى ---------------- */
let demos = null; const svc = initServices();
function render(t, lg) {
  chaps = []; $('#h3Copy').innerHTML = heroHtml(t); chaps = $$('.chap');
  $('#h3Dots').innerHTML = Array.from({ length: N }, (_, i) => `<li><button type="button" data-i="${i}" tabindex="-1" aria-label="${i + 1}"></button></li>`).join(''); dots = $$('#h3Dots button');
  $('#h3Hint').textContent = t.hero.scroll;
  const k = t.pick; $('#kKicker').textContent = k.kicker; $('#kH2').textContent = k.h2; $('#kSub').textContent = k.sub;
  $('#kChips').innerHTML = PICK.map((p, i) => `<button type="button" data-i="${i}">${esc(k.items[p.id][0])}</button>`).join(''); pickOut();
  const f = t.featured, byId = Object.fromEntries(WORKS.map((w) => [w.id, w]));
  $('#fKicker').textContent = f.kicker; $('#fH2').textContent = f.h2;
  $('#fList').innerHTML = FEATURED.map((id, i) => workCard(byId[id], t, i)).join(''); $('#fMore').innerHTML = `${esc(f.more)}<span class="bi">${ICON.arrow}</span>`; $('#fMore').href = href('projects.html');
  const d = t.demos; $('#dKicker').textContent = d.kicker; $('#dH2').textContent = d.h2; $('#dSub').textContent = d.sub;
  demos && demos.destroy(); demos = mountDemos($('#dGrid'), t, (id) => href('work.html', { id })); window.__demos = demos;
  const y = t.why; $('#yKicker').textContent = y.kicker; $('#yH2').textContent = y.h2;
  $('#yTable').innerHTML = `<div class="why-head" role="row"><span role="columnheader"></span><b role="columnheader">${esc(y.cols[0])}</b><b class="us" role="columnheader">${esc(y.cols[1])}</b></div>`
    + y.rows.map(([a, b, c]) => `<div class="why-row" role="row"><h3 role="rowheader">${esc(a)}</h3><p class="oth" role="cell" data-c="${esc(y.cols[0])}">${esc(b)}</p><p class="us" role="cell" data-c="${esc(y.cols[1])}"><i>${ICON.check}</i><span>${esc(c)}</span></p></div>`).join('');
  $('#yPriceT').textContent = y.priceT; $('#yPriceP').textContent = y.priceP; $('#yChT').textContent = y.challengeT; $('#yChP').textContent = y.challengeP; $('#yCta').textContent = y.cta; $('#yCta').href = '#contact';
  const c0 = t.prog; $('#cdKicker').textContent = c0.kicker; $('#cdH2').textContent = c0.h2; $('#cdSub').textContent = c0.sub;
  $('#cdPts').innerHTML = c0.points.map((x) => `<li><i>${ICON.check}</i><span>${esc(x)}</span></li>`).join(''); $('#cdChips').innerHTML = c0.chips.map((x) => `<span>${esc(x)}</span>`).join('');
  const s = t.services; $('#sKicker').textContent = s.kicker; $('#sH2').textContent = s.h2;
  svc.render(t);
  const p = t.steps; $('#pKicker').textContent = p.kicker; $('#pH2').textContent = p.h2; $('#pPromise').textContent = p.promise;
  $('#pList').innerHTML = p.items.map(([n, dd], i) => `<li class="rv" style="--d:${i * .07}s"><h3>${esc(n)}</h3><p>${esc(dd)}</p></li>`).join('');
  const ab = t.about; $('#aKicker').textContent = ab.kicker; $('#aH2').textContent = ab.h2; $('#aText').innerHTML = ab.p.map((x) => `<p>${esc(x)}</p>`).join('');
  $('#aName').textContent = CONFIG.CREDIT; $('#aRole').textContent = ab.role; $('#aChips').innerHTML = ab.chips.map((x) => `<span>${esc(x)}</span>`).join('');
  const c = t.contact; $('#cKicker').textContent = c.kicker; $('#cH2').textContent = c.h2; $('#cLead').textContent = c.lead;
  const wu = waUrl(c.waMsg);
  $('#cBtns').innerHTML = (CONFIG.WA_NUMBER ? `<a class="btn btn-lg" href="${esc(wu)}" target="_blank" rel="noopener"><span class="bi ico-wa">${ICON.wa}</span>${esc(c.wa)}</a>` : '')
    + `<a class="btn btn-lg btn-line" href="${esc(CONFIG.INSTAGRAM)}" target="_blank" rel="noopener"><span class="bi">${ICON.ig}</span><span dir="ltr">${esc(CONFIG.INSTAGRAM_SHOW)}</span></a>`
    + `<a class="btn btn-lg btn-line" href="${esc(CONFIG.LINKEDIN)}" target="_blank" rel="noopener"><span class="bi">${ICON.li}</span>${esc(c.linkedin)}</a>`;
  $('#cTel').innerHTML = CONFIG.WA_NUMBER ? `<a dir="ltr" href="${esc(wu)}" target="_blank" rel="noopener">${esc(CONFIG.WA_SHOW)}</a>` : '';
  h3d && h3d.setChat(t.hero.chat);
  heroLayout();
}
shell({ active: '', render, spy: ['why', 'services', 'about', 'contact'], hideFabAt: 'contact' });
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => { pickOn = e.isIntersecting; }, { rootMargin: '0px' }).observe($('#pick'));
  new IntersectionObserver(([e]) => $('#wfx').classList.toggle('off', !e.isIntersecting), { rootMargin: '200px' }).observe($('#featured'));
}
lazyMedia();
