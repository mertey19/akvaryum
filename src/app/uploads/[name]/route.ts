import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { localUploadsDir, storeKind } from "@/lib/content/store";

const types: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
};

// Serves images uploaded in local file mode; production uploads live in Vercel Blob.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const match = /^[\w-]+\.(jpg|png|webp|avif)$/.exec(name);
  if (storeKind() !== "file" || !match)
    return new NextResponse(null, { status: 404 });
  try {
    const data = await readFile(path.join(localUploadsDir(), name));
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": types[match[1]],
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
