"use client";
import { useState } from "react";
import type { Category } from "@/lib/catalog";
import { slugify, type Guide } from "@/lib/content/schema";
import { deleteGuide, saveGuide } from "@/app/yonetim/actions";
import {
  applyItemAction,
  ConfirmForm,
  ItemControls,
  SaveForm,
  Select,
  TextArea,
  TextInput,
} from "./form-kit";

export function GuideEditor({
  guide,
  categories,
  isNew,
}: {
  guide: Guide;
  categories: Category[];
  isNew: boolean;
}) {
  const [draft, setDraft] = useState(guide);
  const [slugTouched, setSlugTouched] = useState(!isNew);

  function updateSection(index: number, part: 0 | 1, value: string) {
    setDraft((current) => ({
      ...current,
      sections: current.sections.map((section, i) => {
        if (i !== index) return section;
        const next: [string, string] = [section[0], section[1]];
        next[part] = value;
        return next;
      }),
    }));
  }

  return (
    <>
      <SaveForm
        action={saveGuide}
        payload={draft}
        hidden={{ originalSlug: isNew ? "" : guide.slug }}
        submitLabel={isNew ? "Yazıyı oluştur" : "Değişiklikleri kaydet"}
      >
        <section className="admin-card">
          <h2>Yazı</h2>
          <div className="admin-grid">
            <TextInput
              label="Başlık"
              required
              value={draft.title}
              onChange={(title) =>
                setDraft((current) => ({
                  ...current,
                  title,
                  slug: slugTouched ? current.slug : slugify(title),
                }))
              }
            />
            <TextInput
              label="Sayfa adresi"
              required
              value={draft.slug}
              hint={`/rehber/${draft.slug || "…"}`}
              onChange={(slug) => {
                setSlugTouched(true);
                setDraft((current) => ({
                  ...current,
                  slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                }));
              }}
            />
            <TextInput
              label="Etiket"
              value={draft.tag}
              hint="Ör. İLK KURULUM"
              onChange={(tag) => setDraft((current) => ({ ...current, tag }))}
            />
            <Select
              label="İlgili kategori"
              value={draft.category}
              options={[
                ["", "Kategori yok"],
                ...categories.map((c) => [c.id, c.name] as const),
              ]}
              onChange={(category) =>
                setDraft((current) => ({ ...current, category }))
              }
            />
          </div>
          <TextArea
            label="Giriş"
            value={draft.intro}
            onChange={(intro) => setDraft((current) => ({ ...current, intro }))}
          />
        </section>
        <section className="admin-card">
          <h2>Bölümler</h2>
          {draft.sections.map(([title, body], index) => (
            <div className="admin-list-item" key={index}>
              <TextInput
                label="Bölüm başlığı"
                value={title}
                onChange={(value) => updateSection(index, 0, value)}
              />
              <TextArea
                label="Bölüm metni"
                rows={5}
                value={body}
                onChange={(value) => updateSection(index, 1, value)}
              />
              <ItemControls
                index={index}
                count={draft.sections.length}
                label={title || `Bölüm ${index + 1}`}
                onAction={(action) =>
                  setDraft((current) => ({
                    ...current,
                    sections: applyItemAction(current.sections, index, action),
                  }))
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="admin-add"
            onClick={() =>
              setDraft((current) => ({
                ...current,
                sections: [...current.sections, ["", ""]],
              }))
            }
          >
            + Bölüm ekle
          </button>
        </section>
      </SaveForm>
      {!isNew && (
        <section className="admin-card">
          <h2>Yazıyı sil</h2>
          <ConfirmForm
            action={deleteGuide}
            fields={{ slug: guide.slug }}
            message={`"${guide.title}" silinsin mi? Bu işlem geri alınamaz.`}
            label="Yazıyı sil"
          />
        </section>
      )}
    </>
  );
}
