/* ==========================================================================
   Sayfa şablonları — build.mjs her dil ve sayfa için çağırır.
   ========================================================================== */

import { salon, photos, team, categories, featured, langs } from './content.mjs';

export const esc = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const abs = (path) => salon.url + path;
const pad = (n) => String(n).padStart(2, '0');
export const catPath = (t, c) => `${t.paths.services}${c.slug[t.lang]}/`;
const allServices = categories.flatMap((c) => c.services.map((s) => ({ ...s, cat: c.id })));
const serviceById = (id) => allServices.find((s) => s.id === id);
const minPrice = (c) => Math.min(...c.services.map((s) => s.price));
const priceText = (t, s) => (s.from ? t.from(t.money(s.price)) : t.money(s.price));

/* --------------------------------------------------------------------------
   İkonlar (24×24, çizgi)
   -------------------------------------------------------------------------- */
const ICONS = {
  hair: '<path d="M6 21c0-6 1-11 6-13 5 2 6 7 6 13"/><path d="M12 8V3M9 4.5c1 1.2 2 1.8 3 1.8s2-.6 3-1.8"/>',
  nails: '<path d="M8 21V10a4 4 0 0 1 8 0v11"/><path d="M10 10.5a2 2 0 0 1 4 0V14h-4z"/>',
  skin: '<circle cx="12" cy="12" r="8.5"/><path d="M9 10h.01M15 10h.01" stroke-width="2.2"/><path d="M9 15c.9.8 1.9 1.2 3 1.2s2.1-.4 3-1.2"/>',
  makeup: '<path d="M14.5 3.5l6 6-9 9-6-6z"/><path d="M5.5 12.5L3 21l8.5-2.5"/>',
  phone: '<path d="M5 4.5h3.2l1.6 4-2 1.3a10.5 10.5 0 0 0 6.4 6.4l1.3-2 4 1.6V19a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 3.5 6.1 1.5 1.5 0 0 1 5 4.5z"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 7l8 6 8-6"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  insta: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7h.01" stroke-width="2.2"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  check: '<path d="M5 12.5l4.2 4.2L19 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  expand: '<path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/>',
  train: '<rect x="6" y="3.5" width="12" height="13" rx="3"/><path d="M6 11h12M9 20l1.5-3.5M15 20l-1.5-3.5"/>',
  bus: '<rect x="5" y="3.5" width="14" height="14" rx="2.5"/><path d="M5 11h14M8 20.5v-3M16 20.5v-3"/>',
  car: '<path d="M5 16.5V12l2-5h10l2 5v4.5"/><path d="M4 12h16v4.5H4z"/><path d="M7.5 19v-2.5M16.5 19v-2.5"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>'
};
export const icon = (name, cls = 'icon') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

/* Logo: mürver çiçeği — beş taç yaprak */
const FLOWER = [0, 72, 144, 216, 288].map((a) => `<ellipse cx="20" cy="11.5" rx="4.6" ry="7" transform="rotate(${a} 20 20)"/>`).join('');
const LOGO = `<svg class="logo__mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="1.4">${FLOWER}</g><circle cx="20" cy="20" r="3" fill="currentColor"/></svg>`;

/* Fotoğraf: AVIF + WebP, 640 / 1200 */
const PHOTO_W = [640, 1200];
export function pic(t, name, { sizes = '100vw', cls = '', eager = false } = {}) {
  const ph = photos[name];
  const set = (ext) => PHOTO_W.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(', ');
  const h = Math.round(1200 * ph.size[1] / ph.size[0]);
  return `<picture class="${cls}">
          <source type="image/avif" srcset="${set('avif')}" sizes="${sizes}">
          <img src="/img/${name}-1200.webp" srcset="${set('webp')}" sizes="${sizes}" width="1200" height="${h}" alt="${esc(ph.alt[t.lang])}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">
        </picture>`;
}
const credits = () => {
  const seen = new Map();
  Object.values(photos).forEach((p) => seen.set(p.by[1], p.by[0]));
  return [...seen].map(([u, n]) => `<a href="https://unsplash.com/@${u}?utm_source=murver&amp;utm_medium=referral">${esc(n)}</a>`).join(', ');
};
const avatar = (m, size = 'md') => `<span class="avatar avatar--${size} avatar--t${m.tone}" aria-hidden="true">${esc(m.initials)}</span>`;

/* --------------------------------------------------------------------------
   Saatler
   -------------------------------------------------------------------------- */
const WEEK = [1, 2, 3, 4, 5, 6, 0];
const hoursTable = (t, cls = '') => `<table class="hours ${cls}"><caption class="sr-only">${esc(t.contactPage.hours)}</caption><tbody>${WEEK.map((d) => {
  const h = salon.hours[d];
  return `<tr data-day="${d}"><th scope="row">${esc(t.ui.days[d])}</th><td>${h ? `${h[0]}–${h[1]}` : esc(t.ui.closed)}</td></tr>`;
}).join('')}</tbody></table>`;
const openingSpec = () => {
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return salon.hours.map((h, d) => (h ? { '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${names[d]}`, opens: h[0], closes: h[1] } : null)).filter(Boolean);
};

/* --------------------------------------------------------------------------
   Ortak parçalar
   -------------------------------------------------------------------------- */
function head(t, page, assets) {
  const canonical = abs(page.path);
  const alternates = langs
    .map((l) => `  <link rel="alternate" hreflang="${l.lang}" href="${abs(page.alt[l.lang])}">`)
    .concat(`  <link rel="alternate" hreflang="x-default" href="${abs(page.alt.tr)}">`).join('\n');
  const business = {
    '@type': 'BeautySalon',
    '@id': `${salon.url}/#salon`,
    name: salon.full[t.lang],
    url: abs(t.paths.home),
    image: abs('/og.png'),
    telephone: salon.phone,
    email: salon.email,
    priceRange: '₺₺',
    address: { '@type': 'PostalAddress', streetAddress: salon.address.street[t.lang], addressLocality: salon.address.city, addressCountry: salon.address.country },
    openingHoursSpecification: openingSpec()
  };
  const graph = [business, ...(page.graph || [])];
  if (page.crumbs) {
    graph.push({ '@type': 'BreadcrumbList', itemListElement: page.crumbs.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })) });
  }
  return `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.desc)}">${salon.demo ? '\n  <meta name="robots" content="noindex, nofollow">' : ''}
  <meta name="theme-color" content="#f5efe8">
  <meta name="color-scheme" content="light">
  <link rel="canonical" href="${canonical}">
${alternates}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..600;1,6..96,400..500&family=DM+Sans:opsz,wght@9..40,400..700&display=swap">
  <link rel="stylesheet" href="${assets.css}">${page.preload ? `
  <link rel="preload" as="image" type="image/avif" imagesrcset="${PHOTO_W.map((w) => `/img/${page.preload}-${w}.avif ${w}w`).join(', ')}" imagesizes="100vw">` : ''}
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(salon.full[t.lang])}">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.desc)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${abs('/og.png')}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="${t.locale}">
  <meta name="twitter:card" content="summary_large_image">

  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
  <script>document.documentElement.classList.add('js')</script>
  <script type="module" src="${assets.js}"></script>
</head>`;
}

