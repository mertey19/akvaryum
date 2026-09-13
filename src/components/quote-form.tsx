"use client";
import { useRef, useState } from "react";
import { grossVolume, whatsappLink } from "@/lib/quote";
import { Icon } from "./icon";
export function QuoteForm({
  phone = "",
  productContext = "",
  custom = true,
  min = 10,
  max = 300,
}: {
  phone?: string;
  productContext?: string;
  custom?: boolean;
  min?: number;
  max?: number;
}) {
  const [dims, setDims] = useState({ width: "60", depth: "30", height: "36" });
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const output = useRef<HTMLTextAreaElement>(null);
  const volume = grossVolume(
    Number(dims.width),
    Number(dims.depth),
    Number(dims.height),
    min,
    max,
  );
  const link = whatsappLink(phone, summary);
  function invalidate() {
    setSummary("");
    setStatus("");
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setStatus("Özet kopyalandı. Henüz bir talep gönderilmedi.");
    } catch {
      output.current?.focus();
      output.current?.select();
      setStatus(
        "Otomatik kopyalama kullanılamıyor. Seçili özeti elle kopyalayın.",
      );
    }
  }
  return (
    <div className="quote-layout">
      <form
        className="quote-form panel"
        onChange={invalidate}
        onSubmit={(e) => {
          e.preventDefault();
          if (custom && volume === null) {
            setError(`Her ölçü ${min}–${max} cm arasında olmalı.`);
            return;
          }
          setError("");
          const data = new FormData(e.currentTarget);
          const lines = [
            productContext.replace(
              "Ürün: /",
              `Ürün: ${window.location.origin}/`,
            ) || "DSN Akvaryum — kurulum bilgi talebi",
          ];
          if (custom)
            lines.push(
              `Ölçüler: ${dims.width} × ${dims.depth} × ${dims.height} cm`,
              `Yaklaşık brüt hacim: ${volume?.toLocaleString("tr-TR")} L`,
            );
          for (const [k, v] of data.entries())
            if (String(v).trim()) lines.push(`${k}: ${v}`);
          setSummary(lines.join("\n"));
          setStatus("Özet hazır. Bilgiler gönderilmedi.");
          setTimeout(() => output.current?.focus(), 0);
        }}
      >
        <span className="eyebrow">01 / TALEBİNİZ</span>
        <h2>
          {custom ? "Ölçülerle başlayalım." : "Neyi öğrenmek istersiniz?"}
        </h2>
        {productContext && <p className="context-box">{productContext}</p>}
        {custom && (
          <>
            <div className="dimension-fields">
              {(["width", "depth", "height"] as const).map((k, i) => (
                <label className="field" key={k}>
                  {["Genişlik", "Derinlik", "Yükseklik"][i]} (cm)
                  <input
                    required
                    type="number"
                    min={min}
                    max={max}
                    step="0.1"
                    value={dims[k]}
                    aria-describedby="dimension-help"
                    aria-invalid={volume === null}
                    onChange={(e) => setDims({ ...dims, [k]: e.target.value })}
                  />
                </label>
              ))}
            </div>
            <p
              id="dimension-help"
              className={volume === null ? "field-error" : "muted"}
            >
              Her ölçü {min}–{max} cm arasında olmalıdır.
            </p>
            <div className="volume-box">
              <span>Yaklaşık brüt hacim</span>
              <strong data-testid="volume">
                {volume === null
                  ? "—"
                  : volume.toLocaleString("tr-TR", {
                      maximumFractionDigits: 2,
                    })}{" "}
                <small>L</small>
              </strong>
              <p>
                Dış ölçülere göre geometrik hesap. Gerçek su miktarı, güvenli
                cam kalınlığı veya taşıma kapasitesi değildir.
              </p>
            </div>
            <div className="form-grid">
              <label className="field">
                Su tercihi
                <select name="Su tercihi">
                  <option>Tatlı su</option>
                  <option>Tuzlu su</option>
                  <option>Henüz karar vermedim</option>
                </select>
              </label>
              <label className="field">
                Mobilya ihtiyacı
                <select name="Mobilya">
                  <option>İstiyorum</option>
                  <option>İstemiyorum</option>
                  <option>Bilgi almak istiyorum</option>
                </select>
              </label>
              <label className="field">
                Renk tercihi
                <input name="Renk" maxLength={80} placeholder="Örn. siyah" />
              </label>
              <label className="field">
                Teslimat şehri
                <input
                  name="Teslimat şehri"
                  maxLength={80}
                  placeholder="Şehir"
                />
              </label>
            </div>
          </>
        )}
        <label className="field">
          {custom ? "Notunuz (isteğe bağlı)" : "Mesajınız"}
          <textarea
            name="Not"
            rows={4}
            maxLength={2000}
            required={!custom}
            placeholder="Kurulum fikrinizi veya ürünle ilgili sorunuzu yazın."
          />
        </label>
        <p className="muted">
          Ad, telefon ve e-posta istenmez. Form içeriği bu sayfada kalır;
          sunucuya veya tarayıcı depolamasına kaydedilmez.
        </p>
        {error && (
          <p role="alert" className="field-error">
            {error}
          </p>
        )}
        <button className="button">
          Talep özetini oluştur <Icon name="arrow" size={18} />
        </button>
      </form>
      <section className="quote-summary panel">
        <span className="eyebrow">02 / PAYLAŞMAYA HAZIR</span>
        <h2>Talebinizin özeti.</h2>
        {summary ? (
          <>
            <label className="field">
              Hazırlanan özet
              <textarea
                aria-label="Talep özeti"
                ref={output}
                readOnly
                value={summary}
                rows={12}
              />
            </label>
            <button className="button" onClick={copy}>
              <Icon name="copy" size={18} /> Özeti kopyala
            </button>
            {link && (
              <a
                className="button whatsapp"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp taslağını aç
              </a>
            )}
          </>
        ) : (
          <div className="summary-placeholder">
            <Icon name="water" size={42} />
            <p>
              Bilgilerinizi tamamlayın.
              <br />
              Özetiniz burada oluşacak.
            </p>
          </div>
        )}
        <p role="status" className="copy-status">
          {status}
        </p>
        <div className="notice">
          {phone
            ? "WhatsApp bağlantısı yalnızca mesaj taslağını açar. Gönderimi siz yaparsınız."
            : "Doğrulanmış WhatsApp numarası henüz eklenmedi. Hazırladığınız özeti kopyalayabilirsiniz."}
        </div>
        <p className="muted">
          Bu adım fiyat garantisi, sipariş veya üretim taahhüdü oluşturmaz.
        </p>
      </section>
    </div>
  );
}
