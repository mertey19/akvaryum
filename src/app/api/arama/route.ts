import { NextRequest, NextResponse } from "next/server";
import { normalize, relevance } from "@/lib/catalog";
import { getContent, getProducts } from "@/lib/repository";
export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") || "").trim().slice(0, 100);
  if (!q) return NextResponse.json([]);
  const [{ categories }, all] = await Promise.all([getContent(), getProducts()]);
  const products = all
    .filter((p) => relevance(p, q, categories) > 0)
    .toSorted((a, b) => relevance(b, q, categories) - relevance(a, q, categories))
    .slice(0, 5)
    .map((p) => ({ name: p.name, href: `/urun/${p.slug}`, type: "Ürün" }));
  const matches = categories
    .filter((c) => normalize(c.name).includes(normalize(q)))
    .slice(0, 2)
    .map((c) => ({
      name: c.name,
      href: `/urunler?kategori=${c.id}`,
      type: "Kategori",
    }));
  return NextResponse.json([...products, ...matches]);
}
