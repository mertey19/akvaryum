import { test } from "node:test";
import assert from "node:assert/strict";
import { getProducts } from "../src/lib/repository";
import {
  normalize,
  queryProducts,
  productSchema,
  money,
  relevance,
} from "../src/lib/catalog";
import { grossVolume, whatsappLink } from "../src/lib/quote";
import { siteConfig } from "../src/lib/config";

test("Turkish normalized search prioritizes external filters over cabinet descriptions", () => {
  assert.equal(normalize("I ı İ i Ş Ğ Ü Ö Ç"), "i i i i s g u o c");
  for (const q of ["dış filtre", "dis filtre", "DIŞ FİLTRE"]) {
    const data = queryProducts({ q }, getProducts());
    assert.match(data.items[0].name, /Dış Filtre/);
    const cabinet = data.items.findIndex((p) => p.categoryId === "mobilyalar");
    assert.ok(cabinet >= 3);
  }
});
test("SKU and category rank before long description matches", () => {
  const p = getProducts()[0];
  assert.equal(relevance(p, "DEMO-001"), 100);
  assert.equal(relevance(p, "DEMO-001-B"), 80);
  assert.ok(
    queryProducts({ q: "akvaryumlar" }, getProducts()).items.every(
      (p) => p.categoryId === "akvaryumlar",
    ),
  );
});
test("Filtering, totals, ordering and page bounds use the same result set", () => {
  const result = queryProducts(
    {
      kategori: "filtreler",
      stok: "stokta",
      sirala: "fiyat-artan",
      sayfa: "999",
    },
    getProducts(),
  );
  assert.equal(result.total, 3);
  assert.equal(result.page, 1);
  assert.deepEqual(
    result.items.map((p) => p.price),
    [75000, 285000, 395000],
  );
  assert.equal(queryProducts({ min: "999999" }, getProducts()).total, 0);
  assert.equal(queryProducts({ sayfa: "2" }, getProducts()).items.length, 6);
  assert.equal(
    queryProducts({ kategori: "filtreler", teknik: "800 L/sa" }, getProducts())
      .total,
    1,
  );
});
test("Demo catalog satisfies schema and inventory consistency", () => {
  const all = getProducts();
  assert.equal(all.length, 18);
  all.forEach((p) => assert.ok(productSchema.safeParse(p).success));
  assert.equal(
    productSchema.safeParse({
      ...all[0],
      stockStatus: "tukendi",
      stockQuantity: 4,
    }).success,
    false,
  );
  assert.equal(money(null), "Fiyat için bilgi alın");
  assert.equal(money(325000), "₺3.250,00");
});
test("DIAMOND glass is applied only to aquarium products", () => {
  const all = getProducts();
  const aquariums = all.filter((p) => p.categoryId === "akvaryumlar");
  assert.ok(aquariums.length > 0);
  assert.ok(
    aquariums.every((p) => p.specifications.Cam === siteConfig.aquariumGlass),
  );
  assert.ok(
    all
      .filter((p) => p.categoryId !== "akvaryumlar")
      .every((p) => p.specifications.Cam === undefined),
  );
  const search = queryProducts({ q: "diamond" }, all);
  assert.equal(search.total, aquariums.length);
  assert.ok(search.items.every((p) => p.categoryId === "akvaryumlar"));
});
test("Volume rejects invalid dimensions and returns geometric gross liters", () => {
  assert.equal(grossVolume(60, 30, 36), 64.8);
  for (const value of [0, -1, NaN, Infinity, 301, 9])
    assert.equal(grossVolume(value, 30, 36), null);
  assert.equal(grossVolume(5, 5, 5, 1, 10), 0.125);
});
test("WhatsApp only uses configured valid number and preserves Turkish text", () => {
  const message =
    "Clear 60 · Siyah silikon\nÖlçü: 60 × 30 × 36 cm\n/urun/clear-60?varyant=black";
  assert.equal(whatsappLink("", message), null);
  assert.equal(whatsappLink("invalid", message), null);
  const url = new URL(whatsappLink("+90 555 123 45 67", message)!);
  assert.equal(url.searchParams.get("text"), message);
  assert.equal(url.pathname, "/905551234567");
});
test("Verified contact settings keep the direct phone separate from WhatsApp", () => {
  assert.equal(siteConfig.phone, "0545 389 71 47");
  assert.equal(siteConfig.phoneHref, "tel:+905453897147");
  assert.equal(
    siteConfig.address,
    "Mamak Hüseyin Gazi, Ekin, Su Sk. No:17, 06160 Mamak/Ankara",
  );
  assert.equal(siteConfig.socialHandle, "Dursun_belgic");
  assert.equal(siteConfig.whatsapp, "");
  assert.ok(!siteConfig.phoneHref.includes("wa.me"));
});
test("Disabling demo prevents every demo product from entering production", () => {
  const old = siteConfig.demo;
  try {
    siteConfig.demo = false;
    assert.equal(getProducts().length, 0);
  } finally {
    siteConfig.demo = old;
  }
});
