"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { productSchema } from "@/lib/catalog";
import {
  adminConfigured,
  assertAdmin,
  endSession,
  startSession,
} from "@/lib/admin/session";
import { refreshSiteContent } from "@/lib/content/refresh";
import {
  contentSchemas,
  findContentIssues,
  guideSchema,
  settingsSchema,
  type ContentKey,
  type SiteContent,
} from "@/lib/content/schema";
import { readSiteContent, writeSiteContent } from "@/lib/content/store";

export type ActionState = { ok: boolean; message: string } | null;

function describe(error: unknown) {
  if (error instanceof z.ZodError)
    return error.issues
      .slice(0, 6)
      .map((issue) =>
        issue.path.length
          ? `${issue.path.join(".")}: ${issue.message}`
          : issue.message,
      )
      .join(" · ");
  if (error instanceof SyntaxError) return "Form verisi okunamadı.";
  return error instanceof Error
    ? error.message
    : "Beklenmeyen bir hata oluştu.";
}

function readPayload(formData: FormData): unknown {
  return JSON.parse(String(formData.get("payload") ?? "null"));
}

// Validates the whole site with the change applied before anything is written.
async function saveContent(changes: Partial<SiteContent>) {
  const next = { ...(await readSiteContent()), ...changes };
  const issues = findContentIssues(next);
  if (issues.length) throw new Error(issues.slice(0, 6).join(" · "));
  for (const [key, value] of Object.entries(changes))
    await writeSiteContent(key as ContentKey, value as never);
  refreshSiteContent();
}

export async function login(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!adminConfigured())
    return {
      ok: false,
      message:
        "ADMIN_PASSWORD tanımlı değil. Vercel ortam değişkenlerine ekleyip yeniden yayınlayın.",
    };
  if (!(await startSession(String(formData.get("password") ?? "")))) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { ok: false, message: "Şifre hatalı." };
  }
  redirect("/yonetim");
}

export async function logout() {
  await endSession();
  redirect("/yonetim/giris");
}

export async function saveSettings(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await assertAdmin();
    await saveContent({ settings: settingsSchema.parse(readPayload(formData)) });
    return { ok: true, message: "İşletme bilgileri ve metinler kaydedildi." };
  } catch (error) {
    return { ok: false, message: describe(error) };
  }
}

export async function saveProduct(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  let createdId: string;
  try {
    await assertAdmin();
    const originalId = String(formData.get("originalId") ?? "");
    const input = readPayload(formData) as Record<string, unknown>;
    const { products } = await readSiteContent();
    const index = products.findIndex((p) => p.id === originalId);
    const product = productSchema.parse(
      index === -1 ? { ...input, addedAt: Date.now() } : input,
    );
    await saveContent({
      products:
        index === -1
          ? [...products, product]
          : products.map((p, i) => (i === index ? product : p)),
    });
    if (index !== -1) return { ok: true, message: "Ürün kaydedildi." };
    createdId = product.id;
  } catch (error) {
    return { ok: false, message: describe(error) };
  }
  redirect(`/yonetim/urunler/${createdId}`);
}

export async function deleteProduct(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const { products } = await readSiteContent();
  await saveContent({ products: products.filter((p) => p.id !== id) });
  redirect("/yonetim/urunler");
}

export async function saveCategories(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await assertAdmin();
    const { categories, menu } = z
      .object({
        categories: contentSchemas.categories,
        menu: contentSchemas.menu,
      })
      .parse(readPayload(formData));
    await saveContent({ categories, menu });
    return { ok: true, message: "Kategoriler ve menü kaydedildi." };
  } catch (error) {
    return { ok: false, message: describe(error) };
  }
}

export async function saveGuide(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  let savedSlug: string;
  try {
    await assertAdmin();
    const originalSlug = String(formData.get("originalSlug") ?? "");
    const guide = guideSchema.parse(readPayload(formData));
    const { guides } = await readSiteContent();
    const index = guides.findIndex((g) => g.slug === originalSlug);
    await saveContent({
      guides:
        index === -1
          ? [...guides, guide]
          : guides.map((g, i) => (i === index ? guide : g)),
    });
    if (index !== -1 && guide.slug === originalSlug)
      return { ok: true, message: "Rehber yazısı kaydedildi." };
    savedSlug = guide.slug;
  } catch (error) {
    return { ok: false, message: describe(error) };
  }
  redirect(`/yonetim/rehber/${savedSlug}`);
}

export async function deleteGuide(formData: FormData) {
  await assertAdmin();
  const slug = String(formData.get("slug") ?? "");
  const { guides } = await readSiteContent();
  await saveContent({ guides: guides.filter((g) => g.slug !== slug) });
  redirect("/yonetim/rehber");
}

export async function saveProjects(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await assertAdmin();
    await saveContent({
      projects: contentSchemas.projects.parse(readPayload(formData)),
    });
    return { ok: true, message: "Galeri kaydedildi." };
  } catch (error) {
    return { ok: false, message: describe(error) };
  }
}
