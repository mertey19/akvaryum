import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("desktop menu focuses links and returns to the opener", async ({
  page,
}) => {
  await page.goto("/");
  const button = page.getByRole("button", { name: "Ekipmanlar", exact: true });
  await button.click();
  await expect(page.locator("#mega-1 a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(button).toBeFocused();
  await expect(page.locator("#mega-1")).toHaveCount(0);
});
test("verified DIAMOND glass information is consistent", async ({ page }) => {
  await page.goto("/urunler?kategori=akvaryumlar");
  await expect(page.locator(".material-badge")).toHaveCount(4);
  await expect(page.locator(".material-badge").first()).toHaveText(
    "DIAMOND cam",
  );
  await page
    .locator(".product-card")
    .first()
    .getByRole("link", { name: "Ürünü incele" })
    .click();
  await expect(page.locator(".detail-material")).toHaveText(
    "DIAMOND cam ile üretilir",
  );
  await expect(
    page.getByRole("row", { name: /Cam DIAMOND cam/ }),
  ).toBeVisible();
  await page.goto("/urunler?kategori=filtreler");
  await expect(page.locator(".material-badge")).toHaveCount(0);
  await page.goto("/urunler?q=diamond");
  await expect(page.locator(".product-card")).toHaveCount(4);
  await expect(page.locator(".material-badge")).toHaveCount(4);
});
test("search request failure is visible and can recover", async ({ page }) => {
  await page.route("**/api/arama?**", (r) =>
    r.fulfill({ status: 503, body: "unavailable" }),
  );
  await page.goto("/");
  await page.getByRole("combobox", { name: "Ürün ara" }).fill("filtre");
  await expect(page.locator(".suggestions")).toContainText("Arama yüklenemedi");
  await page.unroute("**/api/arama?**");
  await page.getByRole("combobox", { name: "Ürün ara" }).fill("dis filtre");
  await expect(page.getByRole("option").first()).toContainText("Dış Filtre");
});
test("variant favorites retain identity and restore selected variant", async ({
  page,
}) => {
  await page.goto("/urun/clear-60?varyant=black");
  await page.getByRole("button", { name: /favori ekle/ }).click();
  await page
    .getByRole("combobox", { name: "Varyant", exact: true })
    .selectOption("clear");
  await page.getByRole("button", { name: /favori ekle/ }).click();
  await page.goto("/favoriler");
  await expect(page.locator(".product-card")).toHaveCount(2);
  await page
    .getByRole("link", {
      name: "Clear 60 Cam Akvaryum · Siyah silikon",
      exact: true,
    })
    .click();
  await expect(page.getByTestId("sku")).toHaveText("DEMO-001-B");
});
test("clipboard failure does not claim successful copy or delivery", async ({
  page,
}) => {
  await page.goto("/iletisim");
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("blocked")) },
      configurable: true,
    }),
  );
  await page.getByLabel("Mesajınız").fill("Ürün hakkında bilgi istiyorum");
  await page.getByRole("button", { name: "Talep özetini oluştur" }).click();
  await page.getByRole("button", { name: "Özeti kopyala" }).click();
  await expect(page.locator(".copy-status")).toContainText("elle kopyalayın");
  await expect(
    page.getByRole("textbox", { name: "Talep özeti" }),
  ).toBeFocused();
});
test("no personal form data is sent to network, storage, URL or console", async ({
  page,
}) => {
  await page.goto("/teklif");
  const leaks: string[] = [];
  const marker = "GIZLI-NOT-93742";
  page.on("console", (msg) => {
    if (msg.text().includes(marker)) leaks.push("console");
  });
  page.on("request", (r) => {
    if ((r.url() + (r.postData() || "")).includes(marker))
      leaks.push("network");
  });
  await page.getByLabel("Notunuz (isteğe bağlı)").fill(marker);
  await page.getByRole("button", { name: "Talep özetini oluştur" }).click();
  expect(page.url()).not.toContain(marker);
  expect(
    await page.evaluate(
      () => JSON.stringify(localStorage) + JSON.stringify(sessionStorage),
    ),
  ).not.toContain(marker);
  expect(leaks).toEqual([]);
});

