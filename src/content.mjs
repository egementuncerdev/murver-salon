/* ==========================================================================
   Mürver Güzellik Atölyesi — bütün içerik burada (TR + EN).
   Mürver kurgusal bir salondur; ekip, adres, telefon ve fiyatlar örnektir.
   ========================================================================== */

export const salon = {
  name: 'Mürver',
  full: { tr: 'Mürver Güzellik Atölyesi', en: 'Mürver Beauty Atelier' },
  url: 'https://salon.egementuncer.dev',
  demo: true, // true iken: noindex + her sayfada demo şeridi + telefon bağlantıları uyarı verir
  author: { name: 'Egemen Tuncer', url: 'https://egementuncer.dev' },
  phone: '+902120000001',
  phoneDisplay: '0 (212) 000 00 01',
  email: 'merhaba@murver.example',
  instagram: '@murver.atelier',
  address: {
    street: { tr: 'Mürver Sokak No: 12, Örnek Mahallesi', en: '12 Mürver Street, Örnek Neighbourhood' },
    city: 'İstanbul',
    country: 'TR'
  },
  // 0 = Pazar … 6 = Cumartesi; null = kapalı
  hours: [['11:00', '18:00'], null, ['10:00', '20:00'], ['10:00', '20:00'], ['10:00', '20:00'], ['10:00', '20:00'], ['10:00', '20:00']],
  slotStep: 30, // randevu saatleri kaç dakikada bir
  timezone: 'Europe/Istanbul'
};

/* --------------------------------------------------------------------------
   Fotoğraflar — Unsplash License. public/img/<ad>-640|1200.avif|webp
   Fotoğraflardaki kişiler ekibimizin portresi olarak KULLANILMAZ.
   cat: galeri filtresi
   -------------------------------------------------------------------------- */
export const photos = {
  hero: { size: [2000, 1333], cat: 'hair', by: ['Giorgio Trovato', 'giorgiotrovato'], alt: { tr: 'Kuaför, maşayla müşterisinin saçına dalga veriyor', en: 'A stylist curling a client’s hair with a curling iron' } },
  'interior-1': { size: [1600, 1067], cat: 'salon', by: ['Benyamin Bohlouli', 'benyamin_bohlouli'], alt: { tr: 'Ahşap çerçeveli aynaları ve koltuklarıyla aydınlık bir salon', en: 'A bright salon with wood-framed mirrors and chairs' } },
  'interior-2': { size: [1600, 2400], cat: 'salon', by: ['Daniel', 'unsplashbydan'], alt: { tr: 'Bitkiler ve lavabo yanında siyah bir kuaför koltuğu', en: 'A black salon chair next to plants and a basin' } },
  'hair-blowdry': { size: [1600, 1068], cat: 'hair', by: ['Adam Winger', 'awcreativeut'], alt: { tr: 'Fön makinesi ve yuvarlak fırçayla yapılan fön', en: 'A blow-dry with a hairdryer and round brush' } },
  'hair-updo': { size: [1600, 2400], cat: 'hair', by: ['Alexander Mass', 'alexandermassph'], alt: { tr: 'Oturan müşteriye topuz yapan kuaför', en: 'A stylist creating an updo for a seated client' } },
  'hair-wash': { size: [1600, 1067], cat: 'hair', by: ['Lindsay Cash', 'lindsayrc81'], alt: { tr: 'Lavabo başında saç yıkama', en: 'A hair wash at the basin' } },
  'hair-color': { size: [1600, 1067], cat: 'hair', by: ['Ionela Mat', 'ionelaaaaa'], alt: { tr: 'Eldivenli ellerle saça boya uygulaması', en: 'Hair colour being applied with gloved hands' } },
  'hair-brush': { size: [1600, 2400], cat: 'hair', by: ['Jenna Oslin', 'jennaoslin'], alt: { tr: 'Uzun sarı saçın yuvarlak fırçayla şekillendirilmesi', en: 'Long blonde hair styled with a round brush' } },
  'nails-salon': { size: [1600, 1067], cat: 'nails', by: ['Giorgio Trovato', 'giorgiotrovato'], alt: { tr: 'Salonda manikür yaptıran bir kadın', en: 'A woman getting a manicure at a salon' } },
  'nails-pink': { size: [1600, 2553], cat: 'nails', by: ['Chelson Tamares', 'jd_chon'], alt: { tr: 'Açık pembe ojeli, bakımlı tırnaklar', en: 'Neatly manicured nails in light pink' } },
  'nails-polish': { size: [1600, 2400], cat: 'nails', by: ['H&CO', 'hngstrm'], alt: { tr: 'Raflarda sıralanmış renk renk ojeler', en: 'Rows of colourful nail polish on shelves' } },
  'skin-facial': { size: [1600, 1067], cat: 'skin', by: ['Rosa Rafael', 'rosarafael'], alt: { tr: 'Cilt bakımında yüze maske uygulaması', en: 'A face mask being applied during a facial' } },
  'skin-mask': { size: [1600, 2400], cat: 'skin', by: ['Ernesto Samaniego', 'ernesto_sams'], alt: { tr: 'Cilt bakımı sırasında gözleri kapalı dinlenen bir kadın', en: 'A woman relaxing with eyes closed during a facial' } },
  'skin-products': { size: [1600, 1067], cat: 'skin', by: ['Camille Brodard', 'kmile_ch'], alt: { tr: 'Beyaz pompalı şişe, havlu ve pembe laleler', en: 'A white pump bottle, a towel and pink tulips' } },
  'makeup-eye': { size: [1600, 2400], cat: 'makeup', by: ['Lola Azizada', 'kalpa_mahagamage'], alt: { tr: 'Fırçayla göz makyajı uygulaması', en: 'Eye make-up being applied with a brush' } },
  'makeup-artist': { size: [1600, 2400], cat: 'makeup', by: ['Alena Plotnikova', 'alena_horoshaya'], alt: { tr: 'Müşterisine makyaj yapan makyöz', en: 'A make-up artist working on a client' } },
  'makeup-flatlay': { size: [1600, 1600], cat: 'makeup', by: ['Shamblen Studios', 'shamblenstudios'], alt: { tr: 'Makyaj fırçaları, ruj ve pudra', en: 'Make-up brushes, lipstick and powder' } },
  lashes: { size: [1600, 2400], cat: 'makeup', by: ['Hayley Kim Studios', 'hayleykimstudios'], alt: { tr: 'Cımbızla kirpik uygulaması', en: 'Lash treatment with tweezers' } },
  products: { size: [1600, 2400], cat: 'salon', by: ['Daniel', 'unsplashbydan'], alt: { tr: 'Salonun ürün rafı', en: 'The salon’s product shelf' } }
};

