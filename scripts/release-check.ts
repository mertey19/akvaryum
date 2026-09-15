import { publishedProducts } from "../src/lib/catalog";
import { siteConfig } from "../src/lib/config";
import { readSiteContent } from "../src/lib/content/store";

async function main() {
  const { settings, products } = await readSiteContent();
  const issues: string[] = [];
  if (siteConfig.demo)
    issues.push("Demo modu açık. İşletme onayı alınmadan kapatılmamalı.");
  if (!/^https:\/\//.test(siteConfig.url))
    issues.push("Doğrulanmış HTTPS alan adı eksik.");
  if (!settings.phone && !settings.email && !settings.whatsapp)
    issues.push("Doğrulanmış iletişim kanalı eksik.");
  const real = publishedProducts(products, false);
  if (!real.length) issues.push("Onaylı, yayındaki gerçek ürün bulunmuyor.");
  const demoImages = new Set([
    "/images/products.webp",
    "/images/hero.webp",
    "/images/terrarium.webp",
    "/images/paludarium.webp",
  ]);
  if (
    real.some((product) =>
      product.images.some((image) => demoImages.has(image)),
    )
  )
    issues.push("Gerçek ürünlerde temsili demo görselleri kullanılamaz.");
  if (issues.length) {
    console.error(
      "Canlı yayına hazır değil:\n" + issues.map((x) => `- ${x}`).join("\n"),
    );
    process.exitCode = 1;
  } else
    console.log(
      "Yayın veri denetimi geçti. Görsel hakları ve işletme içerik onayları ayrıca tamamlanmalıdır.",
    );
}

void main();
