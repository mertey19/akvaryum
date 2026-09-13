# DSN Akvaryum — teslim ve doğrulama raporu

Tarih: 13 Eylül 2026. Yerel uygulama: `http://localhost:3000`. Kapsam: kullanıcının sağladığı belgedeki varsayılan katalog ve teklif hazırlama akışları. Ticari yayın yapılmadı.

## Son doğrulama sonuçları

| Kontrol | Gerçek sonuç |
| --- | --- |
| `npm run build` | Başarılı; Next.js üretim derlemesi ve tip denetimi tamamlandı. |
| `npm run lint` | Başarılı; sıfır hata/uyarı. Üretilmiş Playwright/Lighthouse raporları lint kapsamı dışında. |
| `npm run typecheck` | Başarılı; route tip üretimi ve `tsc --noEmit`. |
| `npm run test` | 7/7 geçti. |
| `npm run test:e2e` | 22/22 geçti, son tur 23,3 saniye. Üretim sunucusunda Chromium. |
| Axe erişilebilirlik | Ana sayfa, filtre kataloğu, ürün, teklif ve iletişimde WCAG 2 A/AA ve 2.1 AA etiketli otomatik denetimde ihlal yok. |
| Responsive | 360, 390, 768, 1024, 1440 px genişliklerde beş ana akış; 25 sayfa/genişlik kontrolünde yatay taşma yok. |
| `npm run release:check` | Beklenen ret: demo modu açık; gerçek alan adı, iletişim kanalı ve onaylı ürünler eksik. |

## Davranış testlerinin kapsamı

- `dış filtre`, `dis filtre`, büyük Türkçe harfler, SKU ve kategori araması; dış filtreler, açıklamasında aynı ifade geçen dolapların önünde.
- Klavye arama önerileri, Enter ile ürün seçimi, arama servisi hata durumu ve yeniden başarılı arama.
- Filtre/sıralama URL parametreleri, sayfanın filtre değişince sıfırlanması, sonuç sayısı, sıralama, yenileme ve geri/ileri gezinme; sonuç bulunamayan durumdan temizleyerek çıkış.
- Varyant fiyat/SKU/stok değişimi, seçilen varyantın iletişim taslağına aktarılması ve doğrudan varyant bağlantısının açılması.
- Favori ekleme/kaldırma ve yenileme; iki varyantın ayrı favoriler olması, favoriden doğru varyanta geri dönüş.
- Aynı kategoriden en fazla üç ürün karşılaştırma; dördüncü/farklı kategori reddi, kaldırma ve yenileme.
- Geçersiz ölçü reddi, 60×30×36 cm için 64,8 L ve 100×30×36 cm için 108 L brüt hacim.
- Özetin kopyalanması; pano hatasında kopyalama veya teslim başarısı iddia edilmemesi; alan değişince eski özetin geçersizleştirilmesi.
- Numara yokken WhatsApp bağlantısının oluşmaması; birim testinde gerçek gönderim yapmadan Türkçe mesaj ve bağlantı kodlamasının doğrulanması.
- Form metninin URL, ağ isteği, tarayıcı depolaması veya konsola taşınmaması. Form sunucuya kayıt yapmaz.
- Masaüstü mega menü odağı; mobil menü, filtre ve görsel penceresinde Escape ve açan elemana odak dönüşü.
- Geçersiz ürün slug’ında **HTTP 404**; `noindex`, robots engeli, boş demo sitemap ve etkisiz `href="#"` bulunmaması.
- Veri şeması, stok-adet tutarlılığı, fiyatın kuruşla saklanması ve demo kapandığında örnek ürünlerin dışlanması.

Online ödeme ve kalıcı form teslimi mevcut olmadığından bu sistemlerin başarılı/başarısız teslim testleri yapılmış gibi raporlanmaz.

## Görsel kontrol

Ana sayfa, kategori ve ürünün 390 px mobil ve 1440 px masaüstü tam sayfa ekran görüntüleri açılıp incelendi. Teklif formunun mobil görünümü de incelendi. Kartlar, görseller, fiyat alanı, ürün eylemi, filtre çekmecesi, navigasyon ve form düzeninde belirgin taşma/örtüşme veya kırık görsel görülmedi.

Dosyalar `artifacts/screenshots/` klasöründedir: `390-home.png`, `390-urunler.png`, `390-urun.png`, `390-teklif.png` ve karşılık gelen `1440-…` dosyaları. Ekran altındaki görseller için test, görünür alana kaydırıp gerçek yüklemeyi bekler. İlk test turunda erken yapılan görsel kontrolü bu şekilde düzeltildi.

