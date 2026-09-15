import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { getSettings } from "@/lib/repository";

export async function generateMetadata(): Promise<Metadata> {
  const { name } = await getSettings();
  return {
    title: { default: name, template: `%s | ${name}` },
    applicationName: name,
    description:
      "Akvaryum, teraryum, paludaryum ve ekipman seçeneklerini keşfedin, karşılaştırın ve kurulumunuzu planlayın.",
    robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