const clientData = (t) => JSON.stringify({
  lang: t.lang,
  demo: salon.demo,
  hours: salon.hours,
  tz: salon.timezone,
  ui: {
    openNow: t.ui.openNow, closedNow: t.ui.closedNow, days: t.ui.days, daysShort: t.ui.daysShort, months: t.ui.months,
    today: t.ui.today, tomorrow: t.ui.tomorrow, demoPhone: t.ui.demoPhone,
    opensAt: t.ui.opensAt('{day}', '{time}'), closesAt: t.ui.closesAt('{time}')
  }
}).replace(/</g, '\\u003c');

function header(t, page) {
  const keys = ['services', 'team', 'gallery', 'contact'];
  const current = (k) => (page.section === k ? ' aria-current="page"' : '');
  const langSwitch = langs.map((l) => `<a href="${page.alt[l.lang]}" hreflang="${l.lang}" lang="${l.lang}"${l.lang === t.lang ? ' aria-current="true"' : ''}>${l.lang.toUpperCase()}</a>`).join('');
  return `
  ${salon.demo ? `<aside class="demo-bar" aria-label="Demo"><p>${esc(t.ui.demoBar)} <a href="${salon.author.url}">${esc(t.ui.demoBy)} →</a></p></aside>` : ''}
  <header class="site-header${page.overlay ? ' site-header--overlay' : ''}">
    <div class="wrap site-header__inner">
      <a class="logo" href="${t.paths.home}" aria-label="${esc(salon.full[t.lang])} · ${esc(t.ui.home)}">
        ${LOGO}
        <span class="logo__text">Mürver</span>
      </a>
      <nav class="nav" id="site-nav" aria-label="${esc(t.ui.navLabel)}">
        <ul class="nav__list">${keys.map((k) => `
          <li><a href="${t.paths[k]}"${current(k)}>${esc(t.nav[k])}</a></li>`).join('')}
        </ul>
        <div class="nav__extra">
          <a class="btn btn--dark nav__book" href="${t.paths.book}">${icon('calendar')}${esc(t.ui.book)}</a>
          <p class="status" data-open-status></p>
        </div>
      </nav>
      <div class="site-header__end">
        <nav class="lang" aria-label="${esc(t.ui.langLabel)}">${langSwitch}</nav>
        <a class="btn btn--dark btn--sm header-book" href="${t.paths.book}">${esc(t.ui.book)}</a>
        <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">
          <span class="menu-btn__open">${icon('menu')}<span class="sr-only">${esc(t.ui.menu)}</span></span>
          <span class="menu-btn__close">${icon('close')}<span class="sr-only">${esc(t.ui.close)}</span></span>
        </button>
      </div>
    </div>
  </header>`;
}

function footer(t) {
  return `
  <footer class="site-footer">
    <div class="wrap">
      <p class="footer-big">Mürver<span>${esc(salon.full[t.lang].replace('Mürver ', ''))}</span></p>
      <div class="site-footer__grid">
        <div>
          <p class="muted">${esc(t.footer.about)}</p>
          <a class="btn btn--light footer-book" href="${t.paths.book}">${icon('calendar')}${esc(t.ui.book)}</a>
        </div>
        <div>
          <h2 class="footer-title">${esc(t.footer.services)}</h2>
          <ul class="footer-links">${categories.map((c) => `<li><a href="${catPath(t, c)}">${esc(c.name[t.lang])}</a></li>`).join('')}<li><a href="${t.paths.services}">${esc(t.servicesPage.title)}</a></li></ul>
        </div>
        <div>
          <h2 class="footer-title">${esc(t.footer.pages)}</h2>
          <ul class="footer-links">${['team', 'gallery', 'contact'].map((k) => `<li><a href="${t.paths[k]}">${esc(t.nav[k])}</a></li>`).join('')}<li><a href="${t.paths.book}">${esc(t.book.title)}</a></li></ul>
        </div>
        <div>
          <h2 class="footer-title">${esc(t.footer.contact)}</h2>
          <address class="footer-contact">
            <p>${esc(salon.address.street[t.lang])}<br>${esc(salon.address.city)}</p>
            <p><a href="tel:${salon.phone}">${esc(salon.phoneDisplay)}</a></p>
          </address>
          ${hoursTable(t, 'hours--compact')}
        </div>
      </div>
      <div class="site-footer__bottom">
        <p><a href="${t.paths.privacy}">${esc(t.footer.privacy)}</a> · ${esc(t.footer.made)}: <a href="${salon.author.url}">${esc(salon.author.name)}</a></p>
        <p class="credits">${esc(t.footer.photos)}: <a href="https://unsplash.com/?utm_source=murver&amp;utm_medium=referral">Unsplash</a> · ${credits()}</p>
      </div>
    </div>
  </footer>

  <nav class="action-bar" aria-label="${esc(t.contactPage.title)}">
    <a class="action-bar__call" href="tel:${salon.phone}">${icon('phone')}${esc(t.ui.call)}</a>
    <a class="action-bar__book" href="${t.paths.book}">${icon('calendar')}${esc(t.ui.book)}</a>
  </nav>
  <div class="toast" role="status" aria-live="polite"></div>`;
}

