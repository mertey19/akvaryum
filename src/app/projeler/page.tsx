import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { Projects } from "@/components/projects";
export const metadata = {
  title: "Konsept galerisi",
  robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
};
export default function Page() {
  if (!siteConfig.demo) notFound();
  return (
    <div className="container section">
      <div className="page-heading">
        <span className="eyebrow">İLHAM ALANI</span>
        <h1>Bir dünyayı hayal etmek.</h1>
        <p>
          Bitkili akvaryum düzenleri için renk, doku ve kompozisyon fikirlerini
          keşfedin.
        </p>
      </div>
      <Projects />
    </div>
  );
}
