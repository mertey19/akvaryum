import Link from "next/link";
import {
  aquariumPriceOptions,
  Product,
  money,
  stockLabels,
} from "@/lib/catalog";
import { siteConfig } from "@/lib/config";
import { ProductImage } from "./product-image";
import { SaveButton } from "./saved";
import { Icon } from "./icon";
export function ProductCard({
  product: p,
  option,
}: {
  product: Product;
  option?: string;
}) {
  const listOptions = aquariumPriceOptions(p);
  const hasListPrices = listOptions.length === 2;
  const selectedOption = listOptions.find((o) => o.id === option);
  const priceOptions = selectedOption ? [selectedOption] : listOptions;
  const href = `/urun/${p.slug}${selectedOption ? `?varyant=${selectedOption.id}` : ""}`;
  return (
    <article className={`product-card${hasListPrices ? " aquarium-card" : ""}`}>
      <div className="product-visual">
        <Link href={href} tabIndex={-1} aria-hidden="true">
          <ProductImage tile={p.image} alt={p.imageAlt} src={p.images[0]} />
        </Link>
        <div className="card-save">
          <SaveButton product={p} />
        </div>
      </div>
      <div className="product-info">
        <div className="product-flags">
          {p.specifications.Cam && (
            <span className="material-badge">{p.specifications.Cam}</span>
          )}
        </div>
        <span className={`stock stock-${p.stockStatus}`}>
          {stockLabels[p.stockStatus]}
        </span>
        <h3>
          <Link href={href}>{p.name}</Link>
        </h3>
        <p className="spec-preview">
          {Object.entries(p.specifications)
            .filter(([key]) => key !== "Cam")
            .slice(0, 2)
            .map(([, value]) => value)
            .join(" · ")}
        </p>
        {hasListPrices ? (
          <div className="aquarium-card-pricing">
            <div
              className={`aquarium-price-options${selectedOption ? " single" : ""}`}
              aria-label={
                selectedOption
                  ? `${selectedOption.name} fiyatı`
                  : "90° ve 45° fiyat seçenekleri"
              }
            >
              {priceOptions.map((option) => (
                <div className="aquarium-price-option" key={option.id}>
                  <small>{option.name}</small>
                  <strong>{money(option.price)}</strong>
                </div>
              ))}
            </div>
            <p className="aquarium-price-includes">
              {siteConfig.aquariumPriceIncludes}
            </p>
            <div className="aquarium-price-meta">
              <small>{p.priceListDate} fiyat listesi</small>
              <SaveButton product={p} kind="compare" />
            </div>
          </div>
        ) : (
          <div className="card-bottom">
            <div>
              <small>{p.price === null ? "Fiyat bilgisi" : "Fiyat"}</small>
              <strong>{money(p.price)}</strong>
            </div>
            <SaveButton product={p} kind="compare" />
          </div>
        )}
        <Link className="product-link" href={href}>
          Ürünü incele
          <Icon name="arrow" size={18} />
        </Link>
      </div>
    </article>
  );
}
