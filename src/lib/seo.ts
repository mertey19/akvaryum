import type { Metadata } from "next";
import { siteConfig } from "./config";
export function meta(
  title: string,
  description: string,
  path: string,
): Metadata {
  const fullTitle =
    title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: siteConfig.url
      ? { canonical: `${siteConfig.url}${path}` }
      : undefined,
    openGraph: {
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: "tr_TR",
      type: "website",
    },
    robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
  };
}
