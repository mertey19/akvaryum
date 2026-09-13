# DSN Akvaryum İmalatı — teslim ve doğrulama raporu

Tarih: 13 Eylül 2026. Yerel uygulama: `http://localhost:3000`. Kapsam: kullanıcının sağladığı belgedeki varsayılan katalog ve teklif hazırlama akışları. Ticari yayın yapılmadı.

## Son doğrulama sonuçları

| Kontrol                 | Gerçek sonuç                                                                                                         |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `npm run build`         | Başarılı; Next.js üretim derlemesi ve tip denetimi tamamlandı.                                                       |
| `npm run lint`          | Başarılı; sıfır hata/uyarı. Üretilmiş Playwright/Lighthouse raporları lint kapsamı dışında.                          |
| `npm run typecheck`     | Başarılı; route tip üretimi ve `tsc --noEmit`.                                                                       |
| `npm run test`          | 11/11 geçti.                                                                                                         |
| `npm run test:e2e`      | 30/30 geçti, son tam tur 43,2 saniye. Üretim sunucusunda Chromium.                                                   |
| Axe erişilebilirlik     | Ana sayfa, dört katalog, iki ürün, teklif ve iletişimde WCAG 2 A/AA ve 2.1 AA etiketli otomatik denetimde ihlal yok. |
| Responsive              | 360, 390, 768, 1024, 1440 px genişliklerde sekiz ana akış; 40 sayfa/genişlik kontrolünde yatay taşma yok.            |
| `npm run release:check` | Beklenen ret: demo modu açık; gerçek alan adı ve onaylı ürünler eksik.                                               |

## Davranış testlerinin kapsamı

- `dış filtre`, `dis filtre`, büyük Türkçe harfler, seçim/talep kodu ve kategori araması; dış filtreler, açıklamasında aynı ifade geçen mobilya talebinin önünde.
- Klavye arama önerileri, Enter ile ürün seçimi, arama servisi hata durumu ve yeniden başarılı arama.
- Filtre/sıralama URL parametreleri, sayfanın filtre değişince sıfırlanması, sonuç sayısı, sıralama, yenileme ve geri/ileri gezinme; sonuç bulunamayan durumdan temizleyerek çıkış.
- Sağlanan 14 ölçünün ve her ölçüdeki `90° / 45°` fiyatlarının veri katmanında eksiksiz bulunması; akvaryum kataloğunda tek sayfada görünmesi.
- `90° / 45°` seçiminin fiyat/seçim kodu/stok görünümünü değiştirmesi, seçilen seçeneğin iletişim taslağına aktarılması ve doğrudan seçenek bağlantısının açılması.
- Favori ekleme/kaldırma ve yenileme; iki fiyat seçeneğinin ayrı favoriler olması, favoriden doğru seçeneğe geri dönüş.
- Aynı kategoriden en fazla üç ürün karşılaştırma; dördüncü/farklı kategori reddi, kaldırma ve yenileme.
- Geçersiz ölçü reddi, 60×30×36 cm için 64,8 L ve 100×30×36 cm için 108 L brüt hacim.
- Özetin kopyalanması; pano hatasında kopyalama veya teslim başarısı iddia edilmemesi; alan değişince eski özetin geçersizleştirilmesi.
- `0545 389 71 47` numarasının doğrulanmış WhatsApp sipariş hattı olarak kullanılması; Türkçe ürün/varyant mesajı ve bağlantı kodlamasının gerçek gönderim yapmadan doğrulanması.
- WhatsApp bağlantılarının üst duyuru, menü, ana sayfa, ürün detayı, teklif/iletişim formu, iletişim kartı, footer ve her sayfadaki sabit yeşil düğmede aynı numarayı kullanması.
- Doğrulanmış telefon, adres ve sosyal kullanıcı adının iletişim sayfası ile footer’da görünmesi; telefon arama bağlantısının E.164 biçimi ve doğrulanmamış sosyal platform bağlantılarının üretilmemesi.
- Kullanıcının sağladığı DSN logosunun header ve footer’da yüklenmesi; logo bağlantılarının erişilebilir adı ve açılışta `DSN AKVARYUM İMALATI` ana başlığının görünmesi.
- Form metninin URL, ağ isteği, tarayıcı depolaması veya konsola taşınmaması. Form sunucuya kayıt yapmaz.
- Masaüstü mega menü odağı; mobil menü, filtre ve görsel penceresinde Escape ve açan elemana odak dönüşü.
- Geçersiz ürün slug’ında **HTTP 404**; `noindex`, robots engeli, boş demo sitemap ve etkisiz `href="#"` bulunmaması.
- Teraryum ve paludaryum kategorileri, iki kategori bazlı talep kaydı, iki ayrı görsel, Türkçe/yabancı yazım eşanlamları, WhatsApp bilgi akışı ve DIAMOND cam bilgisinin yalnız akvaryumlarda kalması.
- Veri şeması, tanımlı kategori zorunluluğu, boş olmayan görsel dizisi, stok-adet tutarlılığı, fiyatın kuruşla saklanması ve demo kapandığında örnek ürünlerin dışlanması.

