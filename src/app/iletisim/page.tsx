import { QuoteForm } from "@/components/quote-form";
import { siteConfig } from "@/lib/config";
import { getProduct } from "@/lib/repository";
import { meta } from "@/lib/seo";
export const metadata = meta(
  "İletişim ve ürün bilgisi",
  "Ürünle ilgili sorularınızı hazırlayın ve bilgi talebinizin özetini kopyalayın.",
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
    ? `${p.name}${v ? ` · ${v.name}` : ""}\nSKU: ${v?.sku || p.sku}\n${Object.entries(
        v?.specifications || p.specifications,
      )
        .map(([k, v]) => `${k}: ${v}`)
        .join(
          " · ",
        )}\nÜrün: ${siteConfig.url || ""}/urun/${p.slug}${v ? `?varyant=${v.id}` : ""}`
    : "";
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
      {(siteConfig.phone || siteConfig.email || siteConfig.address) && (
        <div className="contact-info">
          {siteConfig.phone && (
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
          )}
          {siteConfig.email && (
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          )}
          {siteConfig.address && <p>{siteConfig.address}</p>}
          {siteConfig.hours && <p>{siteConfig.hours}</p>}
        </div>
      )}
      <QuoteForm
        phone={siteConfig.whatsapp}
        productContext={context}
        custom={false}
      />
    </div>
  );
}
