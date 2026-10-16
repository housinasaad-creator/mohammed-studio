/*
  استوديو MOHAMMED: كل النصوص والروابط هنا. ثلاث لغات: ar / en / tr (الرمز code يظهر في مبدّل اللغة بحرفين لاتينيين).
  الأعمال: WORKS (الترتيب والمجموعة والروابط)، وتفاصيل كل مشروع (صور وشرح) في cases.js.
  لا تقييمات ولا أرقام عملاء ولا أسماء منافسين: نضيف فقط ما هو حقيقي ومؤكَّد.
*/
export const CONFIG = {
  BRAND: 'MOHAMMED',
  CREDIT: 'Muhammed Elhuseyin',
  LINKEDIN: 'https://www.linkedin.com/in/muhammed-elhuseyin-702a5b213/',
  INSTAGRAM: 'https://www.instagram.com/mjh.6_6/',
  INSTAGRAM_SHOW: '@mjh.6_6',
  WA_NUMBER: '905537410520',  // بالصيغة الدولية بدون + ؛ فارغ = يُخفى زر واتساب والرقم
  WA_SHOW: '+90 553 741 05 20', // نص الرقم المعروض (يُعرض دائماً من اليسار لليمين)
  DEFAULT_LANG: 'ar',
  YEAR: 2026
};

