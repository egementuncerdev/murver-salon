/* ==========================================================================
   Mürver — etkileşimler
   - Mobil menü, başlık durumu, "şu an açık" rozeti, demo telefon uyarısı
   - Galeri: kategori filtresi + büyütme (dialog)
   - Online randevu: çoklu hizmet, uzman filtresi, gerçek saat dilimleri, .ics
   Veri hiçbir yere gönderilmez; dolu saatler tarih ve uzmana göre sabit
   (her açılışta aynı) örnek bir doluluktan üretilir.
   ========================================================================== */

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const data = JSON.parse(document.body.dataset.client || '{}');
const ui = data.ui || {};
const fill = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const toMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

/* ---------- Bildirim ---------- */
const toastEl = $('.toast');
let toastTimer = 0;
function toast(text) {
  if (!toastEl) return;
  toastEl.textContent = text;
  toastEl.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 3200);
}

/* ---------- Mobil menü ---------- */
const menuBtn = $('.menu-btn');
const nav = $('#site-nav');
if (menuBtn && nav) {
  const root = document.documentElement;
  let backdrop = null;
  const setOpen = (open) => {
    root.classList.toggle('nav-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      backdrop = document.createElement('div');
      backdrop.className = 'nav-backdrop';
      backdrop.addEventListener('click', () => setOpen(false));
      document.body.append(backdrop);
      nav.querySelector('a')?.focus();
    } else {
      backdrop?.remove();
      backdrop = null;
    }
  };
  menuBtn.addEventListener('click', () => setOpen(menuBtn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('nav-open')) { setOpen(false); menuBtn.focus(); }
  });
  nav.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !root.classList.contains('nav-open')) return;
    const items = $$('a, button', nav).filter((el) => el.offsetParent !== null);
    if (e.shiftKey && document.activeElement === items[0]) { e.preventDefault(); menuBtn.focus(); }
    else if (!e.shiftKey && document.activeElement === items[items.length - 1]) { e.preventDefault(); menuBtn.focus(); }
  });
  matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
}

/* ---------- Başlık: kaydırınca dolar ---------- */
const header = $('.site-header');
if (header) {
  const hero = $('.hero');
  const onScroll = () => {
    const limit = hero ? hero.offsetHeight - header.offsetHeight - 40 : 8;
    header.classList.toggle('is-scrolled', window.scrollY > Math.max(8, limit));
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Açık / kapalı ---------- */
function salonNow() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: data.tz || 'Europe/Istanbul', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type)?.value;
  return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday')), minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}
function openState() {
  const hours = data.hours || [];
  const { day, minutes } = salonNow();
  const today = hours[day];
  if (today && minutes >= toMin(today[0]) && minutes < toMin(today[1])) return { open: true, today: day, text: `${ui.openNow} · ${fill(ui.closesAt, { time: today[1] })}` };
  if (today && minutes < toMin(today[0])) return { open: false, today: day, text: `${ui.closedNow} · ${fill(ui.opensAt, { day: ui.today, time: today[0] })}` };
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (hours[d]) return { open: false, today: day, text: `${ui.closedNow} · ${fill(ui.opensAt, { day: i === 1 ? ui.tomorrow : ui.days[d], time: hours[d][0] })}` };
  }
  return { open: false, today: day, text: ui.closedNow };
}
function renderStatus() {
  if (!data.hours) return;
  const s = openState();
  $$('[data-open-status]').forEach((el) => { el.dataset.state = s.open ? 'open' : 'closed'; el.textContent = s.text; });
  $$('.hours tr').forEach((tr) => tr.classList.toggle('is-today', Number(tr.dataset.day) === s.today));
}
renderStatus();
setInterval(renderStatus, 60 * 1000);

/* ---------- Demo: telefon bağlantıları ---------- */
if (data.demo) {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('a[href^="tel:"]')) return;
    e.preventDefault();
    toast(ui.demoPhone);
  });
}

/* ---------- Kaydırınca belirme ---------- */
const revealEls = $$('[data-reveal]');
if (revealEls.length) {
  if (reduceMotion || !('IntersectionObserver' in window)) revealEls.forEach((el) => el.classList.add('is-in'));
  else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const sib = $$(':scope > [data-reveal]', e.target.parentElement);
        e.target.style.transitionDelay = `${Math.min(Math.max(sib.indexOf(e.target), 0), 5) * 70}ms`;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  }
}

