import { SavedList } from "@/components/saved-list";
import { siteConfig } from "@/lib/config";
import { getProducts, getSettings } from "@/lib/repository";
export const metadata = {
  title: "Ürün karşılaştırma",
  robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
};
export default async function Page() {
  const [products, settings] = await Promise.all([
    getProducts(),
    getSettings(),
  ]);
  return (
    <div className="container section">
      <div className="page-heading">
        <span className="eyebrow">DETAYLAR YAN YANA</span>
        <h1>Ürün karşılaştırma</h1>
        <p>Aynı kategoriden en fazla üç ürün. Eksik bilgiler puanlanmaz.</p>
      </div>
      <SavedList
        products={products}
        kind="compare"
        priceIncludes={settings.aquariumPriceIncludes}
      />
    </div>
  );
}
