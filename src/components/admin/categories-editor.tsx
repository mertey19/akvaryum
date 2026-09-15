"use client";
import { useState } from "react";
import { categoryFamilies, type Category } from "@/lib/catalog";
import type { MenuGroup, MenuLink } from "@/lib/content/schema";
import { saveCategories } from "@/app/yonetim/actions";
import {
  applyItemAction,
  ItemControls,
  SaveForm,
  Select,
  TextInput,
} from "./form-kit";
import { ImageField } from "./image-field";

const familyOptions = categoryFamilies.map(
  (family) =>
    [
      family,
      { akvaryum: "Akvaryum", habitat: "Yaşam alanı", ekipman: "Ekipman", bakim: "Bakım" }[
        family
      ],
    ] as const,
);
const tileOptions = [
  "Akvaryum",
  "Filtre",
  "Aydınlatma",
  "Mobilya",
  "Isıtma",
  "Bakım ve dekor",
].map((label, i) => [String(i), label] as const);
const linkOptions = [
  ["", "Tümü"],
  ["45", "45°"],
  ["90", "90°"],
] as const;

type Row = Category & { fresh?: boolean };

export function CategoriesEditor({
  categories,
  menu,
  usage,
}: {
  categories: Category[];
  menu: MenuGroup[];
  usage: Record<string, number>;
}) {
  const [rows, setRows] = useState<Row[]>(categories);
  const [groups, setGroups] = useState(menu);

  function updateRow(index: number, change: Partial<Row>) {
    setRows((list) =>
      list.map((row, i) => (i === index ? { ...row, ...change } : row)),
    );
  }
  function updateGroup(index: number, change: Partial<MenuGroup>) {
    setGroups((list) =>
      list.map((group, i) => (i === index ? { ...group, ...change } : group)),
    );
  }
  function updateLink(group: number, index: number, change: Partial<MenuLink>) {
    setGroups((list) =>
      list.map((g, i) =>
        i === group
          ? {
              ...g,
              links: g.links.map((link, j) =>
                j === index ? { ...link, ...change } : link,
              ),
            }
          : g,
      ),
    );
  }

  const payload = {
    categories: rows.map((row) => {
      const category: Category = {
        id: row.id,
        name: row.name,
        subtitle: row.subtitle,
        image: row.image,
        family: row.family,
      };
      if (row.imageSrc) category.imageSrc = row.imageSrc;
      return category;
    }),
    menu: groups,
  };
  const categoryOptions = rows
    .filter((row) => row.id)
    .map((row) => [row.id, row.name || row.id] as const);

  return (
    <SaveForm
      action={saveCategories}
      payload={payload}
      submitLabel="Kategorileri ve menüyü kaydet"
    >
      <section className="admin-card">
        <h2>Kategoriler</h2>
        <p className="admin-hint">
          Kategori kodu sayfa adreslerinde kullanılır ve kaydedildikten sonra
          değiştirilemez. Ürünü olan kategori silinemez.
        </p>
        {rows.map((row, index) => (
          <div className="admin-list-item" key={index}>
            <div className="admin-inline">
              <TextInput
                label="Kod"
                value={row.id}
                readOnly={!row.fresh}
                hint={`${usage[row.id] ?? 0} ürün`}
                onChange={(id) =>
                  updateRow(index, {
                    id: id.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                  })
                }
              />
              <TextInput
                label="Ad"
                value={row.name}
                onChange={(name) => updateRow(index, { name })}
              />
              <TextInput
                label="Alt yazı"
                value={row.subtitle}
                onChange={(subtitle) => updateRow(index, { subtitle })}
              />
              <Select
                label="Grup"
                value={row.family}
                options={familyOptions}
                onChange={(family) =>
                  updateRow(index, { family: family as Category["family"] })
                }
              />
              <Select
                label="Hazır görsel"
                value={String(row.image)}
                options={tileOptions}
                onChange={(image) => updateRow(index, { image: Number(image) })}
              />
            </div>
            <ImageField
              label="Özel kategori görseli (isteğe bağlı)"
              value={row.imageSrc ?? ""}
              onChange={(imageSrc) => updateRow(index, { imageSrc })}
            />
            <ItemControls
              index={index}
              count={rows.length}
              label={row.name || "Kategori"}
              onAction={(action) =>
                setRows((list) => applyItemAction(list, index, action))
              }
            />
          </div>
        ))}
        <button
          type="button"
          className="admin-add"
          onClick={() =>
            setRows((list) => [
              ...list,
              {
                id: "",
                name: "",
                subtitle: "",
                image: 0,
                family: "akvaryum",
                fresh: true,
              },
            ])
          }
        >
          + Kategori ekle
        </button>
      </section>

      <section className="admin-card">
        <h2>Üst menü</h2>
        <p className="admin-hint">
          Menüde yalnızca yayında ürünü olan kategorilerin bağlantıları görünür.
        </p>
        {groups.map((group, g) => (
          <fieldset key={g}>
            <legend>{group.name || `Menü başlığı ${g + 1}`}</legend>
            <TextInput
              label="Menü başlığı"
              value={group.name}
              onChange={(name) => updateGroup(g, { name })}
            />
            {group.links.map((link, l) => (
              <div className="admin-list-item" key={l}>
                <div className="admin-inline">
                  <TextInput
                    label="Bağlantı adı"
                    value={link.label}
                    onChange={(label) => updateLink(g, l, { label })}
                  />
                  <Select
                    label="Kategori"
                    value={link.category}
                    options={categoryOptions}
                    onChange={(category) => updateLink(g, l, { category })}
                  />
                  <Select
                    label="Akvaryum seçeneği"
                    value={link.option ?? ""}
                    options={linkOptions}
                    onChange={(option) =>
                      updateLink(g, l, {
                        option:
                          option === "45" || option === "90"
                            ? option
                            : undefined,
                      })
                    }
                  />
                </div>
                <ItemControls
                  index={l}
                  count={group.links.length}
                  label={link.label || "Bağlantı"}
                  onAction={(action) =>
                    updateGroup(g, {
                      links: applyItemAction(group.links, l, action),
                    })
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="admin-add"
              onClick={() =>
                updateGroup(g, {
                  links: [
                    ...group.links,
                    { label: "", category: categoryOptions[0]?.[0] ?? "" },
                  ],
                })
              }
            >
              + Bağlantı ekle
            </button>
            <ItemControls
              index={g}
              count={groups.length}
              label={group.name || "Menü başlığı"}
              onAction={(action) =>
                setGroups((list) => applyItemAction(list, g, action))
              }
            />
          </fieldset>
        ))}
        <button
          type="button"
          className="admin-add"
          onClick={() => setGroups((list) => [...list, { name: "", links: [] }])}
        >
          + Menü başlığı ekle
        </button>
      </section>
    </SaveForm>
  );
}
