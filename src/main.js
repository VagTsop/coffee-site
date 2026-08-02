import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { TEXT, DEFAULT_LANG, LANGS, STORAGE_KEY } from './i18n.js'

gsap.registerPlugin(ScrollTrigger)

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isDesktop = () => window.matchMedia('(hover: hover) and (min-width: 1025px)').matches

/** Το Vite ξαναγράφει μόνο του τα src/href του HTML· τα custom attributes
 *  (π.χ. data-full του lightbox) πρέπει να πάρουν το base μόνα τους, αλλιώς
 *  σπάνε σε υποφάκελο τύπου GitHub Pages. */
const withBase = (path) =>
  import.meta.env.BASE_URL.replace(/\/$/, '') + (path.startsWith('/') ? path : `/${path}`)

/* ---------------------------------------------------------------------------
   Γλώσσα — προεπιλογή τα αγγλικά, με ό,τι έχει διαλέξει ο επισκέπτης να
   υπερισχύει. Το HTML είναι γραμμένο στα αγγλικά, οπότε αν σκάσει το JS η
   σελίδα παραμένει πλήρης.
--------------------------------------------------------------------------- */
let lang = DEFAULT_LANG
try {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && LANGS.includes(saved)) lang = saved
} catch {
  /* private mode — μένουμε στην προεπιλογή */
}

/** Μετάφραση με απλή αντικατάσταση {placeholder}. */
function t(key, vars) {
  let s = TEXT[lang]?.[key] ?? TEXT[DEFAULT_LANG][key] ?? key
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v)
  return s
}

const decimalSep = () => (lang === 'el' ? ',' : '.')

/** 8.5 → «8,50» στα ελληνικά, «8.50» στα αγγλικά */
const money = (value) => Number(value).toFixed(2).replace('.', decimalSep())

/* ---------------------------------------------------------------------------
   Ομαλό scroll — το Lenis τρέχει από το ticker του GSAP ώστε τα scrub
   animations να μένουν συγχρονισμένα.
--------------------------------------------------------------------------- */
let lenis
if (!reduceMotion) {
  lenis = new Lenis({ duration: 1.1, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}

/* ---------------------------------------------------------------------------
   Το ωράριο του μαγαζιού — ένα σημείο αλήθειας.
   Κλειδί = ημέρα κατά JS (0 = Κυριακή). Όταν close <= open, το ωράριο
   συνεχίζεται μετά τα μεσάνυχτα.
   Αν αλλάξει εδώ, αλλάζει και ο πίνακας [data-hours] + το JSON-LD.
--------------------------------------------------------------------------- */
const HOURS = {
  0: { open: 9, close: 1 }, // Κυριακή
  1: { open: 8, close: 1 },
  2: { open: 8, close: 1 },
  3: { open: 8, close: 1 },
  4: { open: 8, close: 1 },
  5: { open: 8, close: 3 }, // Παρασκευή
  6: { open: 8, close: 3 }, // Σάββατο
}
const TZ = 'Europe/Athens'

const pad = (n) => String(n).padStart(2, '0')
const clock = (h) => `${pad(h)}:00`

/** Η ώρα στη Θεσσαλονίκη, ανεξάρτητα από το πού βρίσκεται ο επισκέπτης. */
function athensNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'short',
    hour12: false,
  }).formatToParts(new Date())

  const get = (type) => parts.find((p) => p.type === type)?.value
  const days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

  return {
    hour: Number(get('hour')) % 24,
    minute: Number(get('minute')),
    second: Number(get('second')),
    day: days[get('weekday')] ?? new Date().getDay(),
  }
}

/**
 * Ποια «εργάσιμη μέρα» τρέχει τώρα και αν είμαστε ανοιχτά.
 * Στις 01:30 της Παρασκευής το μαγαζί μετράει ακόμη ως Πέμπτη — γι' αυτό
 * ελέγχουμε πρώτα το ωράριο της προηγούμενης μέρας.
 */
