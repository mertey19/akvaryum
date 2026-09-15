import { SavedList } from "@/components/saved-list";
import { siteConfig } from "@/lib/config";
import { getProducts, getSettings } from "@/lib/repository";
export const metadata = {
  title: "Favorilerim",
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
        <span className="eyebrow">SİZİN SEÇKİNİZ</span>
        <h1>Favorilerim</h1>
        <p>Seçimleriniz bu tarayıcıda saklanır.</p>
      </div>
      <SavedList
        products={products}
        kind="favorites"
        priceIncludes={settings.aquariumPriceIncludes}
      />
    </div>
  );
}
