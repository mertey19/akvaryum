import Link from "next/link";
import { money } from "@/lib/catalog";
import { requireAdmin } from "@/lib/admin/session";
import { readSiteContent } from "@/lib/content/store";

export default async function AdminProducts({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategori?: string }>;
}) {
  await requireAdmin();
  const { q = "", kategori = "" } = await searchParams;
  const { products, categories } = await readSiteContent();
  const term = q.trim().toLocaleLowerCase("tr-TR");
  const list = products.filter(
    (p) =>
      (!kategori || p.categoryId === kategori) &&
      (!term ||
        `${p.name} ${p.sku}`.toLocaleLowerCase("tr-TR").includes(term)),
  );
  const categoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name ?? id;
  return (
    <>
      <div className="admin-toolbar">
        <h1>Ürünler</h1>
        <Link className="button" href="/yonetim/urunler/yeni">
          + Yeni ürün
        </Link>
      </div>
      <form className="admin-card admin-row" role="search">
        <input
          name="q"
          defaultValue={q}
          placeholder="Ad veya ürün kodu ara"
          aria-label="Ürün ara"
        />
        <select name="kategori" defaultValue={kategori} aria-label="Kategori">
          <option value="">Tüm kategoriler</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button className="button secondary">Filtrele</button>
      </form>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">Ürün</th>
              <th scope="col">Kategori</th>
              <th scope="col">Fiyat</th>
              <th scope="col">Durum</th>
              <th scope="col">
                <span className="sr-only">İşlem</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id}>
                <td>
                  <strong>{p.name}</strong>
                  <br />
                  <small>{p.sku}</small>
                </td>
                <td data-label="Kategori">{categoryName(p.categoryId)}</td>
                <td data-label="Fiyat">
                  {p.variants.length
                    ? p.variants
                        .map((v) => `${v.name}: ${money(v.price)}`)
                        .join(" · ")
                    : money(p.price)}
                </td>
                <td data-label="Durum">
                  <span
                    className={`admin-badge${p.published ? "" : " muted"}`}
                  >
                    {p.published ? "Yayında" : "Gizli"}
                  </span>
                  {p.isDemo && <span className="admin-badge muted">Demo</span>}
                </td>
                <td>
                  <Link
                    className="text-link"
                    href={`/yonetim/urunler/${p.id}`}
                    aria-label={`${p.name} düzenle`}
                  >
                    Düzenle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="admin-hint">
        {list.length} / {products.length} ürün gösteriliyor
      </p>
    </>
  );
}
