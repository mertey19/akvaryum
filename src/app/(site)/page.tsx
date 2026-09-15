import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { ProductCard } from "@/components/product-card";
import { ProductImage } from "@/components/product-image";
import { StructuredData } from "@/components/structured-data";
import { publishedProducts } from "@/lib/catalog";
import { siteConfig } from "@/lib/config";
import { whatsappLink } from "@/lib/quote";
import { getContent, getSettings } from "@/lib/repository";
import { meta } from "@/lib/seo";

export async function generateMetadata() {
  const settings = await getSettings();
  return meta(null, settings.homeDescription, "/");
}

const valueIcons = ["water", "compare", "box"] as const;

export default async function Home() {
  const content = await getContent();
  const { settings, categories, guides } = content;
  const products = publishedProducts(content.products, siteConfig.demo);
  const salesWhatsApp = whatsappLink(
    settings.whatsapp,
    "Merhaba, hazır ölçü akvaryumlar ve sipariş seçenekleri hakkında bilgi almak istiyorum.",
  );
  const categoryLeads = categories.flatMap((category) => {
    const product = products.find((item) => item.categoryId === category.id);
    return product ? [product] : [];
  });
  const leadIds = new Set(categoryLeads.map((product) => product.id));
  const featuredProducts = [
    ...categoryLeads,
    ...products.filter((product) => !leadIds.has(product.id)),
  ].slice(0, 8);
  return (
    <>
      <StructuredData
        data={{
          "@type": "WebSite",
          name: settings.name,
          alternateName: [settings.fullName, "DSNAkvaryum"],
          url: `${siteConfig.url}/`,
        }}
      />
      <section className="hero">
        <Image
          src={settings.heroImage}
          alt="Bitkiler ve doğal köklerle düzenlenmiş cam akvaryum"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <span className="eyebrow light">{settings.heroEyebrow}</span>
          <h1>
            {settings.heroTitle}
            {settings.heroTitleAccent && (
              <span>{settings.heroTitleAccent}</span>
            )}
          </h1>
          <p className="hero-intro">
            <strong>{settings.heroLead}</strong>
            <span>{settings.heroText}</span>
          </p>
          <div className="actions">
            <Link className="button" href="/urunler?kategori=akvaryumlar">
              Akvaryum fiyatlarını incele <Icon name="arrow" size={19} />
            </Link>
            {salesWhatsApp && (
              <a
                className="button whatsapp"
                href={salesWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={19} /> WhatsApp’tan Sipariş
              </a>
            )}
          </div>
        </div>
        <div className="hero-index">
          01 <span>/</span> KEŞFETMEYE BAŞLAYIN
        </div>
      </section>
      {salesWhatsApp && settings.readyStockTitle && (
        <section className="ready-stock container">
          <div>
            <Icon name="box" size={26} />
            <span>
              <strong>{settings.readyStockTitle}</strong>
              {settings.readyStockText}
            </span>
          </div>
          <a
            className="button whatsapp"
            href={salesWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" size={19} /> WhatsApp’tan bilgi alın
          </a>
        </section>
      )}
      {settings.valueStrip.length > 0 && (
        <div className="value-strip container">
          {settings.valueStrip.map((item, i) => (
            <div key={i}>
              <Icon name={valueIcons[i % valueIcons.length]} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DÜNYANIZI OLUŞTURUN</span>
            <h2>Nereden başlamak istersiniz?</h2>
          </div>
          <Link className="text-link" href="/urunler">
            Tüm kategoriler <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="category-grid">
          {categories
            .filter((c) => products.some((p) => p.categoryId === c.id))
            .map((c) => (
              <Link
                className="category-card"
                key={c.id}
                href={`/urunler?kategori=${c.id}`}
              >
                <ProductImage
                  tile={c.image}
                  alt={`${c.name} kategori görseli`}
                  src={c.imageSrc}
                />
                <h3>{c.name}</h3>
                <span>{c.subtitle}</span>
              </Link>
            ))}
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">KATALOĞA YAKINDAN BAKIN</span>
              <h2>Keşfetmeye değer seçenekler</h2>
            </div>
            <Link className="text-link" href="/urunler">
              Tüm ürünleri gör <Icon name="arrow" size={18} />
            </Link>
          </div>
          {products.length ? (
            <div className="product-grid home-products">
              {featuredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  priceIncludes={settings.aquariumPriceIncludes}
                />
              ))}
            </div>
          ) : (
            <p>
              Onaylanmış ürün bilgileri için{" "}
              <Link href="/iletisim">iletişim sayfasını ziyaret edin.</Link>
            </p>
          )}
        </div>
      </section>
      <section className="section container intent-grid">
        <div className="intent-photo">
          <Image
            src={settings.heroImage}
            alt="Bitkiler ve doğal kökle düzenlenmiş akvaryum"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <span>HER DETAY BİR BÜTÜNÜN PARÇASI</span>
        </div>
        <div className="intent-copy">
          <span className="eyebrow">SİZİN ALANINIZ. SİZİN DÜNYANIZ.</span>
          <h2>
            Birlikte düşünülmüş
            <br />
            bir kurulum.
          </h2>
          <p>
            Yeni bir yaşam alanı mı kuruyorsunuz, mevcut sisteminizi mi
            tamamlıyorsunuz? İhtiyacınız olan yerden başlayın.
          </p>
          {settings.aquariumGlass && (
            <p className="verified-material">
              {`${settings.name}, ürettiği akvaryumlarda ${settings.aquariumGlass} kullanır.`}
            </p>
          )}
          <Link href="/urunler">
            <span>
              <strong>Yeni bir yaşam alanı kuruyorum</strong>
              <small>
                Akvaryum, teraryum ve paludaryum seçeneklerini keşfedin.
              </small>
            </span>
            <Icon name="arrow" />
          </Link>
          <Link href="/urunler?kategori=filtreler">
            <span>
              <strong>Kurulumumu tamamlıyorum</strong>
              <small>Filtre, aydınlatma ve ekipmanları inceleyin.</small>
            </span>
            <Icon name="arrow" />
          </Link>
        </div>
      </section>
      {siteConfig.demo && (
        <section className="measure-banner container">
          <div>
            <span className="eyebrow">FİKRİNİZ ÖLÇÜ KAZANSIN</span>
            <h2>
              Hayalinizdeki akvaryum
              <br />
              ne kadar yer kaplıyor?
            </h2>
            <p>
              Ölçülerinizi girin, yaklaşık brüt hacmi görün,
              <br />
              talebinizi paylaşmaya hazır bir özete dönüştürün.
            </p>
            <Link href="/teklif" className="button">
              Ölçülerinizi planlayın <Icon name="arrow" size={18} />
            </Link>
            <small>
              Ölçülerinizi hazırlayın ve WhatsApp üzerinden paylaşın.
            </small>
          </div>
          <div className="measure-type">
            <span>GENİŞLİK × DERİNLİK × YÜKSEKLİK</span>
            <strong>
              60 <i>×</i> 30 <i>×</i> 36
            </strong>
            <span>SİZİN ÖLÇÜLERİNİZLE BAŞLAR.</span>
          </div>
        </section>
      )}
      {guides.length > 0 && (
        <section className="section container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">BİRAZ BİLGİ, DAHA İYİ BİR BAŞLANGIÇ</span>
              <h2>Akvaryum notları</h2>
            </div>
            <Link className="text-link" href="/rehber">
              Rehberi keşfet <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="guide-grid">
            {guides.slice(0, 3).map((g, i) => (
              <Link
                href={`/rehber/${g.slug}`}
                className="guide-card"
                key={g.slug}
              >
                <span className="guide-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow">{g.tag}</span>
                <h3>{g.title}</h3>
                <p>{g.intro}</p>
                <span className="text-link">
                  Yazıyı okuyun <Icon name="arrow" size={18} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
      {settings.faq.length > 0 && (
        <section className="section container faq">
          <div>
            <span className="eyebrow">AKLINIZDAKİ SORULAR</span>
            <h2>Başlamadan önce.</h2>
          </div>
          <div>
            {settings.faq.map((item, i) => (
              <details key={i}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