/* --------------------------------------------------------------------------
   Ekip (kurgusal) — cats: yapabildiği kategoriler (randevuda uzman filtresi)
   -------------------------------------------------------------------------- */
export const team = [
  { id: 'nil', name: 'Nil Aydın', initials: 'NA', tone: 1, cats: ['hair'],
    role: { tr: 'Kurucu · Saç tasarımı ve renk', en: 'Founder · Hair design and colour' },
    bio: { tr: 'Balyaj ve doğal geçişli renklerde çalışır. Her renk işleminden önce saçın geçmişini ve bakım alışkanlıklarını konuşmayı önemser.', en: 'Specialises in balayage and soft, natural colour. Before any colour work she talks through your hair’s history and care routine.' } },
  { id: 'defne', name: 'Defne Kara', initials: 'DK', tone: 2, cats: ['hair'],
    role: { tr: 'Saç kesimi ve özel gün saçı', en: 'Cuts and occasion hair' },
    bio: { tr: 'Yüz şekline göre kesimler ve gelin, nişan gibi özel günler için topuz ve dalgalar yapar.', en: 'Creates cuts that suit your face shape, plus updos and waves for weddings and special occasions.' } },
  { id: 'melis', name: 'Melis Ateş', initials: 'MA', tone: 3, cats: ['nails'],
    role: { tr: 'Tırnak sanatı', en: 'Nail art' },
    bio: { tr: 'Kalıcı oje, protez tırnak ve sade tırnak süslemeleri yapar. Tırnak sağlığını korumak için doğru çıkarma işlemine özen gösterir.', en: 'Does gel polish, extensions and minimal nail art, with careful removal to keep nails healthy.' } },
  { id: 'ece', name: 'Ece Yıldız', initials: 'EY', tone: 4, cats: ['skin'],
    role: { tr: 'Cilt bakım uzmanı', en: 'Skin therapist' },
    bio: { tr: 'Cilt tipinize göre bakım planlar; evde uygulayabileceğiniz sade bir rutin önerir.', en: 'Plans facials around your skin type and suggests a simple routine you can keep up at home.' } },
  { id: 'zeynep', name: 'Zeynep Uçar', initials: 'ZU', tone: 5, cats: ['makeup', 'skin'],
    role: { tr: 'Makyaj, kaş ve kirpik', en: 'Make-up, brows and lashes' },
    bio: { tr: 'Doğal görünümlü günlük makyajdan özel gün makyajına kadar çalışır. Kaş tasarımı ve laminasyonda yüz oranlarını esas alır.', en: 'Works from natural everyday looks to occasion make-up. For brow shaping and lamination she follows your facial proportions.' } }
];

/* --------------------------------------------------------------------------
   Hizmet kategorileri ve fiyatlar (örnek fiyatlar, ₺)
   from: true → "…'den başlayan" (saç uzunluğu / kapsam fiyatı değiştirir)
   -------------------------------------------------------------------------- */
