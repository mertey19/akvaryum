import { aquariumPriceListDate, categories, productSchema } from "./catalog";
import { siteConfig } from "./config";
import approvedProducts from "@/data/products.json";

type EquipmentSeed = [
  originalIndex: number,
  slug: string,
  name: string,
  categoryId: string,
  price: number | null,
  specifications: Record<string, string>,
];

const equipmentSeeds: EquipmentSeed[] = [
  [
    1,
    "flow-800",
    "Flow 800 Dış Filtre",
    "filtreler",
    285000,
    { Debi: "800 L/sa", Güç: "12 W", Tür: "Dış filtre" },
  ],
  [
    2,
    "line-60",
    "Line 60 LED Aydınlatma",
    "aydinlatma",
    195000,
    { Uzunluk: "60 cm", Güç: "24 W", Renk: "Siyah" },
  ],
  [
    3,
    "stand-60",
    "Stand 60 Akvaryum Dolabı",
    "mobilyalar",
    420000,
    { Genişlik: "60 cm", Renk: "Siyah", Malzeme: "Kaplamalı panel" },
  ],
  [
    5,
    "flow-1200",
    "Flow 1200 Dış Filtre",
    "filtreler",
    395000,
    { Debi: "1200 L/sa", Güç: "18 W", Tür: "Dış filtre" },
  ],
  [
    6,
    "thermo-100",
    "Thermo 100 Isıtıcı",
    "isitma",
    85000,
    { Güç: "100 W", Tür: "Cam tüp", Uzunluk: "25 cm" },
  ],
  [
    7,
    "nature-stone",
    "Nature Dekor Taşı Seti",
    "bakim-dekor",
    65000,
    { Ağırlık: "3 kg", Tür: "Dekor", Renk: "Gri" },
  ],
  [
    10,
    "flow-500",
    "Flow 500 Dış Filtre",
    "filtreler",
    210000,
    { Debi: "500 L/sa", Güç: "8 W", Tür: "Dış filtre" },
  ],
  [
    11,
    "inner-300",
    "Inner 300 İç Filtre",
    "filtreler",
    75000,
    { Debi: "300 L/sa", Güç: "5 W", Tür: "İç filtre" },
  ],
  [
    12,
    "line-90",
    "Line 90 LED Aydınlatma",
    "aydinlatma",
    275000,
    { Uzunluk: "90 cm", Güç: "36 W", Renk: "Siyah" },
  ],
  [
    13,
    "stand-90",
    "Stand 90 Akvaryum Dolabı",
    "mobilyalar",
    610000,
    { Genişlik: "90 cm", Renk: "Siyah", Malzeme: "Kaplamalı panel" },
  ],
  [
    14,
    "thermo-200",
    "Thermo 200 Isıtıcı",
    "isitma",
    115000,
    { Güç: "200 W", Tür: "Cam tüp", Uzunluk: "30 cm" },
  ],
  [
    15,
    "nature-plant",
    "Nature Bitkili Dekor Seti",
    "bakim-dekor",
    95000,
    { Tür: "Dekor", İçerik: "Örnek bitki ve taş kompozisyonu" },
  ],
  [
    16,
    "line-30",
    "Line 30 LED Aydınlatma",
    "aydinlatma",
    125000,
    { Uzunluk: "30 cm", Güç: "12 W", Renk: "Siyah" },
  ],
  [
    17,
    "stand-120",
    "Stand 120 Akvaryum Dolabı",
    "mobilyalar",
    null,
    { Genişlik: "120 cm", Renk: "Siyah", Malzeme: "Kaplamalı panel" },
  ],
];

type AquariumPriceRow = {
  slug: string;
  dimensions: readonly [width: number, depth: number, height: number];
  price90: number;
  price45: number;
};

