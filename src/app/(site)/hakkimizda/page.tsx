import Link from "next/link";
import { getSettings } from "@/lib/repository";
import { meta } from "@/lib/seo";
export async function generateMetadata() {
  const settings = await getSettings();
  return meta(
    "Hakkımızda",
    `Akvaryum üretiminde ${settings.aquariumGlass} kullanan ${settings.name} hakkında bilgiler.`,
    "/hakkimizda",
  );
}
export default async function Page() {
  const settings = await getSettings();
  return (
    <article className="container section prose">
      <span className="eyebrow">{settings.brandLabel}</span>
      <h1>{settings.aboutHeading}</h1>
      <p className="lead">{settings.fullName}.</p>
      {settings.aquariumGlass && (
        <p className="verified-fact">
          Akvaryumlarımızı üretirken {settings.aquariumGlass} kullanıyoruz.
        </p>
      )}
      {settings.aboutParagraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      <Link className="button" href="/iletisim">
        Bilgi talebi hazırlayın
      </Link>
    </article>
  );
}