function openState(now = athensNow()) {
  const yesterday = (now.day + 6) % 7
  const prev = HOURS[yesterday]

  // συνέχεια από χθες (π.χ. Πέμπτη 08:00 → Παρασκευή 01:00)
  if (prev.close <= prev.open && now.hour < prev.close) {
    return { open: true, day: yesterday, closes: prev.close }
  }

  const today = HOURS[now.day]
  const closesToday = today.close <= today.open ? today.close + 24 : today.close
  const nowHour = now.hour + now.minute / 60

  if (nowHour >= today.open && nowHour < closesToday) {
    return { open: true, day: now.day, closes: today.close }
  }

  return { open: false, day: now.day, opens: today.open }
}

/** Ζωγραφίζει ό,τι εξαρτάται από την ώρα — καλείται και σε αλλαγή γλώσσας. */
function paintOpenState() {
  const pill = document.querySelector('[data-status]')
  const pillText = document.querySelector('[data-status-text]')
  const long = document.querySelector('[data-status-long]')
  const heroLabel = document.querySelector('[data-open-label]')
  const heroSub = document.querySelector('[data-open-sub]')

  const now = athensNow()
  const state = openState(now)
  const today = HOURS[state.day]

  if (pill && pillText) {
    pill.hidden = false
    pill.classList.toggle('is-closed', !state.open)
    pillText.textContent = state.open ? t('status.open') : t('status.closed')
  }

  if (long) {
    long.textContent = state.open
      ? t('status.openLong', { time: clock(state.closes) })
      : t('status.closedLong', { time: clock(state.opens) })
  }

  if (heroLabel) {
    heroLabel.textContent = state.open
      ? t('status.open')
      : `${clock(today.open)} – ${clock(today.close)}`
  }

  if (heroSub) {
    heroSub.textContent = state.open
      ? t('status.untilTonight', { time: clock(state.closes) })
      : t('status.opensAt', { time: clock(state.opens) })
  }

  document
    .querySelectorAll('[data-hours] li')
    .forEach((li) => li.classList.toggle('is-today', Number(li.dataset.day) === state.day))

  document.querySelectorAll('[data-event-day]').forEach((el) => {
    const isToday = Number(el.dataset.eventDay) === state.day
    el.classList.toggle('is-today', isToday)
    // η ετικέτα «σήμερα» μπαίνει από CSS με attr() — άρα το attribute πρέπει να
    // κάθεται στο ίδιο στοιχείο που φέρει το ::after, όχι στον γονέα
    const day = el.querySelector('.event__day')
    if (!day) return
    if (isToday) day.dataset.todayLabel = t('status.today')
    else delete day.dataset.todayLabel
  })

  const label = document.querySelector('[data-clock-label]')
  if (label) label.textContent = state.open ? t('clock.open') : t('clock.closed')
}

function setupOpenState() {
  paintOpenState()
  setInterval(paintOpenState, 60_000)
}

