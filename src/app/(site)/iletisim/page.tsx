import { QuoteForm } from "@/components/quote-form";
import { Icon } from "@/components/icon";
import { siteConfig } from "@/lib/config";
import { phoneHref } from "@/lib/content/schema";
import { whatsappLink } from "@/lib/quote";
import { getProduct, getSettings } from "@/lib/repository";
import { meta } from "@/lib/seo";
export async function generateMetadata() {
  const settings = await getSettings();
  return meta(
    "İletişim ve ürün bilgisi",
    `${settings.name}’un WhatsApp sipariş hattı, adresi, telefon numarası ve sosyal medya kullanıcı adı.`,
    "/iletisim",
  );
}
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ urun?: string; varyant?: string }>;
}) {
  const q = await searchParams;
  const settings = await getSettings();
  const p = q.urun ? await getProduct(q.urun) : null;
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
    settings.whatsapp,
    `Merhaba, ${settings.name} ürünleri hakkında bilgi ve sipariş vermek istiyorum.`,
  );
  const tel = phoneHref(settings.phone);
  return (
    <div className="container section">
      <div className="page-heading">
        <span className="eyebrow">BİR SONRAKİ ADIM</span>
        <h1>{settings.contactHeading}</h1>
        <p>{settings.contactIntro}</p>
      </div>
      {(settings.phone ||
        settings.email ||
        settings.address ||
        settings.hours ||
        settings.socialHandle) && (
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
                    <Icon name="whatsapp" size={20} /> {settings.phone}
                  </a>
                </dd>
              </div>
            )}
            {settings.phone && (
              <div>
                <dt>Telefon</dt>
                <dd>
                  <a href={tel}>{settings.phone}</a>
                </dd>
              </div>
            )}
            {settings.address && (
              <div>
                <dt>Adres</dt>
                <dd>
                  <address>{settings.address}</address>
                </dd>
              </div>
            )}
            {settings.socialHandle && (
              <div>
                <dt>Sosyal medya hesabı</dt>
                <dd>@{settings.socialHandle}</dd>
              </div>
            )}
            {settings.email && (
              <div>
                <dt>E-posta</dt>
                <dd>
                  <a href={`mailto:${settings.email}`}>{settings.email}</a>
                </dd>
              </div>
            )}
            {settings.hours && (
              <div>
                <dt>Çalışma saatleri</dt>
                <dd>{settings.hours}</dd>
              </div>
            )}
          </dl>
        </section>
      )}
      <QuoteForm
        phone={settings.whatsapp}
        productContext={context}
        custom={false}
      />
    </div>
  );
}
