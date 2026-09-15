# Yönetim paneli

Panel `/yonetim` adresindedir. Ürünler ve fiyatlar, kategoriler ve üst menü, işletme bilgileri ve site metinleri, rehber yazıları ve konsept galerisi buradan yönetilir. Kaydedilen her değişiklik sitede hemen görünür; yeniden yayın gerekmez.

## Vercel kurulumu

1. Vercel projesinde **Storage → Create Database → Neon (Postgres)** ile veritabanı oluşturun ve projeye bağlayın (Production, Preview, Development). Vercel `DATABASE_URL` değişkenini kendisi ekler.
2. **Storage → Create → Blob** ile görsel deposu oluşturun ve projeye bağlayın. Vercel yeni depolarda `BLOB_STORE_ID`, eskilerde `BLOB_READ_WRITE_TOKEN` değişkenini kendisi ekler; panel ikisini de tanır.
3. **Settings → Environment Variables** bölümüne `ADMIN_PASSWORD` ekleyin. Güçlü ve başka yerde kullanılmayan bir şifre seçin.
4. İsteğe bağlı: oturum imzası için ayrı `ADMIN_SESSION_SECRET` ekleyin. Eklenmezse şifreden türetilir; şifre değişince tüm oturumlar kapanır.
5. Değişkenler eklendikten sonra projeyi yeniden yayınlayın (Deployments → Redeploy).

## Veriler nasıl saklanır

- İçerik, veritabanındaki `site_content` tablosunda bölüm başına bir JSON kaydı olarak tutulur: `settings`, `categories`, `menu`, `products`, `guides`, `projects`. Tablo ilk kullanımda otomatik oluşturulur.
- Bir bölüm hiç kaydedilmemişse sitenin koddaki başlangıç içeriği (`src/lib/content/seed.ts`) gösterilir. Panelde ilk kayıtla birlikte o bölüm veritabanına taşınır; sonrasında kaynak veritabanıdır.
- Kaydetmeden önce içerik doğrulanır: zorunlu alanlar, tekrar eden ürün adresi veya kodu, silinmiş kategoriye bağlı ürün, menü bağlantısı veya rehber yazısı kaydı engeller.
- Görseller tarayıcıda en uzun kenarı 1600 px olacak şekilde WebP'ye küçültülür ve Vercel Blob'a yüklenir (en fazla 4 MB).

## Güvenlik

- Giriş tek şifreyledir. Başarılı girişte 12 saat geçerli, imzalı ve `httpOnly` bir çerez oluşturulur.
- Oturum her panel sayfasında, her kaydetme işleminde ve görsel yüklemede ayrı ayrı doğrulanır.
- Hatalı şifre denemeleri yavaşlatılır. Panel sayfaları `noindex` başlığıyla arama motorlarına kapalıdır.

## Yerel geliştirme

Veritabanı bağlantısı yoksa yerelde içerik `.data/content.json` dosyasına, görseller `.data/uploads/` klasörüne kaydedilir; bu klasör Git'e girmez. Paneli yerelde denemek için `.env.local` dosyasına `ADMIN_PASSWORD` ekleyin.

- `CONTENT_STORE=seed`: kayıtları yok sayar, yalnızca başlangıç içeriğini gösterir.
- `CONTENT_STORE=file` ve `CONTENT_DATA_DIR=<klasör>`: yerel dosya deposunu belirli bir klasörde kullanır (testler bunu kullanır).

Vercel'de veritabanı bağlı değilse site başlangıç içeriğiyle çalışır, panel değişiklik kaydedemez ve genel bakış sayfasında uyarı gösterir.