const crumbs = (t, list) => `<nav class="crumbs" aria-label="${esc(t.ui.breadcrumb)}"><ol>${list.map(([name, path], i) => (i === list.length - 1
  ? `<li><span aria-current="page">${esc(name)}</span></li>`
  : `<li><a href="${path}">${esc(name)}</a></li>`)).join('')}</ol></nav>`;

function layout(t, page, assets, body) {
  return `<!DOCTYPE html>
<html lang="${t.lang}">
${head(t, page, assets)}
<body class="${page.bodyClass || ''}" data-client="${esc(clientData(t))}">
  <a class="skip-link" href="#main">${esc(t.ui.skip)}</a>
${header(t, page)}

  <main id="main" tabindex="-1">${body}
  </main>
${footer(t)}
</body>
</html>
`;
}

const pageHero = (t, title, lead, crumbList) => `
    <section class="page-hero">
      <div class="wrap">
        ${crumbs(t, crumbList)}
        <h1 class="page-title">${esc(title)}</h1>
        ${lead ? `<p class="lead">${esc(lead)}</p>` : ''}
      </div>
    </section>`;

const ctaBand = (t, title, text, href = t.paths.book) => `
    <section class="cta-band">
      <div class="cta-band__media">${pic(t, 'interior-1', { sizes: '100vw' })}</div>
      <div class="wrap cta-band__inner" data-reveal>
        <h2 class="display-2">${esc(title)}</h2>
        <p>${esc(text)}</p>
        <div class="cta-band__actions">
          <a class="btn btn--light btn--lg" href="${href}">${icon('calendar')}${esc(t.ui.book)}</a>
          <a class="btn btn--ghost-light btn--lg" href="tel:${salon.phone}">${icon('phone')}${esc(salon.phoneDisplay)}</a>
        </div>
      </div>
    </section>`;

const catCard = (t, c, i) => `
          <li class="cat-card" data-reveal>
            <a href="${catPath(t, c)}">
              <span class="cat-card__media">${pic(t, c.photo, { sizes: '(max-width: 640px) 92vw, (max-width: 1080px) 46vw, 300px' })}</span>
              <span class="cat-card__num" aria-hidden="true">${pad(i + 1)}</span>
              <h3 class="cat-card__title">${esc(c.name[t.lang])}</h3>
              <p>${esc(c.short[t.lang])}</p>
              <span class="cat-card__price">${esc(t.from(t.money(minPrice(c))))} <span>${esc(t.ui.startsFrom)}</span></span>
            </a>
          </li>`;

const priceRows = (t, c) => c.services.map((s) => `
            <li class="price-row">
              <div class="price-row__main">
                <h3>${esc(s.name[t.lang])}</h3>
                <p>${esc(s.desc[t.lang])}</p>
              </div>
              <span class="price-row__dots" aria-hidden="true"></span>
              <div class="price-row__meta">
                <span class="price-row__time">${icon('clock')}${esc(t.mins(s.min))}</span>
                <strong class="price-row__price">${esc(priceText(t, s))}</strong>
              </div>
              <a class="price-row__book" href="${t.paths.book}?s=${s.id}">${esc(t.ui.select)}<span class="sr-only"> · ${esc(s.name[t.lang])}</span> ${icon('plus')}</a>
            </li>`).join('');

const faqList = (items) => `<div class="faq">${items.map((it) => `
          <details class="faq__item">
            <summary>${esc(it.q)}<span class="faq__icon" aria-hidden="true"></span></summary>
            <p>${esc(it.a)}</p>
          </details>`).join('')}
        </div>`;

const altFor = (key) => Object.fromEntries(langs.map((l) => [l.lang, l.paths[key]]));

/* --------------------------------------------------------------------------
   Ana sayfa
   -------------------------------------------------------------------------- */
