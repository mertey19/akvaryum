import approvedProducts from "@/data/products.json";
import {
  aquariumPriceListDate,
  productSchema,
  type Category,
  type Product,
} from "../catalog";
import type {
  Guide,
  MenuGroup,
  Project,
  Settings,
  SiteContent,
} from "./schema";

export const defaultSettings: Settings = {
  name: "DSN Akvaryum",
  fullName: "DSN Akvaryum İmalatı",
  brandLabel: "DSN AKVARYUM İMALATI",
  logoPath: "/images/dsn-logo.jpeg",
  phone: "0545 389 71 47",
  whatsapp: "+905453897147",
  address: "Mamak Hüseyin Gazi, Ekin, Su Sk. No:17, 06160 Mamak/Ankara",
  socialHandle: "Dursun.belgic",
  email: "",
  hours: "",
  aquariumGlass: "DIAMOND cam",
  aquariumPriceIncludes: "Arka fon ve zemin matı fiyata dahildir.",
  announcement: "Hazır ölçü akvaryumlar mevcut",
  homeDescription:
    "DSN Akvaryum İmalatı: Ankara Mamak'ta DIAMOND cam ile Ultra Clear akvaryum üretimi. Hazır ölçü akvaryumlar, 90° ve 45° fiyatları, teraryum ve paludaryum; WhatsApp üzerinden sipariş.",
  heroEyebrow: "BİR AKVARYUMDAN DAHA FAZLASI",
  heroTitle: "DSN AKVARYUM",
  heroTitleAccent: "İMALATI",
  heroLead: "Su altı dünyanıza doğru başlangıç.",
  heroText:
    "Akvaryum, teraryum ve paludaryum seçenekleriyle ekipmanları ve ilhamı keşfedin.",
  heroImage: "/images/hero.webp",
  readyStockTitle: "Hazır ölçü akvaryumlar mevcut",
  readyStockText:
    "Güncel ölçü, fiyat ve stok bilgisini WhatsApp üzerinden alın.",
  valueStrip: [
    "DIAMOND cam ile üretilen akvaryumlar",
    "14 ölçüde 90° ve 45° fiyat seçeneği",
    "İhtiyacınıza göre teklif hazırlığı",
  ],
  faq: [
    {
      question: "Buradan online sipariş verebilir miyim?",
      answer:
        "Ürün sayfasındaki yeşil düğmeyle WhatsApp üzerinden fiyat ve stok teyidi alıp siparişinizi başlatabilirsiniz. Ödeme ve teslimat ayrıntıları görüşmede netleştirilir.",
    },
    {
      question: "Hazır ölçü akvaryumlar mevcut mu?",
      answer:
        "Evet. Güncel hazır ölçü seçenekleri ve stok durumu için WhatsApp sipariş hattından bilgi alabilirsiniz.",
    },
    {
      question: "Ölçü aracındaki hacim ne anlama geliyor?",
      answer:
        "Dış ölçülere göre geometrik brüt hacmi gösterir. Gerçek su miktarı, cam kalınlığı veya taşıma kapasitesi hesabı değildir.",
    },
    {
      question: "Ürünleri nasıl karşılaştırırım?",
      answer:
        "Ürün kartındaki karşılaştırma düğmesiyle aynı kategoriden en fazla üç ürün seçin. Seçimleriniz bu tarayıcıda saklanır.",
    },
  ],
  footerTagline: "Doğal yaşam alanınıza\nözenli bir başlangıç.",
  aboutHeading: "Bir dünyaya özenle başlamak.",
  aboutParagraphs: [
    "Bu katalog, akvaryum, teraryum, paludaryum ve ekipman seçeneklerini incelemek, teknik detayları karşılaştırmak ve bir bilgi talebi hazırlamak için oluşturuldu.",
    "Özel ölçü kapsamı, hizmet bölgesi ve işletme geçmişi hakkında onaylanmış bilgiler henüz sağlanmadı. Bu nedenle bu başlıklarda doğrulanmamış ticari iddialara yer vermiyoruz.",
  ],
  contactHeading: "Konuşmaya buradan başlayın.",
  contactIntro:
    "İlgilendiğiniz ürün veya kurulum fikriniz hakkında bir bilgi talebi hazırlayın.",
};

