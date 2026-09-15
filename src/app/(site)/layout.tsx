import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import { SavedProvider } from "@/components/saved";
import { StructuredData } from "@/components/structured-data";
import { publishedProducts } from "@/lib/catalog";
import { siteConfig } from "@/lib/config";
import { phoneHref } from "@/lib/content/schema";
import { whatsappLink } from "@/lib/quote";
import { getContent } from "@/lib/repository";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings, menu, products } = await getContent();
  const tel = phoneHref(settings.phone);
  const canPlan = siteConfig.demo || siteConfig.customProductionVerified;
  const salesWhatsApp = whatsappLink(
    settings.whatsapp,
    `Merhaba, ${settings.name} ürünleri hakkında bilgi ve sipariş vermek istiyorum.`,
  );
  return (
    <>
      <StructuredData
        data={{
          "@type": "Organization",
          name: settings.fullName,
          alternateName: settings.name,
          url: siteConfig.url,
          ...(tel ? { telephone: tel.replace("tel:", "") } : {}),
          ...(settings.address ? { address: settings.address } : {}),
        }}
      />
      <SavedProvider>
        <Header
          demo={siteConfig.demo}
          canPlan={canPlan}
          activeCategories={[
            ...new Set(
              publishedProducts(products, siteConfig.demo).map(
                (p) => p.categoryId,
              ),
            ),
          ]}
          menu={menu}
          brand={{
            name: settings.name,
            fullName: settings.fullName,
            brandLabel: settings.brandLabel,
            logoPath: settings.logoPath,
            phone: settings.phone,
            whatsapp: settings.whatsapp,
            announcement: settings.announcement,
          }}
        />
        <main id="main">{children}</main>
        <footer>
          <div className="container footer-grid">
            <div>
              <Link
                className="footer-brand"
                href="/"
                aria-label={`${settings.fullName} ana sayfa`}
              >
                <BrandLogo
                  src={settings.logoPath}
                  className="footer-brand-logo"
                  sizes="(max-width: 767px) 140px, 150px"
                />
                <span className="footer-brand-label">
                  {settings.brandLabel}
                </span>
              </Link>
              {settings.footerTagline && (
                <p className="footer-tagline">{settings.footerTagline}</p>
              )}
            </div>
            <div>
              <h2>Keşfedin</h2>
              <Link href="/urunler">Ürün kataloğu</Link>
              <Link href="/rehber">Akvaryum rehberi</Link>
              <Link href="/karsilastir">Ürün karşılaştırma</Link>
            </div>
            <div>
              <h2>{settings.fullName}</h2>
              <Link href="/hakkimizda">Hakkımızda</Link>
              <Link href="/iletisim">İletişim</Link>
              {canPlan && <Link href="/teklif">Ölçü ve teklif hazırlığı</Link>}
            </div>
            <div>
              <h2>İletişim</h2>
              {settings.phone && <a href={tel}>{settings.phone}</a>}
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
              {settings.address && (
                <p className="footer-address">{settings.address}</p>
              )}
              {settings.socialHandle && (
                <p className="footer-social">@{settings.socialHandle}</p>
              )}
              <Link href="/iletisim" className="footer-cta">
                Tüm iletişim bilgileri ↗
              </Link>
            </div>
          </div>
          <div className="container footer-bottom">
            <span>© 2026 {settings.fullName}</span>
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
    </>
  );
}
