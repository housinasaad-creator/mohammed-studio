/*
  صفحة التعريف (استوديو MOHAMMED): كل النصوص والروابط هنا. صفحة خفيفة بلا مكتبات: صور WebP صغيرة وجافاسكربت قليل،
  كي تفتح بسرعة على الجوال. لا تقييمات ولا أرقام عملاء ولا أسعار: نضيف فقط ما هو حقيقي ومؤكَّد.
*/
export const CONFIG = {
  BRAND: 'MOHAMMED',
  CREDIT: 'Muhammed Elhuseyin',
  LINKEDIN: 'https://www.linkedin.com/in/muhammed-elhuseyin-702a5b213/',
  WA_NUMBER: '905537410520',  // بالصيغة الدولية بدون + ؛ فارغ = يُخفى زر واتساب والرقم
  WA_SHOW: '+90 553 741 05 20', // نص الرقم المعروض (يُعرض دائماً من اليسار لليمين)
  DEFAULT_LANG: 'ar',
  YEAR: 2026
};

/* group: client = مشاريع لجهات حقيقية، showcase = نماذج وتجارب (بلا عميل). hidden: لا يظهر. url فارغ = لقطات فقط. */
export const WORKS = [
  { id: 'mozaik', group: 'client', url: 'https://housinasaad-creator.github.io/mozaik/', tags: ['B2B', '3D', 'TR · EN · AR'] },
  { id: 'chocolate', group: 'client', url: 'https://housinasaad-creator.github.io/mh-chocolate-site/', tags: ['3D', 'WhatsApp', 'Mobile'] },
  { id: 'perfume', group: 'showcase', url: 'https://housinasaad-creator.github.io/mohammed-perfume-site/', tags: ['3D', 'Store', 'AR · EN'] },
  { id: 'khayt', group: 'showcase', url: 'https://housinasaad-creator.github.io/khayt-fashion-store/', tags: ['Flutter', 'Store', 'Mobile'] },
  { id: 'furniture', group: 'showcase', url: 'https://housinasaad-creator.github.io/mohammed-furniture-site/', tags: ['3D', 'Store', 'TR · EN · AR'] },
  { id: 'hazem', group: 'showcase', url: '', tags: ['5 languages', 'Video hero'] }
];