export function home(t, assets) {
  const h = t.home;
  const page = { path: t.paths.home, alt: altFor('home'), title: h.title, desc: t.meta.siteDesc, bodyClass: 'page-home', preload: 'hero', overlay: true };
  const feat = featured.map(serviceById);
  const galleryPicks = ['nails-polish', 'skin-mask', 'hair-wash', 'lashes', 'hair-brush', 'products'];
  const featPhotos = { balayage: 'hair-color', 'gel-hand': 'nails-pink', 'brow-lam': 'makeup-eye' };
  const marquee = allServices.map((x) => x.name[t.lang]);
  const body = `
    <section class="hero">
      <div class="hero__media">${pic(t, 'hero', { sizes: '(min-width: 1024px) 50vw, 100vw', eager: true })}</div>
      <div class="hero__accent" aria-hidden="true">${pic(t, 'makeup-flatlay', { sizes: '18vw' })}</div>
      <div class="wrap hero__inner">
        <p class="eyebrow">${esc(h.eyebrow)}</p>
        <h1 class="display">${h.h1.map((l, i) => `<span${i ? ' class="display__em"' : ''}>${esc(l)}</span>`).join(' ')}</h1>
        <p class="hero__lead">${esc(h.lead)}</p>
        <div class="hero__actions">
          <a class="btn btn--light btn--lg" href="${t.paths.book}">${icon('calendar')}${esc(t.ui.book)}</a>
          <a class="btn btn--ghost-light btn--lg" href="${t.paths.services}">${esc(h.secondary)}</a>
        </div>
        <p class="hero__status"><span class="status status--light" data-open-status></span><span class="hero__addr">${icon('pin')}${esc(salon.address.street[t.lang])}, ${esc(salon.address.city)}</span></p>
      </div>
    </section>

    <div class="ticker" aria-hidden="true"><div class="ticker__track">${[0, 1].map(() => `<span>${marquee.map((m) => `${esc(m)}<i>✿</i>`).join('')}</span>`).join('')}</div></div>

    <section class="section" aria-labelledby="c-title">
      <div class="wrap">
        <div class="section-head section-head--row">
          <div>
            <h2 class="display-2" id="c-title">${esc(h.catTitle)}</h2>
            <p class="muted">${esc(h.catSub)}</p>
          </div>
          <a class="link-arrow" href="${t.paths.services}">${esc(t.ui.priceList)} ${icon('arrow')}</a>
        </div>
        <div class="cat-showcase" data-showcase>
          <div class="cat-preview" aria-hidden="true">${categories.map((c, i) => `<div class="cat-preview__img${i ? '' : ' is-on'}" data-preview="${i}">${pic(t, c.photo, { sizes: '40vw' })}</div>`).join('')}</div>
          <ul class="cat-grid">${categories.map((c, i) => catCard(t, c, i)).join('')}
          </ul>
        </div>
      </div>
    </section>

    <section class="section section--tint" aria-labelledby="f-title">
      <div class="wrap">
        <div class="section-head section-head--row">
          <h2 class="display-2" id="f-title">${esc(h.featTitle)}</h2>
          <a class="link-arrow" href="${t.paths.book}">${esc(t.ui.book)} ${icon('arrow')}</a>
        </div>
        <ul class="picks">${feat.map((s, i) => `
          <li class="pick" data-reveal>
            <div class="pick__media">${pic(t, featPhotos[s.id], { sizes: '(max-width: 900px) 92vw, 30vw' })}</div>
            <span class="pick__num" aria-hidden="true">${pad(i + 1)}</span>
            <h3>${esc(s.name[t.lang])}</h3>
            <p>${esc(s.desc[t.lang])} · ${esc(t.mins(s.min))}</p>
            <div class="pick__foot">
              <strong>${esc(priceText(t, s))}</strong>
              <a class="btn btn--outline btn--sm" href="${t.paths.book}?s=${s.id}">${esc(t.ui.book)}<span class="sr-only"> · ${esc(s.name[t.lang])}</span></a>
            </div>
          </li>`).join('')}
        </ul>
      </div>
    </section>

    <section class="section" aria-labelledby="a-title">
      <div class="wrap about">
        <div class="about__media" data-reveal>
          ${pic(t, 'interior-2', { sizes: '(max-width: 900px) 60vw, 26vw', cls: 'about__tall' })}
          ${pic(t, 'skin-products', { sizes: '(max-width: 900px) 60vw, 24vw', cls: 'about__small' })}
        </div>
        <div data-reveal>
          <h2 class="display-2" id="a-title">${esc(h.aboutTitle)}</h2>
          <p class="lead">${esc(h.aboutText)}</p>
          <ul class="stats">${h.stats.map((s) => `<li><strong>${esc(s.k)}</strong><span>${esc(s.v)}</span></li>`).join('')}</ul>
          <div class="team-mini">
            <ul>${team.map((m) => `<li title="${esc(m.name)}">${avatar(m, 'sm')}</li>`).join('')}</ul>
            <a class="link-arrow" href="${t.paths.team}">${esc(h.teamTitle)} ${icon('arrow')}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--dark" aria-labelledby="h-title">
      <div class="wrap">
        <h2 class="display-2" id="h-title">${esc(h.howTitle)}</h2>
        <ol class="how">${h.how.map((s, i) => `
          <li data-reveal><span class="how__num">${pad(i + 1)}</span><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></li>`).join('')}
        </ol>
        <a class="btn btn--light btn--lg" href="${t.paths.book}">${icon('calendar')}${esc(t.ui.book)}</a>
      </div>
    </section>

    <section class="section" aria-labelledby="g-title">
      <div class="wrap">
        <div class="section-head section-head--row">
          <h2 class="display-2" id="g-title">${esc(h.galleryTitle)}</h2>
          <a class="link-arrow" href="${t.paths.gallery}">${esc(t.galleryPage.title)} ${icon('arrow')}</a>
        </div>
        <ul class="strip">${galleryPicks.map((g) => `<li data-reveal>${pic(t, g, { sizes: '(max-width: 640px) 46vw, 16vw' })}</li>`).join('')}</ul>
      </div>
    </section>
${ctaBand(t, h.ctaTitle, h.ctaText)}`;
  return layout(t, page, assets, body);
}

/* --------------------------------------------------------------------------
   Hizmetler ve fiyatlar
   -------------------------------------------------------------------------- */