test("search supports Turkish normalization, suggestions, keyboard and empty results", async ({
  page,
}) => {
  await page.goto("/");
  const search = page.getByRole("combobox", { name: "Ürün ara" });
  await search.fill("dis filtre");
  await expect(page.getByRole("option").first()).toContainText("Dış Filtre");
  await search.press("ArrowDown");
  await search.press("Enter");
  await expect(page).toHaveURL(/\/urun\/flow-/);
  await page.goto("/urunler?q=dis+filtre");
  const names = await page.locator(".product-info h3").allTextContents();
  expect(names[0]).toContain("Dış Filtre");
  expect(names.findIndex((n) => n.includes("Dolabı"))).toBeGreaterThan(2);
  await page.goto("/urunler?q=olmayan-urun-xyz");
  await expect(
    page.getByRole("heading", { name: "Bu seçimle ürün bulunamadı." }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Filtreleri temizle", exact: true })
    .click();
  await expect(page.locator(".results-top")).toContainText("18");
});
test("filter, sorting, reload and browser history preserve URL-backed state", async ({
  page,
}) => {
  await page.goto("/urunler?sayfa=2");
  await page.locator("#desktop-category").selectOption("filtreler");
  await page.locator("#desktop-sort").selectOption("fiyat-artan");
  await page
    .getByRole("button", { name: "Filtreleri uygula", exact: true })
    .click();
  await expect(page).toHaveURL(/kategori=filtreler/);
  expect(new URL(page.url()).searchParams.has("sayfa")).toBeFalsy();
  await expect(page.locator(".results-top")).toContainText("4 ürün");
  await expect(page.locator(".product-info h3").first()).toContainText(
    "Inner 300",
  );
  await page.reload();
  await expect(page.locator("#desktop-category")).toHaveValue("filtreler");
  await page.getByRole("link", { name: "kategori filtresini kaldır" }).click();
  await expect(page.locator(".results-top")).toContainText("18 ürün");
  await page.goBack();
  await expect(page.locator("#desktop-category")).toHaveValue("filtreler");
  await page.goForward();
  await expect(page.locator("#desktop-category")).toHaveValue("");
});
test("variant updates SKU, price, stock and preserves context in contact draft", async ({
  page,
}) => {
  await page.goto("/urun/clear-60");
  await page.getByLabel("Varyant", { exact: true }).selectOption("black");
  await expect(page.getByTestId("sku")).toHaveText("DEMO-001-B");
  await expect(page.locator(".detail-price")).toContainText("3.450,00");
  await expect(page.locator(".detail-meta")).toContainText("Sipariş üzerine");
  await page.getByRole("link", { name: "Bu Ürün İçin Bilgi Al" }).click();
  await expect(page.locator(".context-box")).toContainText("Siyah silikon");
  await expect(page.locator(".context-box")).toContainText("Cam: DIAMOND cam");
  await page.getByLabel("Mesajınız").fill("Paket içeriği nedir?");
  await page.getByRole("button", { name: "Talep özetini oluştur" }).click();
  await expect(page.getByRole("textbox", { name: "Talep özeti" })).toHaveValue(
    /DEMO-001-B/,
  );
  expect(page.url()).not.toContain("Paket");
  await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
  await expect(page.locator(".copy-status")).toContainText(
    "Bilgiler gönderilmedi",
  );
  await page.goto("/urun/clear-60?varyant=black");
  await expect(page.getByTestId("sku")).toHaveText("DEMO-001-B");
});
test("favorites persist and comparison enforces category and maximum size", async ({
  page,
}) => {
  await page.goto("/urunler?kategori=akvaryumlar");
  await page
    .locator(".product-card")
    .first()
    .getByRole("button", { name: /favori ekle/ })
    .click();
  await page.reload();
  await expect(
    page
      .locator(".product-card")
      .first()
      .getByRole("button", { name: /favori kaldır/ }),
  ).toHaveAttribute("aria-pressed", "true");
  for (let i = 0; i < 3; i++)
    await page
      .locator(".product-card")
      .nth(i)
      .getByRole("button", { name: /karşılaştırma ekle/ })
      .click();
  await page
    .locator(".product-card")
    .nth(3)
    .getByRole("button", { name: /karşılaştırma ekle/ })
    .click();
  await expect(page.getByRole("status")).toContainText("En fazla üç");
  await page.goto("/karsilastir");
  await expect(page.locator(".compare-table thead th")).toHaveCount(4);
  await page
    .getByRole("button", { name: "Kaldır", exact: true })
    .first()
    .click();
  await page.reload();
  await expect(page.locator(".compare-table thead th")).toHaveCount(3);
  await page.goto("/urunler?kategori=filtreler");
  await page
    .locator(".product-card")
    .first()
    .getByRole("button", { name: /karşılaştırma ekle/ })
    .click();
  await expect(page.getByRole("status")).toContainText("aynı kategoriden");
  await page.goto("/favoriler");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Favorilerden kaldır", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Henüz favoriniz yok." }),
  ).toBeVisible();
});
test("dimension validation, gross volume and clipboard summary are honest", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/teklif");
  await expect(page.getByTestId("volume")).toContainText("64,8");
  await page.getByLabel("Genişlik (cm)").fill("-1");
  await page.getByRole("button", { name: "Talep özetini oluştur" }).click();
  await expect(page.getByRole("textbox", { name: "Talep özeti" })).toHaveCount(
    0,
  );
  await page.getByLabel("Genişlik (cm)").fill("100");
  await page.getByLabel("Teslimat şehri").fill("İzmir");
  await page.getByRole("button", { name: "Talep özetini oluştur" }).click();
  await expect(page.getByRole("textbox", { name: "Talep özeti" })).toHaveValue(
    /108 L/,
  );
  await page.getByRole("button", { name: "Özeti kopyala" }).click();
  await expect(page.locator(".copy-status")).toContainText(
    "Henüz bir talep gönderilmedi",
  );
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain("İzmir");
  expect(page.url()).not.toContain("İzmir");
  await page.getByLabel("Renk tercihi").fill("Siyah");
  await expect(page.getByRole("textbox", { name: "Talep özeti" })).toHaveCount(
    0,
  );
});
test("dialogs close on Escape and restore focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menüyü aç" });
  await menu.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobil menü" })
    .getByText("Ekipmanlar", { exact: true })
    .click();
  await expect(
    page
      .getByRole("navigation", { name: "Mobil menü" })
      .getByRole("link", { name: "Filtreler", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await page.goto("/urunler");
  const filters = page.getByRole("button", { name: "Filtrele ve sırala" });
  await filters.click();
  await page.locator("#mobile-category").selectOption("filtreler");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Filtreleri uygula" })
    .click();
  await expect(page).toHaveURL(/kategori=filtreler/);
  await expect(filters).toBeFocused();
  await page.goto("/urun/flow-800");
  const image = page.getByRole("button", { name: "Görseli büyüt" });
  await image.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(image).toBeFocused();
});
test("404 status, demo noindex and no inert menu links", async ({
  page,
  request,
}) => {
  const response = await request.get("/urun/does-not-exist");
  expect(response.status()).toBe(404);
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).not.toContain("<url>");
});
for (const width of [360, 390, 768, 1024, 1440]) {
  test(`responsive flows at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/urunler?kategori=filtreler",
      "/urun/clear-60",
      "/teklif",
      "/iletisim",
    ]) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      expect(overflow, route).toBeFalsy();
      for (const img of await page.locator("img").all()) {
        await img.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            img.evaluate(
              (i) =>
                (i as HTMLImageElement).complete &&
                (i as HTMLImageElement).naturalWidth > 0,
            ),
          )
          .toBeTruthy();
      }
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      if ([390, 1440].includes(width) && !route.startsWith("/iletisim"))
        await page.screenshot({
          path: `artifacts/screenshots/${width}-${route === "/" ? "home" : route.split(/[/?]/)[1]}.png`,
          fullPage: true,
        });
    }
  });
}
for (const route of [
  "/",
  "/urunler?kategori=filtreler",
  "/urun/clear-60",
  "/teklif",
  "/iletisim",
]) {
  test(`accessibility audit ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  });
}
