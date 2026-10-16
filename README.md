# Mürver Güzellik Atölyesi: Güzellik Salonu Web Sitesi (demo)

Kurgusal bir güzellik salonu için **çok sayfalı, iki dilli (TR/EN)** web sitesi. Hizmet kategorileri ve fiyat listesi, ekip, filtrelenebilir galeri, iletişim ve **gerçek saat dilimleriyle online randevu** içerir.

> **Mürver kurgusal bir salondur.** Ekip, adres, telefon ve fiyatlar örnektir. Gerçek bir işletmeyle karıştırılmaması için site arama motorlarına kapalıdır (`noindex`) ve her sayfada demo şeridi bulunur. Randevu formu hiçbir veri göndermez.
> Bu proje [egementuncer.dev](https://egementuncer.dev) portföyü için hazırlanmıştır.

**Canlı demo:** https://salon.egementuncer.dev

---

## Sayfalar (her dilde 11 sayfa, toplam 22)

| Sayfa | İçerik |
| --- | --- |
| Ana sayfa | Tam ekran fotoğraflı giriş, 4 hizmet kategorisi, çok tercih edilenler, salon hakkında, randevu adımları, galeri şeridi |
| Hizmetler ve fiyatlar | 19 hizmetin süre ve fiyatıyla tam listesi; her satırdan doğrudan randevuya geçiş |
| 4 kategori sayfası | Saç, tırnak, cilt bakımı, makyaj/kaş/kirpik: fiyat listesi, bakım önerileri, SSS, o alandaki uzmanlar |
| Ekibimiz | 5 uzman, çalıştıkları alanlar, “X ile randevu al” bağlantısı |
| Galeri | Kategoriye göre filtre, büyütme penceresi (ok tuşlarıyla gezinme) |
| İletişim | Adres, saatler, şematik harita, ulaşım |
| Online randevu | 5 adım: hizmetler → uzman → tarih ve saat → bilgiler → özet |
| KVKK | Örnek aydınlatma metni |

## Öne çıkanlar

- **Online randevu**
  - Birden fazla hizmet seçilebilir; toplam süre ve fiyat yan panelde anında hesaplanır.
  - Seçilen hizmetlerin hepsini yapamayan uzmanlar devre dışı kalır ve nedeni yazılır.
  - Saat dilimleri, toplam süreye ve günün çalışma saatlerine göre 30 dakikada bir üretilir. Bugün için geçmiş saatler gösterilmez.
  - Doluluk, tarih ve uzmana göre sabit (her açılışta aynı) örnek bir takvimden gelir. “Fark etmez” seçilirse, farklı alanlardan hizmetler o saatte boş olan farklı uzmanlara atanır.
  - Adım açılınca ilk boş saati olan gün seçili gelir.
  - Fiyat listesinden, kategori ya da uzman sayfasından gelince seçimler hazır olur (`?s=balayage`, `?p=nil`).
  - Onaydan sonra randevu **.ics takvim dosyası** olarak indirilebilir (Google, Apple, Outlook).
- **Galeri:** Erişilebilir filtre butonları (`aria-pressed`) ve yerel `<dialog>` ile büyütme. Esc ile kapanır, odak tıklanan fotoğrafa geri döner.
- **Yerel SEO**
  - Yapısal veri: `BeautySalon` (adres, saatler), kategori sayfalarında `Service` + `Offer` (fiyat) ve `FAQPage`, fiyat listesinde `OfferCatalog`, alt sayfalarda `BreadcrumbList`.
  - Her sayfada `hreflang` ve canonical.
  - Gerçek bir işletmede `src/content.mjs` içindeki `demo: false` ile `noindex` kalkar.
- **Erişilebilirlik:** 22 sayfa masaüstü ve mobilde axe taramasından temiz geçer. Klavyeyle tam kullanım (gün ve saat seçiminde ok tuşları). `prefers-reduced-motion` desteklenir.

## Teknik

- **Bağımlılıksız build:** `build.mjs` (Node 18+), `src/` içeriğinden statik HTML üretir. CSS ve JS'e içerik özeti (hash) eklenir.
- Bütün metinler ve fiyatlar tek dosyada: `src/content.mjs`.
- Fontlar: Bodoni Moda + DM Sans (Google Fonts).
- **Fotoğraflar:** [Unsplash](https://unsplash.com) (Unsplash License).
  - Fotoğrafçılar sitenin alt bilgisinde listelenir.
  - Fotoğraflardaki kişiler ekibin portresi olarak kullanılmaz; uzman kartları baş harflidir.
  - `scripts/photos.mjs` (sharp) fotoğrafları 640/1200 px AVIF + WebP'ye çevirir.
- Cloudflare Workers (static assets); deploy sırasında build otomatik çalışır.

```bash
npm run dev        # build + http://localhost:8833
npx wrangler deploy
```

## Not

Yapay zekâ destekli geliştirildi; tasarım ve ürün kararları bana ait.
