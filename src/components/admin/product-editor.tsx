"use client";
import Link from "next/link";
import { useState } from "react";
import {
  deliveryLabels,
  deliveryTypes,
  stockLabels,
  stockStatuses,
  type Category,
  type Product,
} from "@/lib/catalog";
import { slugify } from "@/lib/content/schema";
import { deleteProduct, saveProduct } from "@/app/yonetim/actions";
import {
  applyItemAction,
  Checkbox,
  ConfirmForm,
  ItemControls,
  SaveForm,
  Select,
  TextArea,
  TextInput,
} from "./form-kit";
import { ImageField } from "./image-field";

type SpecRow = { key: string; value: string };
type VariantRow = {
  id: string;
  name: string;
  sku: string;
  price: string;
  stockStatus: Product["stockStatus"];
};
export type ProductDefaults = {
  aquariumGlass: string;
  priceIncludes: string;
  priceListDate: string;
};

const PLACEHOLDER_IMAGE = "/images/products.webp";
const toLira = (kurus: number | null) =>
  kurus === null ? "" : String(kurus / 100);
const toKurus = (lira: string) =>
  lira.trim() === "" ? null : Math.round(Number(lira) * 100);
const stockOptions = stockStatuses.map((s) => [s, stockLabels[s]] as const);
const deliveryOptions = deliveryTypes.map(
  (d) => [d, deliveryLabels[d]] as const,
);
const slugInput = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9-]/g, "-");

