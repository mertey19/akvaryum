import type { Guide } from "./content/schema";

type District = {
  name: string;
  slug: string;
  focus: string;
  placement: string;
  access: string;
  planning: string;
};

const districts: District[] = [
  {
    name: "Akyurt",
    slug: "akyurt-akvaryum-secimi",
    focus: "kullanım alanı, taşıma yolu ve ekipman erişimi",
    placement:
      "Ev, ofis veya çalışma alanındaki kullanılabilir genişliği; filtre ve bakım payını ekleyerek ölçün.",
    access:
      "Bina girişi, kapı, koridor ve dönüş noktalarındaki en dar geçişi santimetre olarak kaydedin.",
    planning:
      "Mevcut ekipmanınız varsa marka-model bilgisini ve mobilya ihtiyacını aynı talebe ekleyin.",
  },
  {
    name: "Altındağ",
    slug: "altindag-akvaryum-fiyatlari-ve-olcu-rehberi",
    focus: "hazır ölçü, cam seçeneği ve bina erişimi",
    placement:
      "Üstten bakım boşluğunu, arka hortum payını ve mobilya kapaklarının açılımını ölçüye ekleyin.",
    access:
      "Bina yaşı ne olursa olsun asansör kabini, merdiven dönüşü ve daire kapısını ayrı ayrı kontrol edin.",
    planning:
      "Aynı ölçünün 90° ve 45° seçeneklerini ürün kodu ve fiyatıyla birlikte karşılaştırın.",
  },
  {
    name: "Ayaş",
    slug: "ayas-akvaryum-siparisi-oncesi-rehber",
    focus: "teslimat kapsamı, paket içeriği ve kurulum hazırlığı",
    placement:
      "Kurulum noktasını boşaltın; mobilya, priz ve bakım alanının hazır olduğunu kontrol edin.",
    access:
      "İlçe, mahalle, kat ve bina erişimini paylaşın; nakliye ile kata taşımanın dahil olduğunu varsaymayın.",
    planning:
      "Akvaryum, zemin matı, arka fon, mobilya ve ekipmanı ayrı kalemler halinde teyit edin.",
  },
  {
    name: "Bala",
    slug: "bala-akvaryum-kurulum-planlama",
    focus: "dış ölçü, taşıma bilgisi ve ilk bakım düzeni",
    placement:
      "Cam ölçüsüne ek olarak üst bakım ve arka ekipman boşluğu bırakın.",
    access:
      "Açık adres, kat, merdiven ve en dar kapı ölçüsünü teslimat görüşmesinde belirtin.",
    planning:
      "Su değişimi ve filtre bakımı için gereken araçlara erişilebilir bir saklama alanı ayırın.",
  },
  {
    name: "Beypazarı",
    slug: "beypazari-akvaryum-alirken-nelere-bakilmali",
    focus: "mekân ölçüsü, mobilya uygunluğu ve paket içeriği",
    placement:
      "Pencere, ısı kaynağı, kapı açılımı ve yoğun geçiş noktalarını işaretleyerek sakin bir konum seçin.",
    access:
      "Taşıma rotasındaki kapı ve dönüşleri ürün dış ölçüsünden ayrı kaydedin.",
    planning:
      "Mevcut bir dolabı yalnız dış ölçüsüne bakarak uygun kabul etmeyin; taşıma uygunluğunu doğrulatın.",
  },
  {
    name: "Çamlıdere",
    slug: "camlidere-akvaryum-oda-sicakligi-ve-ekipman",
    focus: "oda sıcaklığı, güvenli elektrik ve ekipman seçimi",
    placement:
      "Kurulum noktasını farklı saatlerde gözlemleyin; doğrudan güneş ve ısı kaynaklarından uzak tutun.",
    access:
      "Priz, filtre ve üst bakım alanının kolay erişilebilir kalmasını sağlayın.",
    planning:
      "Isıtma veya soğutmayı yalnız brüt litreye göre değil, hedef sistem ve üretici verileriyle değerlendirin.",
  },
  {
    name: "Çankaya",
    slug: "cankaya-akvaryum-secimi-apartman-ve-ofis",
    focus: "ev veya ofiste sessiz kullanım, bakım ve erişim",
    placement:
      "Kablo güzergâhı, mobilya içi havalandırma ve çalışma alanındaki ses beklentisini birlikte düşünün.",
    access:
      "Otoparktan kurulum noktasına kadar asansör kapısı, kabin ve koridor dönüşlerini ölçün.",
    planning:
      "Akvaryumu kimin, hangi sıklıkta kontrol edeceğini kurulumdan önce belirleyin.",
  },
  {
    name: "Çubuk",
    slug: "cubuk-akvaryum-olcu-ve-tasima-rehberi",
    focus: "büyük ölçü, güvenli taşıma ve bakım kolaylığı",
    placement:
      "Daha geniş ölçünün mobilya, ekipman, bakım alanı ve toplam yük üzerindeki etkisini değerlendirin.",
    access:
      "Taşıma rotasındaki en dar noktayı bulun ve güvenli tutuş için gereken payı hesaba katın.",
    planning:
      "Üst bölgeye rahatça ulaşamadığınız bir ölçüyü yalnız hacmi büyük diye seçmeyin.",
  },
  {
    name: "Elmadağ",
    slug: "elmadag-akvaryum-yerlesim-ve-isi-planlama",
    focus: "ısı kaynakları, aydınlatma ve elektrik düzeni",
    placement:
      "Radyatör, soba, klima çıkışı ve doğrudan güneşten uzak, kararlı bir konum seçin.",
    access:
      "Kabloları su sıçramasından koruyan ve bakımda erişilebilen bir priz düzeni hazırlayın.",
    planning:
      "Aydınlatmayı pencere ışığına göre değil, kurulumun ihtiyacı ve üretici verileriyle seçin.",
  },
  {
    name: "Etimesgut",
    slug: "etimesgut-akvaryum-evde-guvenli-yerlesim",
    focus: "yaşam alanında güvenli geçiş, kablo ve bakım",
    placement:
      "Kapı arkası ve dar koridor yerine çarpma riskini azaltan, sakin bir konum belirleyin.",
    access:
      "Kabloları yerde bırakmayın; filtreyi bakım sırasında çıkarabileceğiniz alanı ölçün.",
    planning:
      "Su değişiminin nerede yapılacağını ve bakım malzemelerinin nerede saklanacağını baştan kararlaştırın.",
  },
  {
    name: "Evren",
    slug: "evren-akvaryum-bakim-ve-yedek-planlama",
    focus: "bakım takvimi, sarf ve yedek parça erişimi",
    placement:
      "Filtre ve diğer ekipmanların kolay temizlenebildiği, çevresi kullanılabilir bir konum seçin.",
    access:
      "Teslimat koşullarıyla birlikte uyumlu sarf ve yedek parçaların nasıl temin edileceğini sorun.",
    planning:
      "Tüm ekipmanların marka-model bilgisini saklayın; parça seçiminde görsel benzerliğe güvenmeyin.",
  },
  {
    name: "Gölbaşı",
    slug: "golbasi-akvaryum-gunes-ve-yerlesim-rehberi",
    focus: "doğrudan güneş, görünürlük ve bakım erişimi",
    placement:
      "Aydınlık oda ile doğrudan güneşi ayırın; seçilen noktayı gün boyunca gözlemleyin.",
    access:
      "Dekoratif yerleşim yaparken filtre, priz ve üst bakım bölgesine ulaşımı kapatmayın.",
    planning:
      "Mobilyanın zemine tam oturuşunu ve dolu sistemin toplam yükünü yetkin kişiye doğrulatın.",
  },
  {
    name: "Güdül",
    slug: "gudul-akvaryum-bakim-kolayligi-rehberi",
    focus: "bakım kolaylığı, ekipman kaydı ve düzenli tedarik",
    placement:
      "Su değişimi ve filtre temizliği sırasında rahat çalışabileceğiniz boşluk bırakın.",
    access:
      "Bakım araçlarını yalnız akvaryumda kullanılacak, erişilebilir bir yerde saklayın.",
    planning:
      "Filtre, aydınlatma ve diğer ekipmanların model bilgilerini tek kayıtta tutun.",
  },
  {
    name: "Haymana",
    slug: "haymana-akvaryum-oda-kosullari-rehberi",
    focus: "oda koşulları, sıcaklık ve güvenli su değişimi",
    placement:
      "Kurulum noktasının farklı saatlerdeki güneş, ısı ve insan trafiğini gözlemleyin.",
    access:
      "Su kaynağı ile akvaryum arasındaki yolu ve zemini koruyacak bakım düzenini planlayın.",
    planning:
      "Isıtma, soğutma ve filtrasyonu hedef sistem netleşmeden yalnız litreye bakarak seçmeyin.",
  },
  {
    name: "Kahramankazan",
    slug: "kahramankazan-ofis-ve-is-yeri-akvaryumu",
    focus: "iş yeri görünürlüğü, bakım sorumluluğu ve erişim",
    placement:
      "Müşteri veya çalışma alanında geçişi daraltmayan, kabloları açıkta bırakmayan bir konum seçin.",
    access:
      "Teslimat rotası ile bakım sırasında kullanılacak alanı ayrı ayrı kontrol edin.",
    planning:
      "Tatil günleri dahil akvaryumu kimin kontrol edeceğini ve ekipmanın nerede saklanacağını belirleyin.",
  },
  {
    name: "Kalecik",
    slug: "kalecik-akvaryum-zemin-ve-mobilya-secimi",
    focus: "düz zemin, uygun mobilya ve ekipman alanı",
    placement:
      "Mobilyanın zemine dengeli oturduğunu ve üst ile arka bakım boşluklarının korunduğunu kontrol edin.",
    access:
      "Dış filtreyi dolaptan çıkaracak yükseklik ile hortum ve kablo geçişlerini ölçün.",
    planning:
      "Dolu sistemin taşıma uygunluğunu yalnız mobilya görünümüne göre değerlendirmeyin.",
  },
  {
    name: "Keçiören",
    slug: "kecioren-akvaryum-tasima-ve-apartman-rehberi",
    focus: "apartman merdiveni, asansör ve daire içi geçiş",
    placement:
      "Son konumda üst bakım, arka bağlantı ve ön çalışma alanını açık bırakın.",
    access:
      "Bina kapısı, asansör, merdiven dönüşü, kat koridoru ve daire kapısını sırayla ölçün.",
    planning:
      "Talebe kat, asansör durumu ve dar geçişleri ekleyerek taşıma kapsamını açıkça sorun.",
  },
  {
    name: "Kızılcahamam",
    slug: "kizilcahamam-akvaryum-sicaklik-ve-bakim",
    focus: "mevsimsel oda koşulları, sıcaklık ve bakım",
    placement:
      "Kış ve yaz dönemindeki ısı kaynaklarını, güneşi ve hava akımını birlikte düşünün.",
    access:
      "Filtreyi çıkarabileceğiniz ve su değişimini güvenle yapabileceğiniz boşluk bırakın.",
    planning:
      "Sıcaklık ekipmanını gerçek su miktarı, hedef değer ve üretici kullanım aralığıyla seçin.",
  },
  {
    name: "Mamak",
    slug: "mamak-akvaryum-imalati-ve-hazir-olculer",
    focus: "DSN Akvaryum adresi, hazır ölçüler ve doğrulanmış ürün bilgileri",
    placement:
      "DSN’nin doğrulanmış adresi Hüseyin Gazi, Ekin, Su Sk. No:17, 06160 Mamak/Ankara’dır; gelmeden önce WhatsApp’tan teyit alın.",
    access:
      "Ziyaret, teslim alma veya teslimat ayrıntılarını çalışma saatleriyle birlikte önceden sorun.",
    planning:
      "Katalogdaki 14 hazır ölçüyü, 90° ve 45° fiyatlarını ürün koduyla karşılaştırın; akvaryumlarda DIAMOND cam kullanılır.",
  },
  {
    name: "Nallıhan",
    slug: "nallihan-akvaryum-teslimat-hazirligi",
    focus: "teslimat teyidi, ürün kodu ve kurulum hazırlığı",
    placement:
      "Kurulum noktasını boşaltın; mobilyanın yerini, prizi ve bakım erişimini hazırlayın.",
    access:
      "İlçe, mahalle, kat ve bina geçişlerini paylaşarak teslimat olanağı ile ücretini ayrıca sorun.",
    planning:
      "Aynı ölçünün 90° ve 45° seçeneklerini karıştırmamak için ürün kodunu mesajınıza ekleyin.",
  },
  {
    name: "Polatlı",
    slug: "polatli-akvaryum-siparis-ve-tasima-kontrol-listesi",
    focus: "sipariş özeti, taşıma kapsamı ve teslim kontrolü",
    placement:
      "Akvaryum ölçüsü, mobilya ihtiyacı ve bakım boşluğunu yerinde işaretleyerek kontrol edin.",
    access:
      "Ambalaj, araçtan indirme, kata taşıma ve kurulumun hangi tarafa ait olduğunu yazılı teyit edin.",
    planning:
      "Teslimde ürün kodu, ölçü ve cam seçeneğinin talebinizle aynı olduğunu kontrol edin.",
  },
  {
    name: "Pursaklar",
    slug: "pursaklar-yeni-ev-icin-akvaryum-planlama",
    focus: "yeni evde mobilya, priz ve bakım boşluğu",
    placement:
      "Duvar ünitesine yalnız cam ölçüsü değil, arka hortum ve üst bakım payı da bırakın.",
    access:
      "Kablo güzergâhını ve su değişimi sırasında kullanılacak alanı mobilya yerleşiminden önce belirleyin.",
    planning:
      "Raf, panel veya kapakların filtre ve üst bölgeye erişimi engellemediğini prova edin.",
  },
  {
    name: "Sincan",
    slug: "sincan-akvaryum-mobilya-ve-filtre-planlama",
    focus: "akvaryum, mobilya ve filtrenin birlikte ölçülmesi",
    placement:
      "Mobilya genişliği ile derinliğinin akvaryuma uyumunu ve zemine tam oturuşunu kontrol edin.",
    access:
      "Dış filtre yüksekliği, hortum bağlantıları ve bakım için yukarı kaldırma payını dolap içinde ölçün.",
    planning:
      "Duvar arkasında hortum ve kabloları sıkıştırmayacak doğal dönüş alanı bırakın.",
  },
  {
    name: "Şereflikoçhisar",
    slug: "sereflikochisar-akvaryum-ekipman-ve-sarf-rehberi",
    focus: "ekipman modeli, sarf ihtiyacı ve teslimat kapsamı",
    placement:
      "Ekipmanların bakım için kolayca çıkarıldığı ve kabloların güvenle düzenlendiği bir yer seçin.",
    access:
      "Nakliye ücreti, teslim zamanı ve hasar bildirimi sürecini sipariş öncesinde sorun.",
    planning:
      "Filtre ve aydınlatmanın marka-model bilgisini saklayın; sarf seçiminde üretici uyumluluğunu esas alın.",
  },
  {
    name: "Yenimahalle",
    slug: "yenimahalle-ev-ve-ofis-akvaryumu-rehberi",
    focus: "ev veya ofiste sessiz kullanım ve bakım sorumluluğu",
    placement:
      "Filtre konumu, mobilya içi düzen ve çalışma alanındaki ses beklentisini birlikte değerlendirin.",
    access:
      "Otopark veya girişten son konuma kadar asansör, kapı ve koridor ölçülerini kontrol edin.",
    planning:
      "Hafta sonu dahil akvaryumla kimin ilgileneceğini ve su değişiminin nerede yapılacağını belirleyin.",
  },
];

