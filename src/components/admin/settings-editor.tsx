"use client";
import { useState } from "react";
import type { Settings } from "@/lib/content/schema";
import { saveSettings } from "@/app/yonetim/actions";
import {
  applyItemAction,
  ItemControls,
  SaveForm,
  StringList,
  TextArea,
  TextInput,
} from "./form-kit";
import { ImageField } from "./image-field";

type TextKey = {
  [K in keyof Settings]: Settings[K] extends string ? K : never;
}[keyof Settings];

export function SettingsEditor({ settings }: { settings: Settings }) {
  const [draft, setDraft] = useState(settings);
  const text = (key: TextKey) => ({
    value: draft[key],
    onChange: (value: string) =>
      setDraft((current) => ({ ...current, [key]: value })),
  });
  function updateFaq(index: number, change: Partial<Settings["faq"][number]>) {
    setDraft((current) => ({
      ...current,
      faq: current.faq.map((item, i) =>
        i === index ? { ...item, ...change } : item,
      ),
    }));
  }
  return (
    <SaveForm action={saveSettings} payload={draft} submitLabel="Kaydet">
      <section className="admin-card">
        <h2>İşletme</h2>
        <div className="admin-grid">
          <TextInput
            label="Site adı"
            required
            hint="Google'da ve sayfa başlıklarında görünür."
            {...text("name")}
          />
          <TextInput label="İşletme adı" required {...text("fullName")} />
          <TextInput
            label="Logo yanındaki yazı"
            required
            {...text("brandLabel")}
          />
        </div>
        <ImageField label="Logo" {...text("logoPath")} />
      </section>

      <section className="admin-card">
        <h2>İletişim</h2>
        <div className="admin-grid">
          <TextInput
            label="Telefon"
            hint="Sitede bu biçimde görünür, ör. 0545 389 71 47"
            {...text("phone")}
          />
          <TextInput
            label="WhatsApp numarası"
            hint="Ülke koduyla, ör. +905453897147"
            {...text("whatsapp")}
          />
          <TextInput
            label="Sosyal medya kullanıcı adı"
            hint="@ işareti olmadan"
            {...text("socialHandle")}
          />
          <TextInput label="E-posta" type="email" {...text("email")} />
          <TextInput label="Çalışma saatleri" {...text("hours")} />
        </div>
        <TextArea label="Adres" rows={2} {...text("address")} />
      </section>

      <section className="admin-card">
        <h2>Ürün bilgileri</h2>
        <div className="admin-grid">
          <TextInput
            label="Akvaryum camı"
            hint="Katalog ve ürün sayfalarında gösterilir."
            {...text("aquariumGlass")}
          />
          <TextInput
            label="Fiyata dahil olanlar"
            hint="Akvaryum kartlarında fiyatların altında görünür."
            {...text("aquariumPriceIncludes")}
          />
        </div>
      </section>

      <section className="admin-card">
        <h2>Duyuru ve Google</h2>
        <TextInput label="Üst duyuru çubuğu" {...text("announcement")} />
        <TextArea
          label="Google açıklaması (ana sayfa)"
          rows={3}
          hint="Google sonucunda başlığın altında görünür; 150–160 karakter önerilir."
          {...text("homeDescription")}
        />
      </section>

      <section className="admin-card">
        <h2>Ana sayfa</h2>
        <div className="admin-grid">
          <TextInput label="Üst etiket" {...text("heroEyebrow")} />
          <TextInput label="Başlık" {...text("heroTitle")} />
          <TextInput label="Başlık ikinci satır" {...text("heroTitleAccent")} />
          <TextInput label="Vurgulu cümle" {...text("heroLead")} />
        </div>
        <TextArea label="Açıklama" rows={2} {...text("heroText")} />
        <ImageField label="Ana görsel" {...text("heroImage")} />
        <div className="admin-grid">
          <TextInput label="Hazır stok başlığı" {...text("readyStockTitle")} />
          <TextInput label="Hazır stok metni" {...text("readyStockText")} />
        </div>
        <StringList
          label="Öne çıkan maddeler"
          values={draft.valueStrip}
          onChange={(valueStrip) =>
            setDraft((current) => ({ ...current, valueStrip }))
          }
          addLabel="+ Madde ekle"
        />
      </section>

      <section className="admin-card">
        <h2>Sık sorulan sorular</h2>
        {draft.faq.map((item, index) => (
          <div className="admin-list-item" key={index}>
            <TextInput
              label="Soru"
              value={item.question}
              onChange={(question) => updateFaq(index, { question })}
            />
            <TextArea
              label="Cevap"
              value={item.answer}
              onChange={(answer) => updateFaq(index, { answer })}
            />
            <ItemControls
              index={index}
              count={draft.faq.length}
              label={`Soru ${index + 1}`}
              onAction={(action) =>
                setDraft((current) => ({
                  ...current,
                  faq: applyItemAction(current.faq, index, action),
                }))
              }
            />
          </div>
        ))}
        <button
          type="button"
          className="admin-add"
          onClick={() =>
            setDraft((current) => ({
              ...current,
              faq: [...current.faq, { question: "", answer: "" }],
            }))
          }
        >
          + Soru ekle
        </button>
      </section>

      <section className="admin-card">
        <h2>Hakkımızda, iletişim ve alt bilgi</h2>
        <TextInput label="Hakkımızda başlığı" {...text("aboutHeading")} />
        <StringList
          label="Hakkımızda paragrafları"
          multiline
          values={draft.aboutParagraphs}
          onChange={(aboutParagraphs) =>
            setDraft((current) => ({ ...current, aboutParagraphs }))
          }
          addLabel="+ Paragraf ekle"
        />
        <div className="admin-grid">
          <TextInput label="İletişim sayfası başlığı" {...text("contactHeading")} />
          <TextInput
            label="İletişim sayfası açıklaması"
            {...text("contactIntro")}
          />
        </div>
        <TextArea
          label="Alt bilgi sloganı"
          rows={2}
          hint="Satır atlamak için Enter kullanabilirsiniz."
          {...text("footerTagline")}
        />
      </section>
    </SaveForm>
  );
}