const aquariumPriceRows: AquariumPriceRow[] = [
  {
    slug: "dsn-30x20x15",
    dimensions: [30, 20, 15],
    price90: 1000,
    price45: 1200,
  },
  { slug: "cube-30", dimensions: [30, 30, 30], price90: 1600, price45: 2200 },
  {
    slug: "dsn-35x35x35",
    dimensions: [35, 35, 35],
    price90: 1900,
    price45: 2400,
  },
  {
    slug: "dsn-40x40x40",
    dimensions: [40, 40, 40],
    price90: 2400,
    price45: 3050,
  },
  {
    slug: "dsn-50x30x30",
    dimensions: [50, 30, 30],
    price90: 2400,
    price45: 3050,
  },
  { slug: "clear-60", dimensions: [60, 40, 40], price90: 3700, price45: 4200 },
  {
    slug: "dsn-40x40x30",
    dimensions: [40, 40, 30],
    price90: 2250,
    price45: 2600,
  },
  {
    slug: "dsn-40x30x20",
    dimensions: [40, 30, 20],
    price90: 1650,
    price45: 2100,
  },
  {
    slug: "dsn-70x40x40",
    dimensions: [70, 40, 40],
    price90: 5000,
    price45: 6150,
  },
  {
    slug: "dsn-80x40x40",
    dimensions: [80, 40, 40],
    price90: 5200,
    price45: 6300,
  },
  { slug: "clear-90", dimensions: [90, 45, 45], price90: 7950, price45: 9900 },
  {
    slug: "dsn-100x50x45",
    dimensions: [100, 50, 45],
    price90: 8400,
    price45: 10500,
  },
  {
    slug: "clear-120",
    dimensions: [120, 50, 45],
    price90: 9100,
    price45: 10800,
  },
  {
    slug: "dsn-150x50x40",
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
  const dimensionSku = `${width}${depth}${height}`;
  const baseSku = `DEMO-DSN-${dimensionSku}`;
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
    description: `${dimensions} cm ölçüsündeki DSN akvaryumun 90° ve 45° fiyat seçenekleri sağlanan fiyat listesindeki tutarlardan aktarılmıştır. DSN Akvaryum üretiminde ${siteConfig.aquariumGlass} kullanır. Cam kalınlığı, stok, hazırlık süresi ve paket içeriği teklif aşamasında netleştirilir.`,
    images: ["/images/products.webp"],
    imageAlt: `${dimensions} cm ölçülü boş cam akvaryum için temsili kategori görseli`,
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
    deliveryType: "ozel",
    saleMode: "quote",
    published: true,
    isDemo: true,
    addedAt: 100 + index,
    packageContents:
      "Paket içeriği doğrulanmamıştır; teklif aşamasında netleştirilmelidir.",
  });
});

const equipmentProducts = equipmentSeeds.map(
  ([originalIndex, slug, name, categoryId, price, specifications]) =>
    productSchema.parse({
      id: slug,
      slug,
      name,
      categoryId,
      brand: originalIndex % 3 === 0 ? "Atölye · demo" : "Studio · demo",
      sku: `DEMO-${String(originalIndex + 1).padStart(3, "0")}`,
      gtin: null,
      description: `${name}, katalog deneyimini göstermek için hazırlanmış örnek bir üründür. ${categoryId === "mobilyalar" ? "Dış filtre yerleşimi kurulum planında ayrıca değerlendirilmelidir. " : ""}Teknik değerler, fiyat ve stok gerçek bir satış teklifi değildir. Ürün seçerken doğrulanmış ürün bilgilerini esas alın.`,
      images: ["/images/products.webp"],
      imageAlt: `${name} için temsili ürün görseli`,
      image: categories.find((category) => category.id === categoryId)!.image,
      specifications,
      variants: [],
      price,
      currency: "TRY",
      stockStatus:
        originalIndex === 10
          ? "tukendi"
          : price === null
            ? "bilgi"
            : originalIndex % 4 === 0
              ? "siparis"
              : "stokta",
      stockQuantity: originalIndex === 10 ? 0 : null,
      leadTime: null,
      deliveryType: categoryId === "mobilyalar" ? "ozel" : "standart",
      saleMode: "quote",
      published: true,
      isDemo: true,
      addedAt: originalIndex,
      packageContents:
        "Paket içeriği bu demo için doğrulanmamıştır; teklif aşamasında netleştirilmelidir.",
    }),
);

const demoProducts = [...aquariumProducts, ...equipmentProducts];

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
