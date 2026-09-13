export const siteConfig = {
  name: "DSN Akvaryum",
  demo: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",
  url: process.env.SITE_URL || "",
  whatsapp: process.env.WHATSAPP_NUMBER || "",
  phone: "",
  address: "",
  email: "",
  hours: "",
  customProductionVerified: false,
  dimensionLimits: { min: 10, max: 300 },
};
