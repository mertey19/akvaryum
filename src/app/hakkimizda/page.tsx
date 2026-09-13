import Link from "next/link";
import { meta } from "@/lib/seo";
export const metadata = meta(
  "Hakkımızda",
  "DSN Akvaryum ve katalog hakkında bilgiler.",
  "/hakkimizda",
);
export default function Page() {
  return (
    <article className="container section prose">
      <span className="eyebrow">DSN AKVARYUM</span>
      <h1>Bir dünyaya özenle başlamak.</h1>
      <p className="lead">DSN Akvaryum.</p>
      <p>
        Bu katalog, akvaryum ve ekipman seçeneklerini incelemek, teknik
        detayları karşılaştırmak ve bir bilgi talebi hazırlamak için
        oluşturuldu.
      </p>
      <p>
        İşletmenin üretim kapsamı, hizmet bölgesi, adresi ve geçmişine ilişkin
        onaylanmış bilgiler henüz sağlanmadı. Bu nedenle burada doğrulanmamış
        ticari iddialar yer almıyor.
      </p>
      <Link className="button" href="/iletisim">
        Bilgi talebi hazırlayın
      </Link>
    </article>
  );
}
