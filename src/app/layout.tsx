import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { SavedProvider } from "@/components/saved";
import { siteConfig } from "@/lib/config";
import "./globals.css";
import { getProducts } from "@/lib/repository";
import { StructuredData } from "@/components/structured-data";
export const metadata: Metadata = {
  title: {
    default: "DSN Akvaryum — Su altı dünyanıza doğru başlangıç",
    template: "%s | DSN Akvaryum",
  },
  description:
    "Akvaryum ve ekipman seçeneklerini keşfedin, karşılaştırın ve kurulumunuzu planlayın.",
  robots: { index: !siteConfig.demo, follow: !siteConfig.demo },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <StructuredData
          data={{
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            ...(siteConfig.phone
              ? { telephone: siteConfig.phoneHref.replace("tel:", "") }
              : {}),
            ...(siteConfig.address ? { address: siteConfig.address } : {}),
          }}
        />
        <SavedProvider>
          <Header
            demo={siteConfig.demo}
            canPlan={siteConfig.demo || siteConfig.customProductionVerified}
            activeCategories={[
              ...new Set(getProducts().map((p) => p.categoryId)),
            ]}
          />
          <main id="main">{children}</main>
          <footer>
            <div className="container footer-grid">
              <div>
                <Link className="footer-brand" href="/">
                  DSN <span>AKVARYUM</span>
                </Link>
                <p>
                  Su altı dünyanıza
                  <br />
                  özenli bir başlangıç.
                </p>
              </div>
              <div>
                <h2>Keşfedin</h2>
                <Link href="/urunler">Ürün kataloğu</Link>
                <Link href="/rehber">Akvaryum rehberi</Link>
                <Link href="/karsilastir">Ürün karşılaştırma</Link>
              </div>
              <div>
                <h2>DSN Akvaryum</h2>
                <Link href="/hakkimizda">Hakkımızda</Link>
                <Link href="/iletisim">İletişim</Link>
                {(siteConfig.demo || siteConfig.customProductionVerified) && (
                  <Link href="/teklif">Ölçü ve teklif hazırlığı</Link>
                )}
              </div>
              <div>
                <h2>İletişim</h2>
                {siteConfig.phone && (
                  <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
                )}
                {siteConfig.address && (
                  <p className="footer-address">{siteConfig.address}</p>
                )}
                {siteConfig.socialHandle && (
                  <p className="footer-social">@{siteConfig.socialHandle}</p>
                )}
                <Link href="/iletisim" className="footer-cta">
                  Tüm iletişim bilgileri ↗
                </Link>
              </div>
            </div>
            <div className="container footer-bottom">
              <span>DSN Akvaryum</span>
              <span>
                {siteConfig.demo
                  ? "Yerel demo · Görseller temsilidir · Online satış kapalıdır"
                  : "Ürün bilgileri için iletişime geçin."}
              </span>
              <span>Özenle tasarlandı.</span>
            </div>
          </footer>
        </SavedProvider>
      </body>
    </html>
  );
}
