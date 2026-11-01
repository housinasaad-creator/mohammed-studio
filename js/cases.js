/*
  صفحة الشرح لكل مشروع: اللقطات (assets/gallery) وأنواعها وشرحها بثلاث لغات.
  desk = [ملف اللقطة، نوعها: motion حركة / model ثلاثي الأبعاد / cursor المؤشر / ui واجهة / lang لغات]، والشرح cap بالترتيب نفسه.
  ph = لقطات الجوال. langs = لغات الموقع (رموز). المحتوى مأخوذ من المواقع الحيّة نفسها، ولا نضيف ما لا نراه فيها.
*/
const WEB = ['HTML', 'CSS', 'JavaScript'];

export const CASES = {
  sama: {
    langs: 'AR · TR · EN',
    desk: [['sama-1', 'ui'], ['sama-2', 'ui'], ['sama-3', 'ui'], ['sama-4', 'ui'], ['sama-5', 'ui'], ['sama-6', 'ui'], ['sama-7', 'lang']],
    ph: ['sama-m1', 'sama-m2', 'sama-m3'],
    t: {
      ar: {
        ov: { short: 'سما تدمر', ask: 'أريد تطبيقاً أو نظاماً مثل هذا', waMsg: 'مرحباً، أعجبني مشروع {x} على صفحتكم وأريد تطبيقاً أو نظاماً بهذا المستوى لنشاطي.', ctaT: 'هل تريد تطبيقاً أو نظاماً بهذا المستوى؟' },
        about: ['نظام متكامل لمدينة تدمر، يبدأ من هاتف المتطوع وينتهي بلوحة تحكم للمسؤولين. يفتح المتطوع الكاميرا فيعمل نموذج ذكاء اصطناعي داخل الهاتف، دون حاجة إلى إنترنت، ويقترح الحفر والمطبات والشقوق بمربّع على الصورة؛ فيؤكّد المتطوع نوع المشكلة ويرسل البلاغ بصورته وموقعه. وللمشاكل التي لا تلتقطها الكاميرا هناك اثنا عشر نوعاً من البلاغات: الطريق والخدمات والمخاطر والأماكن العامة.', 'تصل البلاغات فوراً إلى لوحة التحكم: خريطة بنقاط ملوّنة بحسب النوع والحالة، وفلاتر، وقائمة مباشرة، وصفحة للمتطوعين، وتقرير PDF لأي منطقة ترسمها بمستطيل على الخريطة، وإشعار على تيليغرام لكل بلاغ جديد. تُشوَّش الوجوه واللوحات داخل الهاتف قبل أن تُرسل الصورة، وتعمل الواجهات بالعربية والتركية والإنجليزية.', 'لا يوجد رابط عام للنظام لأنه مخصّص للمتطوعين والمسؤولين فقط. لقطات هذه الصفحة ببيانات تجريبية، حماية لخصوصية المتطوعين.'],
        hl: ['ذكاء اصطناعي داخل الهاتف يقترح الحفر والمطبات والشقوق بلا إنترنت', 'لوحة تحكم مباشرة: خريطة وفلاتر وإشعارات فورية', 'تقرير PDF لأي منطقة ترسمها بمستطيل على الخريطة', 'إشعار تيليغرام لكل بلاغ، وتشويش للوجوه واللوحات'],
        cap: ['لوحة التحكم: الخريطة والإشعارات المباشرة والفلاتر (بيانات تجريبية)', 'تفاصيل بلاغ: الصورة بمربع الكشف، والموقع ودقته، وعدد التأكيدات', 'فلتر النوع: «حفرة» وحدها على الخريطة وفي القوائم', 'المسطرة: ارسم مستطيلاً حول منطقة فيجهز لها تقرير PDF', 'صفحة المتطوعين: الحالة والجهاز وآخر ظهور وعدد البلاغات', 'ملاحظة تُرسَل من الإدارة إلى كل المتطوعين', 'واجهة اللوحة بالإنجليزية، وبالتركية والعربية كذلك']
      },
      en: {
        ov: { short: 'Sama Tadmor', ask: 'I want an app or system like this', waMsg: 'Hello, I liked the {x} project on your page and want an app or system at this level for my business.', ctaT: 'Want an app or system at this level?' },
        about: ['A complete system for the city of Tadmur that starts on a volunteer’s phone and ends in a control panel for administrators. The volunteer opens the camera and an AI model running inside the phone, with no internet needed, suggests potholes, bumps and cracks with a box on the image; the volunteer confirms the type and sends the report with its photo and location. For problems a camera can’t catch there are twelve report types covering roads, services, hazards and public places.', 'Reports reach the control panel at once: a map with points coloured by type and status, filters, a live feed, a volunteers page, a PDF report for any area you draw as a rectangle on the map, and a Telegram alert for every new report. Faces and licence plates are blurred inside the phone before a photo is sent, and the interfaces run in Arabic, Turkish and English.', 'There is no public link because the system is for volunteers and administrators only. The screenshots on this page use sample data to protect the volunteers’ privacy.'],
        hl: ['An AI inside the phone suggests potholes, bumps and cracks with no internet', 'A live control panel: map, filters and instant alerts', 'A PDF report for any area you draw on the map', 'A Telegram alert for each report, with faces and plates blurred'],
        cap: ['The control panel: map, live feed and filters (sample data)', 'A report’s details: the photo with the detection box, location and accuracy, and confirmations', 'Type filter: only “Pothole” on the map and in the lists', 'The ruler: draw a rectangle around an area and get a PDF report for it', 'The volunteers page: status, device, last seen and report counts', 'A note sent from the administration to all volunteers', 'The panel in English, and in Turkish and Arabic too']
      },
      tr: {
        ov: { short: 'Sama Tadmor', ask: 'Böyle bir uygulama ya da sistem istiyorum', waMsg: 'Merhaba, sayfanızdaki {x} projesini beğendim ve işletmem için bu seviyede bir uygulama ya da sistem istiyorum.', ctaT: 'Bu seviyede bir uygulama ya da sistem mi istiyorsunuz?' },
        about: ['Tedmür şehri için baştan sona bir sistem: gönüllünün telefonunda başlıyor, yöneticilerin kontrol panelinde bitiyor. Gönüllü kamerayı açınca telefonun içinde çalışan bir yapay zekâ modeli, internet gerekmeden çukur, tümsek ve çatlakları görüntüde bir kutuyla öneriyor; gönüllü sorunun türünü onaylayıp bildirimi fotoğrafı ve konumuyla gönderiyor. Kameranın yakalayamadığı sorunlar için yol, hizmetler, tehlikeler ve kamusal alanları kapsayan on iki bildirim türü var.', 'Bildirimler anında kontrol paneline düşüyor: türe ve duruma göre renklenen noktalarla bir harita, filtreler, canlı akış, gönüllüler sayfası, haritada dikdörtgenle çizdiğin her bölge için PDF rapor ve her yeni bildirim için Telegram uyarısı. Fotoğraf gönderilmeden önce yüzler ve plakalar telefonun içinde bulanıklaştırılıyor; arayüzler Arapça, Türkçe ve İngilizce çalışıyor.', 'Sistem yalnızca gönüllüler ve yöneticiler için olduğundan herkese açık bir bağlantı yok. Bu sayfadaki görüntüler, gönüllülerin gizliliğini korumak için örnek verilerle hazırlandı.'],
        hl: ['Telefonun içinde internetsiz çukur, tümsek ve çatlak öneren yapay zekâ', 'Canlı kontrol paneli: harita, filtreler ve anlık uyarılar', 'Haritada çizdiğin her bölge için PDF rapor', 'Her bildirim için Telegram uyarısı; yüzler ve plakalar bulanık'],
        cap: ['Kontrol paneli: harita, canlı akış ve filtreler (örnek veri)', 'Bir bildirimin ayrıntısı: tespit kutulu fotoğraf, konum ve doğruluğu, onay sayısı', 'Tür filtresi: haritada ve listelerde yalnızca “Çukur”', 'Cetvel: bir bölgenin çevresine dikdörtgen çiz, PDF raporu hazırlansın', 'Gönüllüler sayfası: durum, cihaz, son görülme ve bildirim sayısı', 'Yönetimin tüm gönüllülere gönderdiği not', 'Panel İngilizce; Türkçe ve Arapça da var']
      }
    }
  },
  erp: {
    langs: 'AR · EN · TR',
    desk: [['erp-1', 'ui'], ['erp-2', 'ui'], ['erp-3', 'ui'], ['erp-4', 'ui'], ['erp-5', 'ui'], ['erp-6', 'ui'], ['erp-7', 'ui'], ['erp-8', 'lang']],
    ph: ['erp-m1', 'erp-m2', 'erp-m3'],
    t: {
      ar: {
        ov: { short: 'النسيج الذهبي', ask: 'أريد نظاماً مثل هذا', waMsg: 'مرحباً، أعجبني مشروع {x} على صفحتكم وأريد نظاماً بهذا المستوى لنشاطي.', ctaT: 'هل تريد نظاماً بهذا المستوى؟' },
        about: ['نموذج نظام لإدارة مصنع ملابس، أردنا أن يرى مدير المصنع كل شيء في مكان واحد: لوحة بأرقام اليوم ومخططات الإنتاج والمبيعات الأسبوعية، وصفحة لكفاءة آلات الخياطة (OEE) تعرض التوفّر والأداء والجودة لكل آلة، وخط إنتاج تمرّ فيه كل طلبية بمراحلها من القصّ إلى التغليف.', 'ثم مستودع قماش يعرض الكميات والحدّ الأدنى وقيمة المخزون وينبّه عند انخفاضه، وإعدادات للأسعار تحسب الربح مباشرة، وتقارير يومية وشهرية. صفحتا المستخدمين والتقارير للمدير العام وحده، والواجهة بالعربية والإنجليزية والتركية بضغطة واحدة، وتعمل على الجوال بقائمة جانبية.', 'هذا نموذج ببيانات تجريبية لشركة افتراضية، وليس منشوراً للعامة، لذلك نعرضه هنا بلقطاته فقط.'],
        hl: ['لوحة بأرقام اليوم ومخططات الإنتاج والمبيعات', 'كفاءة كل آلة خياطة (OEE)', 'خط إنتاج بمراحل: قصّ، خياطة، فحص جودة، تغليف', 'مستودع قماش ينبّه عند انخفاض المخزون'],
        cap: ['لوحة التحكم: أرقام اليوم ومخططات الإنتاج والمبيعات', 'كفاءة الآلات (OEE): التوفّر والأداء والجودة لكل آلة', 'خط الإنتاج: كل طلبية ومرحلتها وتقدّمها', 'مستودع القماش: الكميات والحدّ الأدنى وقيمة المخزون', 'الإعدادات: معادلة حساب الربح والنتائج', 'المستخدمون والصلاحيات (للمدير العام فقط)', 'التقارير اليومية والشهرية وتقارير الآلات والمخزون', 'الواجهة نفسها بالإنجليزية بضغطة واحدة']
      },
      en: {
        ov: { short: 'Golden Weave', ask: 'I want a system like this', waMsg: 'Hello, I liked the {x} project on your page and want a system at this level for my business.', ctaT: 'Want a system at this level?' },
        about: ['A sample system for running a garment factory. We wanted the factory manager to see everything in one place: a dashboard with today’s numbers and weekly production and sales charts, a sewing-machine efficiency (OEE) page with availability, performance and quality for each machine, and a production line where every order moves through its stages from cutting to packaging.', 'Then a fabric warehouse showing quantities, minimum levels and stock value, with a warning when stock runs low, price settings that work out the profit live, and daily and monthly reports. The users and reports pages are for the general manager only, the interface switches between Arabic, English and Turkish in one tap, and it works on phones with a side menu.', 'This is a sample system with demo data for an imaginary company and it is not published, so it is shown here through screenshots only.'],
        hl: ['A dashboard with today’s numbers and production and sales charts', 'Efficiency of every sewing machine (OEE)', 'A production line with stages: cutting, sewing, QA, packaging', 'A fabric warehouse that warns when stock runs low'],
        cap: ['Dashboard: today’s numbers and production and sales charts', 'Machine efficiency (OEE): availability, performance and quality per machine', 'The production line: each order, its stage and progress', 'Fabric warehouse: quantities, minimum levels and stock value', 'Settings: the profit formula and results', 'Users and permissions (general manager only)', 'Daily, monthly, machine and warehouse reports', 'The same interface in English with one tap']
      },
      tr: {
        ov: { short: 'Altın Dokuma', ask: 'Böyle bir sistem istiyorum', waMsg: 'Merhaba, sayfanızdaki {x} projesini beğendim ve işletmem için bu seviyede bir sistem istiyorum.', ctaT: 'Bu seviyede bir sistem mi istiyorsunuz?' },
        about: ['Bir hazır giyim fabrikasını yönetmek için örnek bir sistem. Fabrika müdürü her şeyi tek yerde görsün istedik: günün rakamları ile haftalık üretim ve satış grafikleri olan bir pano, her makinenin hazır bulunma, performans ve kalitesini gösteren dikiş makinesi verimliliği (OEE) sayfası ve her siparişin kesimden paketlemeye aşamalardan geçtiği bir üretim hattı.', 'Sonra miktarları, asgari seviyeleri ve stok değerini gösteren, stok azalınca uyaran bir kumaş deposu, kârı anında hesaplayan fiyat ayarları ile günlük ve aylık raporlar. Kullanıcılar ve raporlar sayfaları yalnızca genel müdüre açık; arayüz tek dokunuşla Arapça, İngilizce ve Türkçe arasında değişiyor ve telefonda yan menüyle çalışıyor.', 'Bu, hayali bir şirket için demo verili bir örnek sistemdir ve yayınlanmamıştır; bu yüzden burada yalnızca görüntüleriyle gösteriliyor.'],
        hl: ['Günün rakamları, üretim ve satış grafikleri olan pano', 'Her dikiş makinesinin verimliliği (OEE)', 'Aşamalı üretim hattı: kesim, dikim, kalite kontrol, paketleme', 'Stok azalınca uyaran kumaş deposu'],
        cap: ['Pano: günün rakamları ile üretim ve satış grafikleri', 'Makine verimliliği (OEE): her makinenin hazır bulunma, performans ve kalitesi', 'Üretim hattı: her sipariş, aşaması ve ilerlemesi', 'Kumaş deposu: miktarlar, asgari seviyeler ve stok değeri', 'Ayarlar: kâr formülü ve sonuçlar', 'Kullanıcılar ve yetkiler (yalnızca genel müdür)', 'Günlük, aylık, makine ve depo raporları', 'Aynı arayüz tek dokunuşla İngilizce']
      }
    }
  },
  chocolate: {
    langs: 'TR', stack: [...WEB, 'three.js'],
    desk: [['chocolate-1', 'motion'], ['chocolate-2', 'model'], ['chocolate-3', 'model'], ['chocolate-4', 'ui'], ['chocolate-5', 'ui'], ['chocolate-6', 'motion'], ['chocolate-7', 'ui']],
    ph: ['chocolate-m1', 'chocolate-m2'],
    t: {
      ar: {
        about: ['موقع لصانعة شوكولا منزلية في غازي عنتاب. أردنا أن يعيش الزائر صناعة الشوكولا قبل أن يطلبها: لوح يتكسّر أمامه مع التمرير، وقطع تُفتح من الداخل بثلاثي الأبعاد ويديرها بإصبعه أو بالمؤشر.', 'ثم يصمّم طلبه بنفسه: الشكل ونوع الشوكولا والحشوة والطبقة المقرمشة، وتصلها رسالة واتساب جاهزة بالطلب. الموقع بالتركية ويعمل بسلاسة على الجوال.'],
        hl: ['لوح يتكسّر مع التمرير', 'قطع ثلاثية الأبعاد تُفتح من الداخل وتُدار بالسحب', 'مصمِّم طلب: شكل وشوكولا وحشوة', 'سلة تنتهي برسالة واتساب جاهزة'],
        cap: ['المشهد الأول: لوح شوكولا يبدأ بالتكسّر مع التمرير', 'طبقة طبقة: القطعة تُقطَع لترى داخلها', 'قطعة ثلاثية الأبعاد بإضاءة حقيقية تدور بالسحب', 'مصمِّم الطلب: الشكل ونوع الشوكولا والحشوة', 'اختر شكلاً آخر فتتغيّر المعاينة فوراً', 'مقياس حرارة تسحبه فتتغيّر حالة الشوكولا', 'منحنى «التمبرة» مشروحاً برسم بياني']
      },
      en: {
        about: ['A site for a home chocolatier in Gaziantep. We wanted visitors to live the craft before they order: a bar that breaks apart as they scroll, and 3D pieces that open up from the inside and turn with a finger or the cursor.', 'Then they design their own order: shape, type of chocolate, filling and a crunchy layer, and a ready WhatsApp message reaches the maker. The site is in Turkish and runs smoothly on phones.'],
        hl: ['A bar that breaks as you scroll', '3D pieces that open up and turn with a drag', 'An order builder: shape, chocolate and filling', 'A bag that ends in a ready WhatsApp message'],
        cap: ['The opening scene: a chocolate bar that starts to break as you scroll', 'Layer by layer: the piece is cut open so you see inside', 'A realistically lit 3D piece you turn with a drag', 'The order builder: shape, chocolate type and filling', 'Pick another shape and the preview changes instantly', 'A temperature gauge you drag while the chocolate changes state', 'The tempering curve explained with a chart']
      },
      tr: {
        about: ['Gaziantep\'te evde çikolata üreten bir usta için yapılmış site. Ziyaretçi sipariş vermeden önce zanaatı yaşasın istedik: kaydırdıkça parçalanan bir tablet ve içi açılan, parmakla ya da imleçle çevrilen 3D parçalar.', 'Sonra siparişini kendisi tasarlıyor: şekil, çikolata türü, dolgu ve çıtır katman; ustaya hazır bir WhatsApp mesajı düşüyor. Site Türkçe ve telefonda akıcı çalışıyor.'],
        hl: ['Kaydırdıkça parçalanan tablet', 'İçi açılan, sürüklenerek çevrilen 3D parçalar', 'Sipariş oluşturucu: şekil, çikolata ve dolgu', 'Hazır WhatsApp mesajıyla biten sepet'],
        cap: ['Açılış sahnesi: kaydırdıkça parçalanmaya başlayan çikolata tableti', 'Katman katman: parça kesilip içi gösteriliyor', 'Gerçekçi ışıklı, sürükleyerek çevrilen 3D parça', 'Sipariş oluşturucu: şekil, çikolata türü ve dolgu', 'Başka bir şekil seç, önizleme anında değişir', 'Sürüklediğin sıcaklık göstergesi; çikolata hâl değiştirir', 'Temper eğrisi bir grafikle anlatılıyor']
      }
    }
  },

  perfume: {
    langs: 'AR · EN', stack: [...WEB, 'three.js'],
    desk: [['perfume-1', 'model'], ['perfume-2', 'model'], ['perfume-3', 'motion'], ['perfume-4', 'motion'], ['perfume-5', 'ui'], ['perfume-6', 'motion']],
    ph: ['perfume-m1', 'perfume-m2'],
    t: {
      ar: {
        about: ['نموذج متجر عطور مبني كله بثلاثي الأبعاد الحيّ: كاميرا تنتقل بين خمس محطات، وست زجاجات بإضاءة وانعكاسات حقيقية، ولكل عطر جوّه الخاص بلونه وحركته.', 'الرف يتمايل بلطف، والنقش على الزجاجة يُكتب مباشرة بحروفك، وتجربة «اثنتا عشرة ساعة على الجلد» تُظهر كيف يفتح العطر ويستقر على مدى اليوم. السلة وصفحة الدفع للعرض فقط.'],
        hl: ['كاميرا ثلاثية الأبعاد بخمس محطات', 'ست زجاجات بانعكاسات حقيقية', 'جوّ مختلف لكل عطر', 'نقش حيّ على الزجاجة ومنحنى اثنتي عشرة ساعة'],
        cap: ['الافتتاح: زجاجة تتوهّج بنار العود', 'لكل عطر بطاقة بمكوّناته وسعره بجانب الزجاجة', 'عطر الورد والزعفران يصبغ المشهد كله بالوردي', 'رشّة على Amber Veil فتنفتح أشعة الضوء', 'اثنتا عشرة ساعة على الجلد: منحنى حيّ لتطوّر العطر', 'فصل الصنعة: دورق يقطّر']
      },
      en: {
        about: ['A fragrance-store concept built entirely in live 3D: a camera that travels between five stops, six bottles with real lighting and reflections, and its own atmosphere for every scent.', 'The shelf sways gently, the engraving on the bottle is written live in your own letters, and a “twelve hours on skin” experience shows how a scent opens and settles through the day. The bag and checkout are for demonstration only.'],
        hl: ['A five-stop 3D camera', 'Six bottles with real reflections', 'A different mood for every scent', 'Live engraving and a twelve-hour curve'],
        cap: ['The opening: a bottle glowing with oud fire', 'Each scent has a card with its notes and price beside the bottle', 'Rose Saffron tints the whole scene pink', 'A spray on Amber Veil opens up rays of light', 'Twelve hours on skin: a live curve of how the scent develops', 'The craft chapter: a flask that distills']
      },
      tr: {
        about: ['Tamamen canlı 3D ile kurulmuş bir parfüm mağazası konsepti: beş durak arasında gezen kamera, gerçek ışık ve yansımalı altı şişe ve her koku için ayrı bir atmosfer.', 'Raf hafifçe sallanır, şişenin üzerindeki gravür kendi harflerinizle canlı yazılır ve “ciltte on iki saat” deneyimi kokunun gün boyu nasıl açılıp yerleştiğini gösterir. Sepet ve ödeme yalnızca gösterim içindir.'],
        hl: ['Beş duraklı 3D kamera', 'Gerçek yansımalı altı şişe', 'Her koku için farklı atmosfer', 'Canlı gravür ve on iki saatlik eğri'],
        cap: ['Açılış: ud ateşiyle parlayan şişe', 'Her kokunun notaları ve fiyatı şişenin yanındaki kartta', 'Rose Saffron tüm sahneyi pembeye boyar', 'Amber Veil\'e sıkınca ışık huzmeleri açılır', 'Ciltte on iki saat: kokunun gelişimini gösteren canlı eğri', 'Zanaat bölümü: damıtan bir balon']
      }
    }
  },

  furniture: {
    langs: 'TR · EN · AR', stack: [...WEB, 'three.js'],
    desk: [['furniture-1', 'model'], ['furniture-2', 'model'], ['furniture-3', 'ui'], ['furniture-4', 'model'], ['furniture-5', 'motion'], ['furniture-6', 'ui']],
    ph: ['furniture-m1', 'furniture-m2'],
    t: {
      ar: {
        about: ['نموذج لصانع أثاث: «يوم عند محمد»، جولة ثلاثية الأبعاد في بيت تتبدّل إضاءته مع ساعات اليوم، فالشمس تعبر النوافذ والظلال تتحرك.', 'القطع تُبنى أمام الزائر، ويبدّل القماش والخشب والمقاسات فيرى النتيجة فوراً، ويفكّك القطعة ليرى كيف صُنعت. الموقع بالعربية والتركية والإنجليزية.'],
        hl: ['إضاءة تتبع ساعات اليوم', 'قطع تُبنى أمامك', 'تبديل القماش والخشب والمقاس فوراً', 'عرض تفكيكي للقطعة'],
        cap: ['المدخل: شعار m ضخم ثلاثي الأبعاد أمام نوافذ مقوّسة', 'أريكة بيضاء مع لوحة القماش والخشب والمقاس', 'قطيفة زمردية وسنديان مدخّن: يتبدّل كل شيء فوراً', 'العرض التفكيكي: القطعة تتفرّق قطعة قطعة', 'ضوء الشمس يتحرك عبر النوافذ مع ساعات اليوم', 'بطاقات مثبّتة كعيّنات القماش تُسحب لتصفّحها']
      },
      en: {
        about: ['A concept for a furniture maker: “A Day at Mohammed’s”, a 3D walk through a home whose light changes with the hours of the day, with sun crossing the windows and shadows moving.', 'Pieces build themselves in front of the visitor, who swaps fabric, wood and sizes and sees the result at once, and takes a piece apart to see how it is made. In Arabic, Turkish and English.'],
        hl: ['Light that follows the hours of the day', 'Pieces that build in front of you', 'Instant fabric, wood and size swaps', 'An exploded view of the piece'],
        cap: ['The entrance: a big 3D “m” in front of arched windows', 'A cream sofa with its panel for fabric, wood and size', 'Emerald velvet and smoked oak: everything changes at once', 'The exploded view: the piece comes apart part by part', 'Sunlight moves across the windows with the hours', 'Cards pinned like fabric samples, drag to browse']
      },
      tr: {
        about: ['Bir mobilya üreticisi için konsept: “Muhammed’in Evinde Bir Gün”; ışığı günün saatlerine göre değişen bir evde 3D gezinti; güneş pencerelerden geçer, gölgeler hareket eder.', 'Parçalar ziyaretçinin gözü önünde kurulur; kumaşı, ahşabı ve ölçüyü değiştirip sonucu anında görür, parçayı söküp nasıl yapıldığına bakar. Arapça, Türkçe ve İngilizce.'],
        hl: ['Günün saatlerini izleyen ışık', 'Gözünüzün önünde kurulan parçalar', 'Anında kumaş, ahşap ve ölçü değişimi', 'Parçanın patlatılmış görünümü'],
        cap: ['Giriş: kemerli pencerelerin önünde dev 3D “m”', 'Kumaş, ahşap ve ölçü paneliyle krem bir koltuk', 'Zümrüt kadife ve füme meşe: her şey anında değişir', 'Patlatılmış görünüm: parça parça ayrılan mobilya', 'Güneş ışığı saatlerle pencerelerde ilerler', 'Kumaş numunesi gibi iğnelenmiş kartlar, sürükleyerek gezin']
      }
    }
  },

  mozaik: {
    langs: 'EN · TR · AR', stack: WEB,
    desk: [['mozaik-1', 'ui'], ['mozaik-2', 'model'], ['mozaik-3', 'model'], ['mozaik-4', 'ui'], ['mozaik-5', 'ui'], ['mozaik-6', 'lang']],
    ph: ['mozaik-m1', 'mozaik-m2'],
    t: {
      ar: {
        about: ['موقع شركة Mozaik Ofset للطباعة والتغليف في غازي عنتاب، موجَّه لشركات تشتري بالجملة. هدفه أن يُظهر جودة العمل: علبة ثلاثية الأبعاد يديرها الزائر قبل أن يطلب عرضاً.', 'فيه كتالوج منتجات وشهادات جودة وطلب عرض سعر، بثلاث لغات: الإنجليزية والتركية والعربية، ويتحوّل التصميم إلى يمين-يسار عند العربية.'],
        hl: ['علبة ثلاثية الأبعاد يديرها الزائر', 'كتالوج وشهادات جودة', 'طلب عرض سعر', 'ثلاث لغات مع اتجاه يمين-يسار'],
        cap: ['الصفحة الرئيسية: عنوان قوي وأرقام الشركة', 'عارض العلب ثلاثي الأبعاد: أدِر العلبة بالسحب', 'منزلق يغيّر وضع العلبة في العارض', 'الجودة والشهادات بوضوح', 'طلب عرض سعر ومعلومات التواصل', 'النسخة العربية: التصميم يتحوّل يمين-يسار']
      },
      en: {
        about: ['The website of Mozaik Ofset, a printing and packaging company in Gaziantep, aimed at businesses that buy in bulk. It shows the quality of the work: a 3D box the visitor can turn before asking for a quote.', 'It has a product catalogue, quality certificates and a quote request, in three languages: English, Turkish and Arabic, and the layout turns right-to-left in Arabic.'],
        hl: ['A 3D box the visitor can turn', 'Catalogue and quality certificates', 'Quote request', 'Three languages, with right-to-left layout'],
        cap: ['The home page: a bold headline and the company’s numbers', 'The 3D box viewer: turn the box with a drag', 'A slider changes the state of the box in the viewer', 'Quality and certificates, clearly laid out', 'A quote request and contact details', 'The Arabic version: the layout turns right-to-left']
      },
      tr: {
        about: ['Gaziantep’teki baskı ve ambalaj şirketi Mozaik Ofset’in, toptan alım yapan işletmelere yönelik sitesi. İşin kalitesini gösterir: ziyaretçi teklif istemeden önce 3D bir kutuyu çevirip inceleyebilir.', 'Ürün kataloğu, kalite belgeleri ve teklif talebi var; İngilizce, Türkçe ve Arapça olmak üzere üç dilde ve Arapça’da yerleşim sağdan sola dönüyor.'],
        hl: ['Ziyaretçinin çevirdiği 3D kutu', 'Katalog ve kalite belgeleri', 'Teklif talebi', 'Sağdan sola yerleşimli üç dil'],
        cap: ['Ana sayfa: güçlü başlık ve şirketin rakamları', '3D kutu görüntüleyici: kutuyu sürükleyerek çevir', 'Bir kaydırıcı görüntüleyicide kutunun durumunu değiştirir', 'Kalite ve belgeler net biçimde', 'Teklif talebi ve iletişim bilgileri', 'Arapça sürüm: yerleşim sağdan sola dönüyor']
      }
    }
  },

  packaging: {
    langs: 'TR · EN · AR', stack: WEB,
    desk: [['packaging-1', 'motion'], ['packaging-2', 'model'], ['packaging-3', 'motion'], ['packaging-4', 'ui'], ['packaging-5', 'ui']],
    ph: ['packaging-m1', 'packaging-m2'],
    t: {
      ar: {
        about: ['موقع لمصنع تغليف كرتوني وبلاستيكي في غازي عنتاب، بثلاث لغات. الشاشة الأولى تُري الفكرة كلها: قالب قصّ مسطّح يلتفّ مع التمرير حتى يصير علبة.', 'ثم كتالوج بثلاثة وعشرين منتجاً كرتونياً برسوم أيزومترية، وشرح لأنواع الأفلات المضلّعة بمقطع عرضي، و«استوديو العلب»: مولّد قالب قصّ حيّ بمقاساتك، وطلب عرض عبر واتساب. التجربة الكاملة على الكمبيوتر.'],
        hl: ['علبة تنطوي مع التمرير', 'كتالوج بثلاثة وعشرين منتجاً برسوم أيزومترية', 'استوديو علب: قالب قصّ حيّ بمقاساتك', 'طلب عرض عبر واتساب'],
        cap: ['قالب القصّ مسطّحاً: بداية القصة', '…ثم ينطوي مع التمرير ليصير علبة ثلاثية الأبعاد', 'أرقام تعدّ نفسها، ومسطرة تسير على جانب الصفحة', 'كتالوج المنتجات برسوم أيزومترية', 'دليل أنواع الأفلات المضلّعة بمقطع عرضي']
      },
      en: {
        about: ['A website for a corrugated and plastic packaging manufacturer in Gaziantep, in three languages. The first screen shows the whole idea: a flat die-line that folds as you scroll until it becomes a box.', 'Then a catalogue of twenty-three cardboard products in isometric illustrations, a guide to corrugated flute types with a cross-section, and a “Box Studio”: a live die-line generator using your dimensions, plus a WhatsApp quote request. The full experience is on desktop.'],
        hl: ['A box that folds as you scroll', 'Twenty-three products in isometric art', 'Box Studio: a live die-line with your sizes', 'A WhatsApp quote request'],
        cap: ['The die-line lying flat: where the story starts', '…then folds into a 3D box as you scroll', 'Numbers that count up, and a ruler that runs down the page', 'The product catalogue in isometric illustrations', 'A guide to corrugated flute types with a cross-section']
      },
      tr: {
        about: ['Gaziantep’te oluklu karton ve plastik ambalaj üreten bir fabrika için üç dilli site. İlk ekran fikrin tamamını gösterir: düz bir kesim şablonu kaydırdıkça katlanıp kutuya dönüşür.', 'Ardından izometrik çizimlerle yirmi üç karton ürünlük katalog, kesit gösteren oluk tipi rehberi ve “Kutu Stüdyosu”: ölçülerinize göre canlı kesim şablonu üreteci ile WhatsApp teklif talebi. Tam deneyim masaüstünde.'],
        hl: ['Kaydırdıkça katlanan kutu', 'İzometrik çizimlerle yirmi üç ürün', 'Kutu Stüdyosu: ölçülerinizle canlı kesim şablonu', 'WhatsApp teklif talebi'],
        cap: ['Düz kesim şablonu: hikâyenin başlangıcı', '…sonra kaydırdıkça katlanıp 3D kutuya dönüşür', 'Kendiliğinden sayan rakamlar ve sayfa boyunca inen cetvel', 'İzometrik çizimlerle ürün kataloğu', 'Kesitli oluk tipi rehberi']
      }
    }
  },

  english: {
    langs: 'AR · EN', stack: WEB,
    desk: [['english-1', 'ui'], ['english-2', 'ui'], ['english-3', 'ui'], ['english-4', 'ui'], ['english-5', 'ui'], ['english-6', 'ui']],
    ph: ['english-m1', 'english-m2'],
    t: {
      ar: {
        about: ['منصة لتعليم الإنجليزية لمتحدّثي العربية، أنشأناها لأنفسنا ونعتزّ بها: كتاب تفاعلي من A1 حتى C1 بستة وأربعين درساً، يشرح القواعد بالعربية ويُتبعها بتمارين وتسجيلات صوتية.', 'كل درس فيه تبويبات: القواعد، والإنجليزية اليومية، والقراءة مع أسئلة فهم، واختبار «اختبر نفسك» بنتيجة فورية. الواجهة داكنة مريحة للعين وتعمل على الجوال.'],
        hl: ['ستة وأربعون درساً من A1 حتى C1', 'شرح القواعد بالعربية', 'تمارين تفاعلية وتسجيلات صوتية', 'اختبار بنتيجة فورية بعد كل درس'],
        cap: ['الصفحة الرئيسية: المستويات من A1 وعدّادات الدروس والتمارين', 'صفحة درس بتبويبات للقواعد والإنجليزية اليومية والقراءة', 'القاعدة بالعربية مع جدول إجابات قصيرة', 'نص للقراءة مع أسئلة فهم', 'اختبر نفسك: خمسة وعشرون سؤالاً متنوعاً بنتيجة حيّة', 'درس آخر: Present Continuous']
      },
      en: {
        about: ['A platform for Arabic speakers learning English, which we made for ourselves and are proud of: an interactive book from A1 to C1 with forty-six lessons that explains grammar in Arabic and follows it with exercises and audio recordings.', 'Every lesson has tabs: grammar, everyday English, reading with comprehension questions, and a “Check It” quiz with a live score. The dark interface is easy on the eyes and works on phones.'],
        hl: ['Forty-six lessons from A1 to C1', 'Grammar explained in Arabic', 'Interactive exercises and audio recordings', 'A quiz with a live score after each lesson'],
        cap: ['The home: levels from A1 with lesson and exercise counters', 'A lesson page with tabs for grammar, everyday English and reading', 'The rule explained in Arabic, with a table of short answers', 'A reading text with comprehension questions', 'Check It: twenty-five mixed questions with a live score', 'Another lesson: Present Continuous']
      },
      tr: {
        about: ['İngilizce öğrenen Arapça konuşanlar için kendimiz yaptığımız ve gurur duyduğumuz bir platform: A1’den C1’e kadar kırk altı derslik etkileşimli bir kitap; dilbilgisini Arapça anlatır, ardından alıştırmalar ve ses kayıtları gelir.', 'Her dersin sekmeleri var: dilbilgisi, günlük İngilizce, anlama sorulu okuma ve anlık puanlı “Check It” testi. Koyu arayüz göze rahat gelir ve telefonda çalışır.'],
        hl: ['A1’den C1’e kırk altı ders', 'Arapça dilbilgisi anlatımı', 'Etkileşimli alıştırmalar ve ses kayıtları', 'Her dersten sonra anlık puanlı test'],
        cap: ['Ana sayfa: A1’den başlayan seviyeler, ders ve alıştırma sayaçları', 'Dilbilgisi, günlük İngilizce ve okuma sekmeli ders sayfası', 'Kural Arapça anlatılıyor, kısa cevap tablosuyla', 'Anlama sorulu okuma metni', 'Check It: anlık puanlı yirmi beş karışık soru', 'Başka bir ders: Present Continuous']
      }
    }
  },

  tekton: {
    langs: 'AR · TR · EN', stack: [...WEB, 'three.js'],
    desk: [['tekton-1', 'motion'], ['tekton-2', 'motion'], ['tekton-3', 'model'], ['tekton-4', 'model'], ['tekton-5', 'model'], ['tekton-6', 'motion']],
    ph: ['tekton-m1', 'tekton-m2'],
    t: {
      ar: {
        about: ['موقع شركة إنشاءات مبني كقصة بالتمرير: يبدأ بشبكة فارغة، ثم يُرسم المخطط، ويرتفع البرج تحت رافعة، وتُعالَج الخرسانة وتُكسَر للاختبار، ثم تُكشف طبقات المبنى بالأشعة، وينتهي بمن يدير المفتاح.', 'وفيه صفحة مشاريع بطاولة مجسّمات، وخدمات كطبقات تتفكّك، ومختبر موقع (معالجة الخرسانة وطاولة هزّ)، وأداة تقدير في صفحة التواصل. بثلاث لغات. ما زال قيد العمل، والأسماء والأرقام مؤقتة.'],
        hl: ['قصة بالتمرير من المخطط إلى المفتاح', 'برج يرتفع تحت رافعة', 'مختبر موقع: معالجة الخرسانة وطاولة هزّ', 'ثلاث لغات'],
        cap: ['كل مبنى يبدأ بخط: شبكة فارغة', 'يُرسَم مخطط الأرض', 'ثم يقف على قدميه: البرج والرافعة', 'مختبر المعالجة: أسطوانات خرسانة بعد 7 أيام و28 يوماً', 'الأشعة: ما لا تراه هو ما يحمل المبنى', 'الخاتمة: من يدير المفتاح']
      },
      en: {
        about: ['A construction company site built as a scroll story: it starts with an empty grid, the plan is drawn, the tower rises under a crane, concrete cures and is crushed for testing, the building’s layers are shown in X-ray, and it ends with someone turning the key.', 'It also has a projects page with a model table, services as a stack that comes apart, a site lab (concrete curing and a shake table) and an estimator on the contact page. In three languages. Still a work in progress; names and figures are placeholders.'],
        hl: ['A scroll story from plan to key', 'A tower that rises under a crane', 'Site lab: concrete curing and a shake table', 'Three languages'],
        cap: ['Every building starts with a line: an empty grid', 'The footprint is drawn', 'Then it stands up: the tower and the crane', 'The curing lab: concrete cylinders at 7 and 28 days', 'X-ray: what you cannot see is what holds the building', 'The finale: someone turns the key']
      },
      tr: {
        about: ['Kaydırmalı hikâye olarak kurulmuş bir inşaat şirketi sitesi: boş bir ızgarayla başlar, plan çizilir, kule vincin altında yükselir, beton kürlenir ve test için kırılır, binanın katmanları röntgenle gösterilir ve anahtarı çeviren biriyle biter.', 'Ayrıca maket masalı proje sayfası, parçalanan bir yığın olarak hizmetler, şantiye laboratuvarı (beton kürü ve sarsma masası) ve iletişim sayfasında tahmin aracı var. Üç dilli. Hâlâ yapım aşamasında; isimler ve rakamlar geçicidir.'],
        hl: ['Plandan anahtara kaydırmalı hikâye', 'Vincin altında yükselen kule', 'Şantiye laboratuvarı: beton kürü ve sarsma masası', 'Üç dil'],
        cap: ['Her bina bir çizgiyle başlar: boş ızgara', 'Arsa planı çiziliyor', 'Sonra ayağa kalkar: kule ve vinç', 'Kür laboratuvarı: 7 ve 28 günlük beton silindirler', 'Röntgen: göremediğin şey binayı taşır', 'Final: biri anahtarı çevirir']
      }
    }
  },

  verdara: {
    langs: 'TR · EN · FR · AR', stack: [...WEB, 'three.js'],
    desk: [['verdara-1', 'motion'], ['verdara-2', 'model'], ['verdara-3', 'model'], ['verdara-4', 'ui'], ['verdara-5', 'ui'], ['verdara-6', 'ui']],
    ph: ['verdara-m1', 'verdara-m2'],
    t: {
      ar: {
        about: ['معرض لأنواع البذور والحبوب لشركة بذور بالجملة، مبني بثلاثي الأبعاد: تبدأ الرحلة ببذرة في العتمة، ومع التمرير تنفتح وتنزل جذورها ويخرج ساقها وتنتهي بحصاد، والسماء خلفها تتغيّر مع شهر السنة.', 'ثم كتالوج من 427 صنفاً في 11 مجموعة، وقائمة «أصناف الموسم» تتبدّل مع الشهر ومنطقة المناخ، وأداة لاختيار الصنف بثلاث لمسات، وطلب سعر يصل إلى واتساب. بأربع لغات. ما زال قيد العمل، والأسماء والأصناف مؤقتة.'],
        hl: ['بذرة تنمو مع التمرير حتى الحصاد', 'كتالوج من 427 صنفاً في 11 مجموعة', 'قائمة تتبدّل مع شهر السنة ومنطقة المناخ', 'أربع لغات وطلب سعر عبر واتساب'],
        cap: ['بداية الرحلة: بذرة في العتمة قبل أن ينفتح المشهد', 'مع التمرير: تنزل الجذور ويخرج الساق الأول', 'الحصاد: نبتة مكتملة بثمارها، وسماؤها تتبع شهر السنة', 'مجموعات المنتجات: أحد عشر قسماً، تحت كل واحد منها عدد أصنافه', 'أصناف الموسم: القائمة تتغيّر مع الشهر، وكل عبوة بشارة «اِزرع الآن»', 'أداة اختيار الصنف: المجموعة والبيئة والموسم، فتبقى الأصناف المناسبة فقط']
      },
      en: {
        about: ['A showcase of seeds and grains for a wholesale seed company, built in 3D: the journey starts with a seed in the dark, and as you scroll it opens, sends roots down, puts up a shoot and ends in a harvest, while the sky behind it follows the month of the year.', 'Then a catalogue of 427 varieties in 11 groups, a “varieties of the season” list that changes with the month and climate zone, a three-tap variety finder and a price request that lands in WhatsApp. In four languages. Still being built; names and varieties are placeholders.'],
        hl: ['A seed that grows as you scroll, to harvest', 'A catalogue of 427 varieties in 11 groups', 'A list that follows the month and climate zone', 'Four languages and price requests over WhatsApp'],
        cap: ['The start of the journey: a seed in the dark before the scene opens', 'As you scroll: the roots go down and the first shoot comes up', 'The harvest: a full plant with its fruit, under a sky that follows the month', 'Product groups: eleven sections, each with its variety count', 'Varieties of the season: the list changes with the month, each pack carries a “sow now” badge', 'The variety finder: group, growing setup and season, leaving only the matching varieties']
      },
      tr: {
        about: ['Toptan tohum şirketi için tohum ve tahıl vitrini, 3D olarak kuruldu: yolculuk karanlıkta bir tohumla başlar; kaydırdıkça tohum açılır, kökler iner, filiz çıkar ve hasatla biter; arkadaki gökyüzü yılın ayını izler.', 'Ardından 11 grupta 427 çeşitlik katalog, aya ve iklim bölgesine göre değişen “mevsimin çeşitleri” listesi, üç dokunuşla çeşit bulucu ve WhatsApp’a düşen fiyat talebi var. Dört dilli. Hâlâ yapım aşamasında; isimler ve çeşitler geçicidir.'],
        hl: ['Kaydırdıkça hasada büyüyen tohum', '11 grupta 427 çeşitlik katalog', 'Aya ve iklim bölgesine göre değişen liste', 'Dört dil ve WhatsApp’tan fiyat talebi'],
        cap: ['Yolculuğun başı: sahne açılmadan önce karanlıkta bir tohum', 'Kaydırdıkça: kökler iner, ilk filiz çıkar', 'Hasat: meyvesiyle tam bir bitki, gökyüzü yılın ayını izler', 'Ürün grupları: on bir bölüm, her birinin çeşit sayısıyla', 'Mevsimin çeşitleri: liste aya göre değişir, her pakette “şimdi ekin” rozeti', 'Çeşit bulucu: grup, yetiştirme ve mevsim seçilir, yalnızca uygun çeşitler kalır']
      }
    }
  },

  hayyak: {
    langs: 'AR · TR · EN', stack: [...WEB, 'three.js'],
    desk: [['hayyak-1', 'motion'], ['hayyak-2', 'model'], ['hayyak-3', 'motion'], ['hayyak-4', 'model'], ['hayyak-5', 'model'], ['hayyak-6', 'motion']],
    ph: ['hayyak-m1', 'hayyak-m2'],
    t: {
      ar: {
        about: ['نموذج لمحمصة قهوة عربية تبيع بالجملة، بعلامة مخترعة (حيّاك) لا تمثّل أي نشاط حقيقي. الرحلة ثلاثية الأبعاد تتبع التمرير: حبّة هيل، ثم تحميص بطقطقتين وحرارة تتصاعد، ثم طحن، ثم فنجان تُصبّ فيه القهوة.', 'وتنتهي بطقس ضيافة: الفنجان الأول للضيف والثاني للكيف والثالث للسيف، إلى أن يهزّ الزائر الفنجان. الهزّ اختياري: إن تابع التمرير اهتزّ الفنجان وحده. وفي الموقع صفحة منتجات بالجملة وطلب عرض سعر، بثلاث لغات.'],
        hl: ['رحلة ثلاثية الأبعاد من الهيل إلى الفنجان', 'تحميص بطقطقتين وحرارة حيّة', 'طقس «هزّ الفنجان» الاختياري', 'منتجات بالجملة وطلب عرض سعر'],
        cap: ['تبدأ الرحلة بحبّات هيل ثلاثية الأبعاد تطفو', 'التحميص: حبّة خضراء ومقياس حرارة حيّ يبدأ من 25 درجة', 'عند 225 درجة تصير الحبّة داكنة وتظهر الطقطقة الثانية', 'الطحن: غبار ذهبي ودلّة نحاسية', 'فنجان ينتظر محاطاً بحبوب البنّ والهيل', 'الصبّ: القهوة تنساب في الفنجان']
      },
      en: {
        about: ['A concept for a wholesale Arab coffee roaster under an invented brand (HAYYAK) that does not represent any real business. The 3D journey follows the scroll: a cardamom pod, then a roast with two cracks and rising heat, then grinding, then a cup that coffee is poured into.', 'It ends with a hospitality ritual: the first cup for the guest, the second for pleasure, the third for the sword, until the visitor shakes the cup. Shaking is optional: keep scrolling and the cup shakes by itself. The site also has a wholesale products page and a quote request, in three languages.'],
        hl: ['A 3D journey from cardamom to cup', 'A roast with two cracks and live heat', 'An optional “shake the cup” ritual', 'Wholesale products and a quote request'],
        cap: ['The journey starts with floating 3D cardamom pods', 'The roast: a green bean and a live thermometer starting at 25 degrees', 'At 225 degrees the bean turns dark and the second crack appears', 'The grind: golden dust and a copper dallah', 'A cup waits, surrounded by coffee beans and cardamom', 'The pour: coffee flows into the cup']
      },
      tr: {
        about: ['Uydurma bir markayla (HAYYAK), gerçek hiçbir işletmeyi temsil etmeyen, toptan satış yapan bir Arap kahve kavurucusu konsepti. 3D yolculuk kaydırmayı izler: bir kakule kabuğu, ardından iki çatlamalı ve yükselen ısılı kavurma, sonra öğütme, sonra kahvenin döküldüğü bir fincan.', 'Misafirlik töreniyle biter: ilk fincan misafire, ikincisi keyfe, üçüncüsü kılıca; ziyaretçi fincanı sallayana kadar. Sallamak isteğe bağlı: kaydırmaya devam ederseniz fincan kendiliğinden sallanır. Sitede ayrıca toptan ürünler sayfası ve teklif talebi var; üç dilli.'],
        hl: ['Kakuleden fincana 3D yolculuk', 'İki çatlamalı ve canlı ısılı kavurma', 'İsteğe bağlı “fincanı salla” töreni', 'Toptan ürünler ve teklif talebi'],
        cap: ['Yolculuk, havada süzülen 3D kakule kabuklarıyla başlar', 'Kavurma: yeşil çekirdek ve 25 dereceden başlayan canlı termometre', '225 derecede çekirdek koyulaşır ve ikinci çatlama görünür', 'Öğütme: altın tozu ve bakır dallah', 'Kahve çekirdekleri ve kakuleyle çevrili, bekleyen bir fincan', 'Dökme: kahve fincana akar']
      }
    }
  },

  khayt: {
    langs: 'EN · AR', stack: ['Flutter', 'Dart'],
    desk: [['khayt-1', 'ui'], ['khayt-3', 'ui'], ['khayt-5', 'lang']],
    ph: ['khayt-m1'],
    t: {
      ar: {
        about: ['نموذج متجر أزياء خفيف مبني بـ Flutter للويب. عند اختيار لون القطعة يتبدّل لون الصفحة معه، فيشعر الزائر أنه يتصفّح قطعة واحدة لا قائمة منتجات.', 'فيه مجموعة بمرشّحات وفرز، وسلة، ونسخة عربية بتصميم معكوس. سريع على الجوال.'],
        hl: ['الصفحة تتلوّن مع لون القطعة', 'مجموعة بمرشّحات وفرز', 'نسخة عربية بتصميم معكوس', 'مبني بـ Flutter'],
        cap: ['الصفحة الأولى: اختر لوناً فتتغيّر القطعة والصفحة', 'المجموعة مع مرشّحات وفرز', 'النسخة العربية بتصميم معكوس']
      },
      en: {
        about: ['A light fashion-store concept built with Flutter for the web. When the visitor picks a colour for the piece, the whole page takes on that colour, so it feels like browsing one garment, not a product list.', 'It has a collection with filters and sorting, a bag, and an Arabic version with a mirrored layout. Fast on phones.'],
        hl: ['A page that recolours with the piece', 'A collection with filters and sorting', 'An Arabic version with a mirrored layout', 'Built with Flutter'],
        cap: ['The home: pick a colour and the piece and the page change', 'The collection with filters and sorting', 'The Arabic version with a mirrored layout']
      },
      tr: {
        about: ['Flutter ile web için yapılmış hafif bir moda mağazası konsepti. Ziyaretçi parçanın rengini seçince tüm sayfa o renge bürünür; bir ürün listesi değil, tek bir giysi geziyormuş gibi hissettirir.', 'Filtre ve sıralamalı koleksiyon, sepet ve aynalanmış yerleşimli Arapça sürüm var. Telefonda hızlı.'],
        hl: ['Parçayla renklenen sayfa', 'Filtre ve sıralamalı koleksiyon', 'Aynalanmış yerleşimli Arapça sürüm', 'Flutter ile yapıldı'],
        cap: ['Ana sayfa: renk seç, parça ve sayfa değişsin', 'Filtreli ve sıralamalı koleksiyon', 'Aynalanmış yerleşimli Arapça sürüm']
      }
    }
  },

  hazem: {
    langs: 'AR · DE', moreLangs: 3, stack: WEB,
    desk: [['hazem-1', 'motion'], ['hazem-2', 'ui'], ['hazem-3', 'ui'], ['hazem-4', 'ui'], ['hazem-5', 'ui'], ['hazem-6', 'ui']],
    ph: ['hazem-m1', 'hazem-m2'],
    t: {
      ar: {
        about: ['نموذج موقع لمدرسة تعليم قيادة، بخمس لغات منها العربية والألمانية. الشاشة الأولى بفيديو لسيارة وساعة حيّة، وتحتها أقسام تشرح لماذا تختار المدرسة وكيف تسجّل.', 'فيه الدورات والمستندات المطلوبة وآراء الخريجين وفروع المدرسة على الخريطة، مع نظام تسجيل.'],
        hl: ['خمس لغات', 'فيديو في الشاشة الأولى', 'مستندات مطلوبة وفروع على الخريطة', 'نظام تسجيل'],
        cap: ['الشاشة الأولى بفيديو سيارة وساعة حيّة', 'لماذا تختار المدرسة: أرقام ومزايا', 'بطاقات الدورات والمزايا', 'قسم آراء الخريجين', 'قائمة واضحة بالمستندات المطلوبة', 'الفروع على الخريطة']
      },
      en: {
        about: ['A concept site for a driving school, in five languages including Arabic and German. The first screen has a video of a car and a live clock, with sections below explaining why to pick the school and how to enrol.', 'It has courses, required documents, graduates’ feedback and the school’s branches on a map, with a registration system.'],
        hl: ['Five languages', 'A video on the first screen', 'Required documents and branches on a map', 'A registration system'],
        cap: ['The first screen: a car video and a live clock', 'Why pick the school: numbers and benefits', 'Cards for courses and features', 'A graduates’ feedback section', 'A clear list of required documents', 'Branches on a map']
      },
      tr: {
        about: ['Arapça ve Almanca dahil beş dilde bir sürücü kursu konsept sitesi. İlk ekranda araba videosu ve canlı saat var; altında kursu neden seçmeli ve nasıl kayıt olunur anlatılıyor.', 'Kurslar, gerekli belgeler, mezun görüşleri ve haritada şubeler ile bir kayıt sistemi içeriyor.'],
        hl: ['Beş dil', 'İlk ekranda video', 'Gerekli belgeler ve haritada şubeler', 'Kayıt sistemi'],
        cap: ['İlk ekran: araba videosu ve canlı saat', 'Neden bu kurs: rakamlar ve avantajlar', 'Kurs ve avantaj kartları', 'Mezun görüşleri bölümü', 'Gerekli belgelerin net listesi', 'Haritada şubeler']
      }
    }
  }
};

