# MOHAMMED · Web Studio

The studio's site (Arabic / English / Turkish): a 3D scroll hero, a projects page with a short looping clip from inside every site, and a case page per project with an explanation, screenshots (motion, 3D models, the cursor at work, interface) and phone shots.

- Pages: `index.html` (home), `projects.html` (all projects, real work and showcases), `work.html?id=...` (project case page).
- No frameworks. The hero is a live three.js scene of a lit mechanical keyboard built entirely in code and driven by scroll; the three interactive motion samples (coffee roast, twelve hours of a fragrance on skin, melting chocolate) and everything else are generated in code. Weak devices (4 cores or fewer, or 2 GB of RAM or less) skip the 3D hero and see a still image with the headline; add ?hero=on or ?hero=off to force either way.
- Nothing off-screen runs: the 3D hero loads after the page and is fully released from memory when far away; videos load only when they approach the viewport, pause when hidden and are released when far away; posters stand in under `prefers-reduced-motion` or data-saver.
- The layout stays left-to-right in all languages; Arabic text is ordered right-to-left inside its own block.

Text, links and the project list live in `js/content.js`; per-project explanations in `js/cases.js`.

Designed and developed by Muhammed Elhuseyin.
