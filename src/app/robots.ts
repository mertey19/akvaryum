import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(siteConfig.demo
        ? { disallow: "/" }
        : {
            allow: "/",
            disallow: [
              "/api/",
              "/favoriler",
              "/karsilastir",
              "/iletisim?",
              "/urunler?",
            ],
          }),
    },
    ...(siteConfig.url && !siteConfig.demo
      ? { sitemap: `${siteConfig.url}/sitemap.xml` }
      : {}),
  };
}
