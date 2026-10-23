# MOHAMMED · Web Studio

The studio's site (Arabic / English / Turkish): a 3D scroll hero, a projects page with a short looping clip from inside every site, and a case page per project with an explanation, screenshots (motion, 3D models, the cursor at work, interface) and phone shots.

- Pages: `index.html` (home), `projects.html` (all projects, real work and showcases), `work.html?id=...` (project case page).
- No frameworks. The hero is a lit mechanical keyboard built in three.js and rendered offline into a high-resolution image sequence (assets/seq, 300 WebP frames per device class); the page scrubs it with the scroll on a canvas, blending neighbouring frames, so scrolling down and up looks like a live 3D scene and works on iPhone. Weak devices load fewer frames; ?hero=off shows a still image with the headline. The three interactive motion samples (coffee roast, twelve hours of a fragrance on skin, melting chocolate) and everything else are generated in code. The three.js source of the hero lives in tools/hero_render of the project (not deployed).
- Nothing off-screen runs: the hero frames load after the page and are fully released from memory when far away; videos load only when they approach the viewport, pause when hidden and are released when far away; posters stand in under `prefers-reduced-motion` or data-saver.
- The layout stays left-to-right in all languages; Arabic text is ordered right-to-left inside its own block.

Text, links and the project list live in `js/content.js`; per-project explanations in `js/cases.js`.

Designed and developed by Muhammed Elhuseyin.
