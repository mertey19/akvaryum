# Veri ve işletme bilgilerini güncelleme

## İşletme bilgileri

`src/lib/config.ts` tek işletme ayarı kaynağıdır. Telefon, e-posta, adres, saat ve `customProductionVerified` alanlarını yalnızca işletme tarafından doğrulanınca doldurun. `.env.example` dosyasını `.env.local` olarak kopyalayın. `SITE_URL` gerçek HTTPS adresi, `WHATSAPP_NUMBER` uluslararası biçimde ülke koduyla gerçek numaradır. Boş numara WhatsApp düğmesi oluşturmaz. Değişiklikten sonra yeniden derleyin.

Doğrulanmış işletme bilgisi: DSN Akvaryum, akvaryumlarını üretirken DIAMOND cam kullanır. Bu bilgi tek kaynak olarak `aquariumGlass` ayarında tutulur. Mevcut DSN akvaryum demo kayıtlarında `Cam` alanına uygulanır. Gelecekte eklenen gerçek veya üçüncü taraf ürünlerde bu alan ürün bazında ayrıca doğrulanmalıdır. Özel ölçü üretimi ayrıca doğrulanmadığı için `customProductionVerified` bağımsız olarak `false` kalır.

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
  "deliveryType": "ozel",
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
- Teslimat: `standart`, `ozel`, `magaza`. Bilinmeyen bedel ücretsiz yazılmaz.
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
