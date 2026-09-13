# DSN Akvaryum İmalatı

DSN Akvaryum İmalatı için Türkçe, mobil uyumlu ürün kataloğu ve WhatsApp sipariş uygulaması. Akvaryum, teraryum, paludaryum ve ekipman ürünleri aranabilir, karşılaştırılabilir ve doğrulanmış WhatsApp hattına ürün bağlamıyla iletilebilir. Uygulama içinde sepet veya ödeme alınmaz; sipariş, ödeme ve teslimat ayrıntıları WhatsApp görüşmesinde netleştirilir.

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

- Ana sayfa: kullanıcı tarafından sağlanan DSN logosu, belirgin `DSN AKVARYUM İMALATI` marka başlığı, canlı akvaryum hero görseli, sekiz kategori, sekiz öne çıkan ürün, hazır ölçü akvaryum duyurusu, WhatsApp sipariş bağlantıları, ölçü aracı, üç rehber ve SSS.
- `/urunler`: 22 katalog kaydı; bunların 14’ü sağlanan 18.04.2026 tarihli listedeki ölçü ve `90° / 45°` fiyat seçenekleriyle sunulan DSN akvaryumlarıdır. Teraryum, paludaryum ve ekipman alanları doğrulanmamış model veya teknik değer üretmeden kategori bazlı WhatsApp bilgi talebi açar. Türkçe/aksansız arama; `terrarium`, `terraryum`, `paladaryum` ve `paludarium` eşanlamları; fiyat/marka/stok/kategori/teknik özellik filtreleri, sıralama, seçili etiketler ve sayfalama çalışır.
- `/urun/[slug]`: teknik tablo, seçim/talep kodu, fiyat ve stok bilgisi, akvaryumlarda iki görünür fiyat seçeneği, görsel büyütme, ürün ve varyant bilgisiyle doğrudan WhatsApp siparişi veya bilgi talebi ve detaylı mesaj hazırlığı.
- `/favoriler`, `/karsilastir`: tarayıcıda yalnızca anonim ürün/varyant kimliği saklanır; aynı kategoriden en fazla üç ürün karşılaştırılır. Ekleme, kaldırma ve yenileme çalışır.
- `/teklif`: ölçü doğrulama, yaklaşık brüt hacim, su türü/mobilya/renk/şehir/not ve doğrulanmış hatta açılan WhatsApp sipariş mesajı.
- `/iletisim`: doğrulanmış telefon ve WhatsApp sipariş hattı, adres ve sosyal hesap kullanıcı adı; ürün bağlamını koruyan WhatsApp mesajı. Sosyal platform ve profil bağlantısı doğrulanmadığı için uydurulmaz.
- `/rehber` ve üç rehber detayı, `/hakkimizda`, demo konsept galerisi `/projeler`, doğru 404, katalog yükleniyor ve hata ekranları.
- Mobil menü/filtre için yerel `dialog`, Escape ve odak dönüşü; klavye ile mega menü ve arama önerileri; azaltılmış hareket desteği.

Arama motoru erişimi demo modundan ayrıdır: site adresi bilinmiyorsa (`SITE_URL` boş ve Vercel production adresi yoksa), preview dağıtımlarında veya `ALLOW_INDEXING=false` iken `noindex,nofollow`, robots engeli ve boş sitemap uygulanır. Vercel production dağıtımında adres `VERCEL_PROJECT_PRODUCTION_URL` değerinden alınır; robots izin verir, sitemap sayfa ve ürünleri listeler ve canonical bu adresle üretilir. İndekslemeye açıkken uygun Organization/BreadcrumbList/Article/Product şemaları desteklenir; ürün teklifine sahte `Offer`, yorum veya puan eklenmez. Tek başına Product şeması zengin sonuç uygunluğu veya görünürlüğü garanti etmez.

## Güncelleme ve teslim belgeleri

- [Veri ve işletme bilgileri](docs/DATA.md): ürün JSON dosyası, model ve varyant alanları, fotoğraf ekleme, demo/yayın geçişi.
- [Görseller ve tam üretim promptları](docs/ASSETS.md): sağlanan marka logosu ile dört özgün üretilmiş görselin kaynakları, yerel dosyaları ve kullanım sınırları.
- [Test ve teslim raporu](docs/DELIVERY.md): gerçek komut sonuçları, görsel kontroller, Lighthouse ölçümleri ve eksik girdiler.

İşletme ayarı: `src/lib/config.ts`. Onaylı ürün verisi: `src/data/products.json`. Demo veri/repository: `src/lib/repository.ts`. Veri şeması/arama: `src/lib/catalog.ts`. Tasarım token’ları: `src/app/globals.css`.

## Canlı yayın için beklenen girdiler

DIAMOND cam kullanımı, hazır ölçü akvaryumların mevcut olduğu, `0545 389 71 47` telefonunun WhatsApp sipariş hattı olarak kullanılacağı, `Mamak Hüseyin Gazi, Ekin, Su Sk. No:17, 06160 Mamak/Ankara` adresi ve `Dursun.belgic` sosyal hesap kullanıcı adı işletme tarafından doğrulanmış ve sisteme işlenmiştir. Akvaryum ölçüleri ile `90° / 45°` fiyatları, kullanıcının sağladığı 18.04.2026 tarihli listeden aktarılmıştır. Canlı alan adı, güncel stok, teslimat/ödeme koşulları, izinli gerçek ürün fotoğrafları ve ilgili politika metinleri ayrıca tamamlanmalıdır.

Online ödeme, üyelik, sepet, sipariş takibi ve yönetim paneli eklenmedi. Site genelindeki sipariş ve iletişim eylemleri doğrulanmış WhatsApp hattına bağlandı; kullanıcı son gönderimi WhatsApp içinde yapar. Gerçek müşteri siparişi, ödeme ve teslimat işlemi otomatik testlerde gerçekleştirilmez.

## Teknik kaynaklar

Kurulum yaklaşımı [Next.js resmî kurulum belgeleri](https://nextjs.org/docs/app/getting-started/installation) ve [Tailwind CSS Next.js rehberi](https://tailwindcss.com/docs/installation/framework-guides/nextjs) ile kontrol edildi. Projenin `AGENTS.md` dosyasına uygun olarak kurulu Next.js paketindeki güncel sayfa/istemci belgeleri okundu. Yapılandırılmış veri yaklaşımı [Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/product), saha ölçümlerinin ayrımı [Web Vitals](https://web.dev/articles/vitals) belgeleriyle doğrulandı. [Creaqua ana sayfası](https://www.creaqua.com.tr/tr/), [akvaryum kategorisi](https://www.creaqua.com.tr/tr/28-akvaryum), [45° seri](https://www.creaqua.com.tr/tr/akvaryum/7-2590-creaqua-crystal-akvaryum.html) ve [klasik seri](https://www.creaqua.com.tr/tr/akvaryum/72-2576-crystal-classic.html) yalnızca bilgi hiyerarşisi ve genel görünüm referansı olarak incelendi; metin, görsel ve tasarım birebir kopyalanmadı.
