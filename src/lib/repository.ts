import { aquariumPriceListDate, categories, productSchema } from "./catalog";
import { siteConfig } from "./config";
import approvedProducts from "@/data/products.json";

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
  {
    slug: "akvaryum-30x20x15",
    dimensions: [30, 20, 15],
    price90: 1000,
    price45: 1200,
  },
  {
    slug: "akvaryum-30x30x30",
    dimensions: [30, 30, 30],
    price90: 1600,
    price45: 2200,
  },
  {
    slug: "akvaryum-35x35x35",
    dimensions: [35, 35, 35],
    price90: 1900,
    price45: 2400,
  },
  {
    slug: "akvaryum-40x40x40",
    dimensions: [40, 40, 40],
    price90: 2400,
    price45: 3050,
  },
  {
    slug: "akvaryum-50x30x30",
    dimensions: [50, 30, 30],
    price90: 2400,
    price45: 3050,
  },
  {
    slug: "akvaryum-60x40x40",
    dimensions: [60, 40, 40],
    price90: 3700,
    price45: 4200,
  },
  {
    slug: "akvaryum-40x40x30",
    dimensions: [40, 40, 30],
    price90: 2250,
    price45: 2600,
  },
  {
    slug: "akvaryum-40x30x20",
    dimensions: [40, 30, 20],
    price90: 1650,
    price45: 2100,
  },
  {
    slug: "akvaryum-70x40x40",
    dimensions: [70, 40, 40],
    price90: 5000,
    price45: 6150,
  },
  {
    slug: "akvaryum-80x40x40",
    dimensions: [80, 40, 40],
    price90: 5200,
    price45: 6300,
  },
  {
    slug: "akvaryum-90x45x45",
    dimensions: [90, 45, 45],
    price90: 7950,
    price45: 9900,
  },
  {
    slug: "akvaryum-100x50x45",
    dimensions: [100, 50, 45],
    price90: 8400,
    price45: 10500,
  },
  {
    slug: "akvaryum-120x50x45",
    dimensions: [120, 50, 45],
    price90: 9100,
    price45: 10800,
  },
  {
    slug: "akvaryum-150x50x40",
    dimensions: [150, 50, 40],
    price90: 12000,
    price45: 13100,
  },
];

function grossVolumeLabel([
  width,
  depth,
  height,
]: AquariumPriceRow["dimensions"]) {
  const liters = (width * depth * height) / 1000;
  return `${String(liters).replace(".", ",")} L`;
}

const aquariumProducts = aquariumPriceRows.map((row, index) => {
  const [width, depth, height] = row.dimensions;
  const dimensions = `${width} × ${depth} × ${height}`;
  const dimensionSku = `${width}X${depth}X${height}`;
  const baseSku = `AKV-${dimensionSku}`;
  const specifications = {
    Cam: siteConfig.aquariumGlass,
    Ölçü: `${dimensions} cm`,
    "Brüt hacim": grossVolumeLabel(row.dimensions),
    "Fiyat seçenekleri": "90° / 45°",
  };

  return productSchema.parse({
    id: row.slug,
    slug: row.slug,
    name: `DSN ${dimensions} Cam Akvaryum`,
    categoryId: "akvaryumlar",
    brand: siteConfig.fullName,
    sku: baseSku,
    gtin: null,
    description: `${dimensions} cm ölçüsündeki DSN akvaryumun 90° ve 45° fiyat seçenekleri sağlanan fiyat listesindeki tutarlardan aktarılmıştır. DSN Akvaryum üretiminde ${siteConfig.aquariumGlass} kullanır. ${siteConfig.aquariumPriceIncludes} Cam kalınlığı, stok, hazırlık süresi ve diğer paket içeriği teklif aşamasında netleştirilir.`,
    images: ["/images/products.webp"],
    imageAlt: "Boş cam akvaryum kategori görseli",
    image: categories.find((category) => category.id === "akvaryumlar")!.image,
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
    packageContents: `${siteConfig.aquariumPriceIncludes} Diğer paket içeriği WhatsApp görüşmesinde netleştirilir.`,
  });
});

const equipmentProducts = equipmentSeeds.map((seed) =>
  productSchema.parse({
    id: seed.slug,
    slug: seed.slug,
    name: seed.name,
    categoryId: seed.categoryId,
    brand: siteConfig.fullName,
    sku: seed.requestCode,
    gtin: null,
    description: seed.description,
    images: ["/images/products.webp"],
    imageAlt: seed.imageAlt,
    image: categories.find((category) => category.id === seed.categoryId)!
      .image,
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
    brand: siteConfig.fullName,
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

const demoProducts = [
  ...aquariumProducts,
  ...habitatProducts,
  ...equipmentProducts,
];

// Replace with validated, approved data from a repository or CMS. Demo data is excluded in live mode.
export function getProducts() {
  const publishedData = approvedProducts.map((product) =>
    productSchema.parse(product),
  );
  return [...publishedData, ...(siteConfig.demo ? demoProducts : [])].filter(
    (product) => product.published && (siteConfig.demo || !product.isDemo),
  );
}

export function getProduct(slug: string) {
  return getProducts().find((product) => product.slug === slug);
}