/* ---------------------------------------------------------------------------
   Εφαρμογή γλώσσας σε όλη τη σελίδα
--------------------------------------------------------------------------- */
function applyLang(next, { initial = false } = {}) {
  if (!LANGS.includes(next)) return
  lang = next

  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* αδιάφορο αν δεν γράφεται */
  }

  document.documentElement.lang = lang

  document.title = t('meta.title')
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'))

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n)
  })
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml)
  })
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(el.dataset.i18nAria))
  })
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    el.setAttribute('alt', t(el.dataset.i18nAlt))
  })
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    el.setAttribute('title', t(el.dataset.i18nTitle))
  })

  // αριθμοί: υποδιαστολή ανά γλώσσα
  document.querySelectorAll('[data-price]').forEach((el) => {
    el.textContent = money(el.dataset.price)
  })
  document.querySelectorAll('[data-num]').forEach((el) => {
    el.textContent = String(el.dataset.num).replace('.', decimalSep())
  })
  document.querySelectorAll('[data-count]').forEach((el) => {
    const decimals = Number(el.dataset.decimals || 0)
    const done = el.dataset.counted === '1'
    // όσο δεν έχει τρέξει ο μετρητής το αφήνουμε στο μηδέν, αλλιώς
    // η αλλαγή γλώσσας θα «έκαιγε» την κίνηση πριν καν εμφανιστεί
    if (done || initial === false) {
      el.textContent = formatCount(Number(el.dataset.count), decimals)
    }
  })

  const copy = document.querySelector('[data-copy]')
  if (copy) copy.textContent = t('footer.copy', { year: new Date().getFullYear() })

  // ο χάρτης μιλάει τη γλώσσα της σελίδας
  const map = document.querySelector('.visit__map iframe')
  if (map) {
    const wanted = map.src.replace(/hl=[a-z]{2}/, `hl=${lang}`)
    if (wanted !== map.src) map.src = wanted
  }

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    const active = btn.dataset.lang === lang
    btn.classList.toggle('is-active', active)
    btn.setAttribute('aria-pressed', String(active))
  })

  // οι επικεφαλίδες ξαναγράφτηκαν ως σκέτο κείμενο — ξανασπάσ' τες σε λέξεις
  document.querySelectorAll('[data-split]').forEach((el) => splitHeading(el, initial))

  paintOpenState()
  if (!initial) ScrollTrigger.refresh()
}

function formatCount(value, decimals) {
  return decimals
    ? value.toFixed(decimals).replace('.', decimalSep())
    : String(Math.round(value))
}

function setupLangSwitch() {
  document.querySelectorAll('[data-lang]').forEach((btn) =>
    btn.addEventListener('click', () => {
      if (btn.dataset.lang === lang) return
      applyLang(btn.dataset.lang)
    }),
  )
}

/* ---------------------------------------------------------------------------
   Το ρολόι δίπλα στις φωτογραφίες — νεύμα στον τοίχο με τις αντίκες.
--------------------------------------------------------------------------- */
function setupClock() {
  const root = document.querySelector('[data-clock]')
  if (!root) return

  const ticks = root.querySelector('[data-clock-ticks]')
  if (ticks) {
    for (let i = 0; i < 12; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      const long = i % 3 === 0
      line.setAttribute('class', 'clockface__tick')
      line.setAttribute('x1', '50')
      line.setAttribute('y1', long ? '8' : '9')
      line.setAttribute('x2', '50')
      line.setAttribute('y2', long ? '15' : '13')
      line.setAttribute('transform', `rotate(${i * 30} 50 50)`)
      ticks.appendChild(line)
    }
  }

  const hands = {
    hour: root.querySelector('[data-hand="hour"]'),
    minute: root.querySelector('[data-hand="minute"]'),
    second: root.querySelector('[data-hand="second"]'),
  }

  const tick = () => {
    const now = athensNow()
    const rot = {
      hour: (now.hour % 12) * 30 + now.minute * 0.5,
      minute: now.minute * 6,
      second: now.second * 6,
    }
    Object.entries(hands).forEach(([key, el]) => {
      if (el) el.style.transform = `rotate(${rot[key]}deg)`
    })
  }

  tick()
  setInterval(tick, reduceMotion ? 30_000 : 1000)
}

/* ---------------------------------------------------------------------------
   Επικεφαλίδες: σπάσιμο σε λέξεις που ανεβαίνουν μέσα από μάσκα
--------------------------------------------------------------------------- */
function splitHeading(el, animate) {
  const words = el.textContent.trim().split(/\s+/)
  el.innerHTML = words
    .map((w) => `<span class="reveal-line"><span class="reveal-word">${w}</span></span> `)
    .join('')

  if (!animate || reduceMotion) return

  gsap.from(el.querySelectorAll('.reveal-word'), {
    yPercent: 115,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.06,
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
  })
}

/* ---------------------------------------------------------------------------
   Γενικές αποκαλύψεις στο scroll
--------------------------------------------------------------------------- */
function setupReveals() {
  if (reduceMotion) return

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    // ό,τι βρίσκεται στο hero παίζει με την είσοδο, όχι με το scroll
    if (el.closest('.hero')) return
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
  })
}

