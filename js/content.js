/*
  صفحة التعريف (استوديو MOHAMMED): كل النصوص والروابط هنا. صفحة خفيفة بلا مكتبات: صور WebP صغيرة وجافاسكربت قليل،
  كي تفتح بسرعة على الجوال. لا تقييمات ولا أرقام عملاء ولا أسعار: نضيف فقط ما هو حقيقي ومؤكَّد.
  ثلاث لغات: ar / en / tr (الرمز code يظهر في مبدّل اللغة بحرفين لاتينيين).
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
  { id: 'hazem', group: 'showcase', url: 'https://housinasaad-creator.github.io/hazem-driving-school/', tags: ['5 languages', 'Video hero'] },
  { id: 'english', group: 'showcase', url: 'https://housinasaad-creator.github.io/english-learning-platform/', tags: ['Education', 'A1 → C1', 'Audio'] }
];

/* أنشطة "ما نشاطك؟": ex = مثال حقيقي من أعمالنا (يُعرض فقط حيث يوجد مثال مناسب) */
export const PICK = [
  { id: 'food' },
  { id: 'clinic' },
  { id: 'fashion', ex: 'https://housinasaad-creator.github.io/khayt-fashion-store/' },
  { id: 'office' },
  { id: 'maker', ex: 'https://housinasaad-creator.github.io/mh-chocolate-site/' },
  { id: 'edu', ex: 'https://housinasaad-creator.github.io/hazem-driving-school/' }
];

