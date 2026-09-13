import { getProducts } from "@/lib/repository";
import { SavedList } from "@/components/saved-list";
export const metadata = {
  title: "Favorilerim",
  robots: { index: false, follow: false },
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