export const defaultCategories: Category[] = [
  {
    id: "akvaryumlar",
    name: "Ultra Clear Akvaryumlar",
    subtitle: "Her dünyaya bir başlangıç",
    image: 0,
    family: "akvaryum",
  },
  {
    id: "teraryumlar",
    name: "Teraryumlar",
    subtitle: "Karasal yaşam için doğal ortam",
    image: 0,
    imageSrc: "/images/terrarium.webp",
    family: "habitat",
  },
  {
    id: "paludaryumlar",
    name: "Paludaryumlar",
    subtitle: "Su ve karanın buluştuğu dünya",
    image: 0,
    imageSrc: "/images/paludarium.webp",
    family: "habitat",
  },
  {
    id: "filtreler",
    name: "Filtreler",
    subtitle: "Suyun dengesi için",
    image: 1,
    family: "ekipman",
  },
  {
    id: "aydinlatma",
    name: "Aydınlatma",
    subtitle: "Doğru ışığı keşfedin",
    image: 2,
    family: "ekipman",
  },
  {
    id: "mobilyalar",
    name: "Mobilyalar",
    subtitle: "Kurulumunuzu tamamlayın",
    image: 3,
    family: "akvaryum",
  },
  {
    id: "isitma",
    name: "Isıtma ve Soğutma",
    subtitle: "Kontrollü bir ortam",
    image: 4,
    family: "ekipman",
  },
  {
    id: "bakim-dekor",
    name: "Bakım ve Dekor",
    subtitle: "Küçük dokunuşlar, yeni yaşam",
    image: 5,
    family: "bakim",
  },
];

export const defaultMenu: MenuGroup[] = [
  {
    name: "Ultra Clear Akvaryumlar",
    links: [
      { label: "Tüm Ultra Clear akvaryumlar", category: "akvaryumlar" },
      { label: "45° Akvaryumlar", category: "akvaryumlar", option: "45" },
      { label: "90° Akvaryumlar", category: "akvaryumlar", option: "90" },
    ],
  },
  {
    name: "Teraryumlar",
    links: [
      { label: "Tüm teraryumlar", category: "teraryumlar" },
      { label: "Paludaryumlar", category: "paludaryumlar" },
    ],
  },
  {
    name: "Ekipmanlar",
    links: [
      { label: "Filtreler", category: "filtreler" },
      { label: "Aydınlatma", category: "aydinlatma" },
      { label: "Isıtma ve soğutma", category: "isitma" },
      { label: "Akvaryum mobilyaları", category: "mobilyalar" },
    ],
  },
  {
    name: "Bakım ve Besleme",
    links: [{ label: "Bakım ve dekor", category: "bakim-dekor" }],
  },
];

