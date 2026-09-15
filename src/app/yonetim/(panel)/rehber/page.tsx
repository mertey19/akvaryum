import Link from "next/link";
import { requireAdmin } from "@/lib/admin/session";
import { readSiteContent } from "@/lib/content/store";

export default async function AdminGuides() {
  await requireAdmin();
  const { guides } = await readSiteContent();
  return (
    <>
      <div className="admin-toolbar">
        <h1>Rehber yazıları</h1>
        <Link className="button" href="/yonetim/rehber/yeni">
          + Yeni yazı
        </Link>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">Başlık</th>
              <th scope="col">Etiket</th>
              <th scope="col">Bölüm</th>
              <th scope="col">
                <span className="sr-only">İşlem</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {guides.map((g) => (
              <tr key={g.slug}>
                <td>
                  <strong>{g.title}</strong>
                  <br />
                  <small>/rehber/{g.slug}</small>
                </td>
                <td data-label="Etiket">{g.tag}</td>
                <td data-label="Bölüm">{g.sections.length}</td>
                <td>
                  <Link
                    className="text-link"
                    href={`/yonetim/rehber/${g.slug}`}
                    aria-label={`${g.title} düzenle`}
                  >
                    Düzenle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