Online ödeme ve kalıcı form teslimi mevcut olmadığından bu sistemlerin başarılı/başarısız teslim testleri yapılmış gibi raporlanmaz.

## Görsel kontrol

Ana sayfa, filtre, akvaryum, teraryum ve paludaryum katalogları, ürün, teklif ve iletişim sayfalarının 390 px mobil ve 1440 px masaüstü tam sayfa ekran görüntüleri açılıp incelendi. Sekiz kategorili 4×2 masaüstü / 2×4 mobil düzen, yeni kare görseller, hazır ölçü duyurusu, WhatsApp satış barı, yeşil eylemler, iletişim kartı ve sabit WhatsApp düğmesi iki boyutta da okunabilir. Footer’da `© 2026` damgası görünür. Belirgin yatay taşma, kırık görsel veya kullanılmaz eylem görülmedi.

Creaqua’nın ana sayfa, akvaryum kategori ve iki seri detay sayfası genel görünüm ile bilgi hiyerarşisi için salt okunur incelendi. DSN uyarlamasında koyu marka alanı, ferah ürün zemini, görsel/ölçü/seçenek/fiyat sırası ve responsive detay yapısı kullanıldı; Creaqua metni, görseli, logosu veya sayfa düzeni birebir alınmadı.

Dosyalar `artifacts/screenshots/` klasöründedir: `390-home.png`, `390-filtreler.png`, `390-akvaryumlar.png`, `390-teraryumlar.png`, `390-paludaryumlar.png`, `390-urun.png`, `390-teklif.png`, `390-iletisim.png` ve karşılık gelen `1440-…` dosyaları. Ekran altındaki görseller için test, görünür alana kaydırıp gerçek yüklemeyi bekler.

İlk turlarda bulunan gerçek sorunlar düzeltildi: varyant alanının erişilebilir adı, akış halinde dönen 200 yerine gerçek 404, rehber numaralarının kontrastı, katalog yükleme ekranından ürünlere geçişte yerleşim kayması ve mobil katalog başlık sırası.

## Lighthouse — son üretim ölçümü

Lighthouse 13.4.1, Windows üzerinde Playwright Chromium, localhost üretim derlemesi. Mobil emülasyon: 412×823 px, DPR 1,75; simüle ağ 150 ms RTT / 1638,4 Kbps, 4× CPU yavaşlatma. Ölçüm zamanı 13 Eylül 2026 15:58 Türkiye saati. Her sayfa için son sürümde bir koşu; istatistiksel saha ölçümü değildir.

| Sayfa                         | Performans | Erişilebilirlik | İyi uygulamalar | SEO |    LCP | CLS |    TBT |
| ----------------------------- | ---------: | --------------: | --------------: | --: | -----: | --: | -----: |
| `/`                           |         97 |             100 |             100 |  66 | 2,6 sn |   0 |  80 ms |
| `/urunler?kategori=filtreler` |         94 |             100 |             100 |  63 | 3,0 sn |   0 |  80 ms |
| `/urun/akvaryum-60x40x40`     |         93 |             100 |             100 |  63 | 3,0 sn |   0 | 150 ms |

