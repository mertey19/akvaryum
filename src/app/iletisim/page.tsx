import { QuoteForm } from "@/components/quote-form";
import { siteConfig } from "@/lib/config";
import { getProduct } from "@/lib/repository";
import { meta } from "@/lib/seo";
import { Icon } from "@/components/icon";
import { whatsappLink } from "@/lib/quote";
export const metadata = meta(
  "İletişim ve ürün bilgisi",
  "DSN Akvaryum’un WhatsApp sipariş hattı, Mamak/Ankara adresi, telefon numarası ve sosyal medya kullanıcı adı.",
  "/iletisim",
);
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ urun?: string; varyant?: string }>;
}) {
  const q = await searchParams;
  const p = q.urun ? getProduct(q.urun) : null;
  const v = p?.variants.find((v) => v.id === q.varyant);
  const context = p
    ? `${p.name}${v ? ` · ${v.name}` : ""}\n${p.priceListDate ? "Seçim kodu" : "Talep kodu"}: ${v?.sku || p.sku}\n${Object.entries(
        v?.specifications || p.specifications,
      )
        .map(([k, v]) => `${k}: ${v}`)
        .join(
          " · ",
        )}\nÜrün: ${siteConfig.url || ""}/urun/${p.slug}${v ? `?varyant=${v.id}` : ""}`
    : "";
  const directWhatsApp = whatsappLink(
    siteConfig.whatsapp,
    "Merhaba, DSN Akvaryum ürünleri hakkında bilgi ve sipariş vermek istiyorum.",
  );
  return (
    <div className="container section">
      <div className="page-heading">
        <span className="eyebrow">BİR SONRAKİ ADIM</span>
        <h1>Konuşmaya buradan başlayın.</h1>
        <p>
          İlgilendiğiniz ürün veya kurulum fikriniz hakkında bir bilgi talebi
          hazırlayın.
        </p>
      </div>
      {(siteConfig.phone ||
        siteConfig.email ||
        siteConfig.address ||
        siteConfig.hours ||
        siteConfig.socialHandle) && (
        <section className="contact-details" aria-labelledby="contact-heading">
          <h2 id="contact-heading">İletişim bilgilerimiz</h2>
          <dl className="contact-info">
            {directWhatsApp && (
              <div className="whatsapp-contact">
                <dt>WhatsApp sipariş hattı</dt>
                <dd>
                  <a
                    href={directWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="whatsapp" size={20} /> {siteConfig.phone}
                  </a>
                </dd>
              </div>
            )}
            {siteConfig.phone && (
              <div>
                <dt>Telefon</dt>
                <dd>
                  <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
                </dd>
              </div>
            )}
            {siteConfig.address && (
              <div>
                <dt>Adres</dt>
                <dd>
                  <address>{siteConfig.address}</address>
                </dd>
              </div>
            )}
            {siteConfig.socialHandle && (
              <div>
                <dt>Sosyal medya hesabı</dt>
                <dd>@{siteConfig.socialHandle}</dd>
              </div>
            )}
            {siteConfig.email && (
              <div>
                <dt>E-posta</dt>
                <dd>
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </dd>
              </div>
            )}
            {siteConfig.hours && (
              <div>
                <dt>Çalışma saatleri</dt>
                <dd>{siteConfig.hours}</dd>
              </div>
            )}
          </dl>
        </section>
      )}
      <QuoteForm
        phone={siteConfig.whatsapp}
        productContext={context}
        custom={false}
      />
    </div>
  );
}
