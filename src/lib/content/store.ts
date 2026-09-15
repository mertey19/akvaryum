import { neon } from "@neondatabase/serverless";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  contentKeys,
  contentSchemas,
  type ContentKey,
  type SiteContent,
} from "./schema";
import { seedContent } from "./seed";

export type StoreKind = "database" | "file" | "seed";

function databaseUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
}

// Vercel's filesystem is read-only, so without a database the site serves the
// seed content there; locally a JSON file keeps the panel fully usable.
export function storeKind(): StoreKind {
  const forced = process.env.CONTENT_STORE;
  if (forced === "seed" || forced === "file") return forced;
  if (databaseUrl()) return "database";
  return process.env.VERCEL ? "seed" : "file";
}

function dataDir() {
  // Runtime-only location; keep the bundler from tracing the whole project.
  return path.resolve(
    /* turbopackIgnore: true */ process.cwd(),
    process.env.CONTENT_DATA_DIR || ".data",
  );
}

export function localUploadsDir() {
  return path.join(dataDir(), "uploads");
}

function contentFile() {
  return path.join(dataDir(), "content.json");
}

let tableReady: Promise<unknown> | null = null;

async function ensureTable() {
  tableReady ??= neon(databaseUrl())`
    create table if not exists site_content (
      key text primary key,
      value jsonb not null,
      updated_at timestamptz not null default now()
    )
  `.catch((error) => {
    tableReady = null;
    throw error;
  });
  await tableReady;
}

async function readRaw(): Promise<Partial<Record<string, unknown>>> {
  const kind = storeKind();
  if (kind === "database") {
    await ensureTable();
    const rows = (await neon(databaseUrl())`
      select key, value from site_content
    `) as { key: string; value: unknown }[];
    return Object.fromEntries(rows.map((row) => [row.key, row.value]));
  }
  if (kind === "file") {
    try {
      return JSON.parse(await readFile(contentFile(), "utf8"));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return {};
      throw error;
    }
  }
  return {};
}

export async function readSiteContent(): Promise<SiteContent> {
  const raw = await readRaw();
  const content: Record<string, unknown> = seedContent();
  for (const key of contentKeys) {
    if (raw[key] === undefined) continue;
    const parsed = contentSchemas[key].safeParse(raw[key]);
    if (parsed.success) content[key] = parsed.data;
    else
      console.error(
        `Kayıtlı "${key}" içeriği geçersiz; varsayılan içerik kullanılıyor.`,
        parsed.error.issues,
      );
  }
  return content as SiteContent;
}

export async function writeSiteContent<K extends ContentKey>(
  key: K,
  value: SiteContent[K],
) {
  const data = contentSchemas[key].parse(value);
  const kind = storeKind();
  if (kind === "database") {
    await ensureTable();
    await neon(databaseUrl())`
      insert into site_content (key, value, updated_at)
      values (${key}, ${JSON.stringify(data)}::jsonb, now())
      on conflict (key) do update set value = excluded.value, updated_at = now()
    `;
    return;
  }
  if (kind === "file") {
    await mkdir(dataDir(), { recursive: true });
    const current = await readRaw();
    const temporary = `${contentFile()}.${process.pid}.tmp`;
    await writeFile(
      temporary,
      JSON.stringify({ ...current, [key]: data }, null, 2),
    );
    await rename(temporary, contentFile());
    return;
  }
  throw new Error(
    "Veritabanı bağlı olmadığı için kaydedilemedi. Vercel'de Neon veritabanını projeye bağlayın.",
  );
}
