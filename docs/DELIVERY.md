# DSN Akvaryum İmalatı — teslim ve doğrulama raporu

Tarih: 13 Eylül 2026. Yerel uygulama: `http://localhost:3000`. Kapsam: kullanıcının sağladığı belgedeki varsayılan katalog ve teklif hazırlama akışları. Ticari yayın yapılmadı.

## Son doğrulama sonuçları

| Kontrol                 | Gerçek sonuç                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run build`         | Başarılı; Next.js üretim derlemesi ve tip denetimi tamamlandı.                                                                                   |
| `npm run lint`          | Başarılı; sıfır hata/uyarı. Üretilmiş Playwright/Lighthouse raporları lint kapsamı dışında.                                                      |
| `npm run typecheck`     | Başarılı; route tip üretimi ve `tsc --noEmit`.                                                                                                   |
| `npm run test`          | 10/10 geçti.                                                                                                                                     |
| `npm run test:e2e`      | 26/26 geçti, son tam tur 36,3 saniye. Üretim sunucusunda Chromium.                                                                               |
| Axe erişilebilirlik     | Ana sayfa, filtre kataloğu, 14 ürünlü akvaryum kataloğu, ürün, teklif ve iletişimde WCAG 2 A/AA ve 2.1 AA etiketli otomatik denetimde ihlal yok. |
| Responsive              | 360, 390, 768, 1024, 1440 px genişliklerde altı ana akış; 30 sayfa/genişlik kontrolünde yatay taşma yok.                                         |
| `npm run release:check` | Beklenen ret: demo modu açık; gerçek alan adı ve onaylı ürünler eksik.                                                                           |

## Davranış testlerinin kapsamı

- `dış filtre`, `dis filtre`, büyük Türkçe harfler, demo referansı/SKU ve kategori araması; dış filtreler, açıklamasında aynı ifade geçen dolapların önünde.
- Klavye arama önerileri, Enter ile ürün seçimi, arama servisi hata durumu ve yeniden başarılı arama.
- Filtre/sıralama URL parametreleri, sayfanın filtre değişince sıfırlanması, sonuç sayısı, sıralama, yenileme ve geri/ileri gezinme; sonuç bulunamayan durumdan temizleyerek çıkış.
- Sağlanan 14 ölçünün ve her ölçüdeki `90° / 45°` fiyatlarının veri katmanında eksiksiz bulunması; akvaryum kataloğunda tek sayfada görünmesi.
- `90° / 45°` seçiminin fiyat/demo referansı/stok görünümünü değiştirmesi, seçilen seçeneğin iletişim taslağına aktarılması ve doğrudan seçenek bağlantısının açılması.
- Favori ekleme/kaldırma ve yenileme; iki fiyat seçeneğinin ayrı favoriler olması, favoriden doğru seçeneğe geri dönüş.
- Aynı kategoriden en fazla üç ürün karşılaştırma; dördüncü/farklı kategori reddi, kaldırma ve yenileme.
- Geçersiz ölçü reddi, 60×30×36 cm için 64,8 L ve 100×30×36 cm için 108 L brüt hacim.
- Özetin kopyalanması; pano hatasında kopyalama veya teslim başarısı iddia edilmemesi; alan değişince eski özetin geçersizleştirilmesi.
- WhatsApp numarası yokken WhatsApp bağlantısının oluşmaması; birim testinde gerçek gönderim yapmadan Türkçe mesaj ve bağlantı kodlamasının doğrulanması.
- Doğrulanmış telefon, adres ve sosyal kullanıcı adının iletişim sayfası ile footer’da görünmesi; telefon bağlantısının E.164 biçimi ve doğrulanmamış sosyal platform bağlantılarının üretilmemesi.
- Kullanıcının sağladığı DSN logosunun header ve footer’da yüklenmesi; logo bağlantılarının erişilebilir adı ve açılışta `DSN AKVARYUM İMALATI` ana başlığının görünmesi.
- Form metninin URL, ağ isteği, tarayıcı depolaması veya konsola taşınmaması. Form sunucuya kayıt yapmaz.
- Masaüstü mega menü odağı; mobil menü, filtre ve görsel penceresinde Escape ve açan elemana odak dönüşü.
- Geçersiz ürün slug’ında **HTTP 404**; `noindex`, robots engeli, boş demo sitemap ve etkisiz `href="#"` bulunmaması.
- Veri şeması, stok-adet tutarlılığı, fiyatın kuruşla saklanması ve demo kapandığında örnek ürünlerin dışlanması.

Online ödeme ve kalıcı form teslimi mevcut olmadığından bu sistemlerin başarılı/başarısız teslim testleri yapılmış gibi raporlanmaz.

## Görsel kontrol

Ana sayfa, filtre kataloğu, 14 ürünlü akvaryum kataloğu, ürün, teklif ve iletişim sayfalarının 390 px mobil ve 1440 px masaüstü tam sayfa ekran görüntüleri açılıp incelendi. Sağlanan logo ile açılış marka başlığı iki boyutta da okunabilir; açık zeminlerdeki bilgilendirme metinleri ve form yer tutucuları daha koyu ikincil tonla belirginleştirildi. Koyu marka başlığı, akvaryum koleksiyon bandı, iki sütunlu mobil fiyat kartları, fiyat seçenekleri, ürün eylemleri ve filtre düzeninde belirgin taşma/örtüşme veya kırık görsel görülmedi.

Creaqua’nın ana sayfa, akvaryum kategori ve iki seri detay sayfası genel görünüm ile bilgi hiyerarşisi için salt okunur incelendi. DSN uyarlamasında koyu marka alanı, ferah ürün zemini, görsel/ölçü/seçenek/fiyat sırası ve responsive detay yapısı kullanıldı; Creaqua metni, görseli, logosu veya sayfa düzeni birebir alınmadı.

Dosyalar `artifacts/screenshots/` klasöründedir: `390-home.png`, `390-urunler.png`, `390-akvaryumlar.png`, `390-urun.png`, `390-teklif.png`, `390-iletisim.png` ve karşılık gelen `1440-…` dosyaları. Ekran altındaki görseller için test, görünür alana kaydırıp gerçek yüklemeyi bekler. İlk test turunda erken yapılan görsel kontrolü bu şekilde düzeltildi.

İlk turlarda bulunan gerçek sorunlar düzeltildi: varyant alanının erişilebilir adı, akış halinde dönen 200 yerine gerçek 404, rehber numaralarının kontrastı, katalog yükleme ekranından ürünlere geçişte yerleşim kayması ve mobil katalog başlık sırası.

## Lighthouse — son üretim ölçümü

Lighthouse 13.4.1, Windows üzerinde Playwright Chromium, localhost üretim derlemesi. Mobil emülasyon: 412×823 px, DPR 1,75; simüle ağ 150 ms RTT / 1638,4 Kbps, 4× CPU yavaşlatma. Ölçüm zamanı 13 Eylül 2026 15:02 Türkiye saati. Her sayfa için son sürümde bir koşu; istatistiksel saha ölçümü değildir.

| Sayfa                         | Performans | Erişilebilirlik | İyi uygulamalar | SEO |    LCP |   CLS |    TBT |
| ----------------------------- | ---------: | --------------: | --------------: | --: | -----: | ----: | -----: |
| `/`                           |         95 |             100 |             100 |  66 | 2,5 sn |     0 | 150 ms |
| `/urunler?kategori=filtreler` |         91 |             100 |             100 |  63 | 3,4 sn | 0,023 |  80 ms |
| `/urun/clear-60`              |         95 |             100 |             100 |  63 | 2,9 sn |     0 |  50 ms |

Son tek koşuda katalog CLS değeri 0,023 ile hedef sınırın altında kaldı. Puanlar yukarıdaki tablodadır; raporlar `artifacts/lighthouse/{home,catalog,product}.{json,html}` ve `summary.json` dosyalarındadır. `npm run audit` ile yeniden üretilebilir. Denetim betiği Playwright Chromium üzerinden CDP bağlantısı kullanır.

SEO hedefi 95+ bu **indekslemeye kapalı demoda karşılanmıyor**. Ölçüm, bilinçli `noindex,nofollow` ve robots engelinden etkilenir; puan yükseltmek için demo indekslemeye açılmadı. Doğrulanmış alan adı olmadığı için canonical üretilmedi.

Bu koşudaki laboratuvar LCP değeri ana sayfada 2,5 sn, katalogda 3,4 sn ve ürün sayfasında 2,9 sn’dir. Gerçek kullanıcı verisi, CrUX veya saha INP ölçümü yoktur. Saha LCP ≤2,5 sn, INP ≤200 ms, CLS ≤0,1 hedeflerinin sağlandığı iddia edilmez. TBT, INP değildir. Otomatik erişilebilirlik puanı, tam manuel erişilebilirlik sertifikası değildir.

## Hazır olanlar ve canlı öncesi eksikler

Yerel demo ve belgelenmiş katalog akışları hazır. Varsayılan veri 28 görünür demo üründür; sekizi ana sayfada. Bunların 14’ü kullanıcının sağladığı 18.04.2026 tarihli ölçü ve fiyat listesinden aktarılmış DSN akvaryumlarıdır; kartlarda `90° / 45°` tutarları yan yana gösterilir. Ürün görselleri, stok ve eksik teknik alanlar açıkça temsili veya bilgi alınmalı olarak işaretlenir. Kullanıcının sağladığı DSN marka logosu ile iki özgün üretilmiş görsel proje içine kaydedildi; ayrıntılı kaynak ve promptlar [ASSETS.md](ASSETS.md) dosyasındadır.

Doğrulanmış işletme bilgileri ürün verisine ve arayüze işlendi: DSN Akvaryum akvaryumlarını üretirken DIAMOND cam kullanır; telefon `0545 389 71 47`, adres `Mamak Hüseyin Gazi, Ekin, Su Sk. No:17, 06160 Mamak/Ankara` ve sosyal hesap kullanıcı adı `Dursun_belgic` olarak doğrulanmıştır. Telefonun WhatsApp hattı olduğu varsayılmamıştır. Sağlanan fiyatlar kaynak tarihleriyle gösterilir; `90° / 45°` başlıklarının teknik anlamı ve fiyatların güncelliği ayrıca teyit edilmelidir. Gerçek işletme kataloğu için hâlâ gerekenler: doğrulanmış alan adı; ürünlerin onaylı kimlikleri, SKU, stok, diğer teknik değerleri ve teslimat kapsamı; gerçek ürün/seçenek fotoğrafları ve yayın izinleri; özel ölçü hizmetinin ayrıca teyidi ve onaylı politika metinleri. WhatsApp, e-posta, sosyal platform/profil URL'si ve çalışma saatleri yalnızca gösterilecekse ayrıca doğrulanmalıdır. Gerçek seçenek fotoğrafları verilmediği için demo aynı kategori temsili görselini kullanır; gerçek `images` verisi için seçenek ve çoklu galeri desteği kodda mevcuttur.

Gerçek proje görseli olmadığı için müşteri işi uydurulmadı; yalnızca demo konsept galerisi var. Özel üretim işletmece doğrulanmadığından ölçü aracı örnek olarak işaretlendi ve hizmet taahhüdü oluşturmaz. Doğrulanmış WhatsApp numarası olmadan WhatsApp taslağının servis üzerinden açılması/teslimi sınanmadı.

Sunucu kayıt/mesaj servisi, CMS paneli, hesap, sepet, ödeme ve sipariş takibi entegre edilmedi. Bunlar belgedeki varsayılan katalog kapsamının zorunlu dış servisleri değildir. İletişim akışı kullanıcıya bir özet verir; “talebiniz ulaştı” demeden işi tamamlar. Eksik yayın girdileri tamamlanmadan canlı yayın veya ticari işlem yapılmadı.

Kurulum ve komutlar [README.md](../README.md), içerik güncelleme adımları [DATA.md](DATA.md) içindedir.
