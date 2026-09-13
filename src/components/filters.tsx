"use client";
import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";
import { categories, stockLabels, Query } from "@/lib/catalog";
export function Filters({
  query,
  brands,
  technical,
}: {
  query: Query;
  brands: string[];
  technical: string[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  function close() {
    dialog.current?.close();
    opener.current?.focus();
  }
  function form(id: string) {
    return (
      <form
        className="filter-form"
        onSubmit={(e) => {
          e.preventDefault();
          const params = new URLSearchParams();
          new FormData(e.currentTarget).forEach((v, k) => {
            if (String(v).trim()) params.set(k, String(v));
          });
          if (params.get("kategori") !== "akvaryumlar")
            params.delete("secenek");
          startTransition(() => router.push(`/urunler?${params}`));
          close();
        }}
      >
        {query.q && <input type="hidden" name="q" value={query.q} />}
        {query.secenek && (
          <input type="hidden" name="secenek" value={query.secenek} />
        )}
        <h2>Filtrele</h2>
        <label htmlFor={`${id}-category`}>Kategori</label>
        <select
          id={`${id}-category`}
          name="kategori"
          defaultValue={query.kategori || ""}
        >
          <option value="">Tüm kategoriler</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <label htmlFor={`${id}-brand`}>Marka</label>
        <select
          id={`${id}-brand`}
          name="marka"
          defaultValue={query.marka || ""}
        >
          <option value="">Tüm markalar</option>
          {brands.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
        <label htmlFor={`${id}-stock`}>Stok durumu</label>
        <select id={`${id}-stock`} name="stok" defaultValue={query.stok || ""}>
          <option value="">Tümü</option>
          {Object.entries(stockLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <label>Fiyat aralığı (TL)</label>
        <div className="price-inputs">
          <input
            aria-label="En düşük fiyat"
            type="number"
            min="0"
            name="min"
            placeholder="En az"
            defaultValue={query.min}
          />
          <span>–</span>
          <input
            aria-label="En yüksek fiyat"
            type="number"
            min="0"
            name="max"
            placeholder="En çok"
            defaultValue={query.max}
          />
        </div>
        {technical.length > 0 && (
          <>
            <label htmlFor={`${id}-tech`}>Teknik özellik</label>
            <select
              id={`${id}-tech`}
              name="teknik"
              defaultValue={query.teknik || ""}
            >
              <option value="">Tüm özellikler</option>
              {technical.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </>
        )}
        <label htmlFor={`${id}-sort`}>Sıralama</label>
        <select
          id={`${id}-sort`}
          name="sirala"
          defaultValue={query.sirala || ""}
        >
          <option value="">Önerilen / ilgili</option>
          <option value="fiyat-artan">Fiyat: düşükten yükseğe</option>
          <option value="fiyat-azalan">Fiyat: yüksekten düşüğe</option>
          <option value="yeni">Yeni eklenen</option>
        </select>
        <button className="button" disabled={pending}>
          {pending ? "Uygulanıyor…" : "Filtreleri uygula"}
        </button>
        <a href="/urunler" className="clear-link">
          Tümünü temizle
        </a>
      </form>
    );
  }
  return (
    <>
      <div className="desktop-filters" key={JSON.stringify(query)}>
        {form("desktop")}
      </div>
      <button
        ref={opener}
        className="button secondary mobile-filter"
        onClick={() => dialog.current?.showModal()}
      >
        <Icon name="filter" size={20} /> Filtrele ve sırala
      </button>
      <dialog className="drawer filter-drawer" ref={dialog} onCancel={close}>
        <div className="drawer-top">
          <strong>Ürün filtreleri</strong>
          <button
            className="icon-button"
            aria-label="Filtreyi kapat"
            onClick={close}
          >
            <Icon name="close" />
          </button>
        </div>
        <div key={JSON.stringify(query)}>{form("mobile")}</div>
      </dialog>
    </>
  );
}