Son koşuda üç sayfanın da CLS değeri 0 olarak ölçüldü. Puanlar yukarıdaki tablodadır; raporlar `artifacts/lighthouse/{home,catalog,product}.{json,html}` ve `summary.json` dosyalarındadır. `npm run audit` ile yeniden üretilebilir. Denetim betiği Playwright Chromium üzerinden CDP bağlantısı kullanır.

SEO hedefi 95+ bu **indekslemeye kapalı demoda karşılanmıyor**. Ölçüm, bilinçli `noindex,nofollow` ve robots engelinden etkilenir; puan yükseltmek için demo indekslemeye açılmadı. Doğrulanmış alan adı olmadığı için canonical üretilmedi.

Bu koşudaki laboratuvar LCP değeri ana sayfada 2,6 sn, katalogda 3,0 sn ve ürün sayfasında 3,0 sn’dir. Gerçek kullanıcı verisi, CrUX veya saha INP ölçümü yoktur. Saha LCP ≤2,5 sn, INP ≤200 ms, CLS ≤0,1 hedeflerinin sağlandığı iddia edilmez. TBT, INP değildir. Otomatik erişilebilirlik puanı, tam manuel erişilebilirlik sertifikası değildir.

## Hazır olanlar ve canlı öncesi eksikler

Yerel katalog ve WhatsApp sipariş akışları hazır. Varsayılan veri 22 görünür kayıttır; sekizi ana sayfada. Bunların 14’ü kullanıcının sağladığı 18.04.2026 tarihli ölçü ve fiyat listesinden aktarılmış DSN akvaryumlarıdır. Teraryum, paludaryum ve ekipman alanları onaylanmamış ürün adı veya teknik değer üretmeden kategori bazlı bilgi talebi açar. Akvaryum kartlarında `90° / 45°` tutarları yan yana gösterilir; kaynağı sağlanmayan fiyatlar WhatsApp üzerinden sorulur. Kullanıcının sağladığı DSN marka logosu ile dört özgün üretilmiş görsel proje içine kaydedildi; ayrıntılı kaynak ve promptlar [ASSETS.md](ASSETS.md) dosyasındadır.

Doğrulanmış işletme bilgileri ürün verisine ve arayüze işlendi: DSN Akvaryum akvaryumlarını üretirken DIAMOND cam kullanır; hazır ölçü akvaryumlar mevcuttur; `0545 389 71 47` telefon ve WhatsApp sipariş hattıdır; adres `Mamak Hüseyin Gazi, Ekin, Su Sk. No:17, 06160 Mamak/Ankara` ve sosyal hesap kullanıcı adı `Dursun.belgic` olarak doğrulanmıştır. Sağlanan fiyatlar kaynak tarihleriyle gösterilir. Gerçek işletme yayını için hâlâ gerekenler: doğrulanmış alan adı; güncel stok ve teslimat/ödeme kapsamı; izinli gerçek ürün fotoğrafları ve onaylı politika metinleri.

İlham galerisi müşteri işi iddiasında bulunmaz. Ölçü aracı bir WhatsApp mesajı hazırlar; özel üretim kapsamı, fiyat ve teslimat görüşmede netleştirilir. Otomatik testlerde gerçek WhatsApp mesajı gönderilmez.

Sunucu kayıt/mesaj servisi, CMS paneli, hesap, sepet, ödeme ve sipariş takibi entegre edilmedi. Satış ve bilgi akışı doğrulanmış WhatsApp hattında başlatılır; ödeme ve teslimat görüşmede netleştirilir. İletişim akışı kullanıcıya bir mesaj özeti verir ve gerçek gönderim yapılmadan teslim başarısı iddia etmez.

Kurulum ve komutlar [README.md](../README.md), içerik güncelleme adımları [DATA.md](DATA.md) içindedir.