/* ---------------------------------------------------------------------------
   Παράλλαξη + αργό ζουμ στο hero
--------------------------------------------------------------------------- */
function setupParallax() {
  if (reduceMotion) return

  document.querySelectorAll('[data-parallax]').forEach((el) => {
    gsap.to(el, {
      yPercent: Number(el.dataset.parallax) || 6,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('section') || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })

  const hero = document.querySelector('[data-kenburns]')
  if (!hero) return

  // η εικόνα ξεκινάει λίγο μεγεθυμένη και «κάθεται» καθώς φεύγει το hero
  gsap.fromTo(
    hero,
    { scale: 1.12, yPercent: 0 },
    {
      scale: 1,
      yPercent: 8,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    },
  )
}

/* ---------------------------------------------------------------------------
   Μετρητές
--------------------------------------------------------------------------- */
function setupCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count)
    const decimals = Number(el.dataset.decimals || 0)

    if (reduceMotion) {
      el.textContent = formatCount(target, decimals)
      el.dataset.counted = '1'
      return
    }

    const obj = { v: 0 }
    gsap.to(obj, {
      v: target,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => (el.textContent = formatCount(obj.v, decimals)),
      onComplete: () => (el.dataset.counted = '1'),
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    })
  })
}

/* ---------------------------------------------------------------------------
   Είσοδος hero
--------------------------------------------------------------------------- */
function setupHeroIntro() {
  const neon = document.querySelector('[data-neon]')
  const items = document.querySelectorAll('.hero [data-reveal]')

  if (reduceMotion) {
    neon?.classList.add('is-flicker')
    return
  }

  const tl = gsap.timeline({ delay: 0.15 })
  if (neon) {
    tl.from(neon, { opacity: 0, scale: 0.96, duration: 1.1, ease: 'power3.out' })
    // το νέον αρχίζει να τρεμοσβήνει αφού μπει, όχι κατά την είσοδο
    tl.add(() => neon.classList.add('is-flicker'))
  }
  tl.from(items, { y: 26, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09 }, '-=0.75')
}

/* ---------------------------------------------------------------------------
   Header: κόλλημα, μπάρα προόδου, burger, scrollspy
--------------------------------------------------------------------------- */
function setupHeader() {
  const header = document.querySelector('.header')
  const burger = document.querySelector('.burger')
  const progress = document.querySelector('[data-progress]')
  const links = [...document.querySelectorAll('.nav a')]

  const onScroll = () => {
    header?.classList.toggle('is-stuck', window.scrollY > 40)
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  const closeMenu = () => {
    document.body.classList.remove('is-menu-open')
    burger?.setAttribute('aria-expanded', 'false')
    lenis?.start()
  }

  burger?.addEventListener('click', () => {
    const open = document.body.classList.toggle('is-menu-open')
    burger.setAttribute('aria-expanded', String(open))
    if (lenis) open ? lenis.stop() : lenis.start()
  })

  document.querySelectorAll('.mobile-menu a').forEach((a) => a.addEventListener('click', closeMenu))

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('is-menu-open')) closeMenu()
  })

  const sections = links.map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean)
  if (!sections.length) return

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        links.forEach((l) =>
          l.setAttribute('aria-current', String(l.getAttribute('href') === '#' + e.target.id)),
        )
      })
    },
    { rootMargin: '-40% 0px -55% 0px' },
  )
  sections.forEach((s) => spy.observe(s))
}

/* ---------------------------------------------------------------------------
   Εσωτερικοί σύνδεσμοι μέσω Lenis
--------------------------------------------------------------------------- */
function setupAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')
      if (id.length < 2) return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      if (lenis) lenis.scrollTo(target, { offset: -70, duration: 1.3 })
      else target.scrollIntoView({ behavior: 'smooth' })
    })
  })
}

