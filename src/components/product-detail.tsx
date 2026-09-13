"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { Product, money, stockLabels, deliveryLabels } from "@/lib/catalog";
import { ProductImage } from "./product-image";
import { SaveButton } from "./saved";
import { Icon } from "./icon";
export function ProductDetail({
  product: p,
  initialVariant = "",
}: {
  product: Product;
  initialVariant?: string;
}) {
  const [variant, setVariant] = useState(initialVariant);
  const [photo, setPhoto] = useState(0);
  const selected = p.variants.find((v) => v.id === variant);
  const current = selected ? { ...p, ...selected } : p;
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  function close() {
    dialog.current?.close();
    opener.current?.focus();
  }
  const quoteHref = `/iletisim?urun=${p.slug}${selected ? `&varyant=${selected.id}` : ""}`;
  return (
    <>
      <div className="detail-grid">
        <div className="detail-gallery">
          <button
            ref={opener}
            className="gallery-open"
            onClick={() => dialog.current?.showModal()}
            aria-label="Görseli büyüt"
          >
            <ProductImage
              tile={current.image}
              alt={p.imageAlt}
              src={current.images[photo]}
            />
            <span>
              <Icon name="search" size={18} /> Görseli büyüt
            </span>
          </button>
          {current.images.length > 1 && (
            <div className="gallery-thumbnails">
              {current.images.map((src, index) => (
                <button
                  key={src}
                  className="icon-button"
                  aria-label={`${index + 1}. ürün görseli`}
                  aria-pressed={photo === index}
                  onClick={() => setPhoto(index)}
                >
                  <ProductImage tile={current.image} alt="" src={src} />
                </button>
              ))}
            </div>
          )}
          {p.isDemo && (
            <p className="muted">
              Temsili kategori görseli · Varyant rengi ve detayları görselde
              birebir gösterilmez.
            </p>
          )}
        </div>
        <div className="detail-info">
          <span className="eyebrow">{p.brand}</span>
          <h1>{p.name}</h1>
          {current.specifications.Cam && (
            <span className="material-badge detail-material">
              {current.specifications.Cam} ile üretilir
            </span>
          )}
          <div className="detail-meta">
            <span className={`stock stock-${current.stockStatus}`}>
              {stockLabels[current.stockStatus]}
            </span>
            <span>
              SKU: <b data-testid="sku">{current.sku}</b>
            </span>
          </div>
          <p className="detail-intro">
            {Object.entries(current.specifications)
              .map(([k, v]) => `${k}: ${v}`)
              .join(" · ")}
          </p>
          <div className="detail-price">
            <small>
              {p.isDemo ? "Örnek fiyat · satış teklifi değildir" : "Fiyat"}
            </small>
            <strong>{money(current.price)}</strong>
          </div>
          {p.variants.length > 0 && (
            <label className="field">
              Varyant
              <select
                aria-label="Varyant"
                value={variant}
                onChange={(e) => {
                  setVariant(e.target.value);
                  setPhoto(0);
                }}
              >
                <option value="">Standart model</option>
                {p.variants.map((v) => (
                  <option value={v.id} key={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </label>
          )}
          <div className="delivery-box">
            <Icon name="box" />
            <div>
              <strong>{deliveryLabels[p.deliveryType]}</strong>
              <p>
                Nakliye bedeli ve teslimat kapsamı ayrıca netleştirilmelidir.
              </p>
              <p>Hazırlık süresi: {p.leadTime || "Bilgi alınmalı"}</p>
            </div>
          </div>
          <div className="detail-actions">
            <Link className="button" href={quoteHref}>
              Bu Ürün İçin Bilgi Al <Icon name="arrow" size={18} />
            </Link>
            <SaveButton product={p} variant={selected?.id} />
            <SaveButton product={p} variant={selected?.id} kind="compare" />
          </div>
          <p className="muted">
            Bilgi talebi taslağı hazırlanır; otomatik gönderim yapılmaz.
          </p>
        </div>
      </div>
      <div className="detail-sections">
        <section>
          <h2>Teknik özellikler</h2>
          <table>
            <tbody>
              {Object.entries(current.specifications).map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
              <tr>
                <th scope="row">SKU</th>
                <td>{current.sku}</td>
              </tr>
              {p.gtin && (
                <tr>
                  <th scope="row">GTIN</th>
                  <td>{p.gtin}</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
        <section>
          <h2>Ürün hakkında</h2>
          <p>{p.description}</p>
          <h3>Paket içeriği</h3>
          <p>{p.packageContents}</p>
          <h3>Teslimat</h3>
          <p>
            {deliveryLabels[p.deliveryType]}. Fiyatın nakliyeyi kapsadığı
            varsayılmamalıdır. Hazırlık süresi ve teslimat koşulları doğrulanmış
            teklif ile belirlenir.
          </p>
        </section>
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        onCancel={close}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight")
            setPhoto((photo + 1) % current.images.length);
          if (e.key === "ArrowLeft")
            setPhoto(
              (photo + current.images.length - 1) % current.images.length,
            );
        }}
      >
        <button
          className="icon-button close-lightbox"
          onClick={close}
          aria-label="Görseli kapat"
        >
          <Icon name="close" />
        </button>
        <ProductImage
          tile={current.image}
          alt={p.imageAlt}
          src={current.images[photo]}
        />
        {current.images.length > 1 && (
          <div className="actions">
            <button
              className="button secondary"
              onClick={() =>
                setPhoto(
                  (photo + current.images.length - 1) % current.images.length,
                )
              }
            >
              Önceki görsel
            </button>
            <button
              className="button secondary"
              onClick={() => setPhoto((photo + 1) % current.images.length)}
            >
              Sonraki görsel
            </button>
          </div>
        )}
        <p>
          {p.name}
          {p.isDemo ? " — temsili görsel" : ""}
        </p>
      </dialog>
    </>
  );
}
