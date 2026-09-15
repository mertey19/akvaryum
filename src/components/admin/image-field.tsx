"use client";
import Image from "next/image";
import { useState } from "react";

const MAX_EDGE = 1600;

// Phone photos are often larger than a serverless request allows, so resize in the browser.
async function shrink(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error("Görsel işlenemedi.")),
      "image/webp",
      0.85,
    ),
  );
}

async function uploadImage(file: File) {
  const blob = await shrink(file);
  const body = new FormData();
  body.append("file", new File([blob], "gorsel.webp", { type: blob.type }));
  const response = await fetch("/yonetim/api/yukle", { method: "POST", body });
  const data = (await response.json().catch(() => ({}))) as {
    url?: string;
    error?: string;
  };
  if (!response.ok || !data.url)
    throw new Error(data.error || "Görsel yüklenemedi.");
  return data.url;
}

export function ImageField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className="admin-field admin-image-field">
      <span>{label}</span>
      {value && (
        <Image src={value} alt="" width={160} height={110} unoptimized />
      )}
      <div className="admin-row">
        <input
          aria-label={`${label} adresi`}
          value={value}
          placeholder="Görsel yükleyin veya adres yapıştırın"
          onChange={(e) => onChange(e.target.value)}
        />
        <label className="button secondary admin-upload">
          {busy ? "Yükleniyor…" : "Görsel yükle"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            hidden
            disabled={busy}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              setBusy(true);
              setError("");
              try {
                onChange(await uploadImage(file));
              } catch (err) {
                setError(
                  err instanceof Error ? err.message : "Görsel yüklenemedi.",
                );
              } finally {
                setBusy(false);
              }
            }}
          />
        </label>
      </div>
      {hint && <small>{hint}</small>}
      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
