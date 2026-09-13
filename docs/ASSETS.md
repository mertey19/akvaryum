# Görsel kaynakları ve kullanım notları

13 Eylül 2026. Rakip siteden hiçbir fotoğraf, logo, kod veya açıklama alınmadı.

| Yerel dosya                     | Kaynak                                                                                   | Kullanım                                                                                                                                |
| ------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/dsn-logo.jpeg`   | Kullanıcı tarafından sağlanan `WhatsApp Image 2026-09-13 at 16.09.05.jpeg` marka dosyası | Header ve footer marka bağlantıları. Kaynak JPEG değiştirilmeden kopyalandı; dış boşluklar CSS çerçevesiyle görünüm sırasında kırpılır. |
| `public/images/hero.webp`       | Bu görevde yerleşik image_gen ile üretilmiş özgün görsel                                 | Ana görsel, açıklayıcı bölüm ve açıkça etiketlenen konsept galerisi; gerçek müşteri işi değildir.                                       |
| `public/images/products.webp`   | Bu görevde yerleşik image_gen ile üretilmiş 3×2 temsili ürün görseli                     | Altı kategori görseli ve demo ürünlerde kategori temsili; marka/üretici veya gerçek teknik fotoğraf değildir.                           |
| `public/images/terrarium.webp`  | Bu görevde yerleşik image_gen ile üretilmiş özgün ürün görseli                           | Teraryum kategori kartları ve ürün kayıtları.                                                                                           |
| `public/images/paludarium.webp` | Bu görevde yerleşik image_gen ile üretilmiş özgün ürün görseli                           | Paludaryum kategori kartları ve ürün kayıtları.                                                                                         |
| `src/app/icon.svg`              | Projede yazılmış basit su damlası işareti                                                | Tarayıcı sekmesi simgesi. Sağlanan DSN marka logosunun yerine kullanılmaz.                                                              |

Sağlanan logo 883×847 piksel ve yaklaşık 42 KB'dir. Logo resmi yeniden çizilmedi, içindeki yazı değiştirilmedi ve dosya dönüştürülmedi. `DSN AKVARYUM İMALATI` ifadesi okunabilirlik, erişilebilirlik ve arama görünürlüğü için ayrıca gerçek HTML metni olarak gösterilir.

Üretilen PNG çıktıları WebP biçimine dönüştürüldü, görüntü içeriği değiştirilmedi. Hero 1536×1024 / yaklaşık 298 KB, ürün görseli 1536×1024 / yaklaşık 83 KB, teraryum 1200×1200 / yaklaşık 269 KB ve paludaryum 1200×1200 / yaklaşık 220 KB. İlk altı kategori aynı görselden CSS ile bölge seçilerek gösterilir; teraryum ve paludaryum ayrı kare dosyaları kullanır. Gerçek ürün fotoğrafları `images` alanına girildiğinde `next/image`, responsive boyutlar ve `object-fit: contain` kullanılır.

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

### Teraryum

```text
Use case: product-mockup
Asset type: square e-commerce category and product image for a premium Turkish glass habitat catalog
Primary request: create a photorealistic tropical terrarium product image
Scene/backdrop: seamless warm-white studio background with a very soft pale gray-green floor shadow
Subject: one clean, empty-front glass terrarium enclosure in three-quarter view, furnished with lush live moss, small tropical ferns, cork bark and natural dark substrate; clear glass edges are visible and the enclosure reads unmistakably as a terrarium
Style/medium: refined high-end product photography, realistic materials, crisp details
Composition/framing: centered square composition, full enclosure visible with generous clean margin, camera at slightly elevated eye level
Lighting/mood: soft daylight studio lighting, fresh vivid greens, premium and natural
Constraints: no animals, no people, no logo, no text, no watermark, no extra products, no UI, no black background; suitable for cropping into square cards
```

### Paludaryum

```text
Use case: product-mockup
Asset type: square e-commerce category and product image for a premium Turkish glass habitat catalog
Primary request: create a photorealistic tropical paludarium product image
Scene/backdrop: seamless warm-white studio background with a very soft pale blue-green floor shadow
Subject: one clean rimless glass paludarium enclosure in three-quarter view; the lower third holds crystal-clear water with visible aquatic plants and smooth stones, while natural wood rises into an above-water bank of moss and compact tropical plants; the glass waterline and mixed land-water habitat are unmistakable
Style/medium: refined high-end product photography, realistic water and glass, crisp details
Composition/framing: centered square composition, full enclosure visible with generous clean margin, camera at slightly elevated eye level
Lighting/mood: soft daylight studio lighting, vivid aquatic teal and fresh greens, premium and natural
Constraints: no animals, no people, no logo, no text, no watermark, no extra products, no UI, no black background; suitable for cropping into square cards
```
