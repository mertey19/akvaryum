import Link from "next/link";
import { getGuides } from "@/lib/repository";
import { meta } from "@/lib/seo";
export async function generateMetadata() {
  return meta(
    "Akvaryum rehberi",
    "İlk kurulum, ekipman seçimi ve ölçü planlama üzerine özgün başlangıç notları.",
    "/rehber",
  );
}
export default async function Page() {
  const guides = await getGuides();
  return (
    <div className="container section">
      <div className="page-heading">
        <span className="eyebrow">BİLİNÇLİ BİR BAŞLANGIÇ</span>
        <h1>Akvaryum notları.</h1>
        <p>Kurulumunuzu düşünürken elinizin altında olsun.</p>
      </div>
      <div className="guide-grid">
        {guides.map((g, i) => (
          <Link className="guide-card" href={`/rehber/${g.slug}`} key={g.slug}>
            <span className="guide-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="eyebrow">{g.tag}</span>
            <h2>{g.title}</h2>
            <p>{g.intro}</p>
            <span className="text-link">Yazıyı okuyun →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
