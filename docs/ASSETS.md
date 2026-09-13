# Görsel kaynakları ve kullanım notları

13 Eylül 2026. Rakip siteden hiçbir fotoğraf, logo, kod veya açıklama alınmadı.

| Yerel dosya | Kaynak | Kullanım |
| --- | --- | --- |
| `public/images/dsn-logo.jpeg` | Kullanıcı tarafından bu görevde sağlanan `WhatsApp Image 2026-09-13 at 14.09.55.jpeg` marka dosyası | Header ve footer marka bağlantıları. Kaynak JPEG değiştirilmeden kopyalandı; yalnızca çevresindeki siyah boşluk CSS çerçevesiyle görünüm sırasında kırpılır. |
| `public/images/hero.webp` | Bu görevde yerleşik image_gen ile üretilmiş özgün görsel | Ana görsel, açıklayıcı bölüm ve açıkça etiketlenen konsept galerisi; gerçek müşteri işi değildir. |
| `public/images/products.webp` | Bu görevde yerleşik image_gen ile üretilmiş 3×2 temsili ürün görseli | Altı kategori görseli ve demo ürünlerde kategori temsili; marka/üretici veya gerçek teknik fotoğraf değildir. |
| `src/app/icon.svg` | Projede yazılmış basit su damlası işareti | Tarayıcı sekmesi simgesi. Sağlanan DSN marka logosunun yerine kullanılmaz. |

Sağlanan logo 1774×887 piksel ve yaklaşık 54 KB'dir. Logo resmi yeniden çizilmedi, içindeki yazı değiştirilmedi ve dosya dönüştürülmedi. `DSN AKVARYUM İMALATI` ifadesi okunabilirlik, erişilebilirlik ve arama görünürlüğü için ayrıca gerçek HTML metni olarak gösterilir.

Üretilen PNG çıktıları WebP biçimine dönüştürüldü, görüntü içeriği değiştirilmedi. Hero 1536×1024 / yaklaşık 298 KB, ürün görseli 1536×1024 / yaklaşık 83 KB. Kart görselleri aynı dosyadan CSS ile altı bölge halinde gösterilir; dosya bir kez önbelleğe alınır. Gerçek ürün fotoğrafları `images` alanına girildiğinde `next/image`, responsive boyutlar ve `object-fit: contain` kullanılır.

Gerçek ürün, üretim veya müşteri projesi olarak yayımlamadan önce işletmeye ait veya kullanım izni doğrulanmış fotoğraflar eklenmelidir. Konsept galerisi demo modu dışında 404 döner. Gerçek ürünlerde demo görsellerini kullanan kayıtlar `release:check` kontrolünü geçemez. Bu not, gerçek fotoğraflar için kullanım izninin yerine geçmez.

## Kullanılan tam üretim promptları

Araç: yerleşik `image_gen`; CLI/API anahtarı kullanılmadı.

### Hero

```text
Use case: product-mockup
Asset type: Turkish DSN Akvaryum aquarium catalog website hero, conceptual demo visual.
Primary request: Generate one photorealistic atmospheric aquascape photograph, landscape 1536x1024 composition. Entire clear rimless aquarium visible within the image, with lush green aquatic plants, natural driftwood, clear naturally lit water, planted substrate. Dark petrol studio backdrop, side lighting, elegant premium aquarium photography, rich realistic botanical textures and restrained dramatic mood. Full aquarium including top rim and bottom edges fits comfortably in the frame; photograph from a slightly elevated three-quarter front view. No text, no logo, no brands, no watermark. The website will place HTML text separately; do not generate typography or webpage UI.
```

### Ürün kategorileri

```text
Use case: product-mockup
Asset type: Aquarium catalog category contact sheet, conceptual demo visual.
Primary request: Generate one precisely aligned 3-column by 2-row contact sheet, landscape 1536x1024, six equal square tiles exactly 512x512 each. Pure white seamless background everywhere, no visible grid borders. Each tile contains a single centered photographic category arrangement, entirely inside its tile, generous whitespace on every side. Top left: empty rimless clear glass rectangular aquarium. Top middle: unbranded black external aquarium canister filter with neatly arranged inlet and outlet hoses. Top right: slim black aquarium LED light bar. Bottom left: unbranded black aquarium cabinet with two doors. Bottom middle: aquarium heater glass tube with black head and neatly arranged cord. Bottom right: aquascaping grey rocks with a small arrangement of green aquatic plants. Consistent soft studio product photography, subtle grounded shadows, premium clean e-commerce look. Every object and cable stays within the central 75 percent of its own square tile. No labels, no letters, no text, no brands, no logos, no watermarks, no props outside listed product groups. Exact equal tile boundaries at x=512, x=1024, and y=512.
```
