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
  const p = getProducts().find((product) => product.slug === "clear-60")!;
  assert.equal(relevance(p, "DEMO-DSN-604040"), 100);
  assert.equal(relevance(p, "DEMO-DSN-604040-45"), 80);
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
  assert.equal(queryProducts({ sayfa: "2" }, getProducts()).items.length, 12);
  assert.equal(
    queryProducts({ kategori: "filtreler", teknik: "800 L/sa" }, getProducts())
      .total,
    1,
  );
});
test("Demo catalog satisfies schema and inventory consistency", () => {
  const all = getProducts();
  assert.equal(all.length, 28);
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
test("Aquarium price list exposes all supplied dimensions and option prices", () => {
  const expected = [
    ["dsn-30x20x15", "30 × 20 × 15 cm", 100000, 120000],
    ["cube-30", "30 × 30 × 30 cm", 160000, 220000],
    ["dsn-35x35x35", "35 × 35 × 35 cm", 190000, 240000],
    ["dsn-40x40x40", "40 × 40 × 40 cm", 240000, 305000],
    ["dsn-50x30x30", "50 × 30 × 30 cm", 240000, 305000],
    ["clear-60", "60 × 40 × 40 cm", 370000, 420000],
    ["dsn-40x40x30", "40 × 40 × 30 cm", 225000, 260000],
    ["dsn-40x30x20", "40 × 30 × 20 cm", 165000, 210000],
    ["dsn-70x40x40", "70 × 40 × 40 cm", 500000, 615000],
    ["dsn-80x40x40", "80 × 40 × 40 cm", 520000, 630000],
    ["clear-90", "90 × 45 × 45 cm", 795000, 990000],
    ["dsn-100x50x45", "100 × 50 × 45 cm", 840000, 1050000],
    ["clear-120", "120 × 50 × 45 cm", 910000, 1080000],
    ["dsn-150x50x40", "150 × 50 × 40 cm", 1200000, 1310000],
  ] as const;
  const all = getProducts();
  const aquariums = all.filter(
    (product) => product.categoryId === "akvaryumlar",
  );

  assert.equal(aquariums.length, expected.length);
  for (const [slug, dimensions, price90, price45] of expected) {
    const product = aquariums.find((candidate) => candidate.slug === slug);
    assert.ok(product, `${slug} katalogda bulunmalı`);
    assert.equal(product.specifications.Ölçü, dimensions);
    assert.equal(product.price, price90);
    assert.deepEqual(
      product.variants.map((variant) => [
        variant.id,
        variant.name,
        variant.price,
        variant.stockStatus,
      ]),
      [
        ["90", "90°", price90, "bilgi"],
        ["45", "45°", price45, "bilgi"],
      ],
    );
    assert.equal(product.stockStatus, "bilgi");
    assert.equal(product.stockQuantity, null);
    assert.equal(product.leadTime, null);
    assert.equal(product.isDemo, true);
    assert.equal(product.priceListDate, "18.04.2026");
  }

  assert.equal(
    aquariums.find((product) => product.slug === "dsn-35x35x35")!
      .specifications["Brüt hacim"],
    "42,875 L",
  );
  const categoryPage = queryProducts({ kategori: "akvaryumlar" }, all);
  assert.equal(categoryPage.total, 14);
  assert.equal(categoryPage.items.length, 14);
  assert.equal(categoryPage.pages, 1);
  assert.equal(categoryPage.page, 1);
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
    "DSN 60 × 40 × 40 Cam Akvaryum · 45°\nÖlçü: 60 × 40 × 40 cm\n/urun/clear-60?varyant=45";
  assert.equal(whatsappLink("", message), null);
  assert.equal(whatsappLink("invalid", message), null);
  const url = new URL(whatsappLink("+90 555 123 45 67", message)!);
  assert.equal(url.searchParams.get("text"), message);
  assert.equal(url.pathname, "/905551234567");
});
test("Verified contact settings keep the direct phone separate from WhatsApp", () => {
  assert.equal(siteConfig.fullName, "DSN Akvaryum İmalatı");
  assert.equal(siteConfig.brandLabel, "DSN AKVARYUM İMALATI");
  assert.equal(siteConfig.logoPath, "/images/dsn-logo.jpeg");
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
