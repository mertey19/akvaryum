# Veri ve işletme bilgilerini güncelleme

## İşletme bilgileri

`src/lib/config.ts` tek işletme ayarı kaynağıdır. Görünür tam marka adı `fullName: "DSN Akvaryum İmalatı"`, büyük harfli marka satırı `brandLabel: "DSN AKVARYUM İMALATI"` ve sağlanan logo yolu `logoPath: "/images/dsn-logo.jpeg"` alanlarında tutulur. Telefon, e-posta, adres, saat ve `customProductionVerified` alanlarını yalnızca işletme tarafından doğrulanınca doldurun. `.env.example` dosyasını `.env.local` olarak kopyalayın. `SITE_URL` gerçek HTTPS adresi, `WHATSAPP_NUMBER` uluslararası biçimde ülke koduyla doğrulanmış WhatsApp numarasıdır. Boş numara WhatsApp düğmesi oluşturmaz. Değişiklikten sonra yeniden derleyin.

Doğrulanmış iletişim değerleri `phone: "0545 389 71 47"`, `phoneHref: "tel:+905453897147"`, `whatsapp: "+905453897147"`, `address: "Mamak Hüseyin Gazi, Ekin, Su Sk. No:17, 06160 Mamak/Ankara"` ve `socialHandle: "Dursun.belgic"` olarak tutulur. Kullanıcı, telefon numarasının WhatsApp sipariş hattı olarak da kullanılacağını 13 Eylül 2026 tarihinde doğruladı. Ekranda yerel telefon biçimi gösterilir; arama bağlantısı ve Organization yapılandırılmış verisindeki `telephone`, `+905453897147` E.164 değerini kullanır. E-posta, alan adı ile sosyal hesabın platformu ve profil URL'si henüz doğrulanmamıştır.

Doğrulanmış işletme bilgisi: DSN Akvaryum, akvaryumlarını üretirken DIAMOND cam kullanır. Bu bilgi tek kaynak olarak `aquariumGlass` ayarında tutulur. Fiyat listesiyle sağlanan DSN akvaryum kayıtlarında `Cam` alanına uygulanır. Gelecekte eklenen gerçek veya üçüncü taraf ürünlerde bu alan ürün bazında ayrıca doğrulanmalıdır. Özel ölçü üretimi ayrıca doğrulanmadığı için `customProductionVerified` bağımsız olarak `false` kalır.

Akvaryum fiyatlarına arka fon ve zemin matının dahil olduğu bilgisi kullanıcı tarafından 13 Eylül 2026 tarihinde iletildi. Metin tek kaynak olarak `aquariumPriceIncludes` ayarında tutulur; akvaryum kartlarında, ürün detayındaki fiyat seçeneklerinde, akvaryum kataloğu girişinde ve akvaryum kayıtlarının açıklama ile paket içeriği alanlarında gösterilir.

Hazır ölçü akvaryumların mevcut olduğu kullanıcı tarafından 13 Eylül 2026 tarihinde doğrulandı. Arayüz bu bilgiyi ana sayfa, üst duyuru alanı ve akvaryum kataloğunda gösterir; güncel ölçü ve stok doğrulaması WhatsApp görüşmesinde yapılır.

## Akvaryum fiyat listesi

Kullanıcının sağladığı 18.04.2026 tarihli fiyat listesindeki 14 ölçü, `src/lib/repository.ts` içindeki DSN akvaryum kayıtlarına aktarılmıştır. Tutarlar TL olarak yorumlanıp uygulamada tam sayı kuruş saklanır. Kaynaktaki `90` ve `45` sütun başlıkları arayüzde `90°` ve `45°` olarak korunur; teknik karşılıkları doğrulanmış bir üretim iddiasına dönüştürülmez. Görünen brüt hacim, dış ölçülerin geometrik çarpımıdır. Stok, hazırlık süresi, cam kalınlığı, paket içeriği ve teslimat sağlanmadığı için bu alanlar bilgi alınmalı olarak kalır. Akvaryum görseli kategori düzeyindedir ve ölçüye özel fotoğraf olduğu iddia edilmez.