export function servicesPage(t, assets) {
  const p = t.servicesPage;
  const crumbList = [[t.ui.home, t.paths.home], [p.title, t.paths.services]];
  const page = {
    path: t.paths.services, alt: altFor('services'), section: 'services', title: `${p.title} · Mürver`, desc: p.lead, crumbs: crumbList,
    graph: [{
      '@type': 'OfferCatalog', name: p.title,
      itemListElement: categories.map((c) => ({
        '@type': 'OfferCatalog', name: c.name[t.lang],
        itemListElement: c.services.map((s) => ({ '@type': 'Offer', priceCurrency: 'TRY', price: s.price, itemOffered: { '@type': 'Service', name: s.name[t.lang] } }))
      }))
    }]
  };
  const body = `${pageHero(t, p.title, p.lead, crumbList)}
    <section class="section section--flush">
      <div class="wrap">
        <nav class="chips" aria-label="${esc(p.jump)}">${categories.map((c) => `<a class="chip" href="#${c.id}">${icon(c.id)}${esc(c.name[t.lang])}</a>`).join('')}</nav>
        ${categories.map((c) => `
        <section class="price-block" id="${c.id}" aria-labelledby="pb-${c.id}">
          <div class="price-block__media" data-reveal>${pic(t, c.side, { sizes: '(max-width: 900px) 92vw, 30vw' })}</div>
          <div>
            <h2 class="display-2" id="pb-${c.id}">${esc(c.name[t.lang])}</h2>
            <p class="muted">${esc(c.short[t.lang])}</p>
            <ul class="price-list">${priceRows(t, c)}
            </ul>
            <a class="link-arrow" href="${catPath(t, c)}">${esc(t.ui.viewCategory)} ${icon('arrow')}</a>
          </div>
        </section>`).join('')}
      </div>
    </section>
${ctaBand(t, t.home.ctaTitle, t.home.ctaText)}`;
  return layout(t, page, assets, body);
}

/* --------------------------------------------------------------------------
   Kategori sayfası
   -------------------------------------------------------------------------- */
export function categoryPage(t, c, assets) {
  const L = t.category;
  const name = c.name[t.lang];
  const path = catPath(t, c);
  const crumbList = [[t.ui.home, t.paths.home], [t.nav.services, t.paths.services], [name, path]];
  const members = team.filter((m) => m.cats.includes(c.id));
  const page = {
    path, alt: Object.fromEntries(langs.map((l) => [l.lang, catPath(l, c)])), section: 'services',
    title: `${name} · Mürver`, desc: `${c.short[t.lang]} ${t.from(t.money(minPrice(c)))} ${t.ui.startsFrom}.`, crumbs: crumbList,
    graph: [
      ...c.services.map((s) => ({ '@type': 'Service', name: s.name[t.lang], description: s.desc[t.lang], provider: { '@id': `${salon.url}/#salon` }, offers: { '@type': 'Offer', priceCurrency: 'TRY', price: s.price } })),
      { '@type': 'FAQPage', inLanguage: t.lang, mainEntity: c.faq[t.lang].map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })) }
    ]
  };
  const body = `
    <section class="cat-hero">
      <div class="cat-hero__media">${pic(t, c.photo, { sizes: '(max-width: 900px) 100vw, 55vw', eager: true })}</div>
      <div class="cat-hero__text">
        ${crumbs(t, crumbList)}
        <span class="cat-hero__icon">${icon(c.id)}</span>
        <h1 class="page-title">${esc(name)}</h1>
        <p class="lead">${esc(c.intro[t.lang])}</p>
        <a class="btn btn--dark btn--lg" href="${t.paths.book}?c=${c.id}">${icon('calendar')}${esc(L.cta)}</a>
      </div>
    </section>

    <div class="wrap cat-layout">
      <div>
        <section aria-labelledby="pl">
          <h2 class="h3 label" id="pl">${esc(L.list)}</h2>
          <ul class="price-list">${priceRows(t, c)}
          </ul>
          <p class="note">${esc(L.note)}</p>
        </section>
        <section aria-labelledby="care" class="block">
          <h2 class="h3 label" id="care">${esc(L.care)}</h2>
          <ul class="bullets">${c.care[t.lang].map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        </section>
        <section aria-labelledby="faq" class="block">
          <h2 class="h3 label" id="faq">${esc(L.faq)}</h2>
          ${faqList(c.faq[t.lang])}
        </section>
      </div>
      <aside class="cat-aside">
        <div class="aside-card">
          <p class="label">${esc(L.team)}</p>
          <ul class="aside-team">${members.map((m) => `<li>${avatar(m, 'sm')}<div><a href="${t.paths.team}#${m.id}">${esc(m.name)}</a><small>${esc(m.role[t.lang])}</small></div></li>`).join('')}</ul>
          <a class="btn btn--dark btn--block" href="${t.paths.book}?c=${c.id}">${icon('calendar')}${esc(t.ui.book)}</a>
        </div>
        ${pic(t, c.side, { sizes: '340px', cls: 'aside-photo' })}
      </aside>
    </div>

    <section class="section section--tint" aria-labelledby="o-title">
      <div class="wrap">
        <h2 class="display-2" id="o-title">${esc(L.others)}</h2>
        <ul class="cat-grid cat-grid--3">${categories.filter((x) => x !== c).map((x) => catCard(t, x, categories.indexOf(x))).join('')}
        </ul>
      </div>
    </section>`;
  return layout(t, page, assets, body);
}

/* --------------------------------------------------------------------------
   Ekibimiz
   -------------------------------------------------------------------------- */
export function teamPage(t, assets) {
  const p = t.teamPage;
  const crumbList = [[t.ui.home, t.paths.home], [p.title, t.paths.team]];
  const page = { path: t.paths.team, alt: altFor('team'), section: 'team', title: `${p.title} · Mürver`, desc: p.lead, crumbs: crumbList };
  const catName = (id) => categories.find((c) => c.id === id).name[t.lang];
  const body = `${pageHero(t, p.title, p.lead, crumbList)}
    <section class="section section--flush">
      <div class="wrap">
        <ul class="team-grid">${team.map((m) => `
          <li class="member" id="${m.id}" data-reveal>
            ${avatar(m, 'lg')}
            <h2 class="member__name">${esc(m.name)}</h2>
            <p class="member__role">${esc(m.role[t.lang])}</p>
            <p class="member__bio">${esc(m.bio[t.lang])}</p>
            <ul class="tags">${m.cats.map((c) => `<li>${icon(c)}${esc(catName(c))}</li>`).join('')}</ul>
            <a class="link-arrow" href="${t.paths.book}?p=${m.id}">${esc(p.book(m.name.split(' ')[0]))} ${icon('arrow')}</a>
          </li>`).join('')}
        </ul>
        <p class="note">${esc(p.note)}</p>
      </div>
    </section>
${ctaBand(t, t.home.ctaTitle, t.home.ctaText)}`;
  return layout(t, page, assets, body);
}