/* لقطات بالمؤشر ظاهراً لحظة التفاعل (ضغط أو سحب): تُضاف في نهاية معرض كل مشروع */
const CUR = {
  sama: [['sama-c1', { ar: 'الضغط على إشعار مباشر يفتح البلاغ ويقرّب الخريطة منه', en: 'Pressing a live-feed item opens the report and zooms the map to it', tr: 'Canlı akıştaki bir öğeye basmak bildirimi açar ve haritayı ona yakınlaştırır' }]],
  erp: [['erp-c1', { ar: 'الضغط على تبويب «الخيوط والإضافات» في المستودع', en: 'Clicking the “Threads and accessories” tab in the warehouse', tr: 'Depoda “İplikler ve aksesuarlar” sekmesine tıklamak' }]],
  chocolate: [['chocolate-c1', { ar: 'الضغط على بطاقة شكل: هنا الماسة', en: 'Clicking a shape card: here the diamond', tr: 'Bir şekil kartına tıklama: burada elmas' }], ['chocolate-c2', { ar: 'السحب على القطعة ثلاثية الأبعاد يديرها', en: 'Dragging the 3D piece turns it', tr: '3D parçayı sürüklemek onu çevirir' }]],
  perfume: [['perfume-c1', { ar: 'الضغط على زجاجة ورد الزعفران يبدّل جوّ المشهد', en: 'Clicking the Rose Saffron bottle changes the mood of the scene', tr: 'Rose Saffron şişesine tıklamak sahnenin atmosferini değiştirir' }], ['perfume-c2', { ar: 'زرّ الرشّ: ضغطة واحدة فيتطاير الرذاذ', en: 'The spray button: one click and the mist bursts out', tr: 'Sprey düğmesi: tek tıkla sis fışkırır' }]],
  furniture: [['furniture-c1', { ar: 'اختيار قماش القطيفة الزمردية بالضغط عليه', en: 'Picking the emerald velvet with a click', tr: 'Zümrüt kadifeyi tıklayarak seçmek' }], ['furniture-c2', { ar: 'زرّ التفكيك: القطعة تتفرّق أمام المؤشر', en: 'The explode button: the piece comes apart', tr: 'Patlat düğmesi: parça ayrılır' }]],
  mozaik: [['mozaik-c1', { ar: 'سحب المنزلق يفتح العلبة ويغلقها', en: 'Dragging the slider opens and closes the box', tr: 'Kaydırıcıyı sürüklemek kutuyu açar ve kapatır' }], ['mozaik-c2', { ar: 'أسهم المعرض تنقل بين المنتجات', en: 'The carousel arrows move through the products', tr: 'Oklar ürünler arasında gezdirir' }]],
  packaging: [['packaging-c1', { ar: 'اختيار نوع الفلوت BC فيتبدّل المقطع العرضي', en: 'Choosing the BC flute type changes the cross-section', tr: 'BC oluk tipini seçmek kesiti değiştirir' }], ['packaging-c2', { ar: 'استوديو العلب: اختر نوع العلبة فيُرسَم القالب بمقاساتك', en: 'Box Studio: pick a box style and the die-line is drawn to your size', tr: 'Kutu Stüdyosu: kutu tipini seç, kalıp ölçüne göre çizilsin' }]],
  english: [['english-c1', { ar: 'الضغط على Present Simple في القائمة الجانبية يفتح الدرس', en: 'Clicking Present Simple in the side list opens the lesson', tr: 'Yan listeden Present Simple’a tıklamak dersi açar' }], ['english-c2', { ar: 'تبويب Questions: صيغة السؤال مع جدول', en: 'The Questions tab: the question form with a table', tr: 'Questions sekmesi: soru kalıbı ve tablo' }]],
  tekton: [['tekton-c1', { ar: 'المؤشر فوق أسطوانتي الخرسانة في مختبر المعالجة', en: 'The cursor over the two concrete cylinders in the curing lab', tr: 'Kür laboratuvarında iki beton silindirin üzerinde imleç' }], ['tekton-c2', { ar: 'زرّ «ابدأ مشروعك» في الخاتمة', en: 'The “start your project” button in the finale', tr: 'Finaldeki “projeni başlat” düğmesi' }]],
  verdara: [['verdara-c1', { ar: 'اختيار مجموعة في أداة الأصناف: تبقى الأصناف المطابقة فقط', en: 'Picking a group in the variety finder: only matching varieties remain', tr: 'Çeşit bulucuda bir grup seçmek: yalnızca eşleşen çeşitler kalır' }], ['verdara-c2', { ar: 'أسهم شريط أصناف الموسم تقلّب العبوات', en: 'The arrows of the season rail flip through the packs', tr: 'Mevsim şeridinin okları paketleri çevirir' }]],
  khayt: [['khayt-c1', { ar: 'اختيار لون القطعة بالضغط على عيّنته', en: 'Picking a colour by clicking its swatch', tr: 'Rengi örneğine tıklayarak seçmek' }]],
  hazem: [['hazem-c1', { ar: 'قائمة اللغات الخمس مفتوحة', en: 'The menu with the five languages', tr: 'Beş dilin menüsü' }]],
  hayyak: [['hayyak-c1', { ar: 'الضيافة: المؤشر عند زرّ «هزّ الفنجان» الذي ينهي الرحلة', en: 'The hospitality ritual: the cursor at the “shake the cup” button that ends the journey', tr: 'Misafirlik töreni: yolculuğu bitiren “fincanı salla” düğmesinde imleç' }]]
};
for (const [id, list] of Object.entries(CUR)) { const c = CASES[id]; for (const [f, cap] of list) { c.desk.push([f, 'cursor']); for (const l of ['ar', 'en', 'tr']) c.t[l].cap.push(cap[l]); } }
