/* صفحة شرح مشروع: مقطع متحرك من داخل الموقع، الشرح، معرض لقطات (حركة، ثلاثي الأبعاد، المؤشر، واجهة)، الجوال، والمشروع السابق والتالي */
import { CONFIG, WORKS } from './content.js';
import { CASES } from './cases.js';
import { $, $$, esc, shell, href, waUrl, ICON, lazyMedia, reduced } from './shared.js';

const vis = WORKS.filter((x) => !x.hidden), id = new URLSearchParams(location.search).get('id'), idx = vis.findIndex((x) => x.id === id);
if (idx < 0) { location.replace('projects.html'); throw new Error('unknown project'); }
const w = vis[idx], C = CASES[id] || null;
let LB = [], lbI = 0, lastFocus = null;

function render(t, lang) {
  const [name, who, desc] = t.works.items[id], cs = t.case, ct = C && C.t[lang];
  const badges = `<span class="kb ${w.group === 'real' ? 'kb-real' : ''}">${esc(w.group === 'real' ? cs.real : cs.show)}</span>${w.wip ? `<span class="kb kb-wip">${esc(cs.wip)}</span>` : ''}`;
  const wa = CONFIG.WA_NUMBER ? waUrl(cs.waMsg.replace('{x}', name)) : '';
  LB = [];
  const desk = C ? C.desk.map(([f, k], i) => { LB.push({ src: `assets/gallery/${f}.webp`, cap: ct.cap[i], w: 1200 }); return `<figure class="gi rv" style="--d:${(i % 2) * .07}s"><button type="button" class="gi-b" data-lb="${LB.length - 1}" aria-label="${esc(ct.cap[i])}"><img src="assets/gallery/${f}.webp" width="1200" height="750" loading="lazy" decoding="async" alt="${esc(ct.cap[i])}"><span class="kind k-${k}">${esc(cs.kinds[k])}</span><span class="zoom">${ICON.arrow}</span></button><figcaption>${esc(ct.cap[i])}</figcaption></figure>`; }).join('') : '';
  const phs = C ? C.ph.map((f) => { LB.push({ src: `assets/gallery/${f}.webp`, cap: `${name} · ${cs.phones}`, w: 585 }); return `<button type="button" class="phf rv" data-lb="${LB.length - 1}" aria-label="${esc(cs.phones)}"><img src="assets/gallery/${f}.webp" width="585" height="1266" loading="lazy" decoding="async" alt=""></button>`; }).join('') : '';
  const langs = C ? C.langs + (C.moreLangs ? ` · +${C.moreLangs}` : '') : '';
  const facts = [[cs.facts.type, w.group === 'real' ? cs.real : cs.show], [cs.facts.year, w.year], [cs.facts.role, cs.role]];
  if (C) { facts.push([cs.facts.langs, langs]); facts.push([cs.facts.stack, C.stack.join(' · ')]); }
  const p = vis[(idx - 1 + vis.length) % vis.length], n = vis[(idx + 1) % vis.length];
  const nav = (o, label, cls) => `<a class="pn ${cls}" href="${esc(href('work.html', { id: o.id }))}"><img src="assets/shots/${o.id}-d.webp" width="480" height="300" loading="lazy" alt=""><span><small>${esc(label)}</small><b>${esc(t.works.items[o.id][0])}</b></span><i>${cls === 'pn-p' ? ICON.back : ICON.arrow}</i></a>`;
  $('#case').innerHTML = `
  <section class="chead">
    <div class="phead-fx" aria-hidden="true"><i class="blob b1"></i><i class="blob b2"></i></div>
    <div class="wrap">
      <a class="crumb" href="${esc(href('projects.html'))}"><span class="bi">${ICON.back}</span>${esc(cs.back)}</a>
      <div class="chead-in">
        <div class="chead-t">
          <div class="cbadges">${badges}</div>
          <p class="who">${esc(who)}</p>
          <h1>${esc(name)}</h1>
          <p class="cshort">${esc(desc)}</p>
          <div class="tags">${w.tags.map((x) => `<span>${esc(x)}</span>`).join('')}</div>
          <div class="cbtns"><a class="btn btn-lg" href="${esc(w.url)}" target="_blank" rel="noopener">${esc(cs.open)}<span class="bi">${ICON.ext}</span></a>${wa ? `<a class="btn btn-line btn-lg" href="${esc(wa)}" target="_blank" rel="noopener"><span class="bi ico-wa">${ICON.wa}</span>${esc(cs.ask)}</a>` : ''}</div>
        </div>
        <div class="cmedia">
          <div class="bframe"><div class="bdots"><b></b><b></b><b></b></div>
            <div class="bscreen"><video id="cvid" muted loop playsinline preload="none" disablepictureinpicture width="960" height="600" poster="assets/shots/${id}-d.webp" data-src="assets/clips/${id}.mp4" aria-label="${esc(name)}"></video>
              <button type="button" class="vpause" id="vPause" aria-label="Pause"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="i-pause" d="M7 5h4v14H7zM13 5h4v14h-4z"/><path class="i-play" d="M8 5v14l11-7z"/></svg></button></div></div>
          <span class="cph"><img src="assets/shots/${id}-m.webp" width="330" height="715" alt="" decoding="async"></span>
        </div>
      </div>
    </div>
  </section>
  <section class="cfacts"><div class="wrap"><dl>${facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></div></section>
  ${C ? `<section class="sec" id="about"><div class="wrap about2">
    <div class="rv"><p class="kicker">${esc(cs.about)}</p><div class="about-text">${ct.about.map((x) => `<p>${esc(x)}</p>`).join('')}</div></div>
    <div class="rv" style="--d:.08s"><p class="kicker">${esc(cs.highlights)}</p><ol class="hls">${ct.hl.map((x) => `<li>${esc(x)}</li>`).join('')}</ol></div>
  </div></section>
  <section class="sec sec-alt" id="inside"><div class="wrap"><header class="sec-h rv"><p class="kicker">${esc(cs.inside)}</p></header><div class="gal">${desk}</div></div></section>
  <section class="sec sec-ink" id="phones"><div class="wrap"><header class="sec-h rv"><p class="kicker">${esc(cs.phones)}</p></header><div class="phrow">${phs}</div></div></section>` : ''}
  <section class="sec" id="more"><div class="wrap"><header class="sec-h rv"><p class="kicker">${esc(cs.more)}</p></header><div class="pnrow rv">${nav(p, cs.prev, 'pn-p')}${nav(n, cs.next, 'pn-n')}</div></div></section>
  <section class="sec sec-contact" id="contact"><div class="wrap contact-in">
    <header class="sec-h rv"><p class="kicker">${esc(t.contact.kicker)}</p><h2>${esc(cs.ctaT)}</h2><p class="lead">${esc(cs.ctaP)}</p></header>
    <div class="contact-btns rv">${wa ? `<a class="btn btn-lg" href="${esc(wa)}" target="_blank" rel="noopener"><span class="bi ico-wa">${ICON.wa}</span>${esc(t.contact.wa)}</a>` : ''}<a class="btn btn-lg btn-line" href="${esc(CONFIG.INSTAGRAM)}" target="_blank" rel="noopener"><span class="bi">${ICON.ig}</span><span dir="ltr">${esc(CONFIG.INSTAGRAM_SHOW)}</span></a><a class="btn btn-lg btn-line" href="${esc(href('projects.html'))}">${esc(cs.back)}<span class="bi">${ICON.arrow}</span></a></div>
  </div></section>`;
  const v = $('#cvid'), pb = $('#vPause'); const sync = () => { const paused = !!v.dataset.hold || reduced; pb.classList.toggle('paused', paused); pb.setAttribute('aria-label', paused ? 'Play' : 'Pause'); };
  pb.addEventListener('click', () => { if (v.dataset.hold || reduced) { delete v.dataset.hold; v.dataset.lm === 'off' ? (v.src = v.dataset.src) : 0; v.play().catch(() => {}); } else { v.dataset.hold = '1'; v.pause(); } sync(); }); sync();
}

