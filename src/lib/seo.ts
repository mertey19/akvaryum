import type { Metadata } from "next";
import { siteConfig } from "./config";
import { getSettings } from "./repository";
export async function meta(
  title: string | null,
  description: string,
  path: string,
): Promise<Metadata> {
  const { name } = await getSettings();
  const fullTitle = title ? `${title} | ${name}` : name;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: siteConfig.url
      ? { canonical: `${siteConfig.url}${path}` }
      : undefined,
    openGraph: {
      title: fullTitle,
      description,
      siteName: name,
      locale: "tr_TR",
      type: "website",
    },
    robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
  };
}
