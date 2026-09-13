import { getProducts } from "../src/lib/repository";
import { siteConfig } from "../src/lib/config";
const issues: string[] = [];
if (siteConfig.demo)
  issues.push("Demo modu açık. İşletme onayı alınmadan kapatılmamalı.");
if (!/^https:\/\//.test(siteConfig.url))
  issues.push("Doğrulanmış HTTPS alan adı eksik.");
if (!siteConfig.phone && !siteConfig.email && !siteConfig.whatsapp)
  issues.push("Doğrulanmış iletişim kanalı eksik.");
const real = getProducts().filter((p) => !p.isDemo);
if (!real.length) issues.push("Onaylı, yayındaki gerçek ürün bulunmuyor.");
const demoImages = new Set([
  "/images/products.webp",
  "/images/hero.webp",
  "/images/terrarium.webp",
  "/images/paludarium.webp",
]);
if (
  real.some((product) => product.images.some((image) => demoImages.has(image)))
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
