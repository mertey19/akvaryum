import Link from "next/link";
import { requireAdmin } from "@/lib/admin/session";
import {
  blobConfigured,
  readSiteContent,
  storeKind,
} from "@/lib/content/store";

export default async function AdminHome() {
  await requireAdmin();
  const { products, categories, guides, projects } = await readSiteContent();
  const kind = storeKind();
  const stats = [
    [
      "/yonetim/urunler",
      "Ürün",
      products.length,
      `${products.filter((p) => p.published).length} yayında`,
    ],
    ["/yonetim/kategoriler", "Kategori", categories.length, "Menü ile birlikte"],
    ["/yonetim/rehber", "Rehber yazısı", guides.length, "Sitede listelenir"],
    ["/yonetim/galeri", "Galeri görseli", projects.length, "Konsept galerisi"],
  ] as const;
  return (
    <>
      <h1>Genel bakış</h1>
      {kind === "seed" && (
        <p className="admin-banner admin-error">
          Veritabanı bağlı değil; değişiklikler kaydedilemez. Vercel&apos;de
          Storage bölümünden Neon veritabanını projeye bağlayıp yeniden
          yayınlayın.
        </p>
      )}
      {kind === "file" && (
        <p className="admin-banner">
          Yerel mod: içerik .data/content.json dosyasına, görseller
          .data/uploads klasörüne kaydediliyor.
        </p>
      )}
      {kind === "database" && !blobConfigured() && (
        <p className="admin-banner admin-error">
          Görsel deposu bağlı değil; görsel yüklenemez. Vercel&apos;de Storage
          bölümünden Blob deposunu projeye bağlayın.
        </p>
      )}
      <div className="admin-stats">
        {stats.map(([href, label, count, note]) => (
          <Link key={href} href={href} className="admin-card">
            <span>{label}</span>
            <strong>{count}</strong>
            <small>{note}</small>
          </Link>
        ))}
      </div>
      <section className="admin-card">
        <h2>Hızlı işlemler</h2>
        <div className="admin-row">
          <Link className="button" href="/yonetim/urunler/yeni">
            + Yeni ürün
          </Link>
          <Link className="button secondary" href="/yonetim/ayarlar">
            Telefon ve metinleri düzenle
          </Link>
          <Link className="button secondary" href="/yonetim/rehber/yeni">
            + Rehber yazısı
          </Link>
        </div>
      </section>
    </>
  );
}
