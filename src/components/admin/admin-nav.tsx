"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const links = [
  ["/yonetim", "Genel bakış"],
  ["/yonetim/urunler", "Ürünler"],
  ["/yonetim/kategoriler", "Kategoriler ve menü"],
  ["/yonetim/ayarlar", "İşletme ve metinler"],
  ["/yonetim/rehber", "Rehber yazıları"],
  ["/yonetim/galeri", "Galeri"],
] as const;

export function AdminNavLinks() {
  const pathname = usePathname();
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    // On phones the links scroll sideways; keep the current page in view.
    // Only the strip scrolls; scrollIntoView could also move the page.
    const element = nav.current;
    if (!element || element.scrollWidth <= element.clientWidth) return;
    const current = element.querySelector<HTMLElement>('[aria-current="page"]');
    if (current)
      element.scrollLeft =
        current.offsetLeft - (element.clientWidth - current.offsetWidth) / 2;
  }, [pathname]);
  return (
    <nav aria-label="Yönetim menüsü" ref={nav}>
      {links.map(([href, label]) => {
        const active =
          href === "/yonetim" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
