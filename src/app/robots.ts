import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(siteConfig.indexable
        ? {
            allow: "/",
            disallow: [
              "/api/",
              "/favoriler",
              "/karsilastir",
              "/projeler",
              "/iletisim?",
              "/urunler?",
            ],
          }
        : { disallow: "/" }),
    },
    ...(siteConfig.indexable
      ? { sitemap: `${siteConfig.url}/sitemap.xml` }
      : {}),
  };
}
