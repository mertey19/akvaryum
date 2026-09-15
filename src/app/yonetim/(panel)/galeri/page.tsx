import { ProjectsEditor } from "@/components/admin/projects-editor";
import { requireAdmin } from "@/lib/admin/session";
import { readSiteContent } from "@/lib/content/store";

export default async function AdminGallery() {
  await requireAdmin();
  const { projects } = await readSiteContent();
  return (
    <>
      <h1>Galeri</h1>
      <p className="admin-hint">
        Konsept galerisi sitede demo modu açıkken /projeler sayfasında görünür.
      </p>
      <ProjectsEditor projects={projects} />
    </>
  );
}
