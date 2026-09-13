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
export const siteConfig = {
  name: "DSN Akvaryum",
  fullName: "DSN Akvaryum İmalatı",
  brandLabel: "DSN AKVARYUM İMALATI",
  logoPath: "/images/dsn-logo.jpeg",
  demo: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",
  url,
  indexable: allowsIndexing(
    url,
    process.env.ALLOW_INDEXING,
    process.env.VERCEL_ENV,
  ),
  whatsapp: process.env.WHATSAPP_NUMBER || "+905453897147",
  phone: "0545 389 71 47",
  phoneHref: "tel:+905453897147",
  address: "Mamak Hüseyin Gazi, Ekin, Su Sk. No:17, 06160 Mamak/Ankara",
  socialHandle: "Dursun.belgic",
  email: "",
  hours: "",
  aquariumGlass: "DIAMOND cam",
  aquariumPriceIncludes: "Arka fon ve zemin matı fiyata dahildir.",
  customProductionVerified: false,
  dimensionLimits: { min: 10, max: 300 },
};
