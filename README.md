# MOHAMMED · Web Studio

The studio's site (Arabic / English / Turkish): a 3D scroll hero, a projects page with a short looping clip from inside every site, and a case page per project with an explanation, screenshots (motion, 3D models, the cursor at work, interface) and phone shots.

- Pages: `index.html` (home), `projects.html` (all projects, real work and showcases), `work.html?id=...` (project case page).
- No frameworks. The hero is one screen: the first headline over a light looping video (assets/hero/loop-desktop.mp4, loop-phone.mp4, about 15 s) of a lit mechanical keyboard built in three.js and rendered offline at constant speed with no stops; it repeats without a cut and has nothing to do with scrolling. It plays only while the hero is on screen, pauses the moment it leaves the viewport and frees its memory when far away. ?hero=off or data-saver shows a still image. The three interactive motion samples (coffee roast, twelve hours of a fragrance on skin, melting chocolate) and everything else are generated in code. The three.js source of the hero lives in tools/hero_render of the project (not deployed).
- Nothing off-screen runs: the hero video loads after the page, pauses when hidden and is released from memory when far away; videos load only when they approach the viewport, pause when hidden and are released when far away; posters stand in under `prefers-reduced-motion` or data-saver.
- The layout stays left-to-right in all languages; Arabic text is ordered right-to-left inside its own block.

Text, links and the project list live in `js/content.js`; per-project explanations in `js/cases.js`.

Designed and developed by Muhammed Elhuseyin.
