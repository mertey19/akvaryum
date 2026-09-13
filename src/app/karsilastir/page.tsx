import { getProducts } from "@/lib/repository";
import { SavedList } from "@/components/saved-list";
export const metadata = {
  title: "Ürün karşılaştırma",
  robots: { index: false, follow: false },
};
export default function Page() {
  return (
    <div className="container section">
      <div className="page-heading">
        <span className="eyebrow">DETAYLAR YAN YANA</span>
        <h1>Ürün karşılaştırma</h1>
        <p>Aynı kategoriden en fazla üç ürün. Eksik bilgiler puanlanmaz.</p>
      </div>
      <SavedList products={getProducts()} kind="compare" />
    </div>
  );
}
