import Link from "next/link";
import { categories, queryProducts, Query, stockLabels } from "@/lib/catalog";
import { getProducts } from "@/lib/repository";
import { ProductCard } from "@/components/product-card";
import { Filters } from "@/components/filters";
import { meta } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const q = await searchParams;
  return {
    ...meta(
      q.q
        ? `${q.q} araması`
        : categories.find((c) => c.id === q.kategori)?.name || "Ürün kataloğu",
      "Akvaryumları, filtreleri ve ekipmanları teknik özelliklere göre inceleyin.",
      "/urunler",
    ),
    robots: { index: false, follow: false },
  };
}
export default async function Catalog({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const incoming = await searchParams;
  const q: Query = Object.fromEntries(
    Object.entries(incoming).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]),
  );
  const data = queryProducts(q, getProducts());
  const all = getProducts();
  const cat = categories.find((c) => c.id === q.kategori);
  const technical = q.kategori
    ? [
        ...new Set(
          all
            .filter((p) => p.categoryId === q.kategori)
            .flatMap((p) => Object.values(p.specifications)),
        ),
      ]
    : [];
  function href(key: string, value?: string) {
    const params = new URLSearchParams(
      Object.entries(q).filter(([, v]) => v !== undefined) as [
        string,
        string,
      ][],
    );
    params.delete("sayfa");
    if (value) params.set(key, value);
    else params.delete(key);
    return `/urunler?${params}`;
  }
  return (
    <div className="container catalog-page">
      <nav className="breadcrumb" aria-label="İçerik yolu">
        <Link href="/">Ana sayfa</Link>
        <span>/</span>
        <span>{cat?.name || "Ürünler"}</span>
      </nav>
      <div className="page-heading">
        <span className="eyebrow">DÜNYANIZI TAMAMLAYIN</span>
        <h1>{q.q ? `“${q.q}” için sonuçlar` : cat?.name || "Ürün kataloğu"}</h1>
        <p>
          {cat?.id === "akvaryumlar"
            ? `DSN Akvaryum’un ürettiği akvaryumlarda ${siteConfig.aquariumGlass} kullanılır. Ölçü ve diğer ürün değerlerini detay sayfasında inceleyin.`
            : "İhtiyacınıza uygun seçenekleri keşfedin, detayları birlikte değerlendirin."}
        </p>
      </div>
      <div className="catalog-layout">
        <aside>
          <Filters
            query={q}
            brands={[...new Set(all.map((p) => p.brand))]}
            technical={technical}
          />
        </aside>
        <div>
          <div className="results-top">
            <p>
              <strong>{data.total}</strong> ürün bulundu
            </p>
            <span>
              {cat?.name || "Tüm kategoriler"} · {data.page} / {data.pages}
            </span>
          </div>
          <div className="chips">
            {Object.entries(q)
              .filter(([k, v]) => v && k !== "sayfa")
              .map(([k, v]) => (
                <Link
                  className="chip"
                  href={href(k)}
                  key={k}
                  aria-label={`${k === "kategori" ? cat?.name || v : k === "stok" ? stockLabels[v as keyof typeof stockLabels] || v : v} ${k} filtresini kaldır`}
                >
                  {k === "kategori"
                    ? cat?.name || v
                    : k === "stok"
                      ? stockLabels[v as keyof typeof stockLabels] || v
                      : v}{" "}
                  <span aria-hidden="true">×</span>
                </Link>
              ))}
            {Object.values(q).some(Boolean) && (
              <Link className="clear-link" href="/urunler">
                Tümünü temizle
              </Link>
            )}
          </div>
          <h2 className="sr-only">Ürün sonuçları</h2>
          {data.items.length ? (
            <div className="product-grid">
              {data.items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>Bu seçimle ürün bulunamadı.</h2>
              <p>
                Filtreleri kaldırabilir veya farklı bir arama deneyebilirsiniz.
              </p>
              <Link href="/urunler" className="button">
                Filtreleri temizle
              </Link>
            </div>
          )}
          {data.pages > 1 && (
            <nav className="pagination" aria-label="Sayfalama">
              {Array.from({ length: data.pages }, (_, i) => (
                <Link
                  aria-current={data.page === i + 1 ? "page" : undefined}
                  key={i}
                  href={href("sayfa", String(i + 1))}
                >
                  {i + 1}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
