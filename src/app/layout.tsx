import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { SavedProvider } from "@/components/saved";
import { siteConfig } from "@/lib/config";
import "./globals.css";
import { getProducts } from "@/lib/repository";
import { StructuredData } from "@/components/structured-data";
import { BrandLogo } from "@/components/brand-logo";
import { Icon } from "@/components/icon";
import { whatsappLink } from "@/lib/quote";
export const metadata: Metadata = {
  title: {
    default: `${siteConfig.fullName} — Su altı dünyanıza doğru başlangıç`,
    template: `%s | ${siteConfig.fullName}`,
  },
  description:
    "Akvaryum, teraryum, paludaryum ve ekipman seçeneklerini keşfedin, karşılaştırın ve kurulumunuzu planlayın.",
  robots: { index: !siteConfig.demo, follow: !siteConfig.demo },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const salesWhatsApp = whatsappLink(
    siteConfig.whatsapp,
    "Merhaba, DSN Akvaryum ürünleri hakkında bilgi ve sipariş vermek istiyorum.",
  );
  return (
    <html lang="tr">
      <body>
        <StructuredData
          data={{
            "@type": "Organization",
            name: siteConfig.fullName,
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
                <Link
                  className="footer-brand"
                  href="/"
                  aria-label={`${siteConfig.fullName} ana sayfa`}
                >
                  <BrandLogo
                    className="footer-brand-logo"
                    sizes="(max-width: 767px) 140px, 150px"
                  />
                  <span className="footer-brand-label">
                    {siteConfig.brandLabel}
                  </span>
                </Link>
                <p>
                  Doğal yaşam alanınıza
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
                <h2>{siteConfig.fullName}</h2>
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
                {salesWhatsApp && (
                  <a
                    className="footer-whatsapp"
                    href={salesWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="whatsapp" size={17} /> WhatsApp’tan yazın
                  </a>
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
              <span>© 2026 {siteConfig.fullName}</span>
              <span>WhatsApp üzerinden bilgi ve sipariş</span>
            </div>
          </footer>
          {salesWhatsApp && (
            <a
              className="floating-whatsapp"
              href={salesWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp üzerinden bilgi ve sipariş"
              title="WhatsApp üzerinden bilgi ve sipariş"
            >
              <Icon name="whatsapp" size={29} />
            </a>
          )}
        </SavedProvider>
      </body>
    </html>
  );
}