/* --------------------------------------------------------------------------
   Galeri (filtre + büyütme)
   -------------------------------------------------------------------------- */
export function galleryPage(t, assets) {
  const p = t.galleryPage;
  const crumbList = [[t.ui.home, t.paths.home], [p.title, t.paths.gallery]];
  const page = { path: t.paths.gallery, alt: altFor('gallery'), section: 'gallery', title: `${p.title} · Mürver`, desc: p.lead, crumbs: crumbList };
  const items = Object.entries(photos).filter(([k]) => k !== 'hero');
  const body = `${pageHero(t, p.title, p.lead, crumbList)}
    <section class="section section--flush">
      <div class="wrap">
        <div class="chips filters" role="group" aria-label="${esc(p.filter)}">
          <button type="button" class="chip" aria-pressed="true" data-filter="all">${esc(p.all)}</button>${Object.entries(p.cats).map(([k, v]) => `
          <button type="button" class="chip" aria-pressed="false" data-filter="${k}">${esc(v)}</button>`).join('')}
        </div>
        <ul class="masonry" data-gallery data-msg="${esc(JSON.stringify({ count: p.count('{i}', '{n}') }))}">${items.map(([k, ph]) => `
          <li data-cat="${ph.cat}">
            <button type="button" class="masonry__btn" data-full="/img/${k}-1200.webp" data-full-avif="/img/${k}-1200.avif" data-w="${ph.size[0]}" data-h="${ph.size[1]}">
              ${pic(t, k, { sizes: '(max-width: 640px) 46vw, (max-width: 1080px) 30vw, 380px' })}
              <span class="masonry__zoom">${icon('expand')}<span class="sr-only">${esc(p.open)}</span></span>
            </button>
          </li>`).join('')}
        </ul>
      </div>
    </section>
    <dialog class="lightbox" aria-label="${esc(p.title)}">
      <div class="lightbox__inner">
        <button type="button" class="lightbox__close" data-close>${icon('close')}<span class="sr-only">${esc(t.ui.close)}</span></button>
        <figure>
          <picture><source type="image/avif"><img alt=""></picture>
          <figcaption><span data-caption></span> <span class="lightbox__count" data-count></span></figcaption>
        </figure>
        <button type="button" class="lightbox__nav lightbox__nav--prev" data-prev>${icon('back')}<span class="sr-only">${esc(p.prev)}</span></button>
        <button type="button" class="lightbox__nav lightbox__nav--next" data-next>${icon('arrow')}<span class="sr-only">${esc(p.next)}</span></button>
      </div>
    </dialog>
${ctaBand(t, t.home.ctaTitle, t.home.ctaText)}`;
  return layout(t, page, assets, body);
}

/* --------------------------------------------------------------------------
   İletişim
   -------------------------------------------------------------------------- */
const MAP = (t) => `<svg class="map" viewBox="0 0 600 420" role="img" aria-label="${esc(t.contactPage.mapLabel)}">
  <rect width="600" height="420" fill="#efe7de"/>
  <path d="M-20 320 C140 280 240 350 380 300 S560 240 640 270" fill="none" stroke="#dfd2e3" stroke-width="44"/>
  <rect x="60" y="40" width="160" height="110" rx="20" fill="#e3e6d5"/>
  <g fill="none" stroke="#fffaf4" stroke-linecap="round">
    <path d="M0 200 H600" stroke-width="26"/><path d="M290 0 V420" stroke-width="22"/><path d="M0 70 L240 210" stroke-width="14"/><path d="M440 0 V420" stroke-width="12"/><path d="M290 120 H600" stroke-width="12"/>
  </g>
  <g font-family="DM Sans, sans-serif" font-size="13" fill="#7a6d66"><text x="20" y="192">Mürver Sk.</text><text x="300" y="20" transform="rotate(90 300 20)">Örnek Cd.</text><text x="88" y="140">Park</text></g>
  <g transform="translate(480 236)"><circle r="16" fill="#4a2639"/><path d="M-6 -6h12v10h-12z M-4 6l-2 4 M4 6l2 4" fill="none" stroke="#fff" stroke-width="2"/><text x="24" y="5" font-family="DM Sans, sans-serif" font-size="13" fill="#5a4d47">Metro</text></g>
  <g transform="translate(340 160)"><circle r="34" fill="#4a2639" opacity=".14"/><path d="M0 18 C-14 4 -18 -4 -18 -10 a18 18 0 0 1 36 0 c0 6 -4 14 -18 28z" fill="#4a2639"/><circle cy="-10" r="6.5" fill="#fff"/></g>
  <g transform="translate(372 128)"><rect y="-16" width="92" height="32" rx="16" fill="#fffaf4"/><text x="16" y="5" font-family="DM Sans, sans-serif" font-size="14" font-weight="600" fill="#2a2320">Mürver</text></g>
</svg>`;

