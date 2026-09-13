import type { Metadata } from "next";
import { siteConfig } from "./config";
export function meta(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: `${title} | DSN Akvaryum` },
    description,
    alternates: siteConfig.url
      ? { canonical: `${siteConfig.url}${path}` }
      : undefined,
    openGraph: {
      title: `${title} | DSN Akvaryum`,
      description,
      locale: "tr_TR",
      type: "website",
    },
    robots: { index: !siteConfig.demo, follow: !siteConfig.demo },
  };
}
