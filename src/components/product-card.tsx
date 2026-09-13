import Link from "next/link";
import { Product, money, stockLabels } from "@/lib/catalog";
import { ProductImage } from "./product-image";
import { SaveButton } from "./saved";
import { Icon } from "./icon";
export function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-visual">
        <Link href={`/urun/${p.slug}`} tabIndex={-1} aria-hidden="true">
          <ProductImage tile={p.image} alt={p.imageAlt} src={p.images[0]} />
        </Link>
        <div className="card-save">
          <SaveButton product={p} />
        </div>
        {p.isDemo && <span className="image-caption">ÖRNEK ÜRÜN</span>}
      </div>
      <div className="product-info">
        <span className={`stock stock-${p.stockStatus}`}>
          {stockLabels[p.stockStatus]}
        </span>
        <h3>
          <Link href={`/urun/${p.slug}`}>{p.name}</Link>
        </h3>
        <p className="spec-preview">
          {Object.values(p.specifications).slice(0, 2).join(" · ")}
        </p>
        <div className="card-bottom">
          <div>
            <small>{p.isDemo ? "Örnek fiyat" : "Fiyat"}</small>
            <strong>{money(p.price)}</strong>
          </div>
          <SaveButton product={p} kind="compare" />
        </div>
        <Link className="product-link" href={`/urun/${p.slug}`}>
          Ürünü incele
          <Icon name="arrow" size={18} />
        </Link>
      </div>
    </article>
  );
}
