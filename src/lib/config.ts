export function productionSiteUrl(siteUrl?: string, vercelHost?: string) {
  return siteUrl || (vercelHost ? `https://${vercelHost}` : "");
}
export function allowsIndexing(
  url: string,
  allowIndexing?: string,
  vercelEnv?: string,
) {
  return (
    Boolean(url) &&
    allowIndexing !== "false" &&
    (!vercelEnv || vercelEnv === "production")
  );
}
const url = productionSiteUrl(
  process.env.SITE_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
);
// Environment-level settings only; business details and texts are managed in
// the admin panel (see src/lib/content).
export const siteConfig = {
  demo: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",
  url,
  indexable: allowsIndexing(
    url,
    process.env.ALLOW_INDEXING,
    process.env.VERCEL_ENV,
  ),
  customProductionVerified: false,
  dimensionLimits: { min: 10, max: 300 },
};