/* dir = ltr للغتين: تخطيط الصفحة لا ينعكس عند تبديل اللغة؛ النص العربي نفسه يُرتَّب يمين-يسار بالـCSS (unicode-bidi: plaintext). */
export const T = {
  ar: {
    dir: 'ltr', lang: 'ar', switchTo: 'English',
    title: 'MOHAMMED · مواقع سريعة وجميلة لأنشطتك',
    desc: 'نبني لنشاطك موقعاً جميلاً وسريعاً بتصميم خاص، يعمل بسلاسة على الجوال، وطلب الزبون يصلك على واتساب. تسليم خلال أيام.',
    skip: 'تخطَّ إلى المحتوى',
    nav: { works: 'أعمالنا', about: 'من نحن', services: 'ما نقدّمه', process: 'كيف نعمل', contact: 'تواصل' },
    cta: 'اطلب موقعك',
    ticker: ['مواقع سريعة', 'تصميم خاص', 'يعمل على الجوال', 'طلب عبر واتساب', 'ثلاثي الأبعاد', 'تطبيقات Flutter', 'بالعربية والإنجليزية'],
    hero: {
      badge: 'عرض الإطلاق: أول 5 عملاء بشروط خاصة حتى 31 أكتوبر',
      h1a: 'موقع جميل وسريع لنشاطك،', h1b: 'وزبونك يصلك على واتساب.',
      sub: 'نصمّم ونبني مواقع للأنشطة الصغيرة بتصميم خاص يعمل بسلاسة على الجوال، ونسلّمها خلال أيام. بالعربية والإنجليزية وغيرها.',
      cta2: 'شاهد أعمالنا',
      chat: ['مرحباً، أريد أن أطلب', 'أهلاً! وصلنا طلبك، شكراً لك'],
      facts: ['تسليم خلال أيام', 'يعمل على الجوال', 'طلب عبر واتساب', 'النطاق والمحتوى ملكك']
    },
    works: {
      kicker: 'أعمالنا', h2: 'مواقع حقيقية وتجارب نعتزّ بها',
      client: 'مشاريع لجهات حقيقية', showcase: 'نماذج وتجارب',
      open: 'افتح الموقع', shots: 'لقطات فقط، الرابط عند الطلب',
      items: {
        mozaik: ['Mozaik Ofset', 'شركة تغليف وطباعة، غازي عنتاب', 'موقع تعريفي وكتالوج منتجات لشركة B2B: عرض ثلاثي الأبعاد للعلب، طلب عرض سعر، وثلاث لغات.'],
        chocolate: ['MH Chocolate', 'صانعة شوكولا منزلية، غازي عنتاب', 'قطع شوكولا ثلاثية الأبعاد تُدار بالسحب، وتصميم خاص للطلب، وسلة تنتهي برسالة واتساب جاهزة. يعمل بسلاسة على الجوال.'],
        perfume: ['MOHAMMED Parfum', 'نموذج متجر عطور', 'قصة متجر بتجربة ثلاثية الأبعاد: زجاجات حقيقية الإضاءة، وجو لكل عطر، وسلة. التجربة الكاملة على الكمبيوتر.'],
        khayt: ['Khayt · خيط', 'نموذج متجر أزياء', 'متجر خفيف وجميل يتلوّن مع القطعة المختارة، مبني بـ Flutter ويعمل بسرعة على الجوال.'],
        furniture: ['MOHAMMED Mobilia', 'نموذج موقع أثاث', 'جولة ثلاثية الأبعاد في بيت يتغيّر مع ساعات اليوم: الشمس تعبر النوافذ، والقطع تُبنى أمامك، ويتبدّل القماش والخشب مباشرة. التجربة الكاملة على الكمبيوتر.'],
        hazem: ['موقع مدرسة قيادة', 'نموذج موقع بخمس لغات', 'موقع لمدرسة قيادة بالعربية والألمانية وغيرها: فيديو بالواجهة، دروس، ونظام تسجيل.']
      }
    },
    about: {
      kicker: 'من نحن', h2: 'خلف MOHAMMED',
      p: ['استوديو MOHAMMED صغير في غازي عنتاب، يقوده Muhammed Elhuseyin. نبني المواقع السريعة بتصميم خاص، وإلى جانبها نعمل على تطبيقات الهواتف بـ Flutter وأنظمة إدارة للأعمال.',
        'يهمّنا كثيراً أن تكون التجربة سلسة والواجهة مريحة وجميلة (UI / UX)، لأن زبونك يحكم على نشاطك في ثوانٍ على جواله. لذلك نعتني بالتفاصيل الصغيرة: السرعة، الحركة، الألوان، وسهولة الوصول إليك.'],
      role: 'مطوّر ومصمّم، غازي عنتاب',
      chips: ['مواقع بتصميم خاص', 'تطبيقات هواتف (Flutter)', 'ثلاثي الأبعاد على الويب', 'أنظمة إدارة للأعمال', 'UI / UX']
    },
    services: {
      kicker: 'ما نقدّمه', h2: 'من صفحة واحدة إلى متجر',
      items: [
        ['صفحة تعريفية', 'صفحة واحدة احترافية تعرّف بنشاطك وخدماتك وتضع زر التواصل أمام الزبون.'],
        ['موقع صغير', 'عدة صفحات (من نحن، الخدمات، المعرض، التواصل) بتصميم يشبه هويتك.'],
        ['متجر بطلب عبر واتساب', 'منتجاتك مع سلة بسيطة تصلك منها رسالة جاهزة بالطلب، بدون بوابة دفع معقّدة.'],
        ['عرض ثلاثي الأبعاد', 'منتجك يدور أمام الزبون على صفحتك. للأنشطة التي تُباع بالصورة.']
      ]
    },
    process: {
      kicker: 'كيف نعمل', h2: 'أربع خطوات واضحة',
      items: [
        ['مكالمة قصيرة', '15 دقيقة لنفهم نشاطك وما تريده.'],
        ['تصميم', 'نرسل لك الفكرة والتصميم قبل البناء الكامل.'],
        ['مراجعة وتعديل', 'تعدّل معنا حتى ترضى، ضمن نطاق متفق عليه كتابةً.'],
        ['إطلاق', 'ننشر الموقع على نطاق باسمك، ويبقى المحتوى ملكك.']
      ]
    },
    contact: {
      kicker: 'تواصل', h2: 'احكِ لنا عن نشاطك', lead: 'أرسل رسالة قصيرة عن نشاطك، ونرد بفكرة واضحة لموقعك بدون التزام.',
      linkedin: 'راسلنا على لينكدإن', wa: 'راسلنا على واتساب', waTip: 'اكتب لنا', waMsg: 'مرحباً، أرغب بموقع لنشاطي. أرسلت لكم من صفحة MOHAMMED.'
    },
    footer: { tag: 'مواقع سريعة وجميلة.', rights: 'جميع الحقوق محفوظة', credit: 'تصميم وتطوير' }
  },

  en: {
    dir: 'ltr', lang: 'en', switchTo: 'العربية',
    title: 'MOHAMMED · Fast, beautiful websites for your business',
    desc: 'We build a fast, beautiful, custom website for your business that runs smoothly on phones, with customer orders landing on your WhatsApp. Delivered in days.',
    skip: 'Skip to content',
    nav: { works: 'Our work', about: 'About', services: 'What we do', process: 'How we work', contact: 'Contact' },
    cta: 'Get your website',
    ticker: ['Fast websites', 'Custom design', 'Works on phones', 'Orders via WhatsApp', '3D on the web', 'Flutter apps', 'Arabic and English'],
    hero: {
      badge: 'Launch offer: the first 5 clients, special terms until October 31',
      h1a: 'A fast, beautiful website for your business,', h1b: 'and customers reach you on WhatsApp.',
      sub: 'We design and build websites for small businesses with a custom look that runs smoothly on phones, delivered in days. In Arabic, English and more.',
      cta2: 'See our work',
      chat: ['Hi, I would like to order', 'Hello! We got your order, thank you'],
      facts: ['Delivered in days', 'Works on phones', 'Orders via WhatsApp', 'Domain and content are yours']
    },
    works: {
      kicker: 'Our work', h2: 'Real websites and experiments we are proud of',
      client: 'Projects for real businesses', showcase: 'Showcases and experiments',
      open: 'Open the site', shots: 'Screenshots only, link on request',
      items: {
        mozaik: ['Mozaik Ofset', 'Packaging and printing company, Gaziantep', 'A company site and product catalogue for a B2B business: 3D box viewer, quote requests and three languages.'],
        chocolate: ['MH Chocolate', 'Home chocolatier, Gaziantep', 'Draggable 3D chocolate pieces, a custom order builder and a bag that ends in a ready WhatsApp message. Runs smoothly on phones.'],
        perfume: ['MOHAMMED Parfum', 'Fragrance store concept', 'A store story with a 3D experience: realistically lit bottles, a mood per scent and a bag. Best on desktop.'],
        khayt: ['Khayt · خيط', 'Fashion store concept', 'A light, beautiful store that recolours with the chosen piece, built with Flutter and fast on phones.'],
        furniture: ['MOHAMMED Mobilia', 'Furniture store concept', 'A 3D walk through a home that changes with the hours of the day: sun crossing the windows, pieces that build themselves in front of you, and live fabric and wood swaps. Best on desktop.'],
        hazem: ['Driving school website', 'A five-language concept', 'A driving school site in Arabic, German and more: video hero, lessons and a sign-up system.']
      }
    },
    about: {
      kicker: 'About', h2: 'Behind MOHAMMED',
      p: ['MOHAMMED is a small studio in Gaziantep led by Muhammed Elhuseyin. We build fast websites with a custom design, and alongside them we work on mobile apps with Flutter and management systems for businesses.',
        'We care a lot about a smooth experience and an interface that is comfortable and beautiful (UI / UX), because your customer judges your business in seconds on their phone. So we sweat the small things: speed, motion, colour and how easily people can reach you.'],
      role: 'Developer & designer, Gaziantep',
      chips: ['Custom websites', 'Mobile apps (Flutter)', '3D on the web', 'Business systems', 'UI / UX']
    },
    services: {
      kicker: 'What we do', h2: 'From one page to a store',
      items: [
        ['Landing page', 'One professional page that introduces your business and puts the contact button in front of the customer.'],
        ['Small website', 'Several pages (about, services, gallery, contact) in a design that matches your identity.'],
        ['Store with WhatsApp orders', 'Your products with a simple bag that sends you a ready order message, no complicated payment gateway.'],
        ['3D showcase', 'Your product rotates in front of the customer on your page. For businesses that sell by looks.']
      ]
    },
    process: {
      kicker: 'How we work', h2: 'Four clear steps',
      items: [
        ['Short call', '15 minutes to understand your business and what you want.'],
        ['Design', 'We send you the idea and design before the full build.'],
        ['Review and edits', 'You adjust with us until you are happy, within a scope agreed in writing.'],
        ['Launch', 'We publish the site on a domain in your name and the content stays yours.']
      ]
    },
    contact: {
      kicker: 'Contact', h2: 'Tell us about your business', lead: 'Send a short note about your business and we reply with a clear idea for your site, no obligation.',
      linkedin: 'Message us on LinkedIn', wa: 'Message us on WhatsApp', waTip: 'Message us', waMsg: 'Hello, I would like a website for my business. I wrote from the MOHAMMED page.'
    },
    footer: { tag: 'Fast, beautiful websites.', rights: 'All rights reserved', credit: 'Designed & developed by' }
  }
};