| Ölçü (cm)     |       90° |       45° |
| ------------- | --------: | --------: |
| 30 × 20 × 15  |  1.000 TL |  1.200 TL |
| 30 × 30 × 30  |  1.600 TL |  2.200 TL |
| 35 × 35 × 35  |  1.900 TL |  2.400 TL |
| 40 × 40 × 40  |  2.400 TL |  3.050 TL |
| 50 × 30 × 30  |  2.400 TL |  3.050 TL |
| 60 × 40 × 40  |  3.700 TL |  4.200 TL |
| 40 × 40 × 30  |  2.250 TL |  2.600 TL |
| 40 × 30 × 20  |  1.650 TL |  2.100 TL |
| 70 × 40 × 40  |  5.000 TL |  6.150 TL |
| 80 × 40 × 40  |  5.200 TL |  6.300 TL |
| 90 × 45 × 45  |  7.950 TL |  9.900 TL |
| 100 × 50 × 45 |  8.400 TL | 10.500 TL |
| 120 × 50 × 45 |  9.100 TL | 10.800 TL |
| 150 × 50 × 40 | 12.000 TL | 13.100 TL |

Bu kayıtlar, fiyat ve ölçü kaynağı verilmiş olsa da ürün kimliği, fotoğraf, stok ve üretim ayrıntıları tamamlanmadığı için `isDemo: true` kalır. Fiyat listesinin güncelliği teklif öncesinde yeniden teyit edilmelidir.

## Teraryum ve paludaryum

`teraryumlar` ve `paludaryumlar` ayrı kategori kimlikleridir. Her kategoride tek bir tasarım ve bilgi talebi kaydı bulunur; ölçü, kapak, havalandırma, drenaj, su bölümü, cam tipi ve canlı uyumu WhatsApp görüşmesinde netleştirilir. Dikey/yatay, standart/geniş gibi onaylanmamış modeller üretilmez. Kullanıcının DIAMOND cam doğrulaması yalnız akvaryumlar için olduğundan bu özellik teraryum ve paludaryum kayıtlarına uygulanmaz. Kategori ve talep görselleri sırasıyla `/images/terrarium.webp` ve `/images/paludarium.webp` dosyalarını kullanır.

Ekipman kategorilerindeki kayıtlar model kataloğu değildir. Doğrulanmış marka, model, debi, güç, ölçü ve stok değeri verilmediği için yalnızca kategori bazlı WhatsApp bilgi talebi sunulur; kesin teknik değer gösterilmez.

`NEXT_PUBLIC_DEMO_MODE=true` yerel önizlemedir. Kapatmak için değer tam olarak `false` olmalıdır. Örnek ürünler kapatıldığında gizlenir; gerçek kayıtlar `src/data/products.json` dosyasından okunur. Gerçek veri eksikken demo modunu kapatmak içerik oluşturmaz.

## Ürün kaydı

`src/lib/catalog.ts` tipler, Zod şeması, Türkçe arama ve filtreleme fonksiyonlarını; `src/lib/repository.ts` veri erişimini ve ayrı demo ürünleri içerir. `src/data/products.json` şu anda boş bir dizidir. Veriler bileşenlerin içinde tutulmaz. Onaylı kayıtları bu diziye ekleyin; her kayıt `productSchema` ile doğrulanır.

Örnek alan yapısı (kopyalandığında hâlâ demo sayılır):

```json
{
  "id": "ornek-kayit",
  "slug": "ornek-kayit",
  "name": "Örnek kayıt",
  "categoryId": "akvaryumlar",
  "brand": "İşletmeden alınacak",
  "sku": "ORNEK-001",
  "gtin": null,
  "description": "Onaylı açıklama ile değiştirilecek örnek.",
  "images": ["/images/products.webp"],
  "imageAlt": "Temsili akvaryum görseli",
  "image": 0,
  "specifications": {
    "Cam": "DIAMOND cam",
    "Ölçü": "60 × 30 × 36 cm"
  },
  "variants": [],
  "price": null,
  "currency": "TRY",
  "stockStatus": "bilgi",
  "stockQuantity": null,
  "leadTime": null,
  "priceListDate": null,
  "deliveryType": "bilgi",
  "saleMode": "quote",
  "published": false,
  "isDemo": true,
  "addedAt": 0,
  "packageContents": "Doğrulanmalı."
}
```

