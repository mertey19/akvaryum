import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/quote-form";
import { siteConfig } from "@/lib/config";
import { meta } from "@/lib/seo";
export const metadata = meta(
  "Ölçü ve teklif hazırlığı",
  "Akvaryum ölçülerinizi planlayın, brüt hacmi görün ve talep özetinizi hazırlayın.",
  "/teklif",
);
export default function Page() {
  if (!siteConfig.demo && !siteConfig.customProductionVerified) notFound();
  return (
    <div className="container section">
      <div className="page-heading">
        <span className="eyebrow">FİKRİNİZİ NETLEŞTİRİN</span>
        <h1>Ölçünüzle başlayan bir dünya.</h1>
        <p>Kurulum bilgilerinizi paylaşılabilir bir özete dönüştürün.</p>
      </div>
      <p className="notice">
        Ölçülerinizi girin; hazırlanan mesajı WhatsApp üzerinden sipariş hattına
        iletin.
      </p>
      <QuoteForm
        phone={siteConfig.whatsapp}
        min={siteConfig.dimensionLimits.min}
        max={siteConfig.dimensionLimits.max}
      />
    </div>
  );
}