export const defaultGuides: Guide[] = [
  {
    slug: "ilk-akvaryum-planlama",
    tag: "İLK KURULUM",
    title: "İlk akvaryumunuz: önce doğru sorular",
    intro:
      "Alışveriş listesinden önce alanınızı ve beklentilerinizi netleştirin.",
    category: "akvaryumlar",
    sections: [
      [
        "Nereye yerleşecek?",
        "Akvaryumu koymayı düşündüğünüz alanın genişliğini, derinliğini ve üstte kalan çalışma boşluğunu not edin. Ekipmanlara ve bakım noktalarına erişimi planınıza ekleyin. Mobilyanın taşıma uygunluğunu yetkin bir uzmana doğrulatın.",
      ],
      [
        "Nasıl bir kurulum istiyorsunuz?",
        "Bitkili bir görünüm, sade bir dekor veya farklı bir su türü seçimi ekipman ihtiyaçlarını değiştirir. Canlı seçimini yalnızca görünüme göre yapmayın; türlere özel ihtiyaçları güvenilir kaynaklardan öğrenin.",
      ],
      [
        "Bir ihtiyaç özeti hazırlayın",
        "Alan ölçüleriniz, kurulum tercihiniz ve mevcut ekipmanlarınızı bir araya getirin. Ölçü aracı bu bilgileri paylaşılabilir bir başlangıç özetine dönüştürür; teknik projelendirme yerine geçmez.",
      ],
    ],
  },
  {
    slug: "filtre-secerken",
    tag: "EKİPMAN SEÇİMİ",
    title: "Filtre seçerken hangi bilgilere bakmalı?",
    intro: "Bir model adının ötesine geçin; teknik bilgileri birlikte okuyun.",
    category: "filtreler",
    sections: [
      [
        "Ürünün kendi bilgisiyle başlayın",
        "Debi, güç, filtre tipi ve üreticinin önerdiği kullanım aralığını ayrı ayrı inceleyin. Model seçerken üreticinin güncel teknik belgesini esas alın.",
      ],
      [
        "Yerleşimi önceden düşünün",
        "Dolap içi alan, hortum geçişleri ve bakım için gereken erişimi ölçün. Sadece dış ölçüyü bilmek kurulumun tüm parçalarının sığacağını garanti etmez.",
      ],
      [
        "Eksik bilgiyi sorun",
        "Kutu içeriği, bağlantı ölçüleri ve yedek parça bilgileri yoksa tahminde bulunmayın. Ürün bilgi talebine bu soruları ekleyin; farklı ürünler arasındaki eksik bilgileri bir avantaj veya dezavantaj puanı gibi yorumlamayın.",
      ],
    ],
  },
  {
    slug: "olcu-ve-hacim",
    tag: "PLANLAMA",
    title: "Ölçüden hacme: sayılar bize ne söylüyor?",
    intro: "Brüt hacim ile gerçek kullanım hacmi arasındaki farkı anlayın.",
    category: "akvaryumlar",
    sections: [
      [
        "Geometrik hacim hesabı",
        "Santimetre cinsinden genişlik × derinlik × yükseklik sonucunu 1000’e bölerek litre cinsinden dış ölçülere dayalı brüt hacim elde edilir. Örneğin 60 × 30 × 36 cm, 64,8 litre brüt hacim verir.",
      ],
      [
        "Bu hesap neyi söylemez?",
        "Cam kalınlığı, su seviyesi, taban ve dekorların kapladığı alan gerçek su miktarını etkiler. Bu basit hesap güvenli cam kalınlığı, mobilya taşıma kapasitesi veya canlı sayısı önermez.",
      ],
      [
        "Talebe dönüştürün",
        "Ölçülerin yanında su türü tercihini, mobilya ihtiyacını ve teslimat şehrini belirtin. Hazırladığınız özeti kopyalayarak işletmeyle paylaşabilirsiniz.",
      ],
    ],
  },
];

export const defaultProjects: Project[] = [
  {
    id: "bitkili",
    name: "Yeşilin içinde bir dünya",
    type: "Bitkili konsept",
    image: "/images/hero.webp",
    imageAlt: "Bitkiler ve doğal kökle düzenlenmiş akvaryum",
    description:
      "Bitki, kaya ve doğal kök dokularını dengeli bir kompozisyonda buluşturan kurulum ilhamı.",
  },
];

type InquirySeed = {
  addedAt: number;
  slug: string;
  name: string;
  categoryId: string;
  requestCode: string;
  imageAlt: string;
  specifications: Record<string, string>;
  description: string;
};