/* dir = ltr للغات الثلاث: تخطيط الصفحة لا ينعكس عند تبديل اللغة؛ النص العربي نفسه يُرتَّب يمين-يسار بالـCSS (unicode-bidi: plaintext). */
export const T = {
  ar: {
    dir: 'ltr', lang: 'ar', code: 'AR', name: 'العربية',
    title: 'MOHAMMED · مواقع سريعة وجميلة لأنشطتك',
    desc: 'نبني لنشاطك موقعاً جميلاً وسريعاً بتصميم خاص، يعمل بسلاسة على الجوال، وطلب الزبون يصلك على واتساب. تسليم خلال أيام.',
    skip: 'تخطَّ إلى المحتوى',
    nav: { works: 'أعمالنا', about: 'من نحن', services: 'ما نقدّمه', process: 'كيف نعمل', contact: 'تواصل' },
    cta: 'اطلب موقعك',
    hero: {
      badge: 'عرض الإطلاق: أول 5 عملاء بشروط خاصة حتى 31 أكتوبر',
      h1a: 'موقع جميل وسريع لنشاطك،', h1b: 'وزبونك يصلك على واتساب.',
      sub: 'نصمّم ونبني مواقع للأنشطة الصغيرة بتصميم خاص يعمل بسلاسة على الجوال، ونسلّمها خلال أيام. بالعربية والإنجليزية والتركية وغيرها.',
      cta2: 'شاهد أعمالنا',
      chat: ['مرحباً، أريد أن أطلب', 'أهلاً! وصلنا طلبك، شكراً لك'],
      facts: ['تسليم خلال أيام', 'يعمل على الجوال', 'طلب عبر واتساب', 'النطاق والمحتوى ملكك']
    },
    pick: {
      kicker: 'اقتراح سريع', h2: 'ما نشاطك؟', sub: 'اختر نشاطك لنقترح عليك شكل الموقع المناسب.',
      build: 'نقترح لك', pkg: 'الباقة', cta: 'ابدأ الحديث على واتساب', example: 'شاهد مثالاً',
      waMsg: 'مرحباً، أرغب بموقع {x}. أرسلت لكم من صفحة MOHAMMED.',
      items: {
        food: ['مطعم أو مقهى', 'موقع يفتح الشهية ويستقبل الطلبات', ['قائمة طعام بصور جميلة تُفتح بسرعة على الجوال', 'زر طلب برسالة واتساب جاهزة', 'الموقع والمواعيد وطريق الوصول'], 'متجر بطلب عبر واتساب', 'لمطعم أو مقهى'],
        clinic: ['عيادة أو مركز طبي', 'موقع يطمئن المراجع ويحجز له موعداً', ['الخدمات والفريق بتصميم نظيف وهادئ', 'حجز موعد: يختار الزبون الخدمة والوقت وتصلك رسالة جاهزة', 'بعدة لغات إن أردت'], 'موقع صغير + حجز المواعيد', 'لعيادة أو مركز طبي'],
        fashion: ['متجر أزياء', 'متجر أنيق يتلوّن مع كل قطعة', ['سلة بسيطة تنتهي برسالة واتساب جاهزة', 'تجربة سلسة على الجوال', 'بدون بوابة دفع معقّدة'], 'متجر بطلب عبر واتساب', 'لمتجر أزياء'],
        office: ['مكتب أو شركة', 'موقع رصين يبني الثقة من أول نظرة', ['صفحات واضحة: من نحن، الخدمات، التواصل', 'حجز استشارة برسالة واتساب جاهزة', 'هوية وألوان تشبه مكتبك'], 'موقع صغير + حجز المواعيد', 'لمكتب أو شركة'],
        maker: ['صانع أو حِرفي', 'منتجك يدور أمام الزبون', ['عرض ثلاثي الأبعاد لمنتجك على الصفحة', 'تصميم خاص للطلب', 'سلة تنتهي برسالة واتساب'], 'عرض ثلاثي الأبعاد', 'لصانع أو حِرفي'],
        edu: ['مدرسة أو تعليم', 'موقع يشرح ويسجّل', ['عدة لغات ودروس وتسجيل', 'فيديو أو صور تعرّف بمدرستك', 'تواصل مباشر على واتساب'], 'موقع صغير', 'لمدرسة أو مركز تعليمي']
      }
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
        hazem: ['موقع مدرسة قيادة', 'نموذج موقع بخمس لغات', 'موقع لمدرسة قيادة بالعربية والألمانية وغيرها: فيديو بالواجهة، دروس، ونظام تسجيل.'],
        english: ['منصة تعلّم الإنجليزية', 'نموذج منصة تعليمية', 'منصة لتعلّم الإنجليزية بالعربية من A1 إلى C1: شرح للقواعد بالعربي، تمارين تفاعلية، وتسجيلات صوتية.']
      }
    },
    about: {
      kicker: 'من نحن', h2: 'خلف MOHAMMED',
      p: ['استوديو MOHAMMED صغير في غازي عنتاب، يقوده Muhammed Elhuseyin. نبني المواقع السريعة بتصميم خاص، وإلى جانبها نعمل على تطبيقات الهواتف بـ Flutter وأنظمة إدارة للأعمال وأنظمة حجز المواعيد.',
        'يهمّنا كثيراً أن تكون التجربة سلسة والواجهة مريحة وجميلة (UI / UX)، لأن زبونك يحكم على نشاطك في ثوانٍ على جواله. لذلك نعتني بالتفاصيل الصغيرة: السرعة، الحركة، الألوان، وسهولة الوصول إليك.'],
      role: 'مطوّر ومصمّم، غازي عنتاب',
      chips: ['مواقع بتصميم خاص', 'تطبيقات هواتف (Flutter)', 'ثلاثي الأبعاد على الويب', 'أنظمة إدارة للأعمال', 'أنظمة حجز مواعيد', 'UI / UX']
    },
    services: {
      kicker: 'ما نقدّمه', h2: 'من صفحة واحدة إلى متجر',
      items: [
        ['صفحة تعريفية', 'صفحة واحدة احترافية تعرّف بنشاطك وخدماتك وتضع زر التواصل أمام الزبون.'],
        ['موقع صغير', 'عدة صفحات (من نحن، الخدمات، المعرض، التواصل) بتصميم يشبه هويتك.'],
        ['متجر بطلب عبر واتساب', 'منتجاتك مع سلة بسيطة تصلك منها رسالة جاهزة بالطلب، بدون بوابة دفع معقّدة.'],
        ['عرض ثلاثي الأبعاد', 'منتجك يدور أمام الزبون على صفحتك. للأنشطة التي تُباع بالصورة.'],
        ['أنظمة حجز المواعيد', 'نموذج حجز لعيادتك أو مكتبك أو صالونك: يختار الزبون الخدمة والوقت وتصلك رسالة جاهزة على واتساب.']
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
    dir: 'ltr', lang: 'en', code: 'EN', name: 'English',
    title: 'MOHAMMED · Fast, beautiful websites for your business',
    desc: 'We build a fast, beautiful, custom website for your business that runs smoothly on phones, with customer orders landing on your WhatsApp. Delivered in days.',
    skip: 'Skip to content',
    nav: { works: 'Our work', about: 'About', services: 'What we do', process: 'How we work', contact: 'Contact' },
    cta: 'Get your website',
    hero: {
      badge: 'Launch offer: the first 5 clients, special terms until October 31',
      h1a: 'A fast, beautiful website for your business,', h1b: 'and customers reach you on WhatsApp.',
      sub: 'We design and build websites for small businesses with a custom look that runs smoothly on phones, delivered in days. In Arabic, English, Turkish and more.',
      cta2: 'See our work',
      chat: ['Hi, I would like to order', 'Hello! We got your order, thank you'],
      facts: ['Delivered in days', 'Works on phones', 'Orders via WhatsApp', 'Domain and content are yours']
    },
    pick: {
      kicker: 'Quick idea', h2: 'What is your business?', sub: 'Pick your business and we suggest the right kind of site.',
      build: 'We suggest', pkg: 'Package', cta: 'Start on WhatsApp', example: 'See an example',
      waMsg: 'Hello, I would like a website {x}. I wrote from the MOHAMMED page.',
      items: {
        food: ['Restaurant or café', 'A site that opens the appetite and takes orders', ['A menu with beautiful photos that opens fast on phones', 'An order button with a ready WhatsApp message', 'Location, opening hours and directions'], 'Store with WhatsApp orders', 'for a restaurant or café'],
        clinic: ['Clinic or medical centre', 'A site that reassures patients and books them in', ['Services and team in a clean, calm design', 'Booking: the customer picks the service and time and a ready message reaches you', 'In several languages if you want'], 'Small website + booking', 'for a clinic or medical centre'],
        fashion: ['Fashion store', 'A stylish store that recolours with every piece', ['A simple bag that ends in a ready WhatsApp message', 'A smooth experience on phones', 'No complicated payment gateway'], 'Store with WhatsApp orders', 'for a fashion store'],
        office: ['Office or company', 'A sober site that builds trust at first glance', ['Clear pages: about, services, contact', 'Consultation booking with a ready WhatsApp message', 'An identity and colours that match your office'], 'Small website + booking', 'for an office or company'],
        maker: ['Maker or craftsperson', 'Your product rotates in front of the customer', ['A 3D view of your product on the page', 'A custom design for the order', 'A bag that ends in a WhatsApp message'], '3D showcase', 'for a maker or craftsperson'],
        edu: ['School or education', 'A site that explains and enrols', ['Several languages, lessons and sign-up', 'Video or photos that introduce your school', 'Direct contact on WhatsApp'], 'Small website', 'for a school or training centre']
      }
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
        hazem: ['Driving school website', 'A five-language concept', 'A driving school site in Arabic, German and more: video hero, lessons and a sign-up system.'],
        english: ['English Learning Platform', 'Learning platform concept', 'An English-learning site for Arabic speakers from A1 to C1: grammar explained in Arabic, interactive exercises and audio recordings.']
      }
    },
    about: {
      kicker: 'About', h2: 'Behind MOHAMMED',
      p: ['MOHAMMED is a small studio in Gaziantep led by Muhammed Elhuseyin. We build fast websites with a custom design, and alongside them we work on mobile apps with Flutter, management systems for businesses and appointment booking systems.',
        'We care a lot about a smooth experience and an interface that is comfortable and beautiful (UI / UX), because your customer judges your business in seconds on their phone. So we sweat the small things: speed, motion, colour and how easily people can reach you.'],
      role: 'Developer & designer, Gaziantep',
      chips: ['Custom websites', 'Mobile apps (Flutter)', '3D on the web', 'Business systems', 'Booking systems', 'UI / UX']
    },
    services: {
      kicker: 'What we do', h2: 'From one page to a store',
      items: [
        ['Landing page', 'One professional page that introduces your business and puts the contact button in front of the customer.'],
        ['Small website', 'Several pages (about, services, gallery, contact) in a design that matches your identity.'],
        ['Store with WhatsApp orders', 'Your products with a simple bag that sends you a ready order message, no complicated payment gateway.'],
        ['3D showcase', 'Your product rotates in front of the customer on your page. For businesses that sell by looks.'],
        ['Booking systems', 'A booking form for your clinic, office or salon: the customer picks the service and time and a ready message lands on your WhatsApp.']
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
  },

  tr: {
    dir: 'ltr', lang: 'tr', code: 'TR', name: 'Türkçe',
    title: 'MOHAMMED · İşletmeniz için hızlı ve güzel web siteleri',
    desc: "İşletmeniz için özel tasarımlı, hızlı ve güzel bir web sitesi yapıyoruz. Telefonda akıcı çalışır, müşteri siparişi WhatsApp'ınıza düşer. Günler içinde teslim.",
    skip: 'İçeriğe geç',
    nav: { works: 'Çalışmalarımız', about: 'Hakkımızda', services: 'Neler yapıyoruz', process: 'Nasıl çalışıyoruz', contact: 'İletişim' },
    cta: 'Sitenizi isteyin',
    hero: {
      badge: "Lansman teklifi: ilk 5 müşteriye 31 Ekim'e kadar özel şartlar",
      h1a: 'İşletmeniz için hızlı ve güzel bir web sitesi,', h1b: "müşteriniz size WhatsApp'tan ulaşsın.",
      sub: 'Küçük işletmeler için telefonda akıcı çalışan, özel tasarımlı web siteleri tasarlıyor ve yapıyoruz; günler içinde teslim ediyoruz. Arapça, İngilizce, Türkçe ve daha fazlası.',
      cta2: 'Çalışmalarımızı görün',
      chat: ['Merhaba, sipariş vermek istiyorum', 'Merhaba! Siparişiniz bize ulaştı, teşekkürler'],
      facts: ['Günler içinde teslim', 'Telefonda çalışır', "WhatsApp'tan sipariş", 'Alan adı ve içerik sizin']
    },
    pick: {
      kicker: 'Hızlı fikir', h2: 'İşletmeniz ne iş yapıyor?', sub: 'İşletmenizi seçin, size uygun site türünü önerelim.',
      build: 'Önerimiz', pkg: 'Paket', cta: "WhatsApp'tan başlayın", example: 'Örnek görün',
      waMsg: 'Merhaba, {x} bir web sitesi istiyorum. MOHAMMED sayfasından yazıyorum.',
      items: {
        food: ['Restoran veya kafe', 'İştah açan ve sipariş alan bir site', ['Telefonda hızlı açılan, güzel fotoğraflı menü', 'Hazır WhatsApp mesajlı sipariş düğmesi', 'Konum, çalışma saatleri ve yol tarifi'], "WhatsApp siparişli mağaza", 'bir restoran veya kafe için'],
        clinic: ['Klinik veya tıp merkezi', 'Hastaya güven veren ve randevu aldıran bir site', ['Temiz ve sakin bir tasarımla hizmetler ve ekip', 'Randevu: müşteri hizmeti ve saati seçer, size hazır bir mesaj gelir', 'İsterseniz birden çok dilde'], 'Küçük web sitesi + randevu', 'bir klinik veya tıp merkezi için'],
        fashion: ['Moda mağazası', 'Her parçayla renklenen şık bir mağaza', ['Hazır WhatsApp mesajıyla biten basit bir sepet', 'Telefonda akıcı deneyim', 'Karmaşık ödeme altyapısı yok'], 'WhatsApp siparişli mağaza', 'bir moda mağazası için'],
        office: ['Ofis veya şirket', 'İlk bakışta güven veren ciddi bir site', ['Net sayfalar: hakkımızda, hizmetler, iletişim', 'Hazır WhatsApp mesajıyla danışma randevusu', 'Ofisinize benzeyen kimlik ve renkler'], 'Küçük web sitesi + randevu', 'bir ofis veya şirket için'],
        maker: ['Üretici veya zanaatkâr', 'Ürününüz müşterinin önünde döner', ['Ürününüzün sayfada 3D görünümü', 'Sipariş için özel tasarım', "WhatsApp mesajıyla biten sepet"], '3D sunum', 'bir üretici veya zanaatkâr için'],
        edu: ['Okul veya eğitim', 'Anlatan ve kayıt alan bir site', ['Birden çok dil, dersler ve kayıt', 'Okulunuzu tanıtan video veya fotoğraflar', "WhatsApp'ta doğrudan iletişim"], 'Küçük web sitesi', 'bir okul veya eğitim merkezi için']
      }
    },
    works: {
      kicker: 'Çalışmalarımız', h2: 'Gurur duyduğumuz gerçek siteler ve denemeler',
      client: 'Gerçek işletmeler için projeler', showcase: 'Örnekler ve denemeler',
      open: 'Siteyi aç', shots: 'Sadece ekran görüntüsü, bağlantı istek üzerine',
      items: {
        mozaik: ['Mozaik Ofset', 'Ambalaj ve baskı şirketi, Gaziantep', 'B2B bir şirket için tanıtım sitesi ve ürün kataloğu: kutular için 3D görüntüleyici, teklif talebi ve üç dil.'],
        chocolate: ['MH Chocolate', 'Evde çikolata üreticisi, Gaziantep', 'Sürüklenerek döndürülen 3D çikolata parçaları, özel sipariş oluşturucu ve hazır bir WhatsApp mesajıyla biten sepet. Telefonda akıcı çalışır.'],
        perfume: ['MOHAMMED Parfum', 'Parfüm mağazası konsepti', '3D deneyimli bir mağaza hikâyesi: gerçekçi ışıklandırılmış şişeler, her koku için ayrı atmosfer ve sepet. Tam deneyim masaüstünde.'],
        khayt: ['Khayt · خيط', 'Moda mağazası konsepti', 'Seçilen parçaya göre renklenen, Flutter ile yapılmış hafif ve güzel bir mağaza; telefonda hızlı.'],
        furniture: ['MOHAMMED Mobilia', 'Mobilya mağazası konsepti', 'Günün saatlerine göre değişen bir evde 3D gezinti: güneş pencerelerden geçer, parçalar gözünüzün önünde kurulur, kumaş ve ahşap anında değişir. Tam deneyim masaüstünde.'],
        hazem: ['Sürücü kursu web sitesi', 'Beş dilli konsept', 'Arapça, Almanca ve daha fazla dilde sürücü kursu sitesi: video girişli ana sayfa, dersler ve kayıt sistemi.'],
        english: ['English Learning Platform', 'Eğitim platformu konsepti', "Arapça konuşanlar için A1'den C1'e İngilizce öğrenme sitesi: Arapça anlatımlı dilbilgisi, etkileşimli alıştırmalar ve ses kayıtları."]
      }
    },
    about: {
      kicker: 'Hakkımızda', h2: "MOHAMMED'in arkasında",
      p: ["MOHAMMED, Gaziantep'te Muhammed Elhuseyin tarafından yönetilen küçük bir stüdyo. Özel tasarımlı hızlı web siteleri yapıyoruz; bunların yanında Flutter ile mobil uygulamalar, işletmeler için yönetim sistemleri ve randevu sistemleri geliştiriyoruz.",
        'Akıcı bir deneyimi ve rahat, güzel bir arayüzü (UI / UX) çok önemsiyoruz; çünkü müşteriniz işletmenizi telefonunda birkaç saniyede değerlendirir. Bu yüzden küçük ayrıntılara özen gösteriyoruz: hız, hareket, renk ve size ulaşmanın kolaylığı.'],
      role: 'Geliştirici ve tasarımcı, Gaziantep',
      chips: ['Özel tasarımlı siteler', 'Mobil uygulamalar (Flutter)', "Web'de 3D", 'İşletme sistemleri', 'Randevu sistemleri', 'UI / UX']
    },
    services: {
      kicker: 'Neler yapıyoruz', h2: 'Tek sayfadan mağazaya',
      items: [
        ['Tanıtım sayfası', 'İşletmenizi ve hizmetlerinizi tanıtan, iletişim düğmesini müşterinin önüne koyan tek sayfalık profesyonel bir site.'],
        ['Küçük web sitesi', 'Kimliğinize uygun tasarımla birkaç sayfa (hakkımızda, hizmetler, galeri, iletişim).'],
        ['WhatsApp siparişli mağaza', 'Ürünleriniz ve basit bir sepet; karmaşık ödeme altyapısı olmadan size hazır bir sipariş mesajı gelir.'],
        ['3D sunum', 'Ürününüz sayfanızda müşterinin önünde döner. Görünüşüyle satılan işler için.'],
        ['Randevu sistemleri', "Klinik, ofis veya salonunuz için randevu formu: müşteri hizmeti ve saati seçer, WhatsApp'ınıza hazır bir mesaj düşer."]
      ]
    },
    process: {
      kicker: 'Nasıl çalışıyoruz', h2: 'Dört net adım',
      items: [
        ['Kısa görüşme', 'İşletmenizi ve isteklerinizi anlamak için 15 dakika.'],
        ['Tasarım', 'Tam yapıma geçmeden önce size fikri ve tasarımı gönderiyoruz.'],
        ['İnceleme ve düzeltme', 'Yazılı olarak kararlaştırılan kapsam içinde, memnun kalana kadar birlikte düzeltiyoruz.'],
        ['Yayın', 'Siteyi sizin adınıza bir alan adında yayınlıyoruz; içerik size ait kalır.']
      ]
    },
    contact: {
      kicker: 'İletişim', h2: 'Bize işletmenizi anlatın', lead: 'İşletmeniz hakkında kısa bir not gönderin; taahhüt olmadan sitenize dair net bir fikirle dönelim.',
      linkedin: "LinkedIn'den yazın", wa: "WhatsApp'tan yazın", waTip: 'Bize yazın', waMsg: 'Merhaba, işletmem için bir web sitesi istiyorum. MOHAMMED sayfasından yazıyorum.'
    },
    footer: { tag: 'Hızlı ve güzel web siteleri.', rights: 'Tüm hakları saklıdır', credit: 'Tasarım ve geliştirme:' }
  }
};