/* لايت بوكس بسيط: أسهم، Esc، وإعادة التركيز للزر الذي فتحه */
const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
function lbShow(i) { lbI = (i + LB.length) % LB.length; const o = LB[lbI]; lbImg.src = o.src; lbImg.alt = o.cap; lbCap.textContent = o.cap; lb.classList.toggle('lb-ph', o.w < 800); }
function lbOpen(i) { lastFocus = document.activeElement; lb.hidden = false; document.body.classList.add('lb-on'); lbShow(i); $('#lbX').focus(); }
function lbClose() { lb.hidden = true; document.body.classList.remove('lb-on'); lastFocus && lastFocus.focus && lastFocus.focus(); }
$('#lbX').innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
$('#lbP').innerHTML = ICON.back; $('#lbN').innerHTML = ICON.arrow;
$('#lbX').addEventListener('click', lbClose); $('#lbP').addEventListener('click', () => lbShow(lbI - 1)); $('#lbN').addEventListener('click', () => lbShow(lbI + 1));
lb.addEventListener('click', (e) => { if (e.target === lb) lbClose(); });
addEventListener('keydown', (e) => { if (lb.hidden) return; if (e.key === 'Escape') lbClose(); else if (e.key === 'ArrowRight') lbShow(lbI + 1); else if (e.key === 'ArrowLeft') lbShow(lbI - 1); });
$('#case').addEventListener('click', (e) => { const b = e.target.closest('[data-lb]'); b && lbOpen(+b.dataset.lb); });

shell({ active: 'works', render, title: (t) => `${t.works.items[id][0]} · MOHAMMED`, hideFabAt: 'contact' });
