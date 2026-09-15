import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductEditor } from "@/components/admin/product-editor";
import type { Product } from "@/lib/catalog";
import { requireAdmin } from "@/lib/admin/session";
import { readSiteContent } from "@/lib/content/store";

export default async function EditProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const { products, categories, settings } = await readSiteContent();
  const isNew = id === "yeni";
  const existing = products.find((p) => p.id === id);
  if (!isNew && !existing) notFound();
  const firstCategory = categories[0];
  const product: Product = existing ?? {
    id: "",
    slug: "",
    name: "",
    categoryId: firstCategory?.id ?? "",
    brand: settings.fullName,
    sku: "",
    gtin: null,
    description: "",
    images: ["/images/products.webp"],
    imageAlt: "",
    image: firstCategory?.image ?? 0,
    specifications: {},
    variants: [],
    price: null,
    currency: "TRY",
    stockStatus: "bilgi",
    stockQuantity: null,
    leadTime: null,
    priceListDate: null,
    deliveryType: "bilgi",
    saleMode: "quote",
    published: true,
    isDemo: false,
    addedAt: 0,
    packageContents: "",
  };
  return (
    <>
      <div className="admin-toolbar">
        <h1>{isNew ? "Yeni ürün" : product.name}</h1>
        <Link className="text-link" href="/yonetim/urunler">
          ← Ürün listesi
        </Link>
      </div>
      <ProductEditor
        key={product.id || "yeni"}
        product={product}
        categories={categories}
        isNew={isNew}
        defaults={{
          aquariumGlass: settings.aquariumGlass,
          priceIncludes: settings.aquariumPriceIncludes,
          priceListDate:
            products.find(
              (p) => p.categoryId === "akvaryumlar" && p.priceListDate,
            )?.priceListDate ?? "",
        }}
      />
    </>
  );
}
