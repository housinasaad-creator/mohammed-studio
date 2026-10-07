# MOHAMMED · Web Studio

A single, light profile page (Arabic / English) that shows the studio's work to small-business owners. No libraries and no 3D inside the page itself, so it opens quickly on any phone.

- Real projects first (Mozaik Ofset, MH Chocolate), then showcases and experiments without clients (a fragrance store, Khayt, a 3D furniture store, a driving-school site and an English-learning platform).
- About, services, a four-step process and contact (WhatsApp + LinkedIn). Device-frame screenshots in small WebP files, language switch saved locally and in `?lang=`, content that stays visible if JavaScript fails.
- Three languages (AR / EN / TR) with a distinctive switcher: a spring-loaded coral thumb, split-flap letters and a circular page reveal from the clicked code (View Transitions; instant swap without it).
- A "What is your business?" picker under the hero suggests the right kind of site and opens WhatsApp with a ready message.
- Motion that draws the eye without weight: staggered hero entrance, a hand-drawn underline, devices that tilt in 3D with the pointer, a looping WhatsApp-chat illustration, drifting colour blobs and outline shapes, a line-grid works background with floating wireframe icons, a scroll-progress bar and a floating WhatsApp button. Everything uses transform/opacity only, pauses off-screen and stops under `prefers-reduced-motion`.
- The layout stays left-to-right in both languages; Arabic text is ordered right-to-left inside its own block.
- Contrast checked (lowest ratio 5.03:1; the active language code sits on a sliding coral thumb at 6.4:1).

Text, links and the project list live in `js/content.js`.

Designed and developed by Muhammed Elhuseyin.