/* ---------------------------------------------------------------------------
   Καρτέλες καταλόγου
--------------------------------------------------------------------------- */
function setupMenuTabs() {
  const tabs = [...document.querySelectorAll('.tab')]
  const panels = [...document.querySelectorAll('.menu__panel')]
  if (!tabs.length) return

  tabs.forEach((tab) =>
    tab.addEventListener('click', () => {
      tabs.forEach((other) => {
        const active = other === tab
        other.classList.toggle('is-active', active)
        other.setAttribute('aria-selected', String(active))
      })

      panels.forEach((p) => p.classList.toggle('is-active', p.dataset.panel === tab.dataset.tab))

      const panel = panels.find((p) => p.dataset.panel === tab.dataset.tab)
      if (panel && !reduceMotion) {
        gsap.fromTo(
          panel.children,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06 },
        )
      }
      ScrollTrigger.refresh()
    }),
  )
}

/* ---------------------------------------------------------------------------
   Κριτικές που εναλλάσσονται
--------------------------------------------------------------------------- */
function setupQuotes() {
  const quotes = [...document.querySelectorAll('.quote')]
  const dots = [...document.querySelectorAll('.quotes__nav .dot')]
  if (quotes.length < 2) return

  let index = 0
  let timer

  const show = (next) => {
    quotes[index].classList.remove('is-active')
    dots[index]?.classList.remove('is-active')
    index = (next + quotes.length) % quotes.length
    quotes[index].classList.add('is-active')
    dots[index]?.classList.add('is-active')
  }

  const play = () => {
    if (reduceMotion) return
    clearInterval(timer)
    timer = setInterval(() => show(index + 1), 7000)
  }

  dots.forEach((dot, i) =>
    dot.addEventListener('click', () => {
      show(i)
      play()
    }),
  )

  play()
}

/* ---------------------------------------------------------------------------
   Φόρμα κράτησης — έλεγχος στον browser μόνο. Σε πραγματικό site συνδέεται
   με endpoint / email / Google Sheet· εδώ απλώς επιβεβαιώνει.
--------------------------------------------------------------------------- */
function setupBooking() {
  const form = document.querySelector('[data-booking]')
  const msg = document.querySelector('[data-booking-msg]')
  if (!form) return

  // η ημερομηνία δεν μπορεί να είναι στο παρελθόν, και προσυμπληρώνεται σήμερα
  const dateInput = form.querySelector('input[type="date"]')
  if (dateInput) {
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date())
    dateInput.min = today
    dateInput.value = today
  }

  const setError = (field, on) => field.closest('.field')?.classList.toggle('has-error', on)

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = form.querySelector('#b-name')
    const phone = form.querySelector('#b-phone')
    const date = form.querySelector('#b-date')

    const okName = name.value.trim().length >= 2
    // ελληνικά σταθερά/κινητά, με ή χωρίς +30 και κενά
    const okPhone = /^(\+?30)?[\s-]?[0-9][\s-]?([0-9][\s-]?){8,11}$/.test(phone.value.trim())
    const okDate = Boolean(date.value)

    setError(name, !okName)
    setError(phone, !okPhone)
    setError(date, !okDate)

    if (!okName || !okPhone || !okDate) {
      if (msg) {
        msg.textContent = t('book.error')
        msg.className = 'booking__msg is-error'
      }
      form.querySelector('.has-error input')?.focus()
      return
    }

    if (msg) {
      // χωρίς το όνομα στην κλητική — η ελληνική κλητική δεν βγαίνει με κανόνα
      msg.textContent = t('book.success', { phone: phone.value.trim() })
      msg.className = 'booking__msg is-ok'
    }
    form.reset()
    if (dateInput) dateInput.value = dateInput.min
  })

  // μόλις ο επισκέπτης διορθώσει, φεύγει το κόκκινο
  form.querySelectorAll('input').forEach((input) =>
    input.addEventListener('input', () => setError(input, false)),
  )
}

