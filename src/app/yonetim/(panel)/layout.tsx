import Link from "next/link";
import { logout } from "@/app/yonetim/actions";
import { requireAdmin } from "@/lib/admin/session";

const links = [
  ["/yonetim", "Genel bakış"],
  ["/yonetim/urunler", "Ürünler"],
  ["/yonetim/kategoriler", "Kategoriler ve menü"],
  ["/yonetim/ayarlar", "İşletme ve metinler"],
  ["/yonetim/rehber", "Rehber yazıları"],
  ["/yonetim/galeri", "Galeri"],
] as const;

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Navigation convenience only; every page and action checks the session itself.
  await requireAdmin();
  return (
    <div className="admin-shell">
      <aside className="admin-nav">
        <strong>DSN Yönetim</strong>
        <nav aria-label="Yönetim menüsü">
          {links.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <a href="/" target="_blank" rel="noopener noreferrer">
          Siteyi aç ↗
        </a>
        <form action={logout}>
          <button className="admin-link">Çıkış yap</button>
        </form>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
