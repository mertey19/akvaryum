import { z } from "zod";
import { categorySchema, productSchema } from "../catalog";

const text = z.string().trim();
const slug = z
  .string()
  .regex(/^[a-z0-9-]+$/, "Adres küçük harf, rakam ve tire içermeli");

export const settingsSchema = z.object({
  name: text.min(1, "Site adı gerekli"),
  fullName: text.min(1, "İşletme adı gerekli"),
  brandLabel: text.min(1, "Logo yanı yazısı gerekli"),
  logoPath: text.min(1, "Logo gerekli"),
  phone: text,
  whatsapp: text,
  address: text,
  socialHandle: text,
  email: text,
  hours: text,
  aquariumGlass: text,
  aquariumPriceIncludes: text,
  announcement: text,
  homeDescription: text,
  heroEyebrow: text,
  heroTitle: text,
  heroTitleAccent: text,
  heroLead: text,
  heroText: text,
  heroImage: text.min(1, "Ana görsel gerekli"),
  readyStockTitle: text,
  readyStockText: text,
  valueStrip: z.array(text).max(6),
  faq: z
    .array(
      z.object({
        question: text.min(1, "Soru boş olamaz"),
        answer: text.min(1, "Cevap boş olamaz"),
      }),
    )
    .max(20),
  footerTagline: text,
  aboutHeading: text,
  aboutParagraphs: z.array(text).max(12),
  contactHeading: text,
  contactIntro: text,
});
export type Settings = z.infer<typeof settingsSchema>;

export const menuLinkSchema = z.object({
  label: text.min(1, "Menü bağlantısının adı gerekli"),
  category: text.min(1, "Menü bağlantısı için kategori seçilmeli"),
  option: z.enum(["45", "90"]).optional(),
});
export const menuGroupSchema = z.object({
  name: text.min(1, "Menü başlığı gerekli"),
  links: z.array(menuLinkSchema).min(1, "Her menü başlığında bağlantı olmalı"),
});
export type MenuLink = z.infer<typeof menuLinkSchema>;
export type MenuGroup = z.infer<typeof menuGroupSchema>;

export const guideSchema = z.object({
  slug,
  tag: text,
  title: text.min(1, "Yazı başlığı gerekli"),
  intro: text,
  category: text,
  sections: z.array(
    z.tuple([
      text.min(1, "Bölüm başlığı gerekli"),
      text.min(1, "Bölüm metni gerekli"),
    ]),
  ),
});
export type Guide = z.infer<typeof guideSchema>;

export const projectSchema = z.object({
  id: slug,
  name: text.min(1, "Galeri başlığı gerekli"),
  type: text.min(1, "Galeri türü gerekli"),
  image: text.min(1, "Galeri görseli gerekli"),
  imageAlt: text,
  description: text,
});
export type Project = z.infer<typeof projectSchema>;

export const contentSchemas = {
  settings: settingsSchema,
  categories: z.array(categorySchema),
  menu: z.array(menuGroupSchema),
  products: z.array(productSchema),
  guides: z.array(guideSchema),
  projects: z.array(projectSchema),
};
export type ContentKey = keyof typeof contentSchemas;
export const contentKeys = Object.keys(contentSchemas) as ContentKey[];
export type SiteContent = {
  [K in ContentKey]: z.infer<(typeof contentSchemas)[K]>;
};

function duplicates(values: string[], label: string) {
  const seen = new Set<string>();
  const issues = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) issues.add(`${label} tekrar ediyor: ${value}`);
    seen.add(value);
  }
  return [...issues];
}

export function findContentIssues(
  content: Omit<SiteContent, "settings">,
): string[] {
  const categoryIds = new Set(content.categories.map((c) => c.id));
  const unknownCategory = (id: string) => id && !categoryIds.has(id);
  return [
    ...duplicates(
      content.categories.map((c) => c.id),
      "Kategori kodu",
    ),
    ...duplicates(
      content.products.map((p) => p.id),
      "Ürün kimliği",
    ),
    ...duplicates(
      content.products.map((p) => p.slug),
      "Ürün adresi",
    ),
    ...duplicates(
      content.products.map((p) => p.sku),
      "Ürün kodu",
    ),
    ...content.products
      .filter((p) => unknownCategory(p.categoryId))
      .map((p) => `${p.name}: tanımsız kategori (${p.categoryId})`),
    ...duplicates(
      content.guides.map((g) => g.slug),
      "Rehber adresi",
    ),
    ...content.guides
      .filter((g) => unknownCategory(g.category))
      .map((g) => `${g.title}: tanımsız kategori (${g.category})`),
    ...content.menu.flatMap((group) =>
      group.links
        .filter((link) => unknownCategory(link.category))
        .map((link) => `${group.name} / ${link.label}: tanımsız kategori`),
    ),
    ...duplicates(
      content.projects.map((p) => p.id),
      "Galeri kimliği",
    ),
  ];
}

export function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  const international = digits.startsWith("90")
    ? digits
    : digits.startsWith("0")
      ? `90${digits.slice(1)}`
      : digits;
  return `tel:+${international}`;
}

export function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/×/g, "x")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
