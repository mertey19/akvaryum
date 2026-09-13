import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/catalog";
import { getProducts } from "@/lib/repository";
import { siteConfig } from "@/lib/config";
import { ProductCard } from "@/components/product-card";
import { ProductImage } from "@/components/product-image";
import { Icon } from "@/components/icon";
import { guides } from "@/lib/guides";
import { meta } from "@/lib/seo";
import { whatsappLink } from "@/lib/quote";
export const metadata = meta(
  "Su altı dünyanıza doğru başlangıç",
  "Akvaryum, teraryum, paludaryum ve ekipman seçeneklerini keşfedin. Ürünleri karşılaştırın, kendi kurulumunuz için bir talep hazırlayın.",
  "/",
);
export default function Home() {
  const products = getProducts();
  const salesWhatsApp = whatsappLink(
    siteConfig.whatsapp,
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
      <section className="hero">
        <Image
          src="/images/hero.webp"
          alt="Bitkiler ve doğal köklerle düzenlenmiş cam akvaryum"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <span className="eyebrow light">BİR AKVARYUMDAN DAHA FAZLASI</span>
          <h1>
            DSN AKVARYUM
            <span>İMALATI</span>
          </h1>
          <p className="hero-intro">
            <strong>Su altı dünyanıza doğru başlangıç.</strong>
            <span>
              Akvaryum, teraryum ve paludaryum seçenekleriyle ekipmanları ve
              ilhamı keşfedin.
            </span>
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
      {salesWhatsApp && (
        <section className="ready-stock container">
          <div>
            <Icon name="box" size={26} />
            <span>
              <strong>Hazır ölçü akvaryumlar mevcut</strong>
              Güncel ölçü, fiyat ve stok bilgisini WhatsApp üzerinden alın.
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
      <div className="value-strip container">
        <div>
          <Icon name="water" />
          <span>{siteConfig.aquariumGlass} ile üretilen akvaryumlar</span>
        </div>
        <div>
          <Icon name="compare" />
          <span>14 ölçüde 90° ve 45° fiyat seçeneği</span>
        </div>
        <div>
          <Icon name="box" />
          <span>İhtiyacınıza göre teklif hazırlığı</span>
        </div>
      </div>
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
                <ProductCard key={p.id} product={p} />
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
            src="/images/hero.webp"
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
          <p className="verified-material">
            {`DSN Akvaryum, ürettiği akvaryumlarda ${siteConfig.aquariumGlass} kullanır.`}
          </p>
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
          {guides.map((g, i) => (
            <Link
              href={`/rehber/${g.slug}`}
              className="guide-card"
              key={g.slug}
            >
              <span className="guide-number">0{i + 1}</span>
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
      <section className="section container faq">
        <div>
          <span className="eyebrow">AKLINIZDAKİ SORULAR</span>
          <h2>Başlamadan önce.</h2>
        </div>
        <div>
          <details>
            <summary>Buradan online sipariş verebilir miyim?</summary>
            <p>
              Ürün sayfasındaki yeşil düğmeyle WhatsApp üzerinden fiyat ve stok
              teyidi alıp siparişinizi başlatabilirsiniz. Ödeme ve teslimat
              ayrıntıları görüşmede netleştirilir.
            </p>
          </details>
          <details>
            <summary>Hazır ölçü akvaryumlar mevcut mu?</summary>
            <p>
              Evet. Güncel hazır ölçü seçenekleri ve stok durumu için WhatsApp
              sipariş hattından bilgi alabilirsiniz.
            </p>
          </details>
          <details>
            <summary>Ölçü aracındaki hacim ne anlama geliyor?</summary>
            <p>
              Dış ölçülere göre geometrik brüt hacmi gösterir. Gerçek su
              miktarı, cam kalınlığı veya taşıma kapasitesi hesabı değildir.
            </p>
          </details>
          <details>
            <summary>Ürünleri nasıl karşılaştırırım?</summary>
            <p>
              Ürün kartındaki karşılaştırma düğmesiyle aynı kategoriden en fazla
              üç ürün seçin. Seçimleriniz bu tarayıcıda saklanır.
            </p>
          </details>
        </div>
      </section>
    </>
  );
}