/* ---------------------------------------------------------------------------
   Lightbox γκαλερί
--------------------------------------------------------------------------- */
function setupLightbox() {
  const modal = document.querySelector('[data-lightbox-modal]')
  const img = document.querySelector('[data-lightbox-img]')
  const closeBtn = document.querySelector('[data-lightbox-close]')
  const shots = [...document.querySelectorAll('[data-lightbox]')]
  if (!modal || !img || !shots.length) return

  let lastFocused = null

  const setOpen = (open) => {
    modal.classList.toggle('is-open', open)
    modal.setAttribute('aria-hidden', String(!open))
    document.body.classList.toggle('is-locked', open)
    if (open) {
      lenis?.stop()
      closeBtn?.focus()
    } else {
      lenis?.start()
      lastFocused?.focus()
    }
  }

  shots.forEach((shot) =>
    shot.addEventListener('click', () => {
      lastFocused = shot
      img.src = withBase(shot.dataset.full)
      img.alt = shot.querySelector('img')?.alt || ''
      setOpen(true)
    }),
  )

  closeBtn?.addEventListener('click', () => setOpen(false))
  modal.addEventListener('click', (e) => {
    if (e.target === modal) setOpen(false)
  })
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) setOpen(false)
  })
}

/* ---------------------------------------------------------------------------
   Κέρσορας (μόνο desktop)
--------------------------------------------------------------------------- */
function setupCursor() {
  const cursor = document.querySelector('.cursor')
  if (!cursor || !isDesktop() || reduceMotion) return

  const RATIO = 0.16
  gsap.set(cursor, { xPercent: -50, yPercent: -50 })

  const mouse = { x: innerWidth / 2, y: innerHeight / 2 }
  const pos = { ...mouse }
  let awake = false

  window.addEventListener(
    'mousemove',
    (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (awake) return
      // στην πρώτη κίνηση προσγειώνεται στον δείκτη αντί να έρθει από το κέντρο
      awake = true
      pos.x = mouse.x
      pos.y = mouse.y
      gsap.to(cursor, { opacity: 1, duration: 0.3 })
    },
    { passive: true },
  )

  gsap.ticker.add(() => {
    pos.x += (mouse.x - pos.x) * RATIO
    pos.y += (mouse.y - pos.y) * RATIO
    gsap.set(cursor, { x: pos.x, y: pos.y })
  })

  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 2.4, duration: 0.3 }))
    el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, duration: 0.3 }))
  })
}

/* ---------------------------------------------------------------------------
   Επιστροφή στην κορυφή
--------------------------------------------------------------------------- */
function setupToTop() {
  const btn = document.querySelector('[data-to-top]')
  if (!btn) return

  const onScroll = () => btn.classList.toggle('is-visible', window.scrollY > 700)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  btn.addEventListener('click', () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.3 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

/* ---------------------------------------------------------------------------
   Preloader — με σκληρό όριο, ώστε ένα αργό asset να μην κρατάει τον επισκέπτη
--------------------------------------------------------------------------- */
function setupPreloader() {
  const el = document.querySelector('[data-preloader]')
  if (!el) return

  const bar = el.querySelector('.preloader__bar span')
  let done = false

  const finish = () => {
    if (done) return
    done = true
    if (bar) bar.style.width = '100%'
    lenis?.start()
    setTimeout(() => {
      el.classList.add('is-done')
      ScrollTrigger.refresh()
    }, 240)
  }

  lenis?.stop()
  if (bar) requestAnimationFrame(() => (bar.style.width = '70%'))

  if (document.readyState === 'complete') finish()
  else window.addEventListener('load', finish, { once: true })
  setTimeout(finish, 4500)
}

/* ---------------------------------------------------------------------------
   Init
--------------------------------------------------------------------------- */
function init() {
  applyLang(lang, { initial: true })
  setupLangSwitch()
  setupOpenState()
  setupClock()
  setupReveals()
  setupParallax()
  setupCounters()
  setupHeroIntro()
  setupHeader()
  setupAnchors()
  setupMenuTabs()
  setupQuotes()
  setupBooking()
  setupLightbox()
  setupCursor()
  setupToTop()
  setupPreloader()
  ScrollTrigger.refresh()
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init)
else init()
