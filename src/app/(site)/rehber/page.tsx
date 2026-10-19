import Link from "next/link";
import { getGuides } from "@/lib/repository";
import { meta } from "@/lib/seo";
export async function generateMetadata() {
  return meta(
    "Akvaryum rehberi",
    "İlk kurulum, ekipman seçimi, ölçü planlama ve Ankara ilçelerine yönelik akvaryum rehberleri.",
    "/rehber",
  );
}
export default async function Page() {
  const guides = await getGuides();
  const districtGuides = guides.filter((g) => g.tag === "ANKARA İLÇE REHBERİ");
  const searchGuides = guides.filter(
    (g) => g.tag === "ANKARA AKVARYUM REHBERİ",
  );
  const aquariumGuides = guides.filter(
    (g) => !["ANKARA İLÇE REHBERİ", "ANKARA AKVARYUM REHBERİ"].includes(g.tag),
  );
  const cards = (items: typeof guides, offset = 0) =>
    items.map((g, i) => (
      <Link className="guide-card" href={`/rehber/${g.slug}`} key={g.slug}>
        <span className="guide-number">
          {String(i + 1 + offset).padStart(2, "0")}
        </span>
        <span className="eyebrow">{g.tag}</span>
        <h2>{g.title}</h2>
        <p>{g.intro}</p>
        <span className="text-link">Yazıyı okuyun →</span>
      </Link>
    ));
  return (
    <div className="container section">
      <div className="page-heading">
        <span className="eyebrow">BİLİNÇLİ BİR BAŞLANGIÇ</span>
        <h1>Akvaryum notları.</h1>
        <p>
          Kurulumunuzu düşünürken ve Ankara ilçelerinden talep hazırlarken
          elinizin altında olsun.
        </p>
      </div>
      <section aria-labelledby="akvaryum-rehberleri">
        <div className="section-heading">
          <div>
            <span className="eyebrow">AKVARYUM BİLGİ BANKASI</span>
            <h2 id="akvaryum-rehberleri">Akvaryum rehberleri</h2>
          </div>
        </div>
        <div className="guide-grid">{cards(aquariumGuides)}</div>
      </section>
      <section
        id="ankara-akvaryum-rehberleri"
        aria-labelledby="ankara-rehberleri"
        className="guide-group"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">ANKARA’DA DOĞRU TALEBİ HAZIRLAYIN</span>
            <h2 id="ankara-rehberleri">Ankara akvaryum imalatı rehberleri</h2>
            <p>
              İmalatçı seçimi, özel ölçü talebi, fiyat, cam, mobilya, kurulum
              türü ve kurumsal projeler için doğrulanabilir bilgiler.
            </p>
          </div>
        </div>
        <div className="guide-grid">
          {cards(searchGuides, aquariumGuides.length)}
        </div>
      </section>
      <section
        id="ankara-ilce-rehberleri"
        aria-labelledby="ilce-rehberleri"
        className="guide-group"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">25 İLÇE, 25 AYRI REHBER</span>
            <h2 id="ilce-rehberleri">Ankara ilçe rehberleri</h2>
            <p>
              İlçenizi seçin; yerleşim, erişim ve sipariş hazırlığını adım adım
              inceleyin.
            </p>
          </div>
        </div>
        <div className="guide-grid">
          {cards(districtGuides, aquariumGuides.length + searchGuides.length)}
        </div>
      </section>
    </div>
  );
}