const equipmentSeeds: InquirySeed[] = [
  {
    addedAt: 1,
    slug: "dis-filtre-secimi",
    name: "Dış Filtre Seçimi",
    categoryId: "filtreler",
    requestCode: "TALEP-FILTRE-DIS",
    imageAlt: "Akvaryum filtreleri kategori görseli",
    specifications: {
      Tür: "Dış filtre",
      Model: "WhatsApp görüşmesinde netleştirilir",
    },
    description:
      "Akvaryum hacmi, kurulum biçimi ve bakım ihtiyacına göre dış filtre seçenekleri WhatsApp görüşmesinde değerlendirilir. Marka, model, teknik değer, stok ve fiyat görüşmede paylaşılır.",
  },
  {
    addedAt: 2,
    slug: "ic-filtre-secimi",
    name: "İç Filtre Seçimi",
    categoryId: "filtreler",
    requestCode: "TALEP-FILTRE-IC",
    imageAlt: "Akvaryum filtreleri kategori görseli",
    specifications: {
      Tür: "İç filtre",
      Model: "WhatsApp görüşmesinde netleştirilir",
    },
    description:
      "Akvaryum hacmi ve kullanım ihtiyacına göre iç filtre seçenekleri WhatsApp görüşmesinde değerlendirilir. Marka, model, teknik değer, stok ve fiyat görüşmede paylaşılır.",
  },
  {
    addedAt: 3,
    slug: "akvaryum-aydinlatmasi",
    name: "Akvaryum Aydınlatması",
    categoryId: "aydinlatma",
    requestCode: "TALEP-AYDINLATMA",
    imageAlt: "Akvaryum aydınlatmaları kategori görseli",
    specifications: {
      Kullanım: "Akvaryum kurulumuna göre",
      Model: "WhatsApp görüşmesinde netleştirilir",
    },
    description:
      "Akvaryum ölçüsü ve kurulum türüne uygun aydınlatma seçenekleri WhatsApp görüşmesinde değerlendirilir. Marka, model, teknik değer, stok ve fiyat görüşmede paylaşılır.",
  },
  {
    addedAt: 4,
    slug: "akvaryum-mobilyasi",
    name: "Akvaryum Mobilyası",
    categoryId: "mobilyalar",
    requestCode: "TALEP-MOBILYA",
    imageAlt: "Akvaryum mobilyaları kategori görseli",
    specifications: {
      Ölçü: "Akvaryuma göre netleştirilir",
      Tasarım: "WhatsApp görüşmesinde netleştirilir",
    },
    description:
      "Akvaryum ölçüsü, yerleşim alanı ve dış filtre ihtiyacına göre mobilya talebi WhatsApp görüşmesinde netleştirilir. Malzeme, renk, fiyat ve teslimat kapsamı görüşmede paylaşılır.",
  },
  {
    addedAt: 5,
    slug: "isitma-sogutma-secimi",
    name: "Isıtma ve Soğutma Seçimi",
    categoryId: "isitma",
    requestCode: "TALEP-ISI",
    imageAlt: "Akvaryum ısıtma ve soğutma ürünleri kategori görseli",
    specifications: {
      Kullanım: "Akvaryum ihtiyacına göre",
      Model: "WhatsApp görüşmesinde netleştirilir",
    },
    description:
      "Akvaryum hacmi ve hedef sıcaklığa göre ısıtma veya soğutma seçenekleri WhatsApp görüşmesinde değerlendirilir. Teknik değer, stok ve fiyat görüşmede paylaşılır.",
  },
  {
    addedAt: 6,
    slug: "bakim-dekor-secimi",
    name: "Bakım ve Dekor Seçimi",
    categoryId: "bakim-dekor",
    requestCode: "TALEP-BAKIM-DEKOR",
    imageAlt: "Akvaryum bakım ve dekor ürünleri kategori görseli",
    specifications: {
      Kapsam: "Kurulum ihtiyacına göre",
      Ürünler: "WhatsApp görüşmesinde netleştirilir",
    },
    description:
      "Bakım ve dekor ihtiyacına uygun seçenekler kurulum bilgileriyle birlikte WhatsApp görüşmesinde değerlendirilir. Ürün kapsamı, stok ve fiyat görüşmede paylaşılır.",
  },
];

type HabitatSeed = {
  slug: string;
  name: string;
  categoryId: "teraryumlar" | "paludaryumlar";
  requestCode: string;
  image: string;
  imageAlt: string;
  specifications: Record<string, string>;
};

