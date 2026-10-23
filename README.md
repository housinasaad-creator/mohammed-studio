# MOHAMMED · Web Studio

The studio's site (Arabic / English / Turkish): a 3D scroll hero, a projects page with a short looping clip from inside every site, and a case page per project with an explanation, screenshots (motion, 3D models, the cursor at work, interface) and phone shots.

- Pages: `index.html` (home), `projects.html` (all projects, real work and showcases), `work.html?id=...` (project case page).
- No frameworks. The hero is a lit mechanical keyboard built in three.js and rendered offline in high resolution into eight short H.264 clips per device class (assets/hv: f0-f3 forward from one stop to the next, r0-r3 the same frames reversed). The page plays them on a canvas in exactly four scroll gestures: each wheel notch, swipe, arrow key or dot plays the next clip by itself and stops on its last frame; going back plays the reversed clip forward, so there is no backwards playback or seeking glitch, and a new gesture mid-clip either speeds it up (same direction) or continues from the same frame in the mirrored clip. It looks like a live 3D scene and works on iPhone. ?hero=off shows a still image with the headline. The three interactive motion samples (coffee roast, twelve hours of a fragrance on skin, melting chocolate) and everything else are generated in code. The three.js source of the hero lives in tools/hero_render of the project (not deployed).
- Nothing off-screen runs: the hero clips load after the page and are fully released from memory when far away; videos load only when they approach the viewport, pause when hidden and are released when far away; posters stand in under `prefers-reduced-motion` or data-saver.
- The layout stays left-to-right in all languages; Arabic text is ordered right-to-left inside its own block.

Text, links and the project list live in `js/content.js`; per-project explanations in `js/cases.js`.

Designed and developed by Muhammed Elhuseyin.
