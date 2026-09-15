import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideEditor } from "@/components/admin/guide-editor";
import { requireAdmin } from "@/lib/admin/session";
import type { Guide } from "@/lib/content/schema";
import { readSiteContent } from "@/lib/content/store";

export default async function EditGuide({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireAdmin();
  const { slug } = await params;
  const { guides, categories } = await readSiteContent();
  const isNew = slug === "yeni";
  const existing = guides.find((g) => g.slug === slug);
  if (!isNew && !existing) notFound();
  const guide: Guide = existing ?? {
    slug: "",
    tag: "",
    title: "",
    intro: "",
    category: "",
    sections: [["", ""]],
  };
  return (
    <>
      <div className="admin-toolbar">
        <h1>{isNew ? "Yeni rehber yazısı" : guide.title}</h1>
        <Link className="text-link" href="/yonetim/rehber">
          ← Yazı listesi
        </Link>
      </div>
      <GuideEditor
        key={guide.slug || "yeni"}
        guide={guide}
        categories={categories}
        isNew={isNew}
      />
    </>
  );
}
