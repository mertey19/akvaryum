"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";
import { SavedNav } from "./saved";
import { BrandLogo } from "./brand-logo";
import { siteConfig } from "@/lib/config";
import { whatsappLink } from "@/lib/quote";
type Suggestion = { name: string; href: string; type: string };
const groups = [
  {
    name: "Yaşam Alanları",
    links: [
      ["Akvaryumlar", "akvaryumlar"],
      ["Teraryumlar", "teraryumlar"],
      ["Paludaryumlar", "paludaryumlar"],
      ["Akvaryum mobilyaları", "mobilyalar"],
    ],
  },
  {
    name: "Ekipmanlar",
    links: [
      ["Filtreler", "filtreler"],
      ["Aydınlatma", "aydinlatma"],
      ["Isıtma ve soğutma", "isitma"],
    ],
  },
  { name: "Bakım ve Besleme", links: [["Bakım ve dekor", "bakim-dekor"]] },
];
export function Header({
  demo,
  canPlan,
  activeCategories,
}: {
  demo: boolean;
  canPlan: boolean;
  activeCategories: string[];
}) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [active, setActive] = useState(-1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!q.trim()) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      setLoading(true);
      setSearchError(false);
      fetch(`/api/arama?q=${encodeURIComponent(q)}`, {
        signal: controller.signal,
      })
        .then((r) => {
          if (!r.ok) throw Error();
          return r.json();
        })
        .then((x) => {
          if (controller.signal.aborted) return;
          setResults(x);
          setLoading(false);
        })
        .catch((e) => {
          if (e.name !== "AbortError") {
            setSearchError(true);
            setLoading(false);
          }
        });
    }, 180);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [q]);
  useEffect(() => {
    function close(e: MouseEvent) {
      if (nav.current && !nav.current.contains(e.target as Node)) setMenu(null);
    }
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  function closeMobile() {
    dialog.current?.close();
    setMobile(false);
    opener.current?.focus();
  }
  const visibleGroups = groups
    .map((g) => ({
      ...g,
      links: g.links.filter(([, id]) => activeCategories.includes(id)),
    }))
    .filter((g) => g.links.length);
  const salesWhatsApp = whatsappLink(
    siteConfig.whatsapp,
    "Merhaba, DSN Akvaryum ürünleri hakkında bilgi ve sipariş vermek istiyorum.",
  );
  const showResults = searchOpen && q.trim().length > 0;
  return (
    <>
      <a className="skip-link" href="#main">
        İçeriğe geç
      </a>
      {salesWhatsApp && (
        <div className="sales-bar">
          <span>Hazır ölçü akvaryumlar mevcut</span>
          <a href={salesWhatsApp} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={15} /> WhatsApp üzerinden bilgi ve
            sipariş · {siteConfig.phone}
          </a>
        </div>
      )}
      <header className="site-header">
        <div className="header-main container">
          <button
            ref={opener}
            className="icon-button mobile-toggle"
            aria-label="Menüyü aç"
            aria-expanded={mobile}
            onClick={() => {
              setMobile(true);
              dialog.current?.showModal();
            }}
          >
            <Icon name="menu" />
          </button>
          <Link
            className="wordmark"
            href="/"
            aria-label={`${siteConfig.fullName} ana sayfa`}
          >
            <BrandLogo
              className="wordmark-logo"
              sizes="(max-width: 767px) 72px, (max-width: 1100px) 84px, 96px"
            />
            <span className="wordmark-label">{siteConfig.brandLabel}</span>
          </Link>
          <form
            className="search"
            action="/urunler"
            role="search"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget))
                setSearchOpen(false);
            }}
          >
            <Icon name="search" />
            <input
              aria-label="Ürün ara"
              name="q"
              placeholder="Akvaryum, teraryum veya paludaryum arayın"
              value={q}
              role="combobox"
              aria-autocomplete="list"
              aria-controls="search-suggestions"
              aria-expanded={!!showResults}
              aria-activedescendant={
                active >= 0 ? `suggestion-${active}` : undefined
              }
              onFocus={() => setSearchOpen(true)}
              onChange={(e) => {
                setQ(e.target.value);
                setActive(-1);
                setResults([]);
                setSearchOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setSearchOpen(false);
                  setActive(-1);
                }
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSearchOpen(true);
                  setActive(Math.min(active + 1, results.length - 1));
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive(Math.max(active - 1, 0));
                }
                if (e.key === "Enter" && active >= 0 && results[active]) {
                  e.preventDefault();
                  router.push(results[active].href);
                  setSearchOpen(false);
                }
              }}
            />
            <button aria-label="Ara">
              <Icon name="arrow" size={20} />
            </button>
            <div
              hidden={!showResults}
              className="suggestions"
              id="search-suggestions"
              role="listbox"
              aria-label="Arama önerileri"
            >
              {loading ? (
                <p role="status">Aranıyor…</p>
              ) : searchError ? (
                <p>Arama yüklenemedi. Enter ile katalogda arayın.</p>
              ) : results.length ? (
                results.map((r, i) => (
                  <Link
                    role="option"
                    aria-selected={active === i}
                    id={`suggestion-${i}`}
                    key={r.href}
                    href={r.href}
                    onClick={() => setSearchOpen(false)}
                  >
                    <span>{r.name}</span>
                    <small>{r.type}</small>
                  </Link>
                ))
              ) : (
                <p>Sonuç bulunamadı. Başka bir sözcük deneyin.</p>
              )}
            </div>
          </form>
          <SavedNav />
        </div>
        <nav
          className="desktop-nav container"
          aria-label="Ana menü"
          ref={nav}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              const current = menu;
              setMenu(null);
              if (current !== null)
                nav.current?.querySelectorAll("button")[current]?.focus();
            }
          }}
        >
          {visibleGroups.map((g, i) => (
            <div key={g.name}>
              <button
                aria-expanded={menu === i}
                aria-controls={`mega-${i}`}
                onClick={() => {
                  const opening = menu !== i;
                  setMenu(opening ? i : null);
                  if (opening)
                    setTimeout(
                      () =>
                        nav.current
                          ?.querySelector<HTMLAnchorElement>(`#mega-${i} a`)
                          ?.focus(),
                      0,
                    );
                }}
              >
                {g.name}
                <Icon name="chevron" size={15} />
              </button>
              {menu === i && (
                <div className="mega" id={`mega-${i}`}>
                  <p className="eyebrow">{g.name}</p>
                  {g.links.map(([label, id]) => (
                    <Link
                      onClick={() => setMenu(null)}
                      key={id}
                      href={`/urunler?kategori=${id}`}
                    >
                      {label}
                      <Icon name="arrow" size={18} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {demo && <Link href="/projeler">İlham</Link>}
          <Link href="/rehber">Rehber</Link>
          <Link href="/iletisim">İletişim</Link>
          {salesWhatsApp && (
            <a
              href={salesWhatsApp}
              className="nav-quote whatsapp-nav"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={17} /> WhatsApp Sipariş
            </a>
          )}
        </nav>
      </header>
      <dialog ref={dialog} className="drawer" onCancel={closeMobile}>
        <div className="drawer-top">
          <strong>Kategorileri keşfedin</strong>
          <button
            className="icon-button"
            onClick={closeMobile}
            aria-label="Menüyü kapat"
          >
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label="Mobil menü">
          {visibleGroups.map((g) => (
            <details key={g.name}>
              <summary>{g.name}</summary>
              {g.links.map(([label, id]) => (
                <Link
                  key={id}
                  href={`/urunler?kategori=${id}`}
                  onClick={closeMobile}
                >
                  {label}
                </Link>
              ))}
            </details>
          ))}
          {salesWhatsApp && (
            <a
              className="mobile-whatsapp"
              href={salesWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
            >
              <Icon name="whatsapp" size={19} /> WhatsApp’tan Sipariş
            </a>
          )}
          {[
            ["Tüm ürünler", "/urunler"],
            ["Rehber", "/rehber"],
            ["İletişim", "/iletisim"],
            ["Favorilerim", "/favoriler"],
            ["Karşılaştır", "/karsilastir"],
            ["Ölçünüzü planlayın", "/teklif"],
          ]
            .filter(([, href]) => canPlan || href !== "/teklif")
            .map(([label, href]) => (
              <Link key={href} href={href} onClick={closeMobile}>
                {label}
              </Link>
            ))}
        </nav>
      </dialog>
    </>
  );
}
