import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  aquariumOptions,
  money,
  normalize,
  productSchema,
  publishedProducts,
  queryProducts,
  relevance,
} from "../src/lib/catalog";
import { grossVolume, whatsappLink } from "../src/lib/quote";
import { allowsIndexing, productionSiteUrl } from "../src/lib/config";
import {
  findContentIssues,
  phoneHref,
  slugify,
} from "../src/lib/content/schema";
import { seedContent } from "../src/lib/content/seed";
import {
  readSiteContent,
  storeKind,
  writeSiteContent,
} from "../src/lib/content/store";
import {
  createSessionToken,
  passwordMatches,
  sessionKey,
  verifySessionToken,
} from "../src/lib/admin/token";

const content = seedContent();
const { categories, settings } = content;
const getProducts = () => publishedProducts(content.products, true);

test("Turkish normalized search prioritizes external filters over cabinet descriptions", () => {
  assert.equal(normalize("I ı İ i Ş Ğ Ü Ö Ç"), "i i i i s g u o c");
  assert.equal(normalize("terrarium"), "teraryum");
  assert.equal(normalize("terraryum"), "teraryum");
  assert.equal(normalize("paladaryum"), "paludaryum");
  assert.equal(normalize("paludarium"), "paludaryum");
  for (const q of ["dış filtre", "dis filtre", "DIŞ FİLTRE"]) {
    const data = queryProducts({ q }, getProducts(), categories);
    assert.match(data.items[0].name, /Dış Filtre/);
    const cabinet = data.items.findIndex((p) => p.categoryId === "mobilyalar");
    assert.ok(cabinet > 0);
  }
});
test("SKU and category rank before long description matches", () => {
  const p = getProducts().find(
    (product) => product.slug === "akvaryum-60x40x40",
  )!;
  assert.equal(relevance(p, "AKV-60X40X40", categories), 100);
  assert.equal(relevance(p, "AKV-60X40X40-45", categories), 80);
  assert.ok(
    queryProducts({ q: "akvaryumlar" }, getProducts(), categories).items.every(
      (p) => p.categoryId === "akvaryumlar",
    ),
  );
});
test("Filtering, totals, ordering and page bounds use the same result set", () => {
  const result = queryProducts(
    {
      kategori: "filtreler",
      stok: "bilgi",
      sirala: "yeni",
      sayfa: "999",
    },
    getProducts(),
    categories,
  );
  assert.equal(result.total, 2);
  assert.equal(result.page, 1);
  assert.deepEqual(
    result.items.map((p) => p.name),
    ["İç Filtre Seçimi", "Dış Filtre Seçimi"],
  );
  assert.equal(
    queryProducts({ kategori: "akvaryumlar", sirala: "fiyat-artan" }, getProducts())
      .items[0].price,
    100000,
  );
  assert.equal(queryProducts({ min: "999999" }, getProducts()).total, 0);
  assert.equal(queryProducts({ sayfa: "2" }, getProducts()).items.length, 10);
  assert.equal(queryProducts({ sayfa: "3" }, getProducts()).items.length, 10);
  assert.equal(
    queryProducts({ kategori: "filtreler", teknik: "Dış filtre" }, getProducts())
      .total,
    1,
  );
});
test("Demo catalog satisfies schema and inventory consistency", () => {
  const all = getProducts();
  assert.equal(all.length, 22);
  all.forEach((p) => assert.ok(productSchema.safeParse(p).success));
  assert.deepEqual(findContentIssues(content), []);
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
test("Content validation catches duplicate codes and unknown categories", () => {
  const [first, second] = content.products;
  const issues = findContentIssues({
    ...content,
    products: [
      first,
      { ...second, slug: first.slug, categoryId: "tanimsiz-kategori" },
    ],
    menu: [
      { name: "Menü", links: [{ label: "Yok", category: "tanimsiz-kategori" }] },
    ],
  });
  assert.ok(issues.some((issue) => issue.includes("Ürün adresi tekrar ediyor")));
  assert.ok(issues.some((issue) => issue.includes("tanımsız kategori")));
  assert.ok(issues.some((issue) => issue.startsWith("Menü / Yok")));
  assert.equal(
    productSchema.safeParse({ ...first, images: [] }).success,
    false,
  );
});
test("Terrarium and paludarium concepts are searchable, honest demo records", () => {
  const all = getProducts();
  const knownCategoryIds = new Set(categories.map((category) => category.id));
  assert.equal(categories.length, 8);
  assert.ok(all.every((product) => knownCategoryIds.has(product.categoryId)));

  const expected = [
    ["teraryumlar", "/images/terrarium.webp", "terrarium"],
    ["paludaryumlar", "/images/paludarium.webp", "paladaryum"],
  ] as const;
  for (const [categoryId, image, alias] of expected) {
    const products = all.filter((product) => product.categoryId === categoryId);
    assert.equal(products.length, 1);
    assert.ok(
      products.every(
        (product) =>
          product.price === null &&
          product.stockStatus === "bilgi" &&
          product.stockQuantity === null &&
          product.leadTime === null &&
          product.priceListDate === null &&
          product.isDemo &&
          product.specifications.Cam === undefined &&
          product.images[0] === image,
      ),
    );
    const search = queryProducts({ q: alias }, all, categories);
    assert.equal(search.total, 1);
    assert.ok(
      search.items.every((product) => product.categoryId === categoryId),
    );
  }
});
test("Aquarium price list exposes all supplied dimensions and option prices", () => {
  const expected = [
    ["akvaryum-30x20x15", "30 × 20 × 15 cm", 100000, 120000],
    ["akvaryum-30x30x30", "30 × 30 × 30 cm", 160000, 220000],
    ["akvaryum-35x35x35", "35 × 35 × 35 cm", 190000, 240000],
    ["akvaryum-40x40x40", "40 × 40 × 40 cm", 240000, 305000],
    ["akvaryum-50x30x30", "50 × 30 × 30 cm", 240000, 305000],
    ["akvaryum-60x40x40", "60 × 40 × 40 cm", 370000, 420000],
    ["akvaryum-40x40x30", "40 × 40 × 30 cm", 225000, 260000],
    ["akvaryum-40x30x20", "40 × 30 × 20 cm", 165000, 210000],
    ["akvaryum-70x40x40", "70 × 40 × 40 cm", 500000, 615000],
    ["akvaryum-80x40x40", "80 × 40 × 40 cm", 520000, 630000],
    ["akvaryum-90x45x45", "90 × 45 × 45 cm", 795000, 990000],
    ["akvaryum-100x50x45", "100 × 50 × 45 cm", 840000, 1050000],
    ["akvaryum-120x50x45", "120 × 50 × 45 cm", 910000, 1080000],
    ["akvaryum-150x50x40", "150 × 50 × 40 cm", 1200000, 1310000],
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
    aquariums.find((product) => product.slug === "akvaryum-35x35x35")!
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
    aquariums.every((p) => p.specifications.Cam === settings.aquariumGlass),
  );
  assert.ok(
    all
      .filter((p) => p.categoryId !== "akvaryumlar")
      .every((p) => p.specifications.Cam === undefined),
  );
  assert.ok(
    aquariums.every((p) =>
      p.packageContents.startsWith(settings.aquariumPriceIncludes),
    ),
  );
  const search = queryProducts({ q: "diamond" }, all, categories);
  assert.equal(search.total, aquariums.length);
  assert.ok(search.items.every((p) => p.categoryId === "akvaryumlar"));
});
test("45° and 90° aquarium pages filter and price by the selected option", () => {
  const all = getProducts();
  for (const option of aquariumOptions) {
    const page = queryProducts(
      { kategori: "akvaryumlar", secenek: option, sirala: "fiyat-artan" },
      all,
    );
    assert.equal(page.total, 14);
    const prices = page.items.map(
      (p) => p.variants.find((v) => v.id === option)!.price!,
    );
    assert.deepEqual(
      prices,
      prices.toSorted((a, b) => a - b),
    );
  }
  assert.ok(
    queryProducts({ secenek: "45" }, all).items.every(
      (p) => p.categoryId === "akvaryumlar",
    ),
  );
  const slugs = (secenek: string) =>
    queryProducts({ kategori: "akvaryumlar", secenek, min: "13100" }, all)
      .items.map((p) => p.slug);
  assert.ok(slugs("45").includes("akvaryum-150x50x40"));
  assert.ok(!slugs("90").includes("akvaryum-150x50x40"));
  assert.equal(
    queryProducts({ kategori: "akvaryumlar", secenek: "60" }, all).total,
    0,
  );
});
test("Search indexing opens only for a known production site address", () => {
  assert.equal(
    productionSiteUrl(undefined, "akvaryum.vercel.app"),
    "https://akvaryum.vercel.app",
  );
  assert.equal(
    productionSiteUrl("https://dsnakvaryum.com", "akvaryum.vercel.app"),
    "https://dsnakvaryum.com",
  );
  assert.equal(productionSiteUrl(undefined, undefined), "");
  const url = "https://akvaryum.vercel.app";
  assert.equal(allowsIndexing("", undefined, undefined), false);
  assert.equal(allowsIndexing(url, undefined, "production"), true);
  assert.equal(allowsIndexing(url, undefined, undefined), true);
  assert.equal(allowsIndexing(url, undefined, "preview"), false);
  assert.equal(allowsIndexing(url, "false", "production"), false);
});
test("Volume rejects invalid dimensions and returns geometric gross liters", () => {
  assert.equal(grossVolume(60, 30, 36), 64.8);
  for (const value of [0, -1, NaN, Infinity, 301, 9])
    assert.equal(grossVolume(value, 30, 36), null);
  assert.equal(grossVolume(5, 5, 5, 1, 10), 0.125);
});
test("WhatsApp only uses configured valid number and preserves Turkish text", () => {
  const message =
    "DSN 60 × 40 × 40 Cam Akvaryum · 45°\nÖlçü: 60 × 40 × 40 cm\n/urun/akvaryum-60x40x40?varyant=45";
  assert.equal(whatsappLink("", message), null);
  assert.equal(whatsappLink("invalid", message), null);
  const url = new URL(whatsappLink("+90 555 123 45 67", message)!);
  assert.equal(url.searchParams.get("text"), message);
  assert.equal(url.pathname, "/905551234567");
});
test("Verified contact settings use the selected phone as the WhatsApp line", () => {
  assert.equal(settings.name, "DSN Akvaryum");
  assert.equal(settings.fullName, "DSN Akvaryum İmalatı");
  assert.equal(settings.brandLabel, "DSN AKVARYUM İMALATI");
  assert.equal(settings.logoPath, "/images/dsn-logo.jpeg");
  assert.equal(settings.phone, "0545 389 71 47");
  assert.equal(phoneHref(settings.phone), "tel:+905453897147");
  assert.equal(phoneHref("+90 545 389 71 47"), "tel:+905453897147");
  assert.equal(phoneHref(""), "");
  assert.equal(
    settings.address,
    "Mamak Hüseyin Gazi, Ekin, Su Sk. No:17, 06160 Mamak/Ankara",
  );
  assert.equal(settings.socialHandle, "Dursun.belgic");
  assert.equal(settings.whatsapp, "+905453897147");
  assert.equal(
    new URL(whatsappLink(settings.whatsapp, "Sipariş bilgisi")!).pathname,
    "/905453897147",
  );
});
test("Disabling demo prevents every demo product from entering production", () => {
  assert.equal(publishedProducts(content.products, false).length, 0);
  assert.equal(
    publishedProducts(
      content.products.map((p) => ({ ...p, isDemo: false })),
      false,
    ).length,
    22,
  );
});
test("Slugs are URL-safe for Turkish product names", () => {
  assert.equal(
    slugify("DSN 60 × 40 × 40 Cam Akvaryum"),
    "dsn-60-x-40-x-40-cam-akvaryum",
  );
  assert.equal(slugify("  Işıklı Ünite Çözümü! "), "isikli-unite-cozumu");
});
test("Admin session tokens expire and reject tampering", () => {
  const key = sessionKey("gizli-sifre");
  const now = 1_000_000;
  const token = createSessionToken(now + 60_000, key);
  assert.equal(verifySessionToken(token, key, now), true);
  assert.equal(verifySessionToken(token, key, now + 60_001), false);
  assert.equal(verifySessionToken(token, sessionKey("baska"), now), false);
  const [, signature] = token.split(".");
  assert.equal(
    verifySessionToken(`${now + 999_999}.${signature}`, key, now),
    false,
  );
  for (const bad of [undefined, "", "abc", "1.2.3", `x.${signature}`])
    assert.equal(verifySessionToken(bad, key, now), false);
  assert.equal(passwordMatches("dogru", "dogru"), true);
  assert.equal(passwordMatches("yanlis", "dogru"), false);
  assert.equal(passwordMatches("", ""), false);
});
test("Local file store saves validated content and falls back to seeds", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "dsn-content-"));
  const previous = {
    store: process.env.CONTENT_STORE,
    dir: process.env.CONTENT_DATA_DIR,
  };
  process.env.CONTENT_STORE = "file";
  process.env.CONTENT_DATA_DIR = dir;
  try {
    assert.equal(storeKind(), "file");
    assert.equal((await readSiteContent()).settings.announcement, settings.announcement);
    await writeSiteContent("settings", {
      ...settings,
      announcement: "Yeni duyuru",
    });
    const saved = await readSiteContent();
    assert.equal(saved.settings.announcement, "Yeni duyuru");
    assert.equal(saved.products.length, content.products.length);
    await assert.rejects(
      writeSiteContent("settings", { ...settings, name: "" }),
    );
    assert.equal((await readSiteContent()).settings.name, "DSN Akvaryum");
  } finally {
    process.env.CONTENT_STORE = previous.store;
    process.env.CONTENT_DATA_DIR = previous.dir;
    if (previous.store === undefined) delete process.env.CONTENT_STORE;
    if (previous.dir === undefined) delete process.env.CONTENT_DATA_DIR;
    await rm(dir, { recursive: true, force: true });
  }
});
