import { z } from "zod";

export const aquariumPriceListDate = "18.04.2026";

export type Category = {
  id: string;
  name: string;
  subtitle: string;
  image: number;
  imageSrc?: string;
  family: "akvaryum" | "habitat" | "ekipman" | "bakim";
};

export const categories: readonly Category[] = [
  {
    id: "akvaryumlar",
    name: "Akvaryumlar",
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
] as const;
const stockSchema = z.enum(["stokta", "siparis", "tukendi", "bilgi"]);
const categoryIdSchema = z
  .string()
  .refine(
    (categoryId) => categories.some((category) => category.id === categoryId),
    "Tanımlı bir kategori kullanılmalı",
  );
const variantSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string(),
  price: z.number().int().nonnegative().nullable(),
  stockStatus: stockSchema,
  image: z.number().int(),
  images: z.array(z.string()).min(1).optional(),
  specifications: z.record(z.string(), z.string()),
});
export const productSchema = z
  .object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    categoryId: categoryIdSchema,
    brand: z.string(),
    sku: z.string(),
    gtin: z.string().nullable(),
    description: z.string(),
    images: z.array(z.string()).min(1),
    imageAlt: z.string(),
    image: z.number().int(),
    specifications: z.record(z.string(), z.string()),
    variants: z.array(variantSchema),
    price: z.number().int().nonnegative().nullable(),
    currency: z.literal("TRY"),
    stockStatus: stockSchema,
    stockQuantity: z.number().int().nonnegative().nullable(),
    leadTime: z.string().nullable(),
    priceListDate: z.string().nullable().default(null),
    deliveryType: z.enum(["standart", "ozel", "magaza", "bilgi"]),
    saleMode: z.literal("quote"),
    published: z.boolean(),
    isDemo: z.boolean(),
    addedAt: z.number(),
    packageContents: z.string(),
  })
  .superRefine((p, ctx) => {
    if (p.stockStatus === "tukendi" && p.stockQuantity !== 0)
      ctx.addIssue({
        code: "custom",
        message: "Tükenen ürün adedi sıfır olmalı",
      });
  });
export type Product = z.infer<typeof productSchema>;
export type Variant = z.infer<typeof variantSchema>;
export function aquariumPriceOptions(product: Product) {
  return product.categoryId === "akvaryumlar" && product.priceListDate
    ? product.variants.filter((variant) => ["90", "45"].includes(variant.id))
    : [];
}
export const stockLabels = {
  stokta: "Stokta",
  siparis: "Sipariş üzerine",
  tukendi: "Tükendi",
  bilgi: "Stok bilgisi alınmalı",
};
export const deliveryLabels = {
  standart: "Standart kargo",
  ozel: "Özel nakliye",
  magaza: "Mağazadan teslim",
  bilgi: "Teslimat bilgisi alınmalı",
};
export function money(value: number | null) {
  return value === null
    ? "Fiyat için bilgi alın"
    : new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        maximumFractionDigits: 2,
      }).format(value / 100);
}
export function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\b(?:paladaryum|paludarium)\b/g, "paludaryum")
    .replace(/\b(?:terrarium|terraryum)\b/g, "teraryum");
}
export function relevance(p: Product, q: string) {
  const term = normalize(q.trim());
  if (!term) return 1;
  const tokens = term.split(/\s+/);
  const matches = (s: string) => tokens.every((t) => normalize(s).includes(t));
  if (normalize(p.sku) === term || normalize(p.name) === term) return 100;
  if (
    matches(p.name) ||
    matches(p.sku) ||
    p.variants.some((v) => matches(v.sku))
  )
    return 80;
  if (matches(categories.find((c) => c.id === p.categoryId)?.name || ""))
    return 60;
  if (matches(Object.values(p.specifications).join(" "))) return 40;
  return matches(p.description) ? 10 : 0;
}
export type Query = Record<string, string | undefined>;
export function queryProducts(query: Query, input: Product[]) {
  let items = input.filter(
    (p) =>
      (!query.kategori || p.categoryId === query.kategori) &&
      relevance(p, query.q || "") > 0 &&
      (!query.marka || p.brand === query.marka) &&
      (!query.stok || p.stockStatus === query.stok) &&
      (!query.min ||
        (p.price !== null && p.price >= Number(query.min) * 100)) &&
      (!query.max ||
        (p.price !== null && p.price <= Number(query.max) * 100)) &&
      (!query.teknik || Object.values(p.specifications).includes(query.teknik)),
  );
  items = items.toSorted((a, b) =>
    query.sirala === "fiyat-artan"
      ? (a.price ?? Infinity) - (b.price ?? Infinity)
      : query.sirala === "fiyat-azalan"
        ? (b.price ?? -Infinity) - (a.price ?? -Infinity)
        : query.sirala === "yeni"
          ? b.addedAt - a.addedAt
          : relevance(b, query.q || "") - relevance(a, query.q || ""),
  );
  const total = items.length;
  const pageSize = query.kategori === "akvaryumlar" ? 16 : 12;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(
    pages,
    Math.max(1, Number.parseInt(query.sayfa || "1") || 1),
  );
  return {
    items: items.slice((page - 1) * pageSize, page * pageSize),
    total,
    pages,
    page,
  };
}
