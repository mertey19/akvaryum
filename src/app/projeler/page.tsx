import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { Projects } from "@/components/projects";
export const metadata = {
  title: "Konsept galerisi",
  robots: { index: false, follow: false },
};
export default function Page() {
  if (!siteConfig.demo) notFound();
  return (
    <div className="container section">
      <div className="page-heading">
        <span className="eyebrow">İLHAM ALANI</span>
        <h1>Bir dünyayı hayal etmek.</h1>
        <p>
          Bu önizlemede yalnızca üretilmiş konsept görselleri bulunur. İzinli
          müşteri projeleri henüz eklenmedi.
        </p>
      </div>
      <Projects />
    </div>
  );
}