İlk turlarda bulunan gerçek sorunlar düzeltildi: varyant alanının erişilebilir adı, akış halinde dönen 200 yerine gerçek 404, rehber numaralarının kontrastı, katalog yükleme ekranından ürünlere geçişte yerleşim kayması ve mobil katalog başlık sırası.

## Lighthouse — son üretim ölçümü

Lighthouse 13.4.1, Windows üzerinde Playwright Chromium, localhost üretim derlemesi. Mobil emülasyon: 412×823 px, DPR 1,75; simüle ağ 150 ms RTT / 1638,4 Kbps, 4× CPU yavaşlatma. Ölçüm zamanı 13 Eylül 2026 13:51 Türkiye saati. Her sayfa için son sürümde bir koşu; istatistiksel saha ölçümü değildir.

| Sayfa | Performans | Erişilebilirlik | İyi uygulamalar | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 98 | 100 | 100 | 66 | 2,4 sn | 0 | 50 ms |
| `/urunler?kategori=filtreler` | 95 | 100 | 100 | 63 | 2,9 sn | 0 | 70 ms |
| `/urun/clear-60` | 95 | 100 | 100 | 63 | 2,9 sn | 0 | 90 ms |

İlk katalog ölçümü 66 performans / 0,81 CLS verdi. Yükleniyor alanında içerik yüksekliği ayrıldıktan sonra son ölçüm 95 / 0 oldu. Diğer son puanlar yukarıdaki tablodadır; raporlar `artifacts/lighthouse/{home,catalog,product}.{json,html}` ve `summary.json` dosyalarındadır. `npm run audit` ile yeniden üretilebilir. Windows'ta ilk chrome-launcher denemesi tarayıcı başlatamadı; denetim betiği Playwright Chromium üzerinden CDP bağlantısı kullanacak şekilde düzeltildi ve üç ölçüm başarıyla tamamlandı.

SEO hedefi 95+ bu **indekslemeye kapalı demoda karşılanmıyor**. Ölçüm, bilinçli `noindex,nofollow` ve robots engelinden etkilenir; puan yükseltmek için demo indekslemeye açılmadı. Doğrulanmış alan adı olmadığı için canonical üretilmedi.

Katalog ve ürünün bu koşudaki laboratuvar LCP değeri 2,9 sn’dir. Gerçek kullanıcı verisi, CrUX veya saha INP ölçümü yoktur. Saha LCP ≤2,5 sn, INP ≤200 ms, CLS ≤0,1 hedeflerinin sağlandığı iddia edilmez. TBT, INP değildir. Otomatik erişilebilirlik puanı, tam manuel erişilebilirlik sertifikası değildir.

## Hazır olanlar ve canlı öncesi eksikler

Yerel demo ve belgelenmiş katalog akışları hazır. Varsayılan veri 18 görünür demo üründür; sekizi ana sayfada. Ürünlerin örnek fiyat/stok/markaları açıkça demo olarak gösterilir. İki özgün üretilmiş görsel proje içine kaydedildi; ayrıntılı kaynak ve promptlar [ASSETS.md](ASSETS.md) dosyasındadır.

Gerçek işletme kataloğu için hâlâ gerekenler: doğrulanmış iletişim ve alan adı; ürünlerin onaylı kimlikleri, fiyatları, stokları, üretici teknik değerleri ve teslimat kapsamı; gerçek ürün/varyant fotoğrafları ve yayın izinleri; özel üretim hizmetinin teyidi; gerekiyorsa adres/saatler ve onaylı politika metinleri. Gerçek varyant fotoğrafları verilmediği için demo aynı kategori temsili görselini kullanır; gerçek `images` verisi için varyant ve çoklu galeri desteği kodda mevcuttur.

Gerçek proje görseli olmadığı için müşteri işi uydurulmadı; yalnızca demo konsept galerisi var. Özel üretim işletmece doğrulanmadığından ölçü aracı örnek olarak işaretlendi ve hizmet taahhüdü oluşturmaz. Gerçek numara olmadan WhatsApp taslağının servis üzerinden açılması/teslimi sınanmadı.

Sunucu kayıt/mesaj servisi, CMS paneli, hesap, sepet, ödeme ve sipariş takibi entegre edilmedi. Bunlar belgedeki varsayılan katalog kapsamının zorunlu dış servisleri değildir. İletişim akışı kullanıcıya bir özet verir; “talebiniz ulaştı” demeden işi tamamlar. İşletme girdileri olmadan canlı yayın veya ticari işlem yapılmadı.

Kurulum ve komutlar [README.md](../README.md), içerik güncelleme adımları [DATA.md](DATA.md) içindedir.
