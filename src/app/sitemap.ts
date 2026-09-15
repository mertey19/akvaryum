import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { aquariumOptions } from "@/lib/catalog";
import { getContent, getProducts } from "@/lib/repository";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!siteConfig.indexable) return [];
  const [{ categories, guides }, products] = await Promise.all([
    getContent(),
    getProducts(),
  ]);
  const activeCategories = categories.filter((c) =>
    products.some((p) => p.categoryId === c.id),
  );
  return [
    "",
    "/urunler",
    ...activeCategories.map((c) => `/urunler?kategori=${c.id}`),
    ...(activeCategories.some((c) => c.id === "akvaryumlar")
      ? aquariumOptions.map((o) => `/urunler?kategori=akvaryumlar&secenek=${o}`)
      : []),
    "/rehber",
    "/iletisim",
    "/hakkimizda",
    ...(siteConfig.demo || siteConfig.customProductionVerified
      ? ["/teklif"]
      : []),
    ...(siteConfig.demo ? ["/projeler"] : []),
    ...guides.map((g) => `/rehber/${g.slug}`),
    ...products.map((p) => `/urun/${p.slug}`),
  ].map((path) => ({
    // Next writes <loc> verbatim, so query separators must be XML-escaped.
    url: `${siteConfig.url}${path}`.replaceAll("&", "&amp;"),
  }));
}
