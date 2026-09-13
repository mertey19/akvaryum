import { notFound } from "next/navigation";
import Link from "next/link";
import { categories } from "@/lib/catalog";
import { getProduct, getProducts } from "@/lib/repository";
export const dynamicParams = false;
export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}
import { ProductDetail } from "@/components/product-detail";
import { meta } from "@/lib/seo";
import { BreadcrumbData, StructuredData } from "@/components/structured-data";
import { siteConfig } from "@/lib/config";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  return meta(
    p?.name || "Ürün bulunamadı",
    p?.description || "Bu ürün mevcut değil.",
    `/urun/${slug}`,
  );
}
export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ varyant?: string }>;
}) {
  const { slug } = await params;
  const { varyant } = await searchParams;
  const p = getProduct(slug);
  if (!p) notFound();
  const category = categories.find((c) => c.id === p.categoryId);
  return (
    <div
      className={`container product-page${p.categoryId === "akvaryumlar" ? " aquarium-product-page" : ""}`}
    >
      <BreadcrumbData
        items={[
          { name: "Ana sayfa", path: "/" },
          {
            name: category?.name || "Ürünler",
            path: `/urunler?kategori=${p.categoryId}`,
          },
          { name: p.name, path: `/urun/${p.slug}` },
        ]}
      />
      {!p.isDemo && (
        <StructuredData
          data={{
            "@type": "Product",
            name: p.name,
            description: p.description,
            sku: p.sku,
            image: p.images.map((image) => `${siteConfig.url}${image}`),
            ...(p.specifications.Cam ? { material: p.specifications.Cam } : {}),
            ...(p.gtin ? { gtin: p.gtin } : {}),
          }}
        />
      )}
      <nav className="breadcrumb" aria-label="İçerik yolu">
        <Link href="/">Ana sayfa</Link>
        <span>/</span>
        <Link href={`/urunler?kategori=${p.categoryId}`}>{category?.name}</Link>
        <span>/</span>
        <span>{p.name}</span>
      </nav>
      <ProductDetail
        key={varyant || p.id}
        product={p}
        initialVariant={varyant}
        whatsapp={siteConfig.whatsapp}
      />
      <div className="related-category">
        <h2>
          {p.categoryId === "akvaryumlar"
            ? "Diğer ölçüleri de inceleyin."
            : "Seçenekleri birlikte değerlendirin."}
        </h2>
        <p>
          {p.categoryId === "akvaryumlar"
            ? "14 ölçüyü 90° ve 45° fiyat seçenekleriyle karşılaştırın."
            : "Aynı kategorideki diğer ürünleri teknik bilgilerle karşılaştırın."}
        </p>
        <Link className="text-link" href={`/urunler?kategori=${p.categoryId}`}>
          {category?.name} kategorisini inceleyin →
        </Link>
      </div>
    </div>
  );
}