/* group: real = مشاريع حقيقية (لعملاء أو مشروع خاص)، show = نماذج وتجارب. wip = جارٍ العمل عليه. hidden = لا يظهر. year = سنة التنفيذ */
export const WORKS = [
  { id: 'mozaik', group: 'real', year: 2026, url: 'https://housinasaad-creator.github.io/mozaik/', tags: ['B2B', '3D', 'TR · EN · AR'] },
  { id: 'chocolate', group: 'real', year: 2026, url: 'https://housinasaad-creator.github.io/mh-chocolate-site/', tags: ['3D', 'WhatsApp', 'Mobile'] },
  { id: 'packaging', group: 'real', year: 2026, url: 'https://housinasaad-creator.github.io/fortunepack-site/', tags: ['3D fold', 'Box studio', 'TR · EN · AR'] },
  { id: 'english', group: 'real', year: 2026, url: 'https://housinasaad-creator.github.io/english-learning-platform/', tags: ['Education', 'A1 → C1', 'Audio'] },
  { id: 'tekton', group: 'show', year: 2026, wip: true, url: 'https://housinasaad-creator.github.io/tekton-construction-site/', tags: ['3D story', 'Site lab', 'AR · TR · EN'] },
  { id: 'perfume', group: 'show', year: 2026, url: 'https://housinasaad-creator.github.io/mohammed-perfume-site/', tags: ['3D', 'Store', 'AR · EN'] },
  { id: 'hayyak', group: 'show', year: 2026, url: 'https://housinasaad-creator.github.io/hayyak-coffee-site/', tags: ['3D', 'Wholesale', 'AR · TR · EN'] },
  { id: 'furniture', group: 'show', year: 2026, url: 'https://housinasaad-creator.github.io/mohammed-furniture-site/', tags: ['3D', 'Store', 'TR · EN · AR'] },
  { id: 'khayt', group: 'show', year: 2026, url: 'https://housinasaad-creator.github.io/khayt-fashion-store/', tags: ['Flutter', 'Store', 'Mobile'] },
  { id: 'hazem', group: 'show', year: 2026, url: 'https://housinasaad-creator.github.io/hazem-driving-school/', tags: ['5 languages', 'Video hero'] }
];
/* المشاريع المعروضة في الصفحة الرئيسية قبل زر "المزيد" */
export const FEATURED = ['chocolate', 'perfume'];

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
    title: 'MOHAMMED · مواقع تُبهر من أول نظرة',
    desc: 'نبني لنشاطك موقعاً بتصميم خاص وحركة وثلاثي الأبعاد، سريعاً وسلساً على كل الأجهزة، وزبونك يصلك على واتساب. بسعر موقع عادي.',
    skip: 'تخطَّ إلى المحتوى',
    nav: { works: 'مشاريعي', why: 'لماذا نحن', services: 'ما نقدّمه', about: 'من نحن', contact: 'تواصل' },
    cta: 'اطلب موقعك', up: 'إلى أعلى الصفحة', menu: 'القائمة',
    hero: {
      badge: 'عرض الإطلاق: أول 5 عملاء بشروط خاصة حتى 31 أكتوبر',
      scroll: 'مرّر لتستكشف', cta2: 'شاهد مشاريعي',
      ch: [
        ['استوديو ويب · غازي عنتاب', 'موقعٌ يجعل الناس تتوقف لتنظر.', 'تصميم خاص وحركة حقيقية وثلاثي الأبعاد، يُبنى بسرعة ويعمل بسلاسة على الجوال والكمبيوتر.'],
        ['٠١ · التصميم', 'يُصمَّم لأجلك، لا قالب جاهز.', 'لكل موقع شكله وحركته وشخصيته، فيتذكّر الزبون نشاطك.'],
        ['٠٢ · السرعة', 'سريع وسلس على كل الأجهزة.', 'لا يُحمَّل إلا ما تراه، فتفتح الصفحة بسرعة وتبقى سلسة على الجوال والكمبيوتر.'],
        ['٠٣ · الطلبات', 'وزبونك يصلك على واتساب.', 'لمسة واحدة تصلك منها رسالة جاهزة بطلبه أو سؤاله، بدون بوابة دفع معقّدة.']
      ],
      chat: ['مرحباً، أريد أن أطلب', 'أهلاً! وصلنا طلبك، شكراً لك']
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
    featured: { kicker: 'من أعمالنا', h2: 'مشروعان نعتزّ بهما', more: 'كل مشاريعي' },
    works: {
      kicker: 'مشاريعي', h2: 'كل ما بنيناه، بحركته الحقيقية', lead: 'مرّر فوق أي مشروع لترى لقطات سريعة من داخله، ثم اضغط «المزيد» لتقرأ قصته وترى صوره.',
      groups: { real: 'مشاريع حقيقية', show: 'نماذج وتجارب' },
      open: 'افتح الموقع', more: 'المزيد', wip: 'جارٍ العمل عليه، لم ينتهِ بعد', filters: { all: 'الكل', real: 'مشاريع حقيقية', show: 'نماذج وتجارب' },
      items: {
        mozaik: ['Mozaik Ofset', 'شركة تغليف وطباعة، غازي عنتاب', 'موقع تعريفي وكتالوج منتجات لشركة B2B: عرض ثلاثي الأبعاد للعلب، طلب عرض سعر، وثلاث لغات.'],
        chocolate: ['MH Chocolate', 'صانعة شوكولا منزلية، غازي عنتاب', 'قطع شوكولا ثلاثية الأبعاد تُدار بالسحب، وتصميم خاص للطلب، وسلة تنتهي برسالة واتساب جاهزة. يعمل بسلاسة على الجوال.'],
        packaging: ['موقع مصنّع تغليف', 'كرتون مضلّع، غازي عنتاب', 'موقع بثلاث لغات: علبة تنطوي أمامك مع التمرير، ومولّد قالب قصّ حيّ بمقاساتك، وكتالوج منتجات، وطلب عرض سعر عبر واتساب. التجربة الكاملة على الكمبيوتر.'],
        english: ['منصة تعلّم الإنجليزية', 'منصة تعليمية، مشروعنا الخاص', 'منصة لتعلّم الإنجليزية بالعربية من A1 إلى C1: شرح للقواعد بالعربي، تمارين تفاعلية، وتسجيلات صوتية.'],
        tekton: ['TEKTON · تكتون', 'موقع شركة إنشاءات', 'قصة بالتمرير من مخطط مرسوم إلى مبنى مضيء: البرج يرتفع تحت رافعة، والخرسانة تُعالَج وتُكسر، وطبقات أشعة، وطاولة مجسّمات ومختبر موقع. ما زال قيد العمل. التجربة الكاملة على الكمبيوتر.'],
        perfume: ['MOHAMMED Parfum', 'نموذج متجر عطور', 'قصة متجر بتجربة ثلاثية الأبعاد: زجاجات حقيقية الإضاءة، وجو لكل عطر، ومدّة العطر على الجلد، وسلة. التجربة الكاملة على الكمبيوتر.'],
        hayyak: ['HAYYAK · حيّاك', 'نموذج محمصة قهوة', 'رحلة قهوة ثلاثية الأبعاد: من حبّة الهيل إلى البنّ والتحميص والطحن، والدلّة على الجمر، وفنجان يُهَزّ. بالعربية والتركية والإنجليزية. التجربة الكاملة على الكمبيوتر.'],
        furniture: ['MOHAMMED Mobilia', 'نموذج موقع أثاث', 'جولة ثلاثية الأبعاد في بيت يتغيّر مع ساعات اليوم: الشمس تعبر النوافذ، والقطع تُبنى أمامك، ويتبدّل القماش والخشب مباشرة. التجربة الكاملة على الكمبيوتر.'],
        khayt: ['Khayt · خيط', 'نموذج متجر أزياء', 'متجر خفيف وجميل يتلوّن مع القطعة المختارة، مبني بـ Flutter ويعمل بسرعة على الجوال.'],
        hazem: ['موقع مدرسة قيادة', 'نموذج موقع بخمس لغات', 'موقع لمدرسة قيادة بالعربية والألمانية وغيرها: فيديو بالواجهة، دروس، ونظام تسجيل.']
      }
    },
    demos: {
      kicker: 'حركة تبيع', h2: 'جرّب الحركات بنفسك', sub: 'ثلاث عيّنات صغيرة من الحركات التي نبنيها لمواقعنا. اسحب واضغط وشاهد الفرق.',
      coffee: { t: 'حمّصها', p: 'اسحب الحرارة وشاهد الحبّة تتغيّر.', unit: '°م', stages: ['أخضر', 'أصفر', 'قرفي', 'مدينة', 'مدينة كاملة', 'داكن'], c1: 'الطقطقة الأولى', c2: 'الطقطقة الثانية' },
      perfume: { t: 'اثنتا عشرة ساعة على الجلد', p: 'اضغط تشغيل وشاهد العطر يفتح ويتفتّح ويستقر.', play: 'تشغيل', pause: 'إيقاف', notes: ['الرأس: زعفران وبرغموت', 'القلب: ورد وعود', 'القاعدة: عنبر ومسك'], hours: 'ساعة' },
      choco: { t: 'ذوّبها', p: 'سخّن الغرفة وشاهد الشوكولا تستسلم.', unit: '°م', states: ['طقطقة مثالية', 'تلين', 'تذوب'] },
      see: 'شاهد المشروع كاملاً'
    },
    why: {
      kicker: 'لماذا نحن', h2: 'الفرق بيننا وبين غيرنا، بكلمات بسيطة',
      cols: ['عادةً عند غيرنا', 'عندنا'],
      rows: [
        ['التصميم', 'قالب جاهز بشعارك', 'تصميم خاص بُني لنشاطك'],
        ['الحركة والثلاثي الأبعاد', 'نادرة، أو ثقيلة وبطيئة', 'حركة حقيقية وثلاثي أبعاد يبقى سلساً'],
        ['السرعة على الجوال', 'غالباً بطيء، يحمّل كل شيء دفعة واحدة', 'لا يُحمَّل إلا ما تراه، فيفتح بسرعة'],
        ['السعر', 'العمل الخاص يُسعَّر عادةً بأسعار الشركات الكبيرة', 'بسعر موقع عادي، وأحياناً أقل'],
        ['الملكية', 'مربوط بالشركة المنفّذة', 'النطاق والمحتوى ملكك'],
        ['الردّ', 'أيام، وللأسئلة الكبيرة فقط', 'نرد على كل استفسار مهما كان صغيراً'],
        ['التسليم', 'أسابيع', 'أيام']
      ],
      priceT: 'موقع يُبهر الزائر، بسعر موقع عادي.', priceP: 'المواقع بهذا المستوى من التصميم والحركة تُسعَّر عادةً بأكثر بكثير. نحن نبنيها بأنفسنا وبسرعة وبدون طبقات وسطاء، فنقدّمها بسعر الموقع العادي عند غيرنا، وأحياناً بأقل.',
      challengeT: 'السرعة والجودة والسلاسة على كل الأجهزة', challengeP: 'نقف خلف هذا الكلام، ونرحّب بأي مقارنة: افتح موقعنا وموقع أي مطوّر آخر على الجوال نفسه وانظر بنفسك. نقولها باحترام لكل زملاء المهنة، وبثقة بما نبنيه.',
      cta: 'اطلب عرضاً بسعر واضح'
    },
    prog: {
      kicker: 'البرمجة', h2: 'كود نكتبه بأيدينا، لا قوالب جاهزة', sub: 'كل سطر مكتوب لموقعك: خفيف في التحميل، واضح في التنظيم، ويستطيع أي مطوّر إكماله لاحقاً.',
      points: ['بلا إضافات ثقيلة', 'الصور والفيديو لا تُحمَّل إلا حين تظهر', 'يعمل على الجوالات القديمة', 'حركة تتوقف حين تخرج من الشاشة'],
      chips: ['HTML', 'CSS', 'JavaScript', 'three.js', 'Flutter', 'طلب عبر واتساب', 'حجز المواعيد']
    },
    steps: {
      kicker: 'خطوات التواصل', h2: 'سهلة جداً، ولن تأخذ من وقتك',
      items: [['اكتب لنا', 'سطر واحد على واتساب أو انستغرام يكفي.'], ['نردّ بفكرة', 'فكرة واضحة وعرض سعر، بدون أي التزام.'], ['نبني ونسلّم', 'تراجع معنا، نعدّل، ثم ننشر الموقع باسمك.']],
      promise: 'أي استفسار نردّ عليه مهما كان صغيراً.'
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
    contact: {
      kicker: 'تواصل', h2: 'احكِ لنا عن نشاطك', lead: 'أرسل رسالة قصيرة عن نشاطك، ونرد بفكرة واضحة لموقعك بدون التزام.',
      linkedin: 'لينكدإن', instagram: 'انستغرام', wa: 'راسلنا على واتساب', waTip: 'اكتب لنا', waMsg: 'مرحباً، أرغب بموقع لنشاطي. أرسلت لكم من صفحة MOHAMMED.'
    },
    footer: { tag: 'مواقع تُبهر من أول نظرة.', rights: 'جميع الحقوق محفوظة', credit: 'تصميم وتطوير' },
    list: { kicker: 'مشاريعي', h2: 'كل المشاريع', back: 'الرئيسية', empty: '' },
    case: {
      back: 'كل المشاريع', open: 'افتح الموقع', ask: 'أريد موقعاً مثل هذا', real: 'مشروع حقيقي', show: 'نموذج وتجربة', wip: 'جارٍ العمل عليه، لم ينتهِ بعد',
      facts: { type: 'النوع', year: 'السنة', role: 'دورنا', langs: 'اللغات', stack: 'التقنيات' }, role: 'تصميم وبرمجة',
      about: 'عن المشروع', inside: 'ماذا بداخله', phones: 'على الجوال', highlights: 'أبرز ما فيه', more: 'مشروع آخر', prev: 'السابق', next: 'التالي',
      ctaT: 'هل تريد موقعاً بهذا المستوى؟', ctaP: 'أخبرنا عن نشاطك ونردّ بفكرة واضحة وسعر واضح، بدون التزام.', close: 'إغلاق', kinds: { motion: 'حركة', model: 'ثلاثي الأبعاد', cursor: 'المؤشر', ui: 'الواجهة', lang: 'اللغات', phone: 'الجوال' },
      waMsg: 'مرحباً، أعجبني مشروع {x} على موقعكم وأريد موقعاً بهذا المستوى لنشاطي.', soon: 'قريباً'
    }
  },

  en: {
    dir: 'ltr', lang: 'en', code: 'EN', name: 'English',
    title: 'MOHAMMED · Websites that wow at first sight',
    desc: 'We build custom websites with motion and 3D, fast and smooth on every device, with customers reaching you on WhatsApp. At the price of an ordinary site.',
    skip: 'Skip to content',
    nav: { works: 'My projects', why: 'Why us', services: 'What we do', about: 'About', contact: 'Contact' },
    cta: 'Get your website', up: 'Back to top', menu: 'Menu',
    hero: {
      badge: 'Launch offer: the first 5 clients, special terms until October 31',
      scroll: 'Scroll to explore', cta2: 'See my projects',
      ch: [
        ['Web studio · Gaziantep', 'A website that makes people stop and look.', 'Custom design, real motion and 3D, built fast and smooth for phones and desktops.'],
        ['01 · Design', 'Designed for you. Never a template.', 'Every site gets its own look, motion and personality, so customers remember your business.'],
        ['02 · Speed', 'Fast and smooth on every device.', 'Only what you see is loaded, so pages open quickly and stay smooth on phones and desktops.'],
        ['03 · Orders', 'And customers reach you on WhatsApp.', 'One tap sends you a ready message with their order or question. No complicated payment gateway.']
      ],
      chat: ['Hi, I would like to order', 'Hello! We got your order, thank you']
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
    featured: { kicker: 'Selected work', h2: 'Two projects we are proud of', more: 'All my projects' },
    works: {
      kicker: 'My projects', h2: 'Everything we built, in real motion', lead: 'Hover any project for a quick look inside, then press “More” to read its story and see its pictures.',
      groups: { real: 'Real projects', show: 'Showcases and experiments' },
      open: 'Open the site', more: 'More', wip: 'Work in progress, not finished yet', filters: { all: 'All', real: 'Real projects', show: 'Showcases' },
      items: {
        mozaik: ['Mozaik Ofset', 'Packaging and printing company, Gaziantep', 'A company site and product catalogue for a B2B business: 3D box viewer, quote requests and three languages.'],
        chocolate: ['MH Chocolate', 'Home chocolatier, Gaziantep', 'Draggable 3D chocolate pieces, a custom order builder and a bag that ends in a ready WhatsApp message. Runs smoothly on phones.'],
        packaging: ['Packaging manufacturer website', 'Corrugated packaging, Gaziantep', 'A three-language site: a box that folds as you scroll, a live die-line generator with your own dimensions, a product catalogue and a WhatsApp quote request. Best on desktop.'],
        english: ['English Learning Platform', 'Education platform, our own project', 'An English-learning site for Arabic speakers from A1 to C1: grammar explained in Arabic, interactive exercises and audio recordings.'],
        tekton: ['TEKTON · تكتون', 'Construction company website', 'A scroll story from a drawn plan to a lit building: the tower rises under a crane, concrete cures and is crushed, X-ray layers, a model table and a site lab. Still being built. Best on desktop.'],
        perfume: ['MOHAMMED Parfum', 'Fragrance store concept', 'A store story with a 3D experience: realistically lit bottles, a mood per scent, how long the scent lasts on skin, and a bag. Best on desktop.'],
        hayyak: ['HAYYAK · حيّاك', 'Coffee roaster concept', 'A 3D coffee journey: cardamom to bean, roast, grind, the dallah on the embers and a cup you can shake. In Arabic, Turkish and English. Best on desktop.'],
        furniture: ['MOHAMMED Mobilia', 'Furniture store concept', 'A 3D walk through a home that changes with the hours of the day: sun crossing the windows, pieces that build themselves in front of you, and live fabric and wood swaps. Best on desktop.'],
        khayt: ['Khayt · خيط', 'Fashion store concept', 'A light, beautiful store that recolours with the chosen piece, built with Flutter and fast on phones.'],
        hazem: ['Driving school website', 'A five-language concept', 'A driving school site in Arabic, German and more: video hero, lessons and a sign-up system.']
      }
    },
    demos: {
      kicker: 'Motion that sells', h2: 'Try the animations yourself', sub: 'Three small samples of the kind of motion we build for our sites. Drag, press play and feel the difference.',
      coffee: { t: 'Roast it', p: 'Drag the temperature and watch the bean change.', unit: '°C', stages: ['Green', 'Yellow', 'Cinnamon', 'City', 'Full city', 'Dark'], c1: 'First crack', c2: 'Second crack' },
      perfume: { t: 'Twelve hours on skin', p: 'Press play and watch the scent open, bloom and settle.', play: 'Play', pause: 'Pause', notes: ['Top: saffron and bergamot', 'Heart: rose and oud', 'Base: amber and musk'], hours: 'h' },
      choco: { t: 'Melt it', p: 'Warm the room and watch the chocolate give in.', unit: '°C', states: ['Perfect snap', 'Softening', 'Melting'] },
      see: 'See the full project'
    },
    why: {
      kicker: 'Why us', h2: 'The difference between us and the rest, in plain words',
      cols: ['Usually elsewhere', 'With us'],
      rows: [
        ['Design', 'A template with your logo', 'A custom design built for your business'],
        ['Motion and 3D', 'Rare, or heavy and slow', 'Real motion and 3D that stays smooth'],
        ['Speed on phones', 'Often slow, loads everything at once', 'Loads only what you see, so it opens fast'],
        ['Price', 'Custom work is usually priced like a big agency', 'The price of an ordinary site, sometimes less'],
        ['Ownership', 'Tied to the company that built it', 'Domain and content are yours'],
        ['Replies', 'Days, and only for big questions', 'Every inquiry answered, however small'],
        ['Delivery', 'Weeks', 'Days']
      ],
      priceT: 'A site that wows visitors, at the price of an ordinary one.', priceP: 'Sites with this level of design and motion normally cost far more. We build them ourselves, fast, with no layers of middlemen, so we offer them at what an ordinary site costs elsewhere, and sometimes less.',
      challengeT: 'Speed, quality and smoothness on every device', challengeP: 'We stand behind it and welcome any comparison: open our site and anyone else’s on the same phone and judge for yourself. We say it with respect for everyone in the craft, and with confidence in what we build.',
      cta: 'Ask for a clear quote'
    },
    prog: {
      kicker: 'Code', h2: 'Hand-written code, not page builders', sub: 'Every line is written for your site: light to load, clearly organised, and any developer can continue it later.',
      points: ['No heavy plugins', 'Images and video load only when they appear', 'Works on older phones', 'Motion stops when it leaves the screen'],
      chips: ['HTML', 'CSS', 'JavaScript', 'three.js', 'Flutter', 'WhatsApp ordering', 'Booking systems']
    },
    steps: {
      kicker: 'How to reach us', h2: 'Very easy, and it will not take your time',
      items: [['Write to us', 'One line on WhatsApp or Instagram is enough.'], ['We reply with an idea', 'A clear idea and a quote, no commitment.'], ['We build and deliver', 'You review with us, we adjust, then we publish the site in your name.']],
      promise: 'Any inquiry gets an answer, however small.'
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
    contact: {
      kicker: 'Contact', h2: 'Tell us about your business', lead: 'Send a short note about your business and we reply with a clear idea for your site, no obligation.',
      linkedin: 'LinkedIn', instagram: 'Instagram', wa: 'Message us on WhatsApp', waTip: 'Message us', waMsg: 'Hello, I would like a website for my business. I wrote from the MOHAMMED page.'
    },
    footer: { tag: 'Websites that wow at first sight.', rights: 'All rights reserved', credit: 'Designed & developed by' },
    list: { kicker: 'My projects', h2: 'All projects', back: 'Home', empty: '' },
    case: {
      back: 'All projects', open: 'Open the site', ask: 'I want a site like this', real: 'Real project', show: 'Showcase', wip: 'Work in progress, not finished yet',
      facts: { type: 'Type', year: 'Year', role: 'Our role', langs: 'Languages', stack: 'Built with' }, role: 'Design and development',
      about: 'About the project', inside: 'What is inside', phones: 'On phones', highlights: 'Highlights', more: 'More projects', prev: 'Previous', next: 'Next',
      ctaT: 'Want a site at this level?', ctaP: 'Tell us about your business and we reply with a clear idea and a clear price, no obligation.', close: 'Close', kinds: { motion: 'Motion', model: '3D model', cursor: 'Cursor', ui: 'Interface', lang: 'Languages', phone: 'Mobile' },
      waMsg: 'Hello, I liked the {x} project on your site and I want a website at this level for my business.', soon: 'Soon'
    }
  },

  tr: {
    dir: 'ltr', lang: 'tr', code: 'TR', name: 'Türkçe',
    title: 'MOHAMMED · İlk bakışta etkileyen web siteleri',
    desc: "İşletmeniz için özel tasarım, hareket ve 3D ile hızlı ve akıcı web siteleri yapıyoruz; müşteri size WhatsApp'tan ulaşır. Sıradan bir sitenin fiyatına.",
    skip: 'İçeriğe geç',
    nav: { works: 'Projelerim', why: 'Neden biz', services: 'Neler yapıyoruz', about: 'Hakkımızda', contact: 'İletişim' },
    cta: 'Sitenizi isteyin', up: 'Yukarı çık', menu: 'Menü',
    hero: {
      badge: "Lansman teklifi: ilk 5 müşteriye 31 Ekim'e kadar özel şartlar",
      scroll: 'Keşfetmek için kaydırın', cta2: 'Projelerimi görün',
      ch: [
        ['Web stüdyosu · Gaziantep', 'İnsanları durdurup baktıran bir web sitesi.', 'Özel tasarım, gerçek hareket ve 3D; hızlı kurulur, telefonda ve bilgisayarda akıcı çalışır.'],
        ['01 · Tasarım', 'Sizin için tasarlanır, hazır şablon değil.', 'Her sitenin kendi görünümü, hareketi ve kişiliği vardır; müşteriniz işletmenizi hatırlar.'],
        ['02 · Hız', 'Her cihazda hızlı ve akıcı.', 'Yalnızca gördüğünüz yüklenir; sayfa hızlı açılır, telefonda ve bilgisayarda akıcı kalır.'],
        ['03 · Sipariş', "Müşteriniz size WhatsApp'tan ulaşır.", 'Tek dokunuşla sipariş veya sorusu hazır bir mesaj olarak size gelir; karmaşık ödeme altyapısı yok.']
      ],
      chat: ['Merhaba, sipariş vermek istiyorum', 'Merhaba! Siparişiniz bize ulaştı, teşekkürler']
    },
    pick: {
      kicker: 'Hızlı fikir', h2: 'İşletmeniz ne iş yapıyor?', sub: 'İşletmenizi seçin, size uygun site türünü önerelim.',
      build: 'Önerimiz', pkg: 'Paket', cta: "WhatsApp'tan başlayın", example: 'Örnek görün',
      waMsg: 'Merhaba, {x} bir web sitesi istiyorum. MOHAMMED sayfasından yazıyorum.',
      items: {
        food: ['Restoran veya kafe', 'İştah açan ve sipariş alan bir site', ['Telefonda hızlı açılan, güzel fotoğraflı menü', 'Hazır WhatsApp mesajlı sipariş düğmesi', 'Konum, çalışma saatleri ve yol tarifi'], 'WhatsApp siparişli mağaza', 'bir restoran veya kafe için'],
        clinic: ['Klinik veya tıp merkezi', 'Hastaya güven veren ve randevu aldıran bir site', ['Temiz ve sakin bir tasarımla hizmetler ve ekip', 'Randevu: müşteri hizmeti ve saati seçer, size hazır bir mesaj gelir', 'İsterseniz birden çok dilde'], 'Küçük web sitesi + randevu', 'bir klinik veya tıp merkezi için'],
        fashion: ['Moda mağazası', 'Her parçayla renklenen şık bir mağaza', ['Hazır WhatsApp mesajıyla biten basit bir sepet', 'Telefonda akıcı deneyim', 'Karmaşık ödeme altyapısı yok'], 'WhatsApp siparişli mağaza', 'bir moda mağazası için'],
        office: ['Ofis veya şirket', 'İlk bakışta güven veren ciddi bir site', ['Net sayfalar: hakkımızda, hizmetler, iletişim', 'Hazır WhatsApp mesajıyla danışma randevusu', 'Ofisinize benzeyen kimlik ve renkler'], 'Küçük web sitesi + randevu', 'bir ofis veya şirket için'],
        maker: ['Üretici veya zanaatkâr', 'Ürününüz müşterinin önünde döner', ['Ürününüzün sayfada 3D görünümü', 'Sipariş için özel tasarım', 'WhatsApp mesajıyla biten sepet'], '3D sunum', 'bir üretici veya zanaatkâr için'],
        edu: ['Okul veya eğitim', 'Anlatan ve kayıt alan bir site', ['Birden çok dil, dersler ve kayıt', 'Okulunuzu tanıtan video veya fotoğraflar', "WhatsApp'ta doğrudan iletişim"], 'Küçük web sitesi', 'bir okul veya eğitim merkezi için']
      }
    },
    featured: { kicker: 'Seçilmiş işler', h2: 'Gurur duyduğumuz iki proje', more: 'Tüm projelerim' },
    works: {
      kicker: 'Projelerim', h2: 'Yaptığımız her şey, gerçek hareketiyle', lead: 'Bir projenin üzerine gelin, içinden hızlı görüntüler izleyin; sonra “Daha fazla” ile hikâyesini okuyun ve fotoğraflarını görün.',
      groups: { real: 'Gerçek projeler', show: 'Örnekler ve denemeler' },
      open: 'Siteyi aç', more: 'Daha fazla', wip: 'Üzerinde çalışılıyor, henüz bitmedi', filters: { all: 'Tümü', real: 'Gerçek projeler', show: 'Örnekler' },
      items: {
        mozaik: ['Mozaik Ofset', 'Ambalaj ve baskı şirketi, Gaziantep', 'B2B bir şirket için tanıtım sitesi ve ürün kataloğu: kutular için 3D görüntüleyici, teklif talebi ve üç dil.'],
        chocolate: ['MH Chocolate', 'Evde çikolata üreticisi, Gaziantep', 'Sürüklenerek döndürülen 3D çikolata parçaları, özel sipariş oluşturucu ve hazır bir WhatsApp mesajıyla biten sepet. Telefonda akıcı çalışır.'],
        packaging: ['Ambalaj üreticisi web sitesi', 'Oluklu ambalaj, Gaziantep', 'Üç dilli bir site: kaydırdıkça katlanan kutu, ölçülerinize göre canlı kesim şablonu üreteci, ürün kataloğu ve WhatsApp teklif talebi. Tam deneyim masaüstünde.'],
        english: ['English Learning Platform', 'Eğitim platformu, kendi projemiz', "Arapça konuşanlar için A1'den C1'e İngilizce öğrenme sitesi: Arapça anlatımlı dilbilgisi, etkileşimli alıştırmalar ve ses kayıtları."],
        tekton: ['TEKTON · تكتون', 'İnşaat şirketi web sitesi', 'Çizilmiş bir plandan ışıl ışıl bir binaya kaydırmalı hikâye: kule vincin altında yükselir, beton kürlenir ve kırılır, röntgen katmanları, maket masası ve şantiye laboratuvarı. Hâlâ yapım aşamasında. Tam deneyim masaüstünde.'],
        perfume: ['MOHAMMED Parfum', 'Parfüm mağazası konsepti', '3D deneyimli bir mağaza hikâyesi: gerçekçi ışıklandırılmış şişeler, her koku için ayrı atmosfer, kokunun ciltte kalma süresi ve sepet. Tam deneyim masaüstünde.'],
        hayyak: ['HAYYAK · حيّاك', 'Kahve kavurucusu konsepti', '3D bir kahve yolculuğu: kakuleden çekirdeğe, kavurma, öğütme, közdeki dallah ve sallanan bir fincan. Arapça, Türkçe ve İngilizce. Tam deneyim masaüstünde.'],
        furniture: ['MOHAMMED Mobilia', 'Mobilya mağazası konsepti', 'Günün saatlerine göre değişen bir evde 3D gezinti: güneş pencerelerden geçer, parçalar gözünüzün önünde kurulur, kumaş ve ahşap anında değişir. Tam deneyim masaüstünde.'],
        khayt: ['Khayt · خيط', 'Moda mağazası konsepti', 'Seçilen parçaya göre renklenen, Flutter ile yapılmış hafif ve güzel bir mağaza; telefonda hızlı.'],
        hazem: ['Sürücü kursu web sitesi', 'Beş dilli konsept', 'Arapça, Almanca ve daha fazla dilde sürücü kursu sitesi: video girişli ana sayfa, dersler ve kayıt sistemi.']
      }
    },
    demos: {
      kicker: 'Satan hareket', h2: 'Animasyonları kendiniz deneyin', sub: 'Sitelerimiz için yaptığımız hareketlerden üç küçük örnek. Sürükleyin, oynatın ve farkı görün.',
      coffee: { t: 'Kavurun', p: 'Sıcaklığı sürükleyin, çekirdeğin değişimini izleyin.', unit: '°C', stages: ['Yeşil', 'Sarı', 'Tarçın', 'City', 'Full city', 'Koyu'], c1: 'Birinci çatlama', c2: 'İkinci çatlama' },
      perfume: { t: 'Ciltte on iki saat', p: 'Oynata basın; koku açılıyor, çiçek açıyor ve yerleşiyor.', play: 'Oynat', pause: 'Durdur', notes: ['Üst: safran ve bergamot', 'Kalp: gül ve ud', 'Taban: amber ve misk'], hours: 's' },
      choco: { t: 'Eritin', p: 'Odayı ısıtın, çikolatanın teslim oluşunu izleyin.', unit: '°C', states: ['Mükemmel çıtırtı', 'Yumuşuyor', 'Eriyor'] },
      see: 'Projenin tamamını gör'
    },
    why: {
      kicker: 'Neden biz', h2: 'Bizimle diğerleri arasındaki fark, sade sözlerle',
      cols: ['Genellikle başka yerde', 'Bizde'],
      rows: [
        ['Tasarım', 'Logonuz konmuş hazır şablon', 'İşletmeniz için özel tasarım'],
        ['Hareket ve 3D', 'Nadir ya da ağır ve yavaş', 'Akıcı kalan gerçek hareket ve 3D'],
        ['Telefonda hız', 'Çoğu zaman yavaş, her şeyi birden yükler', 'Yalnızca gördüğünüzü yükler, hızlı açılır'],
        ['Fiyat', 'Özel iş genelde büyük ajans fiyatına satılır', 'Sıradan bir sitenin fiyatına, bazen daha ucuza'],
        ['Mülkiyet', 'Yapan şirkete bağlı', 'Alan adı ve içerik sizin'],
        ['Yanıt', 'Günler, o da yalnızca büyük sorulara', 'Her soruya, ne kadar küçük olursa olsun yanıt'],
        ['Teslim', 'Haftalar', 'Günler']
      ],
      priceT: 'Ziyaretçiyi etkileyen bir site, sıradan bir sitenin fiyatına.', priceP: 'Bu seviyede tasarım ve hareketli siteler normalde çok daha pahalıdır. Biz kendimiz, hızlıca ve aracı katmanları olmadan yaptığımız için başka yerde sıradan bir sitenin maliyetine, bazen daha ucuza sunuyoruz.',
      challengeT: 'Her cihazda hız, kalite ve akıcılık', challengeP: 'Arkasında duruyoruz ve her karşılaştırmaya açığız: bizim sitemizi ve başkasınınkini aynı telefonda açın, kendiniz karar verin. Bunu meslektaşlarımıza saygıyla, yaptığımız işe güvenle söylüyoruz.',
      cta: 'Net bir teklif isteyin'
    },
    prog: {
      kicker: 'Kod', h2: 'Elle yazılmış kod, hazır sayfa oluşturucu değil', sub: 'Her satır sitenize özel yazılır: yüklemesi hafif, düzeni net ve herhangi bir geliştirici sonradan devam edebilir.',
      points: ['Ağır eklentiler yok', 'Görsel ve video yalnızca göründüğünde yüklenir', 'Eski telefonlarda çalışır', 'Hareket ekrandan çıkınca durur'],
      chips: ['HTML', 'CSS', 'JavaScript', 'three.js', 'Flutter', 'WhatsApp siparişi', 'Randevu sistemleri']
    },
    steps: {
      kicker: 'Bize ulaşmak', h2: 'Çok kolay ve vaktinizi almaz',
      items: [['Bize yazın', "WhatsApp veya Instagram'dan tek satır yeter."], ['Fikirle dönüyoruz', 'Net bir fikir ve fiyat teklifi, taahhüt yok.'], ['Yapıp teslim ediyoruz', 'Birlikte inceleriz, düzeltiriz, sonra siteyi sizin adınıza yayınlarız.']],
      promise: 'Her soruya, ne kadar küçük olursa olsun yanıt veriyoruz.'
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
    contact: {
      kicker: 'İletişim', h2: 'Bize işletmenizi anlatın', lead: 'İşletmeniz hakkında kısa bir not gönderin; taahhüt olmadan sitenize dair net bir fikirle dönelim.',
      linkedin: 'LinkedIn', instagram: 'Instagram', wa: "WhatsApp'tan yazın", waTip: 'Bize yazın', waMsg: 'Merhaba, işletmem için bir web sitesi istiyorum. MOHAMMED sayfasından yazıyorum.'
    },
    footer: { tag: 'İlk bakışta etkileyen web siteleri.', rights: 'Tüm hakları saklıdır', credit: 'Tasarım ve geliştirme:' },
    list: { kicker: 'Projelerim', h2: 'Tüm projeler', back: 'Ana sayfa', empty: '' },
    case: {
      back: 'Tüm projeler', open: 'Siteyi aç', ask: 'Böyle bir site istiyorum', real: 'Gerçek proje', show: 'Örnek', wip: 'Üzerinde çalışılıyor, henüz bitmedi',
      facts: { type: 'Tür', year: 'Yıl', role: 'Rolümüz', langs: 'Diller', stack: 'Teknolojiler' }, role: 'Tasarım ve yazılım',
      about: 'Proje hakkında', inside: 'İçinde neler var', phones: 'Telefonda', highlights: 'Öne çıkanlar', more: 'Diğer projeler', prev: 'Önceki', next: 'Sonraki',
      ctaT: 'Bu seviyede bir site ister misiniz?', ctaP: 'İşletmenizi anlatın, taahhüt olmadan net bir fikir ve net bir fiyatla dönelim.', close: 'Kapat', kinds: { motion: 'Hareket', model: '3D model', cursor: 'İmleç', ui: 'Arayüz', lang: 'Diller', phone: 'Mobil' },
      waMsg: 'Merhaba, sitenizdeki {x} projesini beğendim ve işletmem için bu seviyede bir web sitesi istiyorum.', soon: 'Yakında'
    }
  }
};
