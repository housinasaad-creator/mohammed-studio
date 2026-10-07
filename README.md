# MOHAMMED · Web Studio

A single, light profile page (Arabic / English) that shows the studio's work to small-business owners. No libraries and no 3D inside the page itself, so it opens quickly on any phone.

- Real projects first (Mozaik Ofset, MH Chocolate), then showcases and experiments without clients (a fragrance store, Khayt, a 3D furniture store and a driving-school site).
- About, services, a four-step process and contact (WhatsApp + LinkedIn). Device-frame screenshots in small WebP files, language switch saved locally and in `?lang=`, content that stays visible if JavaScript fails.
- Motion that draws the eye without weight: staggered hero entrance, a hand-drawn underline, devices that tilt in 3D with the pointer, a looping WhatsApp-chat illustration, drifting colour blobs and outline shapes, a slanted ticker band, a scroll-progress bar and a floating WhatsApp button. Everything uses transform/opacity only, pauses off-screen and stops under `prefers-reduced-motion`.
- The layout stays left-to-right in both languages; Arabic text is ordered right-to-left inside its own block.
- Contrast checked (lowest ratio 5.03:1, no AA failures).

Text, links and the project list live in `js/content.js`.

Designed and developed by Muhammed Elhuseyin.