export const categories = [
  {
    id: 'hair',
    slug: { tr: 'sac', en: 'hair' },
    name: { tr: 'Saç', en: 'Hair' },
    photo: 'hair-blowdry',
    side: 'hair-updo',
    short: { tr: 'Kesim, fön, renk ve bakım. Saçınızın yapısına ve günlük düzeninize uygun.', en: 'Cuts, blow-dries, colour and treatments, suited to your hair and your routine.' },
    intro: {
      tr: 'Her saç işleminden önce kısa bir konuşma yapıyoruz: saçınızın geçmişi, günlük düzeniniz ve beklentiniz. Kesimde yüz şeklinizi, renkte ten tonunuzu ve saçın sağlığını birlikte düşünüyoruz.',
      en: 'Every hair appointment starts with a short chat about your hair’s history, your daily routine and what you’d like. We consider your face shape for cuts and your skin tone and hair health for colour.'
    },
    services: [
      { id: 'cut', name: { tr: 'Kesim + fön', en: 'Cut + blow-dry' }, desc: { tr: 'Yıkama, kesim ve şekillendirme', en: 'Wash, cut and style' }, min: 60, price: 1250 },
      { id: 'blowdry', name: { tr: 'Fön', en: 'Blow-dry' }, desc: { tr: 'Yıkama ve fön; düz ya da dalgalı', en: 'Wash and blow-dry, sleek or wavy' }, min: 45, price: 650 },
      { id: 'roots', name: { tr: 'Dip boya', en: 'Root colour' }, desc: { tr: 'Dip boya, yıkama ve fön', en: 'Root colour, wash and blow-dry' }, min: 90, price: 1900 },
      { id: 'balayage', name: { tr: 'Balyaj', en: 'Balayage' }, desc: { tr: 'El yapımı geçişli açıklık, tonlama ve fön', en: 'Hand-painted lightening, toner and blow-dry' }, min: 180, price: 4500, from: true },
      { id: 'keratin', name: { tr: 'Keratin bakım', en: 'Keratin treatment' }, desc: { tr: 'Kabarmayı azaltan, parlaklık veren bakım', en: 'Reduces frizz and adds shine' }, min: 150, price: 3800, from: true },
      { id: 'updo', name: { tr: 'Özel gün topuzu', en: 'Occasion updo' }, desc: { tr: 'Gelin, nişan ve davetler için topuz ya da dalga', en: 'Updo or waves for weddings and events' }, min: 75, price: 2500 }
    ],
    care: {
      tr: ['Boyadan sonra ilk 48 saat saçınızı yıkamamaya çalışın.', 'Renkli saçlar için sülfatsız şampuan kullanın.', 'Isıyla şekillendirmeden önce ısı koruyucu sprey uygulayın.', 'Uçlarınızı 8–10 haftada bir aldırmak kırıkları azaltır.'],
      en: ['Try not to wash your hair for 48 hours after colouring.', 'Use a sulphate-free shampoo on coloured hair.', 'Apply a heat protectant before heat styling.', 'A trim every 8–10 weeks helps prevent split ends.']
    },
    faq: {
      tr: [
        { q: 'Balyaj fiyatı neden “başlayan” olarak yazıyor?', a: 'Saçın uzunluğu, yoğunluğu ve mevcut rengi süreyi ve kullanılan ürün miktarını değiştirir. Kesin fiyatı salonda kısa bir ön görüşmeyle birlikte belirliyoruz.' },
        { q: 'Boyadan önce test yapıyor musunuz?', a: 'İlk kez boya yaptıracaksanız ya da daha önce reaksiyon yaşadıysanız, randevudan en az 48 saat önce kısa bir hassasiyet testi için uğramanızı öneririz.' },
        { q: 'Özel gün saçı için prova yapılabilir mi?', a: 'Evet. Gelin ve nişan saçlarında, büyük günden 1–3 hafta önce prova randevusu almanızı öneririz.' }
      ],
      en: [
        { q: 'Why is balayage priced “from”?', a: 'Length, thickness and your current colour change the time and amount of product needed. We confirm the exact price with a short consultation at the salon.' },
        { q: 'Do you do a patch test before colour?', a: 'If it’s your first colour with us or you’ve had a reaction before, please pop in for a quick sensitivity test at least 48 hours before your appointment.' },
        { q: 'Can I have a trial for occasion hair?', a: 'Yes. For weddings and engagements we recommend a trial 1–3 weeks before the big day.' }
      ]
    }
  },
  {
    id: 'nails',
    slug: { tr: 'tirnak', en: 'nails' },
    name: { tr: 'Tırnak', en: 'Nails' },
    photo: 'nails-salon',
    side: 'nails-pink',
    short: { tr: 'Manikür, pedikür, kalıcı oje ve protez tırnak. Sade ya da desenli.', en: 'Manicures, pedicures, gel polish and extensions, simple or with art.' },
    intro: {
      tr: 'Tırnak bakımında önce tırnak ve kütikül sağlığına bakıyoruz. Her müşteri için steril edilmiş alet seti ve tek kullanımlık törpü kullanıyoruz.',
      en: 'We start with the health of your nails and cuticles. Every client gets a sterilised tool set and a single-use file.'
    },
    services: [
      { id: 'manicure', name: { tr: 'Klasik manikür', en: 'Classic manicure' }, desc: { tr: 'Şekillendirme, kütikül bakımı ve oje', en: 'Shaping, cuticle care and polish' }, min: 40, price: 600 },
      { id: 'gel-hand', name: { tr: 'Kalıcı oje (el)', en: 'Gel polish (hands)' }, desc: { tr: 'Manikür dahil, 3 haftaya kadar dayanır', en: 'Includes manicure, lasts up to 3 weeks' }, min: 60, price: 900 },
      { id: 'extensions', name: { tr: 'Protez tırnak', en: 'Nail extensions' }, desc: { tr: 'Jel ile uzatma ve şekillendirme', en: 'Gel extensions and shaping' }, min: 90, price: 1600 },
      { id: 'pedicure', name: { tr: 'Pedikür', en: 'Pedicure' }, desc: { tr: 'Ayak bakımı, şekillendirme ve oje', en: 'Foot care, shaping and polish' }, min: 50, price: 850 },
      { id: 'gel-foot', name: { tr: 'Kalıcı oje (ayak)', en: 'Gel polish (feet)' }, desc: { tr: 'Kalıcı oje uygulaması', en: 'Gel polish application' }, min: 45, price: 750 }
    ],
    care: {
      tr: ['Kalıcı ojeyi kendiniz kazımayın; salonda çıkarılması tırnağı korur.', 'Kütikül yağını her gün kullanın.', 'Bulaşık ve temizlikte eldiven giymek ojenin ömrünü uzatır.'],
      en: ['Don’t peel off gel polish; salon removal protects the nail.', 'Use cuticle oil every day.', 'Wearing gloves for dishes and cleaning helps polish last longer.']
    },
    faq: {
      tr: [
        { q: 'Kalıcı oje tırnağa zarar verir mi?', a: 'Doğru uygulanıp salonda çıkarıldığında tırnağa zarar vermesi beklenmez. Zarar çoğunlukla ojenin kazınarak çıkarılmasından kaynaklanır.' },
        { q: 'Tırnak süsleme ücreti ayrı mı?', a: 'Sade süslemeler (tek renk desen, ince çizgi) fiyata dahildir. Ayrıntılı tasarımlar için fiyatı randevu sırasında konuşuyoruz.' },
        { q: 'Alet hijyenine nasıl dikkat ediyorsunuz?', a: 'Metal aletler her müşteriden sonra temizlenip sterilize edilir; törpü ve pamuk gibi malzemeler tek kullanımlıktır.' }
      ],
      en: [
        { q: 'Does gel polish damage nails?', a: 'Applied properly and removed at the salon, it isn’t expected to damage nails. Damage usually comes from peeling it off.' },
        { q: 'Is nail art extra?', a: 'Simple details (a single accent, fine lines) are included. We price detailed designs during your appointment.' },
        { q: 'How do you keep tools hygienic?', a: 'Metal tools are cleaned and sterilised after every client; files and cotton are single-use.' }
      ]
    }
  },
  {
    id: 'skin',
    slug: { tr: 'cilt-bakimi', en: 'skin-care' },
    name: { tr: 'Cilt bakımı', en: 'Skin care' },
    photo: 'skin-facial',
    side: 'skin-mask',
    short: { tr: 'Cilt tipinize göre temizlik, nem ve rahatlatıcı bakımlar.', en: 'Cleansing, hydrating and calming facials for your skin type.' },
    intro: {
      tr: 'Cilt bakımı, cildinizi tanımakla başlar. Bakımdan önce cilt tipinizi ve kullandığınız ürünleri konuşuyor, ardından size uygun bakımı uyguluyoruz. Tıbbi bir cilt sorununuz varsa dermatoloğa danışmanızı öneririz.',
      en: 'A good facial starts with knowing your skin. We talk about your skin type and current products, then tailor the treatment. For medical skin concerns we recommend seeing a dermatologist.'
    },
    services: [
      { id: 'facial', name: { tr: 'Klasik cilt bakımı', en: 'Classic facial' }, desc: { tr: 'Temizlik, peeling, maske ve masaj', en: 'Cleanse, exfoliation, mask and massage' }, min: 60, price: 1800 },
      { id: 'deep', name: { tr: 'Derin temizlik', en: 'Deep-cleansing facial' }, desc: { tr: 'Gözenek temizliği ve yatıştırıcı maske', en: 'Pore cleansing and a soothing mask' }, min: 75, price: 2400 },
      { id: 'hydra', name: { tr: 'Nem bakımı', en: 'Hydrating facial' }, desc: { tr: 'Kuru ve yorgun ciltler için yoğun nem', en: 'Intense hydration for dry, tired skin' }, min: 60, price: 2800 }
    ],
    care: {
      tr: ['Bakımdan sonraki gün yoğun makyajdan kaçının.', 'Gündüz güneş koruyucu kullanmayı unutmayın.', 'Bakım sonrası 48 saat sauna ve hamamdan uzak durun.'],
      en: ['Avoid heavy make-up the day after a facial.', 'Remember daily sunscreen.', 'Skip saunas and steam rooms for 48 hours afterwards.']
    },
    faq: {
      tr: [
        { q: 'Ne sıklıkla cilt bakımı yaptırmalıyım?', a: 'Çoğu cilt için 4–6 haftada bir yeterlidir. Uzmanımız cildinize göre öneride bulunur.' },
        { q: 'Hassas cildim var, bakım yaptırabilir miyim?', a: 'Evet; hassas ciltler için yatıştırıcı ürünlerle daha sade bir bakım uyguluyoruz. Bilinen alerjilerinizi randevu notuna yazmanız yeterli.' },
        { q: 'Bakım sonrası kızarıklık olur mu?', a: 'Derin temizlikten sonra birkaç saat süren hafif kızarıklık olabilir; genellikle aynı gün geçer.' }
      ],
      en: [
        { q: 'How often should I have a facial?', a: 'Every 4–6 weeks suits most skin. Your therapist will advise based on your skin.' },
        { q: 'I have sensitive skin — can I have a facial?', a: 'Yes; we use a gentler routine with calming products. Just add any known allergies to your booking note.' },
        { q: 'Will my skin be red afterwards?', a: 'After a deep-cleansing facial there may be mild redness for a few hours; it usually settles the same day.' }
      ]
    }
  },
  {
    id: 'makeup',
    slug: { tr: 'makyaj-kas-kirpik', en: 'makeup-brows-lashes' },
    name: { tr: 'Makyaj, kaş ve kirpik', en: 'Make-up, brows & lashes' },
    photo: 'makeup-artist',
    side: 'lashes',
    short: { tr: 'Günlük ve özel gün makyajı, kaş tasarımı, laminasyon ve kirpik lifting.', en: 'Everyday and occasion make-up, brow shaping, lamination and lash lifts.' },
    intro: {
      tr: 'Makyajda amacımız sizi başka biri gibi değil, en iyi gününüzdeki haliniz gibi göstermek. Kaş ve kirpik işlemlerinde yüz oranlarınızı esas alıyor, doğal bir sonuç hedefliyoruz.',
      en: 'Our aim with make-up is to make you look like yourself on your best day, not like someone else. For brows and lashes we follow your facial proportions for a natural result.'
    },
    services: [
      { id: 'makeup-day', name: { tr: 'Günlük makyaj', en: 'Everyday make-up' }, desc: { tr: 'Doğal görünümlü, hafif makyaj', en: 'A light, natural look' }, min: 45, price: 1500 },
      { id: 'makeup-event', name: { tr: 'Özel gün makyajı', en: 'Occasion make-up' }, desc: { tr: 'Gelin, nişan ve davetler için, takma kirpik dahil', en: 'For weddings and events, lashes included' }, min: 75, price: 2500 },
      { id: 'brows', name: { tr: 'Kaş tasarımı', en: 'Brow shaping' }, desc: { tr: 'Yüz oranlarına göre şekillendirme', en: 'Shaping to suit your features' }, min: 20, price: 450 },
      { id: 'brow-lam', name: { tr: 'Kaş laminasyonu', en: 'Brow lamination' }, desc: { tr: 'Kaşları sabitleyen, dolgun gösteren işlem', en: 'Sets brows for a fuller look' }, min: 45, price: 1100 },
      { id: 'lash-lift', name: { tr: 'Kirpik lifting', en: 'Lash lift' }, desc: { tr: 'Doğal kirpiklere kıvrım ve renk', en: 'Curl and tint for your natural lashes' }, min: 60, price: 1200 }
    ],
    care: {
      tr: ['Laminasyon ve lifting sonrası ilk 24 saat bölgeyi ıslatmayın.', 'Kirpik lifting sonrası yağ bazlı makyaj temizleyicilerden bir süre kaçının.', 'Özel gün makyajında, prova için 1–2 hafta önce randevu alın.'],
      en: ['Keep brows and lashes dry for 24 hours after lamination or a lift.', 'Avoid oil-based make-up removers for a while after a lash lift.', 'For occasion make-up, book a trial 1–2 weeks ahead.']
    },
    faq: {
      tr: [
        { q: 'Kaş laminasyonu ne kadar kalıcı?', a: 'Kıl yapısına göre genellikle 4–6 hafta etkisini korur.' },
        { q: 'Gelin makyajında prova gerekli mi?', a: 'Zorunlu değil ama öneriyoruz. Provada ışık, kıyafet ve saç modelinizle uyumlu bir makyajı birlikte belirliyoruz.' },
        { q: 'Kendi makyaj malzemelerimi getirebilir miyim?', a: 'Elbette. Cildinize uyduğunu bildiğiniz ürünleri getirmeniz bize de yardımcı olur.' }
      ],
      en: [
        { q: 'How long does brow lamination last?', a: 'Usually 4–6 weeks, depending on your brow hair.' },
        { q: 'Do I need a trial for bridal make-up?', a: 'It’s not required but we recommend it. At the trial we decide on a look that works with the lighting, your outfit and your hair.' },
        { q: 'Can I bring my own products?', a: 'Of course. Bringing products you know suit your skin helps us too.' }
      ]
    }
  }
];