/* ==========================================================================
   Galeri
   ========================================================================== */
const gallery = $('[data-gallery]');
if (gallery) {
  const gmsg = JSON.parse(gallery.dataset.msg);
  const items = $$('li', gallery);
  const filters = $$('[data-filter]');
  filters.forEach((btn) => btn.addEventListener('click', () => {
    filters.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    const f = btn.dataset.filter;
    items.forEach((li) => { li.hidden = f !== 'all' && li.dataset.cat !== f; });
  }));

  const dlg = $('.lightbox');
  const img = $('img', dlg);
  const source = $('source', dlg);
  const caption = $('[data-caption]', dlg);
  const count = $('[data-count]', dlg);
  let list = [];
  let index = 0;
  let opener = null;
  const show = (i) => {
    index = (i + list.length) % list.length;
    const btn = $('.masonry__btn', list[index]);
    const thumb = $('img', btn);
    source.srcset = btn.dataset.fullAvif;
    img.src = btn.dataset.full;
    img.width = Number(btn.dataset.w);
    img.height = Number(btn.dataset.h);
    img.alt = thumb.alt;
    caption.textContent = thumb.alt;
    count.textContent = fill(gmsg.count, { i: index + 1, n: list.length });
  };
  gallery.addEventListener('click', (e) => {
    const btn = e.target.closest('.masonry__btn');
    if (!btn) return;
    opener = btn;
    list = items.filter((li) => !li.hidden);
    show(list.indexOf(btn.closest('li')));
    dlg.showModal();
  });
  $('[data-prev]', dlg).addEventListener('click', () => show(index - 1));
  $('[data-next]', dlg).addEventListener('click', () => show(index + 1));
  $('[data-close]', dlg).addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.classList.contains('lightbox__inner')) dlg.close(); });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
  dlg.addEventListener('close', () => opener?.focus());
}

/* ==========================================================================
   Online randevu
   ========================================================================== */
const form = $('#book');
if (form) initBooking(form);

