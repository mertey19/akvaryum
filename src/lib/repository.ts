import { productSchema } from "./catalog";
import { categories } from "./catalog";
import { siteConfig } from "./config";
import approvedProducts from "@/data/products.json";
const seeds: [string, string, string, number | null, Record<string, string>][] =
  [
    [
      "clear-60",
      "Clear 60 Cam Akvaryum",
      "akvaryumlar",
      325000,
      {
        Ölçü: "60 × 30 × 36 cm",
        "Cam kalınlığı": "6 mm",
        "Brüt hacim": "64,8 L",
      },
    ],
    [
      "flow-800",
      "Flow 800 Dış Filtre",
      "filtreler",
      285000,
      { Debi: "800 L/sa", Güç: "12 W", Tür: "Dış filtre" },
    ],
    [
      "line-60",
      "Line 60 LED Aydınlatma",
      "aydinlatma",
      195000,
      { Uzunluk: "60 cm", Güç: "24 W", Renk: "Siyah" },
    ],
    [
      "stand-60",
      "Stand 60 Akvaryum Dolabı",
      "mobilyalar",
      420000,
      { Genişlik: "60 cm", Renk: "Siyah", Malzeme: "Kaplamalı panel" },
    ],
    [
      "clear-90",
      "Clear 90 Cam Akvaryum",
      "akvaryumlar",
      650000,
      {
        Ölçü: "90 × 45 × 45 cm",
        "Cam kalınlığı": "10 mm",
        "Brüt hacim": "182,25 L",
      },
    ],
    [
      "flow-1200",
      "Flow 1200 Dış Filtre",
      "filtreler",
      395000,
      { Debi: "1200 L/sa", Güç: "18 W", Tür: "Dış filtre" },
    ],
    [
      "thermo-100",
      "Thermo 100 Isıtıcı",
      "isitma",
      85000,
      { Güç: "100 W", Tür: "Cam tüp", Uzunluk: "25 cm" },
    ],
    [
      "nature-stone",
      "Nature Dekor Taşı Seti",
      "bakim-dekor",
      65000,
      { Ağırlık: "3 kg", Tür: "Dekor", Renk: "Gri" },
    ],
    [
      "cube-30",
      "Cube 30 Nano Akvaryum",
      "akvaryumlar",
      145000,
      {
        Ölçü: "30 × 30 × 30 cm",
        "Cam kalınlığı": "4 mm",
        "Brüt hacim": "27 L",
      },
    ],
    [
      "clear-120",
      "Clear 120 Cam Akvaryum",
      "akvaryumlar",
      null,
      {
        Ölçü: "120 × 50 × 50 cm",
        "Cam kalınlığı": "12 mm",
        "Brüt hacim": "300 L",
      },
    ],
    [
      "flow-500",
      "Flow 500 Dış Filtre",
      "filtreler",
      210000,
      { Debi: "500 L/sa", Güç: "8 W", Tür: "Dış filtre" },
    ],
    [
      "inner-300",
      "Inner 300 İç Filtre",
      "filtreler",
      75000,
      { Debi: "300 L/sa", Güç: "5 W", Tür: "İç filtre" },
    ],
    [
      "line-90",
      "Line 90 LED Aydınlatma",
      "aydinlatma",
      275000,
      { Uzunluk: "90 cm", Güç: "36 W", Renk: "Siyah" },
    ],
    [
      "stand-90",
      "Stand 90 Akvaryum Dolabı",
      "mobilyalar",
      610000,
      { Genişlik: "90 cm", Renk: "Siyah", Malzeme: "Kaplamalı panel" },
    ],
    [
      "thermo-200",
      "Thermo 200 Isıtıcı",
      "isitma",
      115000,
      { Güç: "200 W", Tür: "Cam tüp", Uzunluk: "30 cm" },
    ],
    [
      "nature-plant",
      "Nature Bitkili Dekor Seti",
      "bakim-dekor",
      95000,
      { Tür: "Dekor", İçerik: "Örnek bitki ve taş kompozisyonu" },
    ],
    [
      "line-30",
      "Line 30 LED Aydınlatma",
      "aydinlatma",
      125000,
      { Uzunluk: "30 cm", Güç: "12 W", Renk: "Siyah" },
    ],
    [
      "stand-120",
      "Stand 120 Akvaryum Dolabı",
      "mobilyalar",
      null,
      { Genişlik: "120 cm", Renk: "Siyah", Malzeme: "Kaplamalı panel" },
    ],
  ];
const demoProducts = seeds.map(
  ([slug, name, categoryId, price, specifications], i) =>
    productSchema.parse({
      id: slug,
      slug,
      name,
      categoryId,
      brand: i % 3 === 0 ? "Atölye · demo" : "Studio · demo",
      sku: `DEMO-${String(i + 1).padStart(3, "0")}`,
      gtin: null,
      description: `${name}, katalog deneyimini göstermek için hazırlanmış örnek bir üründür. ${categoryId === "mobilyalar" ? "Dış filtre yerleşimi kurulum planında ayrıca değerlendirilmelidir. " : ""}Teknik değerler, fiyat ve stok gerçek bir satış teklifi değildir. Ürün seçerken üreticinin doğrulanmış bilgilerini esas alın.`,
      images: ["/images/products.webp"],
      imageAlt: `${name} için temsili ürün görseli`,
      image: categories.find((c) => c.id === categoryId)!.image,
      specifications,
      variants:
        slug === "clear-60"
          ? [
              {
                id: "clear",
                name: "Şeffaf silikon",
                sku: "DEMO-001-C",
                price: 325000,
                stockStatus: "stokta",
                image: 0,
                specifications: { ...specifications, Silikon: "Şeffaf" },
              },
              {
                id: "black",
                name: "Siyah silikon",
                sku: "DEMO-001-B",
                price: 345000,
                stockStatus: "siparis",
                image: 0,
                specifications: { ...specifications, Silikon: "Siyah" },
              },
            ]
          : [],
      price,
      currency: "TRY",
      stockStatus:
        i === 10
          ? "tukendi"
          : price === null
            ? "bilgi"
            : i % 4 === 0
              ? "siparis"
              : "stokta",
      stockQuantity: i === 10 ? 0 : null,
      leadTime: null,
      deliveryType:
        categoryId === "akvaryumlar" || categoryId === "mobilyalar"
          ? "ozel"
          : "standart",
      saleMode: "quote",
      published: true,
      isDemo: true,
      addedAt: i,
      packageContents:
        "Paket içeriği bu demo için doğrulanmamıştır; teklif aşamasında netleştirilmelidir.",
    }),
);
// Replace with validated, approved data from a repository or CMS. Demo data is excluded in live mode.
export function getProducts() {
  const publishedData = approvedProducts.map((p) => productSchema.parse(p));
  return [...publishedData, ...(siteConfig.demo ? demoProducts : [])].filter(
    (p) => p.published && (siteConfig.demo || !p.isDemo),
  );
}
export function getProduct(slug: string) {
  return getProducts().find((p) => p.slug === slug);
}