const habitatSeeds: HabitatSeed[] = [
  {
    slug: "teraryum-tasarimi",
    name: "Teraryum Tasarımı",
    categoryId: "teraryumlar",
    requestCode: "TALEP-TERARYUM",
    image: "/images/terrarium.webp",
    imageAlt: "Tropik bitkilerle düzenlenmiş cam teraryum kategori görseli",
    specifications: {
      Ölçü: "WhatsApp görüşmesinde netleştirilir",
      "Yaşam alanı": "Karasal düzen",
      Kapak: "Bilgi alınmalı",
      Havalandırma: "Bilgi alınmalı",
    },
  },
  {
    slug: "paludaryum-tasarimi",
    name: "Paludaryum Tasarımı",
    categoryId: "paludaryumlar",
    requestCode: "TALEP-PALUDARYUM",
    image: "/images/paludarium.webp",
    imageAlt: "Su ve kara bölümünü birleştiren cam paludaryum kategori görseli",
    specifications: {
      Ölçü: "WhatsApp görüşmesinde netleştirilir",
      "Yaşam alanı": "Su ve kara bölümü",
      "Su bölümü": "Bilgi alınmalı",
      Drenaj: "Bilgi alınmalı",
    },
  },
];

type AquariumPriceRow = {
  slug: string;
  dimensions: readonly [width: number, depth: number, height: number];
  price90: number;
  price45: number;
};

const aquariumPriceRows: AquariumPriceRow[] = [
  { slug: "akvaryum-30x20x15", dimensions: [30, 20, 15], price90: 1000, price45: 1200 },
  { slug: "akvaryum-30x30x30", dimensions: [30, 30, 30], price90: 1600, price45: 2200 },
  { slug: "akvaryum-35x35x35", dimensions: [35, 35, 35], price90: 1900, price45: 2400 },
  { slug: "akvaryum-40x40x40", dimensions: [40, 40, 40], price90: 2400, price45: 3050 },
  { slug: "akvaryum-50x30x30", dimensions: [50, 30, 30], price90: 2400, price45: 3050 },
  { slug: "akvaryum-60x40x40", dimensions: [60, 40, 40], price90: 3700, price45: 4200 },
  { slug: "akvaryum-40x40x30", dimensions: [40, 40, 30], price90: 2250, price45: 2600 },
  { slug: "akvaryum-40x30x20", dimensions: [40, 30, 20], price90: 1650, price45: 2100 },
  { slug: "akvaryum-70x40x40", dimensions: [70, 40, 40], price90: 5000, price45: 6150 },
  { slug: "akvaryum-80x40x40", dimensions: [80, 40, 40], price90: 5200, price45: 6300 },
  { slug: "akvaryum-90x45x45", dimensions: [90, 45, 45], price90: 7950, price45: 9900 },
  { slug: "akvaryum-100x50x45", dimensions: [100, 50, 45], price90: 8400, price45: 10500 },
  { slug: "akvaryum-120x50x45", dimensions: [120, 50, 45], price90: 9100, price45: 10800 },
  { slug: "akvaryum-150x50x40", dimensions: [150, 50, 40], price90: 12000, price45: 13100 },
];

export function grossVolumeLabel(width: number, depth: number, height: number) {
  const liters = (width * depth * height) / 1000;
  return `${String(liters).replace(".", ",")} L`;
}

function categoryTile(categoryId: string) {
  return defaultCategories.find((category) => category.id === categoryId)!
    .image;
}