export const ankaraDistrictGuides: Guide[] = districts.map((district) => ({
  slug: district.slug,
  tag: "ANKARA İLÇE REHBERİ",
  title: `${district.name} akvaryum rehberi`,
  intro: `${district.name} için akvaryum araştırırken ${district.focus} konularını birlikte değerlendirin.`,
  category: "akvaryumlar",
  sections: [
    ["Kurulum alanını doğru hazırlayın", district.placement],
    ["Taşıma ve erişim bilgisini netleştirin", district.access],
    ["Ürün ve ekipman planını tamamlayın", district.planning],
    [
      `${district.name} için fiyat ve stok teyidi`,
      `Katalog fiyatlarını karşılaştırın; güncel stok, teslimat olanağı, ücret, ödeme ve kurulum kapsamını WhatsApp görüşmesinde teyit edin. İlçe adının bu rehberde yer alması teslimat garantisi anlamına gelmez.`,
    ],
    [
      "WhatsApp talebine eklenecekler",
      `Mesajınıza “${district.name}” bilgisini, ürün kodunu, ölçüyü, 90° veya 45° seçeneğini, kat ve bina erişimini ekleyin. Mobilya veya ekipman gerekiyorsa bunları ayrı kalemler halinde yazın.`,
    ],
  ],
}));