function initBooking(form) {
  const msg = JSON.parse(form.dataset.msg);
  const steps = $$('.book-step', form);
  const dots = $$('[data-step-dot]', form);
  const stepText = $('.stepper__text', form);
  const navBar = $('.book-nav', form);
  const done = $('#book-done');
  const money = new Intl.NumberFormat(data.lang === 'tr' ? 'tr-TR' : 'en-GB');
  const fmtPrice = (n, from) => { const p = `₺${money.format(n)}`; return from ? fill(msg.from, { p }) : p; };
  const fmtMins = (m) => (m >= 60 ? `${Math.floor(m / 60)} ${msg.mins.h}${m % 60 ? ` ${m % 60} ${msg.mins.m}` : ''}` : `${m} ${msg.mins.m}`);
  let current = 0;
  let chosen = { day: null, slot: null, staff: null };

  /* --- Sepet --- */
  const selected = () => $$('input[name="services"]:checked', form).map((i) => ({ id: i.value, ...msg.services[i.value] }));
  const totals = () => {
    const s = selected();
    return { list: s, min: s.reduce((a, x) => a + x.min, 0), price: s.reduce((a, x) => a + x.price, 0), from: s.some((x) => x.from), cats: [...new Set(s.map((x) => x.cat))] };
  };
  const cartList = $('[data-cart-list]');
  function renderCart() {
    const t = totals();
    cartList.innerHTML = t.list.map((x) => `<li><span>${x.name}</span><span>${fmtPrice(x.price, x.from)}</span></li>`).join('');
    $('[data-cart-empty]').hidden = t.list.length > 0;
    $('[data-cart-time]').textContent = t.list.length ? fmtMins(t.min) : '—';
    $('[data-cart-total]').textContent = t.list.length ? fmtPrice(t.price, t.from) : '—';
  }

  /* --- Uzman: seçilen bütün kategorileri yapabilenler --- */
  const canDo = (id, cats) => cats.every((c) => msg.team[id].cats.includes(c));
  function updatePeople() {
    const { cats } = totals();
    $$('input[name="person"]', form).forEach((input) => {
      if (input.value === 'any') return;
      const ok = !cats.length || canDo(input.value, cats);
      input.disabled = !ok;
      const box = input.nextElementSibling;
      $('[data-role]', box).hidden = !ok;
      $('.person__no', box).hidden = ok;
      if (!ok && input.checked) form.elements.person.value = 'any';
    });
  }

  /* --- Örnek doluluk: tarih + uzman + saate göre sabit sözde rastgele --- */
  const hash = (str) => { let h = 2166136261; for (const ch of str) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967296; };
  const busy = (date, person, minute) => hash(`${date}|${person}|${Math.floor(minute / 60)}`) < 0.22;
  const freeFor = (date, person, start, len) => {
    for (let m = start; m < start + len; m += 30) if (busy(date, person, m)) return false;
    return true;
  };

  /* --- Günler --- */
  const dayBox = $('[data-days]', form);
  const slotBox = $('[data-slots]', form);
  const { day: todayIdx, minutes: nowMin } = salonNow();
  const days = [];
  for (let i = 0; days.length < 14 && i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const wd = (todayIdx + i) % 7;
    if (!data.hours[wd]) continue;
    days.push({ date: d, wd, i, iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` });
  }
  dayBox.innerHTML = days.map(({ date, wd, i, iso }) => `<button type="button" class="day" role="radio" aria-checked="false" tabindex="-1" data-iso="${iso}" data-wd="${wd}" data-i="${i}"
    aria-label="${date.getDate()} ${ui.months[date.getMonth()]}, ${ui.days[wd]}"><small>${i === 0 ? ui.today : i === 1 ? ui.tomorrow : ui.daysShort[wd]}</small><strong>${date.getDate()}</strong><small>${ui.months[date.getMonth()].slice(0, 3)}</small></button>`).join('');
  const dayBtns = $$('.day', dayBox);
  dayBtns[0].tabIndex = 0;

  /* Uygun uzman(lar)ı bul. Belirli bir uzman seçildiyse yalnız o; "fark etmez" ise
     her kategori için o aralıkta boş olan ilk uzman (farklı alanlar farklı uzmanlara düşebilir). */
  function whoIsFree(date, start, len) {
    const p = form.elements.person.value;
    if (p !== 'any') return freeFor(date, p, start, len) ? [p] : null;
    const { cats } = totals();
    const solo = Object.keys(msg.team).find((id) => canDo(id, cats) && freeFor(date, id, start, len));
    if (solo) return [solo];
    const picks = [];
    for (const c of cats) {
      const id = Object.keys(msg.team).find((m) => msg.team[m].cats.includes(c) && freeFor(date, m, start, len));
      if (!id) return null;
      if (!picks.includes(id)) picks.push(id);
    }
    return picks;
  }

  function renderSlots() {
    const btn = dayBtns.find((b) => b.getAttribute('aria-checked') === 'true');
    if (!btn) { slotBox.innerHTML = ''; return; }
    const [open, close] = data.hours[Number(btn.dataset.wd)].map(toMin);
    const len = Math.max(totals().min, 30);
    const isToday = btn.dataset.i === '0';
    const html = [];
    for (let m = open; m + len <= close; m += msg.step) {
      if (isToday && m < nowMin + 60) continue;
      const who = whoIsFree(btn.dataset.iso, m, len);
      html.push(`<button type="button" class="slot" role="radio" aria-checked="${chosen.slot === m && chosen.day === btn.dataset.iso}" data-min="${m}"${who ? ` data-who="${who.join(' ')}"` : ' disabled'}>${hhmm(m)}</button>`);
    }
    slotBox.innerHTML = html.length && html.some((h) => !h.includes('disabled')) ? html.join('') : `<p class="slot-empty">${msg.noSlots}</p>`;
    const slots = $$('.slot:not(:disabled)', slotBox);
    const sel = slots.find((s) => s.getAttribute('aria-checked') === 'true');
    if (!sel) { chosen.slot = null; chosen.staff = null; }
    slots.forEach((s, k) => { s.tabIndex = (sel ? s === sel : k === 0) ? 0 : -1; });
  }

  function selectDay(btn, focus = false) {
    dayBtns.forEach((b) => { b.setAttribute('aria-checked', String(b === btn)); b.tabIndex = b === btn ? 0 : -1; });
    if (chosen.day !== btn.dataset.iso) { chosen.slot = null; chosen.staff = null; }
    chosen.day = btn.dataset.iso;
    chosen.dayLabel = btn.getAttribute('aria-label');
    renderSlots();
    setError('day', false);
    if (focus) btn.focus();
  }
  function selectSlot(s, focus = false) {
    $$('.slot', slotBox).forEach((x) => { x.setAttribute('aria-checked', String(x === s)); x.tabIndex = x === s ? 0 : -1; });
    chosen.slot = Number(s.dataset.min);
    chosen.staff = s.dataset.who;
    setError('slot', false);
    if (focus) s.focus();
  }
  const arrows = (list, i, e, pick) => {
    const move = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (move) { e.preventDefault(); pick(list[(i + move + list.length) % list.length], true); }
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); pick(list[i]); }
  };
  dayBox.addEventListener('click', (e) => { const b = e.target.closest('.day'); if (b) selectDay(b); });
  dayBox.addEventListener('keydown', (e) => { const i = dayBtns.indexOf(document.activeElement); if (i >= 0) arrows(dayBtns, i, e, selectDay); });
  slotBox.addEventListener('click', (e) => { const s = e.target.closest('.slot:not(:disabled)'); if (s) selectSlot(s); });
  slotBox.addEventListener('keydown', (e) => {
    const list = $$('.slot:not(:disabled)', slotBox);
    const i = list.indexOf(document.activeElement);
    if (i >= 0) arrows(list, i, e, selectSlot);
  });

  form.addEventListener('change', (e) => {
    if (e.target.name === 'services') { renderCart(); updatePeople(); setError('services', false); chosen.slot = null; }
    if (e.target.name === 'person') chosen.slot = null;
    if (e.target.name === 'kvkk') setError('kvkk', false);
  });

  /* --- Bağlantıdan ön seçim: ?s=hizmet ?c=kategori ?p=uzman --- */
  const params = new URLSearchParams(location.search);
  if (params.get('s')) { const i = $(`input[name="services"][value="${CSS.escape(params.get('s'))}"]`, form); if (i) i.checked = true; }
  if (params.get('p')) { const i = $(`input[name="person"][value="${CSS.escape(params.get('p'))}"]`, form); if (i) i.checked = true; }
  renderCart();
  updatePeople();

  /* --- Doğrulama --- */
  function setError(id, on) {
    const el = $(`#err-${id}`);
    if (el) el.hidden = !on;
    const field = { name: form.elements.name, phone: form.elements.phone, kvkk: form.elements.kvkk }[id];
    if (field) field.setAttribute('aria-invalid', String(on));
  }
  function validate(i) {
    const bad = [];
    if (i === 0 && !selected().length) bad.push('services');
    if (i === 2) { if (!chosen.day) bad.push('day'); else if (chosen.slot === null) bad.push('slot'); }
    if (i === 3) {
      if (form.elements.name.value.trim().length < 3) bad.push('name');
      if (form.elements.phone.value.replace(/\D/g, '').length < 10) bad.push('phone');
      if (!form.elements.kvkk.checked) bad.push('kvkk');
    }
    ({ 0: ['services'], 2: ['day', 'slot'], 3: ['name', 'phone', 'kvkk'] }[i] || []).forEach((id) => setError(id, bad.includes(id)));
    if (bad.length) {
      const f = bad[0];
      const target = f === 'services' ? $('input[name="services"]', form)
        : f === 'day' ? dayBtns.find((b) => b.tabIndex === 0)
          : f === 'slot' ? ($('.slot[tabindex="0"]', slotBox) || dayBtns.find((b) => b.tabIndex === 0))
            : form.elements[f];
      target?.focus();
    }
    return !bad.length;
  }
  ['name', 'phone'].forEach((n) => form.elements[n].addEventListener('input', () => {
    if (form.elements[n].getAttribute('aria-invalid') === 'true') validate(3);
  }));

  /* --- Özet --- */
  const whenText = () => `${chosen.dayLabel} · ${hhmm(chosen.slot)}–${hhmm(chosen.slot + totals().min)}`;
  function fillSummary() {
    const t = totals();
    const p = form.elements.person.value;
    const set = (k, v) => { $(`[data-sum="${k}"]`, form).textContent = v; };
    set('services', `${t.list.map((x) => x.name).join(', ')} · ${fmtMins(t.min)}`);
    const staff = (chosen.staff || '').split(' ').filter(Boolean).map((id) => msg.team[id].name).join(', ');
    set('person', p === 'any' ? `${msg.any} · ${staff}` : msg.team[p].name);
    set('time', whenText());
    set('contact', `${form.elements.name.value.trim()} · ${form.elements.phone.value.trim()}`);
    set('total', fmtPrice(t.price, t.from));
  }

  /* --- Adımlar --- */
  function show(i, { focus = true } = {}) {
    current = i;
    steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
    dots.forEach((d, k) => { d.classList.toggle('is-current', k === i); d.classList.toggle('is-done', k < i); });
    stepText.textContent = fill(msg.stepOf, { i: i + 1, n: steps.length });
    navBar.classList.toggle('has-prev', i > 0);
    navBar.classList.toggle('is-last', i === steps.length - 1);
    if (i === 2) {
      $('[data-slot-hint]', form).textContent = fill(msg.slotHint, { d: fmtMins(totals().min) });
      if (!chosen.day) {
        // İlk boş saati olan günle aç
        const first = dayBtns.find((b) => { selectDay(b); return $('.slot:not(:disabled)', slotBox); });
        selectDay(first || dayBtns[0]);
      } else renderSlots();
    }
    if (i === steps.length - 1) fillSummary();
    if (focus) {
      steps[i].querySelector('legend').focus({ preventScroll: true });
      if (form.getBoundingClientRect().top < 0) form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }
  $('[data-next]', form).addEventListener('click', () => { if (validate(current)) show(current + 1); });
  $('[data-prev]', form).addEventListener('click', () => show(Math.max(0, current - 1)));
  $$('[data-goto]', form).forEach((b) => b.addEventListener('click', () => show(Number(b.dataset.goto))));
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'checkbox' && current < steps.length - 1) {
      e.preventDefault();
      if (validate(current)) show(current + 1);
    }
  });

  /* --- Takvim dosyası (.ics) --- */
  let ics = '';
  function buildIcs(ref) {
    // İstanbul UTC+3 (yaz saati uygulanmıyor) → UTC'ye çevir
    const [y, mo, d] = chosen.day.split('-').map(Number);
    const utc = (min) => {
      const dt = new Date(Date.UTC(y, mo - 1, d, 0, min - 180));
      return dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };
    const t = totals();
    const esc = (s) => s.replace(/[,;\\]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');
    ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Murver//Demo//TR', 'BEGIN:VEVENT',
      `UID:${ref}@murver.example`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
      `DTSTART:${utc(chosen.slot)}`, `DTEND:${utc(chosen.slot + t.min)}`,
      `SUMMARY:${esc(`${msg.icsTitle}: ${t.list.map((x) => x.name).join(', ')}`)}`,
      `LOCATION:${esc(msg.address)}`, `DESCRIPTION:${esc(ref)}`,
      'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  }
  $('[data-ics]', done).addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    a.download = 'murver-randevu.ics';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    for (let i = 0; i < steps.length - 1; i++) if (!validate(i)) { show(i); return; }
    const ref = `MR-${Date.now().toString(36).slice(-5).toUpperCase()}`;
    buildIcs(ref);
    $('[data-done-text]', done).textContent = fill(msg.done, { ref, when: whenText() });
    form.hidden = true;
    $('.cart').hidden = true;
    done.hidden = false;
    done.focus();
    done.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  });

  $('[data-restart]', done).addEventListener('click', () => {
    form.reset();
    chosen = { day: null, slot: null, staff: null };
    dayBtns.forEach((b, k) => { b.setAttribute('aria-checked', 'false'); b.tabIndex = k === 0 ? 0 : -1; });
    slotBox.innerHTML = '';
    renderCart();
    updatePeople();
    done.hidden = true;
    form.hidden = false;
    $('.cart').hidden = false;
    show(0);
  });

  show(0, { focus: false });
  if (params.get('c')) {
    const group = $(`input[name="services"][value]`, form) && $$('.svc-group', form)[['hair', 'nails', 'skin', 'makeup'].indexOf(params.get('c'))];
    group?.scrollIntoView({ block: 'center' });
  }
}