export function ProductEditor({
  product,
  categories,
  isNew,
  defaults,
}: {
  product: Product;
  categories: Category[];
  isNew: boolean;
  defaults: ProductDefaults;
}) {
  const [draft, setDraft] = useState(product);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [specs, setSpecs] = useState<SpecRow[]>(() =>
    Object.entries(product.specifications).map(([key, value]) => ({
      key,
      value,
    })),
  );
  const [variants, setVariants] = useState<VariantRow[]>(() =>
    product.variants.map((v) => ({
      id: v.id,
      name: v.name,
      sku: v.sku,
      price: toLira(v.price),
      stockStatus: v.stockStatus,
    })),
  );
  const [price, setPrice] = useState(toLira(product.price));
  const [stockQuantity, setStockQuantity] = useState(
    product.stockQuantity === null ? "" : String(product.stockQuantity),
  );
  const [dims, setDims] = useState({ width: "", depth: "", height: "" });

  function update<K extends keyof Product>(key: K, value: Product[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }
  function updateVariant(index: number, change: Partial<VariantRow>) {
    setVariants((rows) =>
      rows.map((row, i) => (i === index ? { ...row, ...change } : row)),
    );
  }
  function updateSpec(index: number, change: Partial<SpecRow>) {
    setSpecs((rows) =>
      rows.map((row, i) => (i === index ? { ...row, ...change } : row)),
    );
  }

  const specifications = Object.fromEntries(
    specs
      .filter((row) => row.key.trim())
      .map((row) => [row.key.trim(), row.value.trim()]),
  );
  const builtVariants = variants
    .filter((row) => row.name.trim())
    .map((row) => {
      const id = row.id.trim() || slugify(row.name) || "secenek";
      return {
        id,
        name: row.name.trim(),
        sku: row.sku.trim() || `${draft.sku}-${id.toUpperCase()}`,
        price: toKurus(row.price),
        stockStatus: row.stockStatus,
        image: 0,
        specifications: { ...specifications, "Fiyat seçeneği": row.name.trim() },
      };
    });
  const images = draft.images.filter(Boolean);
  const payload: Product = {
    ...draft,
    id: isNew ? draft.slug : draft.id,
    specifications,
    variants: builtVariants,
    price: builtVariants.length ? builtVariants[0].price : toKurus(price),
    stockQuantity: stockQuantity.trim() === "" ? null : Number(stockQuantity),
    leadTime: draft.leadTime?.trim() || null,
    priceListDate: draft.priceListDate?.trim() || null,
    images: images.length ? images : [PLACEHOLDER_IMAGE],
  };

  function changeCategory(categoryId: string) {
    const category = categories.find((c) => c.id === categoryId);
    setDraft((current) => ({
      ...current,
      categoryId,
      image: category?.image ?? current.image,
    }));
  }

  function fillFromDimensions() {
    const [width, depth, height] = [dims.width, dims.depth, dims.height].map(
      Number,
    );
    if (![width, depth, height].every((n) => Number.isFinite(n) && n > 0))
      return;
    const label = `${width} × ${depth} × ${height}`;
    const sku = `AKV-${width}X${depth}X${height}`;
    const volume = `${String((width * depth * height) / 1000).replace(".", ",")} L`;
    setDraft((current) => ({
      ...current,
      name: `DSN ${label} Cam Akvaryum`,
      slug: isNew ? `akvaryum-${width}x${depth}x${height}` : current.slug,
      sku,
      description:
        current.description ||
        `${label} cm ölçüsündeki DSN akvaryum. ${defaults.priceIncludes}`,
      imageAlt: current.imageAlt || "Boş cam akvaryum kategori görseli",
      priceListDate: current.priceListDate || defaults.priceListDate,
      packageContents:
        current.packageContents ||
        `${defaults.priceIncludes} Diğer paket içeriği WhatsApp görüşmesinde netleştirilir.`,
    }));
    if (isNew) setSlugTouched(true);
    const filled: Record<string, string> = {
      Cam: defaults.aquariumGlass,
      Ölçü: `${label} cm`,
      "Brüt hacim": volume,
      "Fiyat seçenekleri": "90° / 45°",
    };
    setSpecs((rows) => [
      ...Object.entries(filled).map(([key, value]) => ({ key, value })),
      ...rows.filter((row) => !(row.key in filled)),
    ]);
    setVariants((rows) =>
      rows.length
        ? rows.map((row) => ({ ...row, sku: `${sku}-${row.id}` }))
        : [
            { id: "90", name: "90°", sku: `${sku}-90`, price: "", stockStatus: "bilgi" },
            { id: "45", name: "45°", sku: `${sku}-45`, price: "", stockStatus: "bilgi" },
          ],
    );
  }

  const isAquarium = draft.categoryId === "akvaryumlar";
  return (
    <>
      <SaveForm
        action={saveProduct}
        payload={payload}
        hidden={{ originalId: isNew ? "" : product.id }}
        submitLabel={isNew ? "Ürünü oluştur" : "Değişiklikleri kaydet"}
      >
        <section className="admin-card">
          <h2>Temel bilgiler</h2>
          <div className="admin-grid">
            <TextInput
              label="Ürün adı"
              required
              value={draft.name}
              onChange={(name) =>
                setDraft((current) => ({
                  ...current,
                  name,
                  slug: slugTouched ? current.slug : slugify(name),
                }))
              }
            />
            <TextInput
              label="Sayfa adresi"
              required
              value={draft.slug}
              hint={`/urun/${draft.slug || "…"}`}
              onChange={(slug) => {
                setSlugTouched(true);
                update("slug", slugInput(slug));
              }}
            />
            <Select
              label="Kategori"
              value={draft.categoryId}
              onChange={changeCategory}
              options={categories.map((c) => [c.id, c.name] as const)}
            />
            <TextInput
              label="Ürün kodu (SKU)"
              required
              value={draft.sku}
              onChange={(sku) => update("sku", sku)}
            />
          </div>
          <TextArea
            label="Açıklama"
            rows={5}
            value={draft.description}
            onChange={(description) => update("description", description)}
          />
          <div className="admin-checks">
            <Checkbox
              label="Sitede yayında"
              checked={draft.published}
              onChange={(published) => update("published", published)}
            />
            <Checkbox
              label="Demo kayıt (demo modu kapatılınca gizlenir)"
              checked={draft.isDemo}
              onChange={(isDemo) => update("isDemo", isDemo)}
            />
          </div>
          {!isNew && (
            <Link
              className="text-link"
              href={`/urun/${product.slug}`}
              target="_blank"
            >
              Ürün sayfasını aç ↗
            </Link>
          )}
        </section>

        {isAquarium && (
          <section className="admin-card">
            <h2>Ölçüden doldur</h2>
            <p className="admin-hint">
              Genişlik, derinlik ve yüksekliği girin; ad, adres, kod, ölçü,
              brüt hacim ve 90°/45° seçenekleri doldurulur. Fiyatları aşağıya
              girin.
            </p>
            <div className="admin-inline">
              {(["width", "depth", "height"] as const).map((key, i) => (
                <TextInput
                  key={key}
                  label={`${["Genişlik", "Derinlik", "Yükseklik"][i]} (cm)`}
                  type="number"
                  min="1"
                  value={dims[key]}
                  onChange={(value) =>
                    setDims((current) => ({ ...current, [key]: value }))
                  }
                />
              ))}
              <button
                type="button"
                className="button secondary"
                onClick={fillFromDimensions}
              >
                Bilgileri doldur
              </button>
            </div>
          </section>
        )}

        <section className="admin-card">
          <h2>Fiyat ve seçenekler</h2>
          <p className="admin-hint">
            {isAquarium
              ? "Akvaryumlarda seçenek kodlarını 90 ve 45 olarak bırakın; fiyat kartları bu kodlarla ve fiyat listesi tarihi doluyken gösterilir."
              : "Seçenek eklerseniz ürün fiyatı ilk seçeneğin fiyatı olur."}
          </p>
          {variants.map((row, index) => (
            <div className="admin-list-item" key={index}>
              <div className="admin-inline">
                <TextInput
                  label="Kod"
                  value={row.id}
                  onChange={(id) => updateVariant(index, { id })}
                />
                <TextInput
                  label="Seçenek adı"
                  value={row.name}
                  onChange={(name) => updateVariant(index, { name })}
                />
                <TextInput
                  label="Seçenek kodu (SKU)"
                  value={row.sku}
                  onChange={(sku) => updateVariant(index, { sku })}
                />
                <TextInput
                  label="Fiyat (TL)"
                  type="number"
                  min="0"
                  step="0.01"
                  value={row.price}
                  onChange={(value) => updateVariant(index, { price: value })}
                />
                <Select
                  label="Stok"
                  value={row.stockStatus}
                  options={stockOptions}
                  onChange={(value) =>
                    updateVariant(index, {
                      stockStatus: value as Product["stockStatus"],
                    })
                  }
                />
              </div>
              <ItemControls
                index={index}
                count={variants.length}
                label={`${row.name || "Seçenek"}`}
                onAction={(action) =>
                  setVariants((rows) => applyItemAction(rows, index, action))
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="admin-add"
            onClick={() =>
              setVariants((rows) => [
                ...rows,
                { id: "", name: "", sku: "", price: "", stockStatus: "bilgi" },
              ])
            }
          >
            + Seçenek ekle
          </button>
          <div className="admin-grid">
            {variants.length === 0 && (
              <TextInput
                label="Fiyat (TL)"
                type="number"
                min="0"
                step="0.01"
                value={price}
                hint="Boş bırakılırsa “Fiyat için bilgi alın” yazar."
                onChange={setPrice}
              />
            )}
            <Select
              label="Stok durumu"
              value={draft.stockStatus}
              options={stockOptions}
              onChange={(value) =>
                update("stockStatus", value as Product["stockStatus"])
              }
            />
            <TextInput
              label="Stok adedi"
              type="number"
              min="0"
              value={stockQuantity}
              hint="Bilinmiyorsa boş bırakın."
              onChange={setStockQuantity}
            />
            <TextInput
              label="Hazırlık süresi"
              value={draft.leadTime ?? ""}
              onChange={(value) => update("leadTime", value)}
            />
            <TextInput
              label="Fiyat listesi tarihi"
              value={draft.priceListDate ?? ""}
              placeholder={defaults.priceListDate}
              onChange={(value) => update("priceListDate", value)}
            />
            <Select
              label="Teslimat"
              value={draft.deliveryType}
              options={deliveryOptions}
              onChange={(value) =>
                update("deliveryType", value as Product["deliveryType"])
              }
            />
          </div>
        </section>

        <section className="admin-card">
          <h2>Görseller</h2>
          <p className="admin-hint">
            İlk görsel kartlarda gösterilir. Görsel yoksa kategori görseli
            kullanılır.
          </p>
          {draft.images.map((image, index) => (
            <div className="admin-list-item" key={index}>
              <ImageField
                label={`Görsel ${index + 1}`}
                value={image === PLACEHOLDER_IMAGE ? "" : image}
                onChange={(url) =>
                  setDraft((current) => ({
                    ...current,
                    images: current.images.map((value, i) =>
                      i === index ? url : value,
                    ),
                  }))
                }
              />
              <ItemControls
                index={index}
                count={draft.images.length}
                label={`Görsel ${index + 1}`}
                onAction={(action) =>
                  setDraft((current) => ({
                    ...current,
                    images: applyItemAction(current.images, index, action),
                  }))
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="admin-add"
            onClick={() =>
              setDraft((current) => ({
                ...current,
                images: [
                  ...current.images.filter((i) => i !== PLACEHOLDER_IMAGE),
                  "",
                ],
              }))
            }
          >
            + Görsel ekle
          </button>
          <TextInput
            label="Görsel açıklaması (alt metin)"
            value={draft.imageAlt}
            onChange={(imageAlt) => update("imageAlt", imageAlt)}
          />
        </section>

        <section className="admin-card">
          <h2>Teknik özellikler</h2>
          {specs.map((row, index) => (
            <div className="admin-list-item" key={index}>
              <div className="admin-inline">
                <TextInput
                  label="Özellik"
                  value={row.key}
                  onChange={(key) => updateSpec(index, { key })}
                />
                <TextInput
                  label="Değer"
                  value={row.value}
                  onChange={(value) => updateSpec(index, { value })}
                />
              </div>
              <ItemControls
                index={index}
                count={specs.length}
                label={row.key || "Özellik"}
                onAction={(action) =>
                  setSpecs((rows) => applyItemAction(rows, index, action))
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="admin-add"
            onClick={() => setSpecs((rows) => [...rows, { key: "", value: "" }])}
          >
            + Özellik ekle
          </button>
        </section>

        <section className="admin-card">
          <h2>Paket içeriği</h2>
          <TextArea
            label="Paket içeriği"
            value={draft.packageContents}
            onChange={(value) => update("packageContents", value)}
          />
        </section>
      </SaveForm>
      {!isNew && (
        <section className="admin-card">
          <h2>Ürünü sil</h2>
          <ConfirmForm
            action={deleteProduct}
            fields={{ id: product.id }}
            message={`"${product.name}" silinsin mi? Bu işlem geri alınamaz.`}
            label="Ürünü sil"
          />
        </section>
      )}
    </>
  );
}
