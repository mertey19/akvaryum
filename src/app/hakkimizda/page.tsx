import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { meta } from "@/lib/seo";
export const metadata = meta(
  "Hakkımızda",
  `Akvaryum üretiminde ${siteConfig.aquariumGlass} kullanan DSN Akvaryum hakkında bilgiler.`,
  "/hakkimizda",
);
export default function Page() {
  return (
    <article className="container section prose">
      <span className="eyebrow">DSN AKVARYUM</span>
      <h1>Bir dünyaya özenle başlamak.</h1>
      <p className="lead">DSN Akvaryum.</p>
      <p className="verified-fact">
        Akvaryumlarımızı üretirken {siteConfig.aquariumGlass} kullanıyoruz.
      </p>
      <p>
        Bu katalog, akvaryum ve ekipman seçeneklerini incelemek, teknik
        detayları karşılaştırmak ve bir bilgi talebi hazırlamak için
        oluşturuldu.
      </p>
      <p>
        Özel ölçü kapsamı, hizmet bölgesi, adres ve işletme geçmişi hakkında
        onaylanmış bilgiler henüz sağlanmadı. Bu nedenle bu başlıklarda
        doğrulanmamış ticari iddialara yer vermiyoruz.
      </p>
      <Link className="button" href="/iletisim">
        Bilgi talebi hazırlayın
      </Link>
    </article>
  );
}
