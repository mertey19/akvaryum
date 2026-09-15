import { put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/session";
import { localUploadsDir, storeKind } from "@/lib/content/store";

const extensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};
// Vercel functions accept request bodies up to 4.5 MB; the editor shrinks photos first.
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Giriş yapmalısınız." }, { status: 401 });
  const file = (await request.formData()).get("file");
  if (!(file instanceof File))
    return NextResponse.json({ error: "Görsel seçilmedi." }, { status: 400 });
  const extension = extensions[file.type];
  if (!extension)
    return NextResponse.json(
      { error: "Yalnızca JPG, PNG, WebP veya AVIF görseller yüklenebilir." },
      { status: 415 },
    );
  if (file.size > MAX_BYTES)
    return NextResponse.json(
      { error: "Görsel 4 MB'den küçük olmalı." },
      { status: 413 },
    );
  const name = `${Date.now()}-${randomUUID().slice(0, 8)}.${extension}`;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`uploads/${name}`, file, {
      access: "public",
      contentType: file.type,
    });
    return NextResponse.json({ url: blob.url });
  }
  if (storeKind() === "file") {
    await mkdir(localUploadsDir(), { recursive: true });
    await writeFile(
      path.join(localUploadsDir(), name),
      Buffer.from(await file.arrayBuffer()),
    );
    return NextResponse.json({ url: `/uploads/${name}` });
  }
  return NextResponse.json(
    {
      error:
        "Görsel deposu bağlı değil. Vercel'de Blob deposunu projeye bağlayın.",
    },
    { status: 503 },
  );
}
