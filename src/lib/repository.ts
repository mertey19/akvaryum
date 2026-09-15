import { unstable_cache } from "next/cache";
import { cache } from "react";
import { publishedProducts } from "./catalog";
import { siteConfig } from "./config";
import { readSiteContent } from "./content/store";

export const CONTENT_TAG = "site-content";

const readCachedContent = unstable_cache(readSiteContent, [CONTENT_TAG], {
  tags: [CONTENT_TAG],
});

export const getContent = cache(() => readCachedContent());

export async function getSettings() {
  return (await getContent()).settings;
}

export async function getProducts() {
  return publishedProducts((await getContent()).products, siteConfig.demo);
}

export async function getProduct(slug: string) {
  return (await getProducts()).find((product) => product.slug === slug);
}

export async function getGuides() {
  return (await getContent()).guides;
}

export async function getProjects() {
  return (await getContent()).projects;
}