Alan kuralları:

- Gerçek ürünlerde örnek metinleri, SKU ve görselleri değiştirin. İçerik onayından sonra `isDemo: false`, yayına alma kararıyla `published: true` kullanın. Demo kayıtlarını yalnızca işareti değiştirerek gerçek stoğa dönüştürmeyin.
- Fiyat **tam sayı kuruştur**: `325000` = 3.250 TL. Bilinmiyorsa `null`; sıfır ücretsiz demektir.
- Stok: `stokta`, `siparis`, `tukendi`, `bilgi`. Tükendi için adet `0` olmalıdır. Hazırlık süresi ayrı `leadTime` alanıdır.
- `priceListDate`, yalnızca kaynağı ve tarihi sağlanmış liste fiyatlarında `GG.AA.YYYY` olarak kullanılır; diğer ürünlerde `null` kalır. Akvaryum kartlarının iki fiyatlı görünümü bu açık kaynak alanına bağlıdır. Kaynağı sağlanmayan ekipman, teraryum ve paludaryum fiyatları `null` kalır ve WhatsApp üzerinden sorulur.
- Teslimat: `standart`, `ozel`, `magaza`, `bilgi`. Yöntem veya bedel doğrulanmadıysa `bilgi` kullanılır; ücretsiz yazılmaz.
- Kategoriler `catalog.ts` içinde tanımlıdır. Aynı kategoriden en fazla üç ürün karşılaştırılır.
- Varyant alanları: `id`, `name`, `sku`, `price`, `stockStatus`, `image`, `specifications`; isteğe bağlı `images` dizisi ana görsellerin yerine geçer. `image` alanı yalnızca demo kategori görselindeki 0–5 bölge indeksidir. Gerçek fotoğraflarda `images` dosya yolları kullanılır.
- Gerçek, izinli fotoğrafları `public/images/` içine koyun. `images` dizisindeki birden fazla görsel için küçük resimler ve klavye/dokunma düğmeleriyle galeri kullanılabilir. Varyantlara özgü gerçek fotoğraflar henüz sağlanmadığından demo aynı temsili kategori görselini kullanır.
- SKU, ürün kimliği ve slug benzersiz olmalıdır. GTIN yoksa `null` bırakın.

Ürün slug listesi derleme sırasında belirlenir. Ürün ekleyince `npm run build` gerekir; bilinmeyen slug gerçek HTTP 404 döner. Çok sık katalog güncellemesi gerekecekse aynı repository arayüzü kalıcı CMS/veritabanına bağlanmalıdır.

## İçerik ve proje yönetimi

Özgün rehberler `src/lib/guides.ts` dosyasındadır. Yazar veya tarih uydurulmaz. Galerideki tek kayıt `src/components/projects.tsx` içindeki açıkça işaretlenmiş konsept verisidir; gerçek projeler için başlık, tür, açıklama, görsel yolu ve yayın izni kaydı gereklidir. Mevcut konsept galerisini gerçek iş gibi yayımlamayın.

Teslimat/iade sözleşmesi ve başka hukuki politika metni üretilmedi. İşletmenin onaylı içerikleri gelmeden bu yollar menüye eklenmez.

## Yayın öncesi

`npm run release:check` demo modu, alan adı, iletişim kanalı, gerçek ürün ve demo görsel kontrolünü yapar. Bu sürümde eksik girdiler nedeniyle **bilerek başarısızdır**. Teknik derlemenin başarılı olması ticari yayına hazır olunduğu anlamına gelmez. Kontrol izin belgelerini veya işletme iddialarının doğruluğunu otomatik olarak doğrulayamaz.
