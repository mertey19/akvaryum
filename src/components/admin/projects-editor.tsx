"use client";
import { useState } from "react";
import { slugify, type Project } from "@/lib/content/schema";
import { saveProjects } from "@/app/yonetim/actions";
import {
  applyItemAction,
  ItemControls,
  SaveForm,
  TextArea,
  TextInput,
} from "./form-kit";
import { ImageField } from "./image-field";

export function ProjectsEditor({ projects }: { projects: Project[] }) {
  const [rows, setRows] = useState(projects);
  function updateRow(index: number, change: Partial<Project>) {
    setRows((list) =>
      list.map((row, i) => (i === index ? { ...row, ...change } : row)),
    );
  }
  const payload = rows.map((row) => ({
    ...row,
    id: row.id || slugify(row.name),
  }));
  return (
    <SaveForm action={saveProjects} payload={payload} submitLabel="Galeriyi kaydet">
      {rows.map((row, index) => (
        <section className="admin-card" key={index}>
          <div className="admin-grid">
            <TextInput
              label="Başlık"
              value={row.name}
              onChange={(name) => updateRow(index, { name })}
            />
            <TextInput
              label="Tür"
              hint="Galeride filtre olarak görünür."
              value={row.type}
              onChange={(type) => updateRow(index, { type })}
            />
          </div>
          <ImageField
            label="Görsel"
            value={row.image}
            onChange={(image) => updateRow(index, { image })}
          />
          <TextInput
            label="Görsel açıklaması (alt metin)"
            value={row.imageAlt}
            onChange={(imageAlt) => updateRow(index, { imageAlt })}
          />
          <TextArea
            label="Açıklama"
            value={row.description}
            onChange={(description) => updateRow(index, { description })}
          />
          <ItemControls
            index={index}
            count={rows.length}
            label={row.name || "Galeri görseli"}
            onAction={(action) =>
              setRows((list) => applyItemAction(list, index, action))
            }
          />
        </section>
      ))}
      <button
        type="button"
        className="admin-add"
        onClick={() =>
          setRows((list) => [
            ...list,
            { id: "", name: "", type: "", image: "", imageAlt: "", description: "" },
          ])
        }
      >
        + Galeri görseli ekle
      </button>
    </SaveForm>
  );
}
