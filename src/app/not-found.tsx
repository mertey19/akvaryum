import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container empty-state">
      <span className="eyebrow">404 / SAYFA BULUNAMADI</span>
      <h1>Bu sayfaya ulaşamadık.</h1>
      <p>Bağlantı değişmiş veya ürün yayından kaldırılmış olabilir.</p>
      <Link className="button" href="/urunler">
        Kataloğa dönün
      </Link>
    </div>
  );
}