export function contactPage(t, assets) {
  const p = t.contactPage;
  const crumbList = [[t.ui.home, t.paths.home], [p.title, t.paths.contact]];
  const page = { path: t.paths.contact, alt: altFor('contact'), section: 'contact', title: `${p.title} · Mürver`, desc: `${p.lead} ${salon.address.street[t.lang]}, ${salon.address.city}.`, crumbs: crumbList };
  const tIcons = ['train', 'bus', 'car'];
  const body = `${pageHero(t, p.title, p.lead, crumbList)}
    <section class="section section--flush">
      <div class="wrap contact-grid">
        <div class="contact-cards">
          <div class="info-card" data-reveal>${icon('pin')}<div><h2 class="label">${esc(p.address)}</h2><p>${esc(salon.address.street[t.lang])}<br>${esc(salon.address.city)}</p></div></div>
          <div class="info-card" data-reveal>${icon('phone')}<div><h2 class="label">${esc(p.phone)}</h2><p><a href="tel:${salon.phone}">${esc(salon.phoneDisplay)}</a></p></div></div>
          <div class="info-card" data-reveal>${icon('mail')}<div><h2 class="label">${esc(p.email)}</h2><p>${esc(salon.email)}</p></div></div>
          <div class="info-card" data-reveal>${icon('insta')}<div><h2 class="label">${esc(p.social)}</h2><p>${esc(salon.instagram)}</p></div></div>
          <div class="info-card" data-reveal>${icon('clock')}<div><h2 class="label">${esc(p.hours)}</h2><p class="status" data-open-status></p>${hoursTable(t)}</div></div>
        </div>
        <div data-reveal>
          <figure class="map-fig">${MAP(t)}<figcaption>${esc(p.mapNote)}</figcaption></figure>
          <h2 class="h3">${esc(p.transport)}</h2>
          <ul class="transport">${p.transportItems.map((x, i) => `<li>${icon(tIcons[i])}<span>${esc(x)}</span></li>`).join('')}</ul>
        </div>
      </div>
    </section>
${ctaBand(t, t.home.ctaTitle, t.home.ctaText)}`;
  return layout(t, page, assets, body);
}

/* --------------------------------------------------------------------------
   Online randevu
   -------------------------------------------------------------------------- */
export function bookPage(t, assets) {
  const b = t.book;
  const crumbList = [[t.ui.home, t.paths.home], [b.title, t.paths.book]];
  const page = { path: t.paths.book, alt: altFor('book'), section: 'book', title: `${b.title} · Mürver`, desc: b.lead, crumbs: crumbList, bodyClass: 'page-book' };
  const err = (id) => `<p class="field-error" id="err-${id}" hidden>${esc(b.errors[id])}</p>`;
  const msg = {
    stepOf: b.stepOf('{i}', '{n}'),
    done: b.doneText('{ref}', '{when}'),
    items: b.cart.items('{n}'),
    items1: b.cart.items(1),
    empty: b.cart.empty,
    slotHint: b.slotHint('{d}'),
    noSlots: b.noSlots,
    any: b.any,
    icsTitle: b.icsTitle,
    from: t.from('{p}'),
    mins: { h: t.lang === 'tr' ? 'sa' : 'h', m: t.lang === 'tr' ? 'dk' : 'min' },
    services: Object.fromEntries(allServices.map((s) => [s.id, { name: s.name[t.lang], cat: s.cat, min: s.min, price: s.price, from: !!s.from }])),
    team: Object.fromEntries(team.map((m) => [m.id, { name: m.name, cats: m.cats }])),
    address: `${salon.address.street[t.lang]}, ${salon.address.city}`,
    step: salon.slotStep
  };

  const body = `${pageHero(t, b.title, b.lead, crumbList)}
    <section class="section section--flush">
      <div class="wrap book-wrap">
        <noscript><p class="note-inline">${esc(b.noscript)} <a href="tel:${salon.phone}">${esc(salon.phoneDisplay)}</a></p></noscript>
        <form class="book" id="book" novalidate data-msg="${esc(JSON.stringify(msg))}">
          <ol class="stepper" aria-hidden="true">${b.steps.map((s, i) => `<li data-step-dot="${i}">${esc(s)}</li>`).join('')}</ol>
          <p class="stepper__text" aria-live="polite"></p>

          <fieldset class="book-step" data-step="0" aria-describedby="err-services">
            <legend tabindex="-1">${esc(b.q1)}</legend>
            <p class="hint">${esc(b.q1hint)}</p>
            ${categories.map((c) => `
            <div class="svc-group">
              <h2 class="svc-group__title">${icon(c.id)}${esc(c.name[t.lang])}</h2>
              <div class="svc-grid">${c.services.map((s) => `
                <label class="svc">
                  <input type="checkbox" name="services" value="${s.id}">
                  <span class="svc__box">
                    <span class="svc__check">${icon('check')}</span>
                    <span class="svc__text"><strong>${esc(s.name[t.lang])}</strong><small>${esc(t.mins(s.min))}</small></span>
                    <span class="svc__price">${esc(priceText(t, s))}</span>
                  </span>
                </label>`).join('')}
              </div>
            </div>`).join('')}
            ${err('services')}
          </fieldset>

          <fieldset class="book-step" data-step="1">
            <legend tabindex="-1">${esc(b.q2)}</legend>
            <div class="person-grid">
              <label class="person">
                <input type="radio" name="person" value="any" checked>
                <span class="person__box"><span class="avatar avatar--sm avatar--any">${icon('sparkle')}</span><span><strong>${esc(b.any)}</strong><small>${esc(b.anySub)}</small></span></span>
              </label>${team.map((m) => `
              <label class="person">
                <input type="radio" name="person" value="${m.id}" data-cats="${m.cats.join(' ')}">
                <span class="person__box">${avatar(m, 'sm')}<span><strong>${esc(m.name)}</strong><small data-role>${esc(m.role[t.lang])}</small><small class="person__no" hidden>${esc(b.cannot)}</small></span></span>
              </label>`).join('')}
            </div>
          </fieldset>

          <fieldset class="book-step" data-step="2" aria-describedby="err-day err-slot">
            <legend tabindex="-1">${esc(b.q3)}</legend>
            <p class="hint" data-slot-hint></p>
            <p class="field-label" id="day-label">${esc(b.dayLabel)}</p>
            <div class="day-picker" role="radiogroup" aria-labelledby="day-label" data-days></div>
            ${err('day')}
            <p class="field-label" id="slot-label">${esc(b.slotLabel)}</p>
            <div class="slot-grid" role="radiogroup" aria-labelledby="slot-label" data-slots></div>
            <p class="hint hint--small">${esc(b.demoBusy)}</p>
            ${err('slot')}
          </fieldset>

          <fieldset class="book-step" data-step="3">
            <legend tabindex="-1">${esc(b.q4)}</legend>
            <div class="field"><label for="f-name">${esc(b.name)}</label><input class="input" id="f-name" name="name" type="text" autocomplete="name" maxlength="80" required aria-describedby="err-name">${err('name')}</div>
            <div class="field"><label for="f-phone">${esc(b.phone)}</label><input class="input" id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="20" required aria-describedby="hint-phone err-phone"><small class="hint" id="hint-phone">${esc(b.phoneHint)}</small>${err('phone')}</div>
            <div class="field"><label for="f-note">${esc(b.note)}</label><textarea class="input" id="f-note" name="note" rows="3" maxlength="500" aria-describedby="hint-note"></textarea><small class="hint" id="hint-note">${esc(b.noteHint)}</small></div>
            <div class="field field--check"><input type="checkbox" id="f-kvkk" name="kvkk" required aria-describedby="err-kvkk"><label for="f-kvkk">${b.kvkk.replace(/href="[^"]*"/, `href="${t.paths.privacy}"`)}</label></div>
            ${err('kvkk')}
          </fieldset>

          <fieldset class="book-step" data-step="4">
            <legend tabindex="-1">${esc(b.q5)}</legend>
            <dl class="summary">
              <div><dt>${esc(b.sum.services)}</dt><dd data-sum="services"></dd><button type="button" class="link-btn" data-goto="0">${esc(b.edit)}</button></div>
              <div><dt>${esc(b.sum.person)}</dt><dd data-sum="person"></dd><button type="button" class="link-btn" data-goto="1">${esc(b.edit)}</button></div>
              <div><dt>${esc(b.sum.time)}</dt><dd data-sum="time"></dd><button type="button" class="link-btn" data-goto="2">${esc(b.edit)}</button></div>
              <div><dt>${esc(b.sum.contact)}</dt><dd data-sum="contact"></dd><button type="button" class="link-btn" data-goto="3">${esc(b.edit)}</button></div>
              <div class="summary__total"><dt>${esc(b.sum.total)}</dt><dd data-sum="total"></dd></div>
            </dl>
            <p class="note-inline">${esc(b.demoNote)}</p>
          </fieldset>

          <div class="book-nav">
            <button class="btn btn--outline" type="button" data-prev>${icon('back')}${esc(b.back)}</button>
            <button class="btn btn--dark" type="button" data-next>${esc(b.next)}${icon('arrow')}</button>
            <button class="btn btn--dark" type="submit" data-submit>${icon('check')}${esc(b.submit)}</button>
          </div>
        </form>

        <aside class="cart" aria-label="${esc(b.sum.services)}">
          <div class="cart__inner">
            <p class="label">${esc(b.sum.services)}</p>
            <ul class="cart__list" data-cart-list></ul>
            <p class="cart__empty" data-cart-empty>${esc(b.cart.empty)}</p>
            <dl class="cart__totals">
              <div><dt>${esc(b.cart.duration)}</dt><dd data-cart-time>—</dd></div>
              <div><dt>${esc(b.cart.total)}</dt><dd data-cart-total>—</dd></div>
            </dl>
          </div>
        </aside>

        <div class="book-done" id="book-done" hidden tabindex="-1">
          <span class="book-done__icon">${icon('check')}</span>
          <h2 class="display-2">${esc(b.doneTitle)}</h2>
          <p class="lead" data-done-text></p>
          <div class="book-done__actions">
            <button class="btn btn--dark" type="button" data-ics>${icon('calendar')}${esc(b.ics)}</button>
            <button class="btn btn--outline" type="button" data-restart>${esc(b.again)}</button>
          </div>
          <p class="note-inline">${esc(b.demoNote)}</p>
        </div>
      </div>
    </section>`;
  return layout(t, page, assets, body);
}

