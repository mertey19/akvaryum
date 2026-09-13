"use client";
import {
  createContext,
  useContext,
  useSyncExternalStore,
  useState,
} from "react";
import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { Icon } from "./icon";
type SavedItem = { id: string; category: string };
type State = { favorites: SavedItem[]; compare: SavedItem[] };
const empty: State = { favorites: [], compare: [] };
let cached = empty;
let rawCache: string | null = null;
function valid(x: unknown): x is SavedItem {
  return (
    !!x &&
    typeof x === "object" &&
    "id" in x &&
    typeof x.id === "string" &&
    "category" in x &&
    typeof x.category === "string"
  );
}
function snapshot() {
  try {
    const raw = localStorage.getItem("dsn-saved-v1");
    if (raw !== rawCache) {
      rawCache = raw;
      const p = JSON.parse(raw || "{}");
      cached = {
        favorites: Array.isArray(p.favorites) ? p.favorites.filter(valid) : [],
        compare: Array.isArray(p.compare)
          ? p.compare.filter(valid).slice(0, 3)
          : [],
      };
    }
    return cached;
  } catch {
    return empty;
  }
}
function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener("dsn-saved", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("dsn-saved", cb);
  };
}
const SavedContext = createContext<{
  state: State;
  toggle: (kind: keyof State, item: SavedItem) => void;
}>({ state: empty, toggle: () => {} });
export function SavedProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribe, snapshot, () => empty);
  const [message, setMessage] = useState("");
  function toggle(kind: keyof State, item: SavedItem) {
    const current = snapshot();
    const exists = current[kind].some((x) => x.id === item.id);
    if (kind === "compare" && !exists) {
      if (current.compare.length >= 3) {
        setMessage(
          "En fazla üç ürün karşılaştırabilirsiniz. Önce bir ürünü kaldırın.",
        );
        return;
      }
      if (current.compare.some((x) => x.category !== item.category)) {
        setMessage("Karşılaştırma için aynı kategoriden ürünler seçin.");
        return;
      }
    }
    const next = {
      ...current,
      [kind]: exists
        ? current[kind].filter((x) => x.id !== item.id)
        : [...current[kind], item],
    };
    try {
      localStorage.setItem("dsn-saved-v1", JSON.stringify(next));
      window.dispatchEvent(new Event("dsn-saved"));
      setMessage(
        exists
          ? "Ürün listeden kaldırıldı."
          : kind === "favorites"
            ? "Ürün favorilere eklendi."
            : "Ürün karşılaştırmaya eklendi.",
      );
    } catch {
      setMessage(
        "Tarayıcı depolaması kullanılamıyor; seçiminiz kaydedilemedi.",
      );
    }
  }
  return (
    <SavedContext.Provider value={{ state, toggle }}>
      {children}
      <div className="toast" role="status" aria-live="polite">
        {message && (
          <>
            <span>{message}</span>
            <button aria-label="Bildirimi kapat" onClick={() => setMessage("")}>
              <Icon name="close" size={18} />
            </button>
          </>
        )}
      </div>
    </SavedContext.Provider>
  );
}
export function useSaved() {
  return useContext(SavedContext);
}
export function SaveButton({
  product,
  kind = "favorites",
  variant,
}: {
  product: Pick<Product, "id" | "categoryId" | "name">;
  kind?: keyof State;
  variant?: string;
}) {
  const { state, toggle } = useSaved();
  const id = product.id + (variant ? `:${variant}` : "");
  const active = state[kind].some((x) => x.id === id);
  return (
    <button
      className={`icon-button ${active ? "selected" : ""}`}
      aria-label={`${product.name} ${kind === "favorites" ? "favori" : "karşılaştırma"} ${active ? "kaldır" : "ekle"}`}
      aria-pressed={active}
      onClick={() => toggle(kind, { id, category: product.categoryId })}
    >
      <Icon name={kind === "favorites" ? "heart" : "compare"} size={20} />
    </button>
  );
}
export function SavedNav() {
  const { state } = useSaved();
  return (
    <div className="saved-nav">
      <Link
        href="/favoriler"
        aria-label={`Favorilerim (${state.favorites.length})`}
      >
        <Icon name="heart" />
        <span>Favorilerim</span>
        {state.favorites.length > 0 && <b>{state.favorites.length}</b>}
      </Link>
      <Link
        href="/karsilastir"
        aria-label={`Karşılaştır (${state.compare.length})`}
      >
        <Icon name="compare" />
        <span>Karşılaştır</span>
        {state.compare.length > 0 && <b>{state.compare.length}</b>}
      </Link>
    </div>
  );
}