const aquariumProducts = aquariumPriceRows.map((row, index) => {
  const [width, depth, height] = row.dimensions;
  const dimensions = `${width} × ${depth} × ${height}`;
  const baseSku = `AKV-${width}X${depth}X${height}`;
  const { aquariumGlass, aquariumPriceIncludes } = defaultSettings;
  const specifications = {
    Cam: aquariumGlass,
    Ölçü: `${dimensions} cm`,
    "Brüt hacim": grossVolumeLabel(width, depth, height),
    "Fiyat seçenekleri": "90° / 45°",
  };

  return productSchema.parse({
    id: row.slug,
    slug: row.slug,
    name: `DSN ${dimensions} Cam Akvaryum`,
    categoryId: "akvaryumlar",
    brand: defaultSettings.fullName,
    sku: baseSku,
    gtin: null,
    description: `${dimensions} cm ölçüsündeki DSN akvaryumun 90° ve 45° fiyat seçenekleri sağlanan fiyat listesindeki tutarlardan aktarılmıştır. DSN Akvaryum üretiminde ${aquariumGlass} kullanır. ${aquariumPriceIncludes} Cam kalınlığı, stok, hazırlık süresi ve diğer paket içeriği teklif aşamasında netleştirilir.`,
    images: ["/images/products.webp"],
    imageAlt: "Boş cam akvaryum kategori görseli",
    image: categoryTile("akvaryumlar"),
    specifications,
    variants: [
      {
        id: "90",
        name: "90°",
        sku: `${baseSku}-90`,
        price: row.price90 * 100,
        stockStatus: "bilgi",
        image: 0,
        specifications: { ...specifications, "Fiyat seçeneği": "90°" },
      },
      {
        id: "45",
        name: "45°",
        sku: `${baseSku}-45`,
        price: row.price45 * 100,
        stockStatus: "bilgi",
        image: 0,
        specifications: { ...specifications, "Fiyat seçeneği": "45°" },
      },
    ],
    price: row.price90 * 100,
    currency: "TRY",
    stockStatus: "bilgi",
    stockQuantity: null,
    leadTime: null,
    priceListDate: aquariumPriceListDate,
    deliveryType: "bilgi",
    saleMode: "quote",
    published: true,
    isDemo: true,
    addedAt: 100 + index,
    packageContents: `${aquariumPriceIncludes} Diğer paket içeriği WhatsApp görüşmesinde netleştirilir.`,
  });
});

const equipmentProducts = equipmentSeeds.map((seed) =>
  productSchema.parse({
    id: seed.slug,
    slug: seed.slug,
    name: seed.name,
    categoryId: seed.categoryId,
    brand: defaultSettings.fullName,
    sku: seed.requestCode,
    gtin: null,
    description: seed.description,
    images: ["/images/products.webp"],
    imageAlt: seed.imageAlt,
    image: categoryTile(seed.categoryId),
    specifications: seed.specifications,
    variants: [],
    price: null,
    currency: "TRY",
    stockStatus: "bilgi",
    stockQuantity: null,
    leadTime: null,
    deliveryType: "bilgi",
    saleMode: "quote",
    published: true,
    isDemo: true,
    addedAt: seed.addedAt,
    packageContents:
      "Paket içeriği ve uyumlu ek parçalar WhatsApp görüşmesinde netleştirilir.",
  }),
);

const habitatProducts = habitatSeeds.map((seed, index) =>
  productSchema.parse({
    id: seed.slug,
    slug: seed.slug,
    name: seed.name,
    categoryId: seed.categoryId,
    brand: defaultSettings.fullName,
    sku: seed.requestCode,
    gtin: null,
    description: `${seed.name} için ölçü, cam tipi, kapak, havalandırma, drenaj, su bölümü ve canlı uyumu WhatsApp görüşmesinde netleştirilir.`,
    images: [seed.image],
    imageAlt: seed.imageAlt,
    image: 0,
    specifications: seed.specifications,
    variants: [],
    price: null,
    currency: "TRY",
    stockStatus: "bilgi",
    stockQuantity: null,
    leadTime: null,
    priceListDate: null,
    deliveryType: "bilgi",
    saleMode: "quote",
    published: true,
    isDemo: true,
    addedAt: 200 + index,
    packageContents:
      "Bitki, dekor ve ekipman kapsamı WhatsApp görüşmesinde netleştirilir.",
  }),
);

const defaultProducts: Product[] = [
  ...approvedProducts.map((product) => productSchema.parse(product)),
  ...aquariumProducts,
  ...habitatProducts,
  ...equipmentProducts,
];

export function seedContent(): SiteContent {
  return structuredClone({
    settings: defaultSettings,
    categories: defaultCategories,
    menu: defaultMenu,
    products: defaultProducts,
    guides: defaultGuides,
    projects: defaultProjects,
  });
}
