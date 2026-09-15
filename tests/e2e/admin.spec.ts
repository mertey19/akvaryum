import { expect, test } from "@playwright/test";

const password = process.env.E2E_ADMIN_PASSWORD || "e2e-admin-password";
const onePixelPng = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==",
  "base64",
);

test("admin area requires a valid session", async ({ page, request }) => {
  await page.goto("/yonetim/urunler");
  await expect(page).toHaveURL(/\/yonetim\/giris$/);
  await page.getByLabel("Şifre").fill("yanlis-sifre");
  await page.getByRole("button", { name: "Giriş yap" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Şifre hatalı" }),
  ).toBeVisible();

  const upload = await request.post("/yonetim/api/yukle", {
    multipart: {
      file: { name: "a.png", mimeType: "image/png", buffer: onePixelPng },
    },
  });
  expect(upload.status()).toBe(401);
  const login = await request.get("/yonetim/giris");
  expect(login.headers()["x-robots-tag"]).toContain("noindex");
});

test("admin changes texts and manages an aquarium end to end", async ({
  page,
  request,
}) => {
  await page.goto("/yonetim/giris");
  await page.getByLabel("Şifre").fill(password);
  await page.getByRole("button", { name: "Giriş yap" }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Genel bakış" }),
  ).toBeVisible();

  await page.goto("/yonetim/ayarlar");
  const announcement = page.getByLabel("Üst duyuru çubuğu");
  const original = await announcement.inputValue();
  await announcement.fill("E2E duyuru metni");
  await page.getByRole("button", { name: "Kaydet", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("kaydedildi");
  await page.goto("/");
  await expect(page.locator(".sales-bar")).toContainText("E2E duyuru metni");
  await page.goto("/yonetim/ayarlar");
  await page.getByLabel("Üst duyuru çubuğu").fill(original);
  await page.getByRole("button", { name: "Kaydet", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("kaydedildi");

  await page.goto("/yonetim/urunler/yeni");
  await page.getByLabel("Kategori").selectOption("akvaryumlar");
  await page.getByLabel("Genişlik (cm)").fill("65");
  await page.getByLabel("Derinlik (cm)").fill("35");
  await page.getByLabel("Yükseklik (cm)").fill("35");
  await page.getByRole("button", { name: "Bilgileri doldur" }).click();
  await expect(page.getByLabel("Ürün adı")).toHaveValue(
    "DSN 65 × 35 × 35 Cam Akvaryum",
  );
  const prices = page.getByLabel("Fiyat (TL)");
  await prices.nth(0).fill("7500");
  await prices.nth(1).fill("8250");
  await page
    .locator('input[type="file"]')
    .first()
    .setInputFiles({
      name: "akvaryum.png",
      mimeType: "image/png",
      buffer: onePixelPng,
    });
  const imageAddress = page.getByLabel("Görsel 1 adresi");
  await expect(imageAddress).toHaveValue(/^\/uploads\/.+\.webp$/);
  const uploaded = await request.get(await imageAddress.inputValue());
  expect(uploaded.status()).toBe(200);
  await page.getByRole("button", { name: "Ürünü oluştur" }).click();
  await expect(page).toHaveURL(/\/yonetim\/urunler\/akvaryum-65x35x35$/);

  await page.goto("/urun/akvaryum-65x35x35");
  await expect(
    page.getByRole("heading", { level: 1, name: "DSN 65 × 35 × 35 Cam Akvaryum" }),
  ).toBeVisible();
  await expect(page.locator(".detail-price")).toContainText("₺7.500,00");
  await expect(page.locator(".price-choice-grid")).toContainText("₺8.250,00");

  await page.goto("/yonetim/urunler/akvaryum-65x35x35");
  await page.getByLabel("Fiyat (TL)").nth(0).fill("7600");
  await page.getByRole("button", { name: "Değişiklikleri kaydet" }).click();
  await expect(page.getByRole("status")).toContainText("Ürün kaydedildi");
  await page.goto("/urun/akvaryum-65x35x35");
  await expect(page.locator(".detail-price")).toContainText("₺7.600,00");

  await page.goto("/yonetim/urunler/akvaryum-65x35x35");
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Ürünü sil" }).click();
  await expect(page).toHaveURL(/\/yonetim\/urunler$/);
  expect((await request.get("/urun/akvaryum-65x35x35")).status()).toBe(404);
});
