# Caffè Andante — café landing page

A one-page site for a neighbourhood café, built as a **sample**.

**Live:** https://vagtsop.github.io/coffee-site/

> **“Caffè Andante” is a fictional business.** The name, address, phone number, email, prices,
> reviews and weekly programme are all invented. No detail, photograph or logo belonging to a real
> establishment is used anywhere in this repository. The page carries `noindex, nofollow` and says
> so in its own footer.

## Stack

- [Vite](https://vite.dev/) + vanilla JavaScript (ES modules) — no framework
- [GSAP](https://gsap.com/) + `ScrollTrigger` — heading reveals, parallax, Ken Burns, counters
- [Lenis](https://lenis.darkroom.engineering/) — smooth scrolling
- Plain CSS with design tokens
- Fonts: **EB Garamond** (display) + **Manrope** (body) — both ship a Greek subset
- `sharp` for image preparation (build time only)

Production bundle: ~62 kB gzipped JS, ~7 kB CSS.

## Run

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

To reproduce the images from the originals in `raw/`:

```bash
npm run images
```

## What's in it

| Feature | Notes |
| --- | --- |
| **Bilingual EN / EL** | English is the default. The switch lives in the header, the choice is remembered in `localStorage`, and it drives `<html lang>`, `<title>`, the meta description, alt text, ARIA labels, the map language and the decimal separator on every price. |
| **Live opening status** | Computed in **Athens time**, not the visitor's clock. Handles per-day hours and shifts that run past midnight (Fri/Sat 08:00 → 03:00), highlights today in the hours table, and tags today's entry in the weekly programme. |
| **Tabbed menu** | Four categories, ARIA `tab` / `tabpanel` wiring, prices rendered from `data-price` so they format per locale. |
| **Gallery** | Six shots with a keyboard-dismissable lightbox and focus return. |
| **Booking form** | Client-side validation (Greek phone formats, no past dates). It does **not** submit anywhere — see below. |
| **Header ribbon** | A curved SVG band anchored right, with a light travelling along the curve; it fades out as soon as the header sticks. |
| **Motion** | Everything is disabled under `prefers-reduced-motion`; `:hover` states are inside `@media (hover: hover)` so they don't stick on touch. |

## Structure

| Path | What it does |
| --- | --- |
| `index.html` | all content (English source of truth) + `CafeOrCoffeeShop` JSON-LD |
| `src/i18n.js` | both languages, keyed to the `data-i18n` attributes in the HTML |
| `src/style.css` | design tokens and all styling |
| `src/main.js` | language switching, motion, opening hours, tabs, lightbox, form |
| `scripts/prepare-images.mjs` | resizes `raw/*.jpg` into WebP under `public/img` |
| `raw/` | the untouched originals; each filename is its Unsplash photo id |

### Adding or changing copy

Every translatable node carries one of:

- `data-i18n` — replaces `textContent`
- `data-i18n-html` — replaces `innerHTML` (for strings containing `<br>`)
- `data-i18n-aria` / `data-i18n-alt` / `data-i18n-title` — replaces that attribute

Add the key to both `en` and `el` in `src/i18n.js`. A missing key falls back to English rather
than rendering the raw key.

## Opening hours

They live in three places and must agree:

1. `HOURS` in `src/main.js` (drives the live status)
2. the `[data-hours]` table in `index.html`
3. `openingHoursSpecification` in the JSON-LD

## Photography

All photographs come from [Unsplash](https://unsplash.com) under the
[Unsplash License](https://unsplash.com/license): free to use, including commercially, with no
attribution required. Each file in `raw/` is named after its photo id — `nMwm6JeNxTI.jpg` is
`unsplash.com/photos/nMwm6JeNxTI`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with
`VITE_BASE=/coffee-site/` and publishes `dist/` to GitHub Pages.

The base path matters: Vite rewrites `src`, `srcset` and `href` automatically, but custom
attributes do not get it for free. The lightbox reads `data-full`, so `src/main.js` prefixes it
with `import.meta.env.BASE_URL` at runtime.