/* Öne çıkan hizmetler (ana sayfa) */
export const featured = ['balayage', 'gel-hand', 'brow-lam'];

/* --------------------------------------------------------------------------
   Sayfa adresleri ve arayüz metinleri
   -------------------------------------------------------------------------- */
const tr = {
  lang: 'tr',
  locale: 'tr_TR',
  paths: { home: '/', services: '/hizmetler/', team: '/ekibimiz/', gallery: '/galeri/', contact: '/iletisim/', book: '/randevu/', privacy: '/kvkk/' },
  money: (n) => `₺${n.toLocaleString('tr-TR')}`,
  from: (p) => `${p}’den`,
  mins: (m) => (m >= 60 ? `${Math.floor(m / 60)} sa${m % 60 ? ` ${m % 60} dk` : ''}` : `${m} dk`),
  ui: {
    skip: 'İçeriğe geç', menu: 'Menü', close: 'Kapat', navLabel: 'Ana menü', langLabel: 'Dil seçimi', home: 'Ana sayfa', breadcrumb: 'Konum',
    book: 'Randevu al', call: 'Ara',
    openNow: 'Şu an açık', closedNow: 'Şu an kapalı',
    opensAt: (day, time) => `açılış ${day} ${time}`, closesAt: (time) => `kapanış ${time}`,
    today: 'bugün', tomorrow: 'yarın', closed: 'Kapalı',
    days: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
    daysShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
    months: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    demoBar: 'Demo proje: Mürver kurgusal bir salondur; ekip, adres, telefon ve fiyatlar örnektir.',
    demoBy: 'Egemen Tuncer tarafından tasarlandı',
    demoPhone: 'Bu bir demo site; telefon numarası gerçek değil.',
    seeAll: 'Tümünü gör', priceList: 'Fiyat listesi', viewCategory: 'Hizmetleri gör', select: 'Seç',
    startsFrom: 'başlayan fiyatlarla', duration: 'Süre', price: 'Fiyat'
  },
  nav: { services: 'Hizmetler', team: 'Ekibimiz', gallery: 'Galeri', contact: 'İletişim' },
  meta: { siteDesc: 'Mürver Güzellik Atölyesi: İstanbul’da saç, tırnak, cilt bakımı, makyaj, kaş ve kirpik hizmetleri. Fiyat listesi ve online randevu.' },
  home: {
    title: 'Mürver · Güzellik Atölyesi · İstanbul',
    eyebrow: 'Güzellik atölyesi · İstanbul',
    h1: ['Kendinize ayırdığınız', 'sakin bir saat.'],
    lead: 'Saç, tırnak, cilt ve makyaj için küçük, özenli bir salon. Hizmetinizi seçin, size uygun saati online ayırın.',
    secondary: 'Fiyat listesi',
    catTitle: 'Hizmetlerimiz',
    catSub: 'Dört alanda, alanında çalışan uzmanlarla.',
    featTitle: 'Çok tercih edilenler',
    aboutTitle: 'Acele etmeden, özenle.',
    aboutText: 'Mürver’de randevuları üst üste sıkıştırmıyoruz. Her işlemden önce ne istediğinizi konuşuyor, süreyi buna göre ayırıyoruz. Aletlerimiz her müşteriden sonra sterilize edilir; törpü ve pamuk gibi malzemeler tek kullanımlıktır.',
    stats: [{ k: '5', v: 'uzman' }, { k: '19', v: 'hizmet' }, { k: '6', v: 'gün açık' }],
    teamTitle: 'Ekibimiz',
    galleryTitle: 'Salondan kareler',
    howTitle: 'Online randevu, üç adımda',
    how: [
      { t: 'Hizmetinizi seçin', d: 'Bir ya da birkaç hizmet seçin; toplam süre ve fiyat anında hesaplanır.' },
      { t: 'Uzman ve saat', d: 'İsterseniz uzmanınızı seçin, takvimden size uygun boş saati ayırın.' },
      { t: 'Onay', d: 'Bilgilerinizi bırakın; randevunuzu takviminize de ekleyebilirsiniz.' }
    ],
    ctaTitle: 'Kendinize bir saat ayırın',
    ctaText: 'Boş saatleri görün, randevunuzu bir dakikada oluşturun.'
  },
  servicesPage: {
    title: 'Hizmetler ve fiyatlar',
    lead: 'Fiyatlara KDV dahildir. “₺4.500’den” gibi yazılan fiyatlar saç uzunluğuna ya da kapsama göre değişir; kesin fiyat salonda konuşulur.',
    jump: 'Kategoriye git'
  },
  category: {
    list: 'Fiyat listesi', care: 'Sonrası için öneriler', faq: 'Sık sorulan sorular', team: 'Bu alanda çalışan uzmanlarımız',
    others: 'Diğer hizmetler', cta: 'Bu kategoriden randevu al', note: 'Fiyatlar örnektir ve KDV dahildir.'
  },
  teamPage: {
    title: 'Ekibimiz', lead: 'Her biri kendi alanında çalışan beş uzman. Randevu alırken uzmanınızı seçebilirsiniz.',
    book: (n) => `${n} ile randevu al`, note: 'Ekip kurgusaldır; isimler gerçek kişileri temsil etmez ve sitedeki fotoğraflar ekibin portresi değildir.'
  },
  galleryPage: {
    title: 'Galeri', lead: 'Salondan ve çalışmalarımızdan kareler.',
    all: 'Tümü', cats: { hair: 'Saç', nails: 'Tırnak', skin: 'Cilt', makeup: 'Makyaj', salon: 'Salon' },
    filter: 'Galeriyi filtrele', open: 'Büyüt', prev: 'Önceki', next: 'Sonraki', count: (i, n) => `${i} / ${n}`
  },
  contactPage: {
    title: 'İletişim', lead: 'Randevu ve sorularınız için bize ulaşın.',
    address: 'Adres', phone: 'Telefon', email: 'E-posta', hours: 'Çalışma saatleri', social: 'Instagram',
    transport: 'Ulaşım',
    transportItems: ['Metro: Örnek istasyonu, 4 dakika yürüme', 'Otobüs: Mürver Sokak durağı', 'Otopark: Sokak başındaki otoparkta müşterilerimize 2 saat ücretsiz'],
    mapLabel: 'Salonun konumunu gösteren şematik harita', mapNote: 'Şematik harita · demo adres'
  },
  book: {
    title: 'Online randevu',
    lead: 'Hizmetinizi seçin, size uygun boş saati ayırın.',
    steps: ['Hizmet', 'Uzman', 'Tarih ve saat', 'Bilgiler', 'Özet'],
    stepOf: (i, n) => `Adım ${i} / ${n}`,
    q1: 'Hangi hizmetleri istersiniz?', q1hint: 'Birden fazla seçebilirsiniz.',
    cart: { empty: 'Henüz hizmet seçmediniz', items: (n) => `${n} hizmet`, total: 'Toplam', duration: 'Süre' },
    q2: 'Uzman tercihiniz var mı?', any: 'Fark etmez', anySub: 'Seçtiğiniz saatte uygun olan uzman',
    cannot: 'Seçtiğiniz hizmetlerin hepsini yapmıyor',
    q3: 'Tarih ve saat seçin', dayLabel: 'Gün', slotLabel: 'Boş saatler', noSlots: 'Bu gün için uygun saat kalmadı, başka bir gün seçin.',
    slotHint: (d) => `Seçtiğiniz hizmetler yaklaşık ${d} sürer.`, demoBusy: 'Demo: dolu saatler örnek olarak gösterilir.',
    q4: 'İletişim bilgileriniz', name: 'Ad soyad', phone: 'Telefon', phoneHint: 'Randevu hatırlatması için.',
    note: 'Not (isteğe bağlı)', noteHint: 'Örneğin saç uzunluğunuz, alerjileriniz ya da istediğiniz model.',
    kvkk: 'Kişisel verilerimin randevumun oluşturulması amacıyla işlenmesine ilişkin <a href="/kvkk/">aydınlatma metnini</a> okudum.',
    q5: 'Randevunuzu kontrol edin',
    sum: { services: 'Hizmetler', person: 'Uzman', time: 'Tarih ve saat', contact: 'İletişim', total: 'Tahmini toplam' },
    edit: 'Düzenle', back: 'Geri', next: 'Devam', submit: 'Randevuyu oluştur',
    errors: { services: 'En az bir hizmet seçin.', day: 'Bir gün seçin.', slot: 'Bir saat seçin.', name: 'Adınızı ve soyadınızı yazın.', phone: 'Geçerli bir telefon numarası yazın.', kvkk: 'Devam etmek için aydınlatma metnini onaylayın.' },
    doneTitle: 'Randevunuz oluşturuldu',
    doneText: (ref, when) => `${when} için randevunuz hazır. Randevu numaranız ${ref}.`,
    ics: 'Takvime ekle', icsTitle: 'Mürver randevusu',
    demoNote: 'Demo: Bu bir demo sitedir. Bilgileriniz hiçbir yere gönderilmedi ve kaydedilmedi.',
    again: 'Yeni randevu',
    noscript: 'Online randevu için JavaScript gerekir. Bizi telefonla da arayabilirsiniz.'
  },
  privacyPage: {
    title: 'KVKK aydınlatma metni', lead: 'Örnek metin · demo',
    body: [
      ['Veri sorumlusu', 'Mürver Güzellik Atölyesi (kurgusal). Bu metin, gerçek bir işletmede yer alması gereken aydınlatma metninin yapısını göstermek için hazırlanmış bir örnektir.'],
      ['İşlenen veriler', 'Randevu formunda paylaştığınız ad soyad, telefon numarası, seçtiğiniz hizmetler, uzman, tarih ve saat ile isteğe bağlı notlarınız.'],
      ['İşleme amacı', 'Randevunuzun oluşturulması, hatırlatılması ve gerektiğinde sizinle iletişime geçilmesi.'],
      ['Hukuki sebep', '6698 sayılı KVKK’nın 5. maddesindeki “bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması” sebebi.'],
      ['Aktarım', 'Verileriniz üçüncü kişilerle paylaşılmaz; yalnızca yasal yükümlülük hâlinde yetkili kurumlara aktarılabilir.'],
      ['Haklarınız', 'KVKK’nın 11. maddesi kapsamında verilerinize ilişkin bilgi talep etme, düzeltme ve silinmesini isteme haklarına sahipsiniz.'],
      ['Bu demoda', 'Bu sitede form verileri hiçbir sunucuya gönderilmez ve saklanmaz; yalnızca tarayıcınızda özet ekranı ve takvim dosyası oluşturmak için kullanılır.']
    ]
  },
  notFound: { title: 'Sayfa bulunamadı', text: 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.', back: 'Ana sayfaya dön' },
  footer: {
    about: 'Mürver, İstanbul’da saç, tırnak, cilt ve makyaj için küçük bir güzellik atölyesidir. (Kurgusal demo.)',
    pages: 'Sayfalar', services: 'Hizmetler', contact: 'İletişim', privacy: 'KVKK', made: 'Tasarım ve geliştirme', photos: 'Fotoğraflar'
  }
};

const en = {
  lang: 'en',
  locale: 'en_GB',
  paths: { home: '/en/', services: '/en/services/', team: '/en/team/', gallery: '/en/gallery/', contact: '/en/contact/', book: '/en/book/', privacy: '/en/privacy/' },
  money: (n) => `₺${n.toLocaleString('en-GB')}`,
  from: (p) => `from ${p}`,
  mins: (m) => (m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ''}` : `${m} min`),
  ui: {
    skip: 'Skip to content', menu: 'Menu', close: 'Close', navLabel: 'Main menu', langLabel: 'Language', home: 'Home', breadcrumb: 'Breadcrumb',
    book: 'Book now', call: 'Call',
    openNow: 'Open now', closedNow: 'Closed now',
    opensAt: (day, time) => `Opens ${day} at ${time}`, closesAt: (time) => `Open until ${time}`,
    today: 'today', tomorrow: 'tomorrow', closed: 'Closed',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    demoBar: 'Demo project: Mürver is a fictional salon; the team, address, phone number and prices are examples.',
    demoBy: 'Designed by Egemen Tuncer',
    demoPhone: 'This is a demo site; the phone number is not real.',
    seeAll: 'See all', priceList: 'Price list', viewCategory: 'View services', select: 'Select',
    startsFrom: 'starting prices', duration: 'Duration', price: 'Price'
  },
  nav: { services: 'Services', team: 'Our team', gallery: 'Gallery', contact: 'Contact' },
  meta: { siteDesc: 'Mürver Beauty Atelier: hair, nails, skin care, make-up, brows and lashes in Istanbul. Price list and online booking.' },
  home: {
    title: 'Mürver · Beauty Atelier · Istanbul',
    eyebrow: 'Beauty atelier · Istanbul',
    h1: ['A calm hour', 'just for you.'],
    lead: 'A small, attentive salon for hair, nails, skin and make-up. Choose your treatment and book a time online.',
    secondary: 'Price list',
    catTitle: 'Our services',
    catSub: 'Four areas, each with its own specialists.',
    featTitle: 'Popular choices',
    aboutTitle: 'Unhurried, with care.',
    aboutText: 'At Mürver we don’t squeeze appointments back to back. We talk about what you’d like before every treatment and plan the time around it. Tools are sterilised after every client, and files and cotton are single-use.',
    stats: [{ k: '5', v: 'specialists' }, { k: '19', v: 'services' }, { k: '6', v: 'days a week' }],
    teamTitle: 'Our team',
    galleryTitle: 'Around the salon',
    howTitle: 'Book online in three steps',
    how: [
      { t: 'Choose treatments', d: 'Pick one or more; the total time and price update instantly.' },
      { t: 'Specialist and time', d: 'Choose a specialist if you like, then pick a free slot.' },
      { t: 'Confirm', d: 'Leave your details and add the appointment to your calendar.' }
    ],
    ctaTitle: 'Take an hour for yourself',
    ctaText: 'See free slots and book in under a minute.'
  },
  servicesPage: {
    title: 'Services and prices',
    lead: 'Prices include VAT. Prices marked “from” depend on hair length or scope; the exact price is confirmed at the salon.',
    jump: 'Jump to category'
  },
  category: {
    list: 'Price list', care: 'Aftercare tips', faq: 'Frequently asked questions', team: 'Specialists in this area',
    others: 'Other services', cta: 'Book in this category', note: 'Prices are examples and include VAT.'
  },
  teamPage: {
    title: 'Our team', lead: 'Five specialists, each in their own field. You can choose your specialist when booking.',
    book: (n) => `Book with ${n}`, note: 'The team is fictional; names do not represent real people and the photos on this site are not portraits of the team.'
  },
  galleryPage: {
    title: 'Gallery', lead: 'Moments from the salon and our work.',
    all: 'All', cats: { hair: 'Hair', nails: 'Nails', skin: 'Skin', makeup: 'Make-up', salon: 'Salon' },
    filter: 'Filter gallery', open: 'Enlarge', prev: 'Previous', next: 'Next', count: (i, n) => `${i} of ${n}`
  },
  contactPage: {
    title: 'Contact', lead: 'Get in touch for bookings and questions.',
    address: 'Address', phone: 'Phone', email: 'Email', hours: 'Opening hours', social: 'Instagram',
    transport: 'Getting here',
    transportItems: ['Metro: Örnek station, 4 minutes on foot', 'Bus: Mürver Sokak stop', 'Parking: 2 hours free for clients at the car park at the end of the street'],
    mapLabel: 'Schematic map showing the salon location', mapNote: 'Schematic map · demo address'
  },
  book: {
    title: 'Book online',
    lead: 'Choose your treatments and pick a free time that suits you.',
    steps: ['Services', 'Specialist', 'Date & time', 'Details', 'Summary'],
    stepOf: (i, n) => `Step ${i} of ${n}`,
    q1: 'Which treatments would you like?', q1hint: 'You can choose more than one.',
    cart: { empty: 'No treatments selected yet', items: (n) => `${n} treatment${n === 1 ? '' : 's'}`, total: 'Total', duration: 'Time' },
    q2: 'Do you have a preferred specialist?', any: 'No preference', anySub: 'Whoever is free at your time',
    cannot: 'Doesn’t offer all the treatments you chose',
    q3: 'Choose a date and time', dayLabel: 'Day', slotLabel: 'Free times', noSlots: 'No times left on this day — please choose another.',
    slotHint: (d) => `Your treatments take about ${d}.`, demoBusy: 'Demo: booked times are shown as an example.',
    q4: 'Your contact details', name: 'Full name', phone: 'Phone', phoneHint: 'For your appointment reminder.',
    note: 'Note (optional)', noteHint: 'For example your hair length, allergies or the look you want.',
    kvkk: 'I have read the <a href="/en/privacy/">privacy notice</a> on how my data is processed to create my booking.',
    q5: 'Check your booking',
    sum: { services: 'Treatments', person: 'Specialist', time: 'Date and time', contact: 'Contact', total: 'Estimated total' },
    edit: 'Edit', back: 'Back', next: 'Continue', submit: 'Confirm booking',
    errors: { services: 'Choose at least one treatment.', day: 'Choose a day.', slot: 'Choose a time.', name: 'Enter your full name.', phone: 'Enter a valid phone number.', kvkk: 'Please confirm the privacy notice to continue.' },
    doneTitle: 'You’re booked in',
    doneText: (ref, when) => `Your appointment for ${when} is confirmed. Your booking number is ${ref}.`,
    ics: 'Add to calendar', icsTitle: 'Mürver appointment',
    demoNote: 'Demo: this is a demo site. Your details were not sent or stored anywhere.',
    again: 'New booking',
    noscript: 'Online booking needs JavaScript. You can also call us.'
  },
  privacyPage: {
    title: 'Privacy notice', lead: 'Sample text · demo',
    body: [
      ['Data controller', 'Mürver Beauty Atelier (fictional). This text is a sample showing the structure of the privacy notice a real business needs under Turkish data protection law (KVKK).'],
      ['Data processed', 'The name, phone number, chosen treatments, specialist, date and time you share in the booking form, plus any optional notes.'],
      ['Purpose', 'Creating your appointment, sending reminders and contacting you when needed.'],
      ['Legal basis', 'Article 5 of Law No. 6698: processing directly related to entering into or performing a contract.'],
      ['Transfers', 'Your data is not shared with third parties; it may only be disclosed to authorities where required by law.'],
      ['Your rights', 'Under Article 11 of the KVKK you have the right to request information about, correction and deletion of your data.'],
      ['In this demo', 'Form data on this site is never sent to a server or stored; it is only used in your browser to build the summary screen and calendar file.']
    ]
  },
  notFound: { title: 'Page not found', text: 'The page you are looking for may have moved or never existed.', back: 'Back to home' },
  footer: {
    about: 'Mürver is a small beauty atelier in Istanbul for hair, nails, skin and make-up. (Fictional demo.)',
    pages: 'Pages', services: 'Services', contact: 'Contact', privacy: 'Privacy', made: 'Design and development', photos: 'Photos'
  }
};

export const langs = [tr, en];
