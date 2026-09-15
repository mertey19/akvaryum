import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuides } from "@/lib/repository";
import { meta } from "@/lib/seo";
import { BreadcrumbData, StructuredData } from "@/components/structured-data";
export async function generateStaticParams() {
  return (await getGuides()).map((g) => ({ slug: g.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = (await getGuides()).find((g) => g.slug === slug);
  return meta(g?.title || "Yazı bulunamadı", g?.intro || "", `/rehber/${slug}`);
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = (await getGuides()).find((g) => g.slug === slug);
  if (!g) notFound();
  return (
    <article className="container section prose">
      <BreadcrumbData
        items={[
          { name: "Ana sayfa", path: "/" },
          { name: "Rehber", path: "/rehber" },
          { name: g.title, path: `/rehber/${g.slug}` },
        ]}
      />
      <StructuredData
        data={{
          "@type": "Article",
          headline: g.title,
          description: g.intro,
          inLanguage: "tr-TR",
        }}
      />
      <Link className="text-link" href="/rehber">
        ← Tüm rehber yazıları
      </Link>
      <span className="eyebrow">{g.tag}</span>
      <h1>{g.title}</h1>
      <p className="lead">{g.intro}</p>
      <nav className="article-toc" aria-label="Yazı içindekiler">
        {g.sections.map(([title], i) => (
          <a href={`#bolum-${i}`} key={i}>
            {title}
          </a>
        ))}
      </nav>
      {g.sections.map(([title, body], i) => (
        <section id={`bolum-${i}`} key={i}>
          <h2>{title}</h2>
          <p>{body}</p>
        </section>
      ))}
      <div className="notice">
        {g.category && (
          <>
            <Link href={`/urunler?kategori=${g.category}`}>
              İlgili kategoriye göz atın →
            </Link>
            <br />
          </>
        )}
        <Link href="/teklif">Ölçü ve talep hazırlama aracını açın →</Link>
      </div>
    </article>
  );
}
