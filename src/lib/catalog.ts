import { z } from "zod";

export const aquariumPriceListDate = "18.04.2026";

export const categoryFamilies = [
  "akvaryum",
  "habitat",
  "ekipman",
  "bakim",
] as const;
export const categorySchema = z.object({
  id: z
    .string()
    .regex(
      /^[a-z0-9-]+$/,
      "Kategori kodu küçük harf, rakam ve tire içermeli",
    ),
  name: z.string().trim().min(1, "Kategori adı gerekli"),
  subtitle: z.string().trim(),
  image: z.number().int().min(0).max(5),
  imageSrc: z.string().min(1).optional(),
  family: z.enum(categoryFamilies),
});
export type Category = z.infer<typeof categorySchema>;

export const stockStatuses = ["stokta", "siparis", "tukendi", "bilgi"] as const;
export const deliveryTypes = ["standart", "ozel", "magaza", "bilgi"] as const;
const stockSchema = z.enum(stockStatuses);
const variantSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  sku: z.string().min(1),
  price: z.number().int().nonnegative().nullable(),
  stockStatus: stockSchema,
  image: z.number().int(),
  images: z.array(z.string()).min(1).optional(),
  specifications: z.record(z.string(), z.string()),
});
export const productSchema = z
  .object({
    id: z.string().min(1),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/, "Adres küçük harf, rakam ve tire içermeli"),
    name: z.string().trim().min(1, "Ürün adı gerekli"),
    categoryId: z.string().min(1, "Kategori seçilmeli"),
    brand: z.string(),
    sku: z.string().trim().min(1, "Ürün kodu gerekli"),
    gtin: z.string().nullable(),
    description: z.string(),
    images: z.array(z.string()).min(1, "En az bir görsel gerekli"),
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
    deliveryType: z.enum(deliveryTypes),
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
export function publishedProducts(products: Product[], demo: boolean) {
  return products.filter(
    (product) => product.published && (demo || !product.isDemo),
  );
}
export function aquariumPriceOptions(product: Product) {
  return product.categoryId === "akvaryumlar" && product.priceListDate
    ? product.variants.filter((variant) => ["90", "45"].includes(variant.id))
    : [];
}
export const aquariumOptions = ["45", "90"] as const;
export function aquariumOptionName(option: string) {
  return `${option}° Akvaryumlar`;
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
    .replace(/[̀-ͯ]/g, "")
    .replace(/\b(?:paladaryum|paludarium)\b/g, "paludaryum")
    .replace(/\b(?:terrarium|terraryum)\b/g, "teraryum");
}
export function relevance(
  p: Product,
  q: string,
  categories: readonly Category[] = [],
) {
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
export function queryProducts(
  query: Query,
  input: Product[],
  categories: readonly Category[] = [],
) {
  const score = (p: Product) => relevance(p, query.q || "", categories);
  const priceOf = (p: Product) =>
    query.secenek
      ? (aquariumPriceOptions(p).find((v) => v.id === query.secenek)?.price ??
        null)
      : p.price;
  let items = input.filter((p) => {
    const price = priceOf(p);
    return (
      (!query.kategori || p.categoryId === query.kategori) &&
      (!query.secenek ||
        aquariumPriceOptions(p).some((v) => v.id === query.secenek)) &&
      score(p) > 0 &&
      (!query.marka || p.brand === query.marka) &&
      (!query.stok || p.stockStatus === query.stok) &&
      (!query.min || (price !== null && price >= Number(query.min) * 100)) &&
      (!query.max || (price !== null && price <= Number(query.max) * 100)) &&
      (!query.teknik || Object.values(p.specifications).includes(query.teknik))
    );
  });
  items = items.toSorted((a, b) =>
    query.sirala === "fiyat-artan"
      ? (priceOf(a) ?? Infinity) - (priceOf(b) ?? Infinity)
      : query.sirala === "fiyat-azalan"
        ? (priceOf(b) ?? -Infinity) - (priceOf(a) ?? -Infinity)
        : query.sirala === "yeni"
          ? b.addedAt - a.addedAt
          : score(b) - score(a),
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