/* --------------------------------------------------------------------------
   KVKK ve 404
   -------------------------------------------------------------------------- */
export function privacyPage(t, assets) {
  const p = t.privacyPage;
  const crumbList = [[t.ui.home, t.paths.home], [p.title, t.paths.privacy]];
  const page = { path: t.paths.privacy, alt: altFor('privacy'), title: `${p.title} · Mürver`, desc: p.body[0][1], crumbs: crumbList };
  const body = `${pageHero(t, p.title, p.lead, crumbList)}
    <section class="section section--flush">
      <div class="wrap prose">${p.body.map(([h, d]) => `
        <h2 class="h3">${esc(h)}</h2>
        <p>${esc(d)}</p>`).join('')}
      </div>
    </section>`;
  return layout(t, page, assets, body);
}

export function notFound(assets) {
  const [tr, en] = langs;
  const page = { path: '/404', alt: { tr: '/', en: '/en/' }, title: `404 · Mürver`, desc: tr.notFound.text };
  const body = `
    <section class="nf">
      <div class="wrap">
        <p class="nf__code" aria-hidden="true">404</p>
        <h1 class="page-title">${esc(tr.notFound.title)}</h1>
        <p class="lead">${esc(tr.notFound.text)}</p>
        <p class="lead muted" lang="en">${esc(en.notFound.title)}. ${esc(en.notFound.text)}</p>
        <div class="nf__actions">
          <a class="btn btn--dark" href="/">${esc(tr.notFound.back)}</a>
          <a class="btn btn--outline" href="/en/" lang="en">${esc(en.notFound.back)}</a>
        </div>
      </div>
    </section>`;
  return layout(tr, page, assets, body).replace('<link rel="canonical" href="https://salon.egementuncer.dev/404">', '');
}
