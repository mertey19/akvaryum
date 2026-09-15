import { logout } from "@/app/yonetim/actions";
import { AdminNavLinks } from "@/components/admin/admin-nav";
import { requireAdmin } from "@/lib/admin/session";

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
        <AdminNavLinks />
        <a href="/" target="_blank" rel="noopener noreferrer">
          {/* U+FE0E keeps iOS from drawing the arrow as an emoji. */}
          {"Siteyi aç ↗︎"}
        </a>
        <form action={logout}>
          <button className="admin-link">Çıkış yap</button>
        </form>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
