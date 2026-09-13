import Link from "next/link";
import { guides } from "@/lib/guides";
import { meta } from "@/lib/seo";
export const metadata = meta(
  "Akvaryum rehberi",
  "İlk kurulum, ekipman seçimi ve ölçü planlama üzerine özgün başlangıç notları.",
  "/rehber",
);
export default function Page() {
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
            <span className="guide-number">0{i + 1}</span>
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
