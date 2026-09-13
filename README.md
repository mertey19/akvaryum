# DSN Akvaryum

Türkçe, mobil uyumlu ürün kataloğu ve teklif hazırlama uygulaması. Kullanıcının sağladığı inceleme/geliştirme belgesinin varsayılan katalog kapsamı uygulandı. Bu sürüm **yerel demo önizlemesidir**; gerçek satış, ödeme veya form teslimi yapılmaz.

## Çalıştırma

Node.js 20.9+ gerekir; geliştirme ve test ortamı Node 24.18.0 / npm 11.16.0. Next.js 16.3.5, React 19.2.8, TypeScript ve Tailwind CSS 4; kurulumun seçtiği uyumlu kararlı sürümler `package-lock.json` içinde kilitlidir.

```powershell
npm ci
npm run dev
```

Önizleme: http://localhost:3000

```powershell
npm run lint
npm run typecheck
npm run test
npm run build
npm run start
```

Tarayıcı testleri, ayrı terminalde üretim sunucusu açıkken çalışır; sunucu kapalıysa Playwright kendisi başlatır:

```powershell
npx playwright install chromium
npm run test:e2e
npm run audit
```

`audit` üç sayfada Lighthouse mobil laboratuvar ölçümü alır. `npm run release:check` gerçek yayına geçişte eksik verileri kontrol eder. Demo verilerle bu komutun hata vermesi beklenir.

## Uygulanan sayfalar ve akışlar

- Ana sayfa: özgün akvaryum hero görseli, altı kategori, sekiz öne çıkan ürün, kurulum/ekipman girişleri, ölçü aracı bağlantısı, üç rehber ve SSS.
- `/urunler`: 18 demo ürün; Türkçe/aksansız arama, fiyat/marka/stok/kategori/teknik özellik filtreleri, sıralama, seçili etiketler ve sayfalama. URL, yenileme ve geçmiş gezinmesi aynı sonucu korur.
- `/urun/[slug]`: teknik tablo, SKU/fiyat/stok/varyant seçimi, görsel büyütme ve çoklu görsel desteği, teslimat ayrımı, ürün ve varyantı koruyan bilgi talebi.
- `/favoriler`, `/karsilastir`: tarayıcıda yalnızca anonim ürün/varyant kimliği saklanır; aynı kategoriden en fazla üç ürün karşılaştırılır. Ekleme, kaldırma ve yenileme çalışır.
- `/teklif`: ölçü doğrulama, yaklaşık brüt hacim, su türü/mobilya/renk/şehir/not, okunabilir özet ve kopyalama. Doğrulanmış WhatsApp numarası ayarlanırsa WhatsApp taslağı açılır; otomatik gönderim yoktur.
- `/iletisim`: tek ayar kaynağından doğrulanmış telefon, adres ve sosyal hesap kullanıcı adı; ürün bağlamı korunan mesaj taslağı. Sosyal platform ve profil bağlantısı doğrulanmadığı için uydurulmaz. Kayıt yapılmış gibi başarı mesajı yoktur.
- `/rehber` ve üç rehber detayı, `/hakkimizda`, demo konsept galerisi `/projeler`, doğru 404, katalog yükleniyor ve hata ekranları.
- Mobil menü/filtre için yerel `dialog`, Escape ve odak dönüşü; klavye ile mega menü ve arama önerileri; azaltılmış hareket desteği.

Demo açıkken `noindex,nofollow`, robots engeli ve boş sitemap uygulanır. Alan adı doğrulanmadığı için canonical uydurulmaz. Gerçek modda uygun Organization/BreadcrumbList/Article/Product şemaları desteklenir; ürün teklifine sahte `Offer`, yorum veya puan eklenmez. Tek başına Product şeması zengin sonuç uygunluğu veya görünürlüğü garanti etmez.

## Güncelleme ve teslim belgeleri

- [Veri ve işletme bilgileri](docs/DATA.md): ürün JSON dosyası, model ve varyant alanları, fotoğraf ekleme, demo/yayın geçişi.
- [Görseller ve tam üretim promptları](docs/ASSETS.md): iki özgün üretilmiş görselin kaynakları, yerel dosyaları ve kullanım sınırları.
- [Test ve teslim raporu](docs/DELIVERY.md): gerçek komut sonuçları, görsel kontroller, Lighthouse ölçümleri ve eksik girdiler.

İşletme ayarı: `src/lib/config.ts`. Onaylı ürün verisi: `src/data/products.json`. Demo veri/repository: `src/lib/repository.ts`. Veri şeması/arama: `src/lib/catalog.ts`. Tasarım token’ları: `src/app/globals.css`.

## Canlı yayın için beklenen girdiler

DIAMOND cam kullanımı, `0545 389 71 47` telefonu, `Mamak Hüseyin Gazi, Ekin, Su Sk. No:17, 06160 Mamak/Ankara` adresi ve `Dursun_belgic` sosyal hesap kullanıcı adı işletme tarafından doğrulanmış ve sisteme işlenmiştir. Telefon numarası WhatsApp numarası olarak varsayılmaz. Canlı yayın için hâlâ doğrulanmış alan adı; onaylı ürün, fiyat, SKU, stok, diğer teknik ve teslimat bilgileri; izinli ürün/varyant/proje fotoğrafları; özel ölçü üretim kapsamının ayrıca teyidi ve ilgili onaylı politika metinleri gerekir. WhatsApp, e-posta, sosyal platform/profil bağlantısı ve çalışma saatleri yalnızca gösterilecekse ayrıca doğrulanmalıdır. Bu bilgiler olmadan site gerçek işletme kataloğu gibi yayımlanmadı.

Online ödeme, üyelik, sepet, sipariş takibi ve yönetim paneli belgedeki koşullu kapsamdır; varsayılan kataloğa eklenmedi. Sunucuya form kaydı veya mesaj gönderme entegrasyonu yoktur; kopyalama/WhatsApp taslağı akışı tamamlanmıştır. Gerçek e-posta/WhatsApp teslimi, gerçek müşteri siparişi ve ödeme test edilmedi.

## Teknik kaynaklar

Kurulum yaklaşımı [Next.js resmî kurulum belgeleri](https://nextjs.org/docs/app/getting-started/installation) ve [Tailwind CSS Next.js rehberi](https://tailwindcss.com/docs/installation/framework-guides/nextjs) ile kontrol edildi. Projenin `AGENTS.md` dosyasına uygun olarak kurulu Next.js paketindeki güncel sayfa/istemci belgeleri okundu. Yapılandırılmış veri yaklaşımı [Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/product), saha ölçümlerinin ayrımı [Web Vitals](https://web.dev/articles/vitals) belgeleriyle doğrulandı. Kullanıcının referans incelemesi gereksinim olarak kullanıldı; rakibin görselleri ve tasarımı kopyalanmadı.
