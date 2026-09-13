import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { aquariumOptions, categories } from "@/lib/catalog";
import { getProducts } from "@/lib/repository";
import { guides } from "@/lib/guides";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.indexable) return [];
  const products = getProducts();
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
