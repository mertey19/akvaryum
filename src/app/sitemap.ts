import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getProducts } from "@/lib/repository";
import { guides } from "@/lib/guides";
export default function sitemap(): MetadataRoute.Sitemap {
  if (siteConfig.demo || !siteConfig.url) return [];
  return [
    "",
    "/rehber",
    "/iletisim",
    "/hakkimizda",
    ...guides.map((g) => `/rehber/${g.slug}`),
    ...getProducts().map((p) => `/urun/${p.slug}`),
  ].map((path) => ({ url: `${siteConfig.url}${path}` }));
}
