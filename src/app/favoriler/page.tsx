import { getProducts } from "@/lib/repository";
import { SavedList } from "@/components/saved-list";
import { siteConfig } from "@/lib/config";
export const metadata = {
  title: "Favorilerim",
  robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
};
export default function Page() {
  return (
    <div className="container section">
      <div className="page-heading">
        <span className="eyebrow">SİZİN SEÇKİNİZ</span>
        <h1>Favorilerim</h1>
        <p>Seçimleriniz bu tarayıcıda saklanır.</p>
      </div>
      <SavedList products={getProducts()} kind="favorites" />
    </div>
  );
}
