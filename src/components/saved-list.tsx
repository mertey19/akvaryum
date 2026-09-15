"use client";
import Link from "next/link";
import { useSaved } from "./saved";
import { Product, money, stockLabels } from "@/lib/catalog";
import { ProductCard } from "./product-card";
import { ProductImage } from "./product-image";
export function SavedList({
  products,
  kind,
  priceIncludes,
}: {
  products: Product[];
  kind: "favorites" | "compare";
  priceIncludes?: string;
}) {
  const { state, toggle } = useSaved();
  const items = state[kind].flatMap((item) => {
    const [id, v] = item.id.split(":");
    const p = products.find((p) => p.id === id);
    if (!p) return [];
    const variant = p.variants.find((x) => x.id === v);
    return [
      {
        ...p,
        ...variant,
        id: item.id,
        slug: p.slug + (variant ? `?varyant=${variant.id}` : ""),
        name: p.name + (variant ? ` · ${variant.name}` : ""),
        saved: item,
      },
    ];
  });
  if (!items.length)
    return (
      <div className="empty-state">
        <h2>
          {kind === "favorites"
            ? "Henüz favoriniz yok."
            : "Karşılaştırılacak ürün seçilmedi."}
        </h2>
        <p>
          {kind === "favorites"
            ? "Beğendiğiniz ürünlerdeki kalp düğmesine dokunun."
            : "Aynı kategoriden en fazla üç ürünü seçerek teknik özellikleri yan yana görün."}
        </p>
        <Link className="button" href="/urunler">
          Ürünleri keşfedin
        </Link>
      </div>
    );
  if (kind === "favorites")
    return (
      <div className="product-grid home-products">
        {items.map((p) => (
          <div key={p.id}>
            <ProductCard product={p} priceIncludes={priceIncludes} />
            <button
              className="clear-link"
              onClick={() => toggle(kind, p.saved)}
            >
              Favorilerden kaldır
            </button>
          </div>
        ))}
      </div>
    );
  const keys = [
    ...new Set(items.flatMap((p) => Object.keys(p.specifications))),
  ];
  return (
    <div
      className="compare-scroll"
      tabIndex={0}
      role="region"
      aria-label="Karşılaştırma tablosu, yatay kaydırılabilir"
    >
      <table className="compare-table">
        <thead>
          <tr>
            <th scope="col">Teknik karşılaştırma</th>
            {items.map((p) => (
              <th scope="col" key={p.id}>
                <ProductImage
                  tile={p.image}
                  alt={p.imageAlt}
                  src={p.images[0]}
                />
                <Link href={`/urun/${p.slug}`}>{p.name}</Link>
                <button
                  className="clear-link"
                  onClick={() => toggle(kind, p.saved)}
                >
                  Kaldır
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Gösterilen fiyat</th>
            {items.map((p) => (
              <td key={p.id}>
                {money(p.price)}
                {p.categoryId === "akvaryumlar" && (
                  <small>
                    {` (${p.specifications["Fiyat seçeneği"] || "90°"})`}
                  </small>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row">Stok</th>
            {items.map((p) => (
              <td key={p.id}>{stockLabels[p.stockStatus]}</td>
            ))}
          </tr>
          {keys.map((k) => (
            <tr key={k}>
              <th scope="row">{k}</th>
              {items.map((p) => (
                <td key={p.id}>{p.specifications[k] || "Bilgi verilmemiş"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
