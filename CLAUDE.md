# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000 (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
npx tsc --noEmit # Type check without building
```

No test runner is configured.

## Architecture

**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Turbopack.

**Path alias:** `@/*` maps to the project root.

**Color system** — defined in `app/globals.css` via `@theme`:
- `bg-rouge` / `text-rouge` → `#960018` (carmin primary)
- `bg-rouge-dark` / `text-rouge-dark` → `#7A0014`
- Section backgrounds use `.section-bordeaux` CSS class (CSS vars: `--color-mr-bg` `#7A0014`, `--color-mr-bg-dk` `#5C000F`, `--color-mr-bg-lt` `#B02030`, `--color-mr-cta` `#C8102E`)
- Use Tailwind utilities (`bg-black`, `text-white`, `bg-gray-50`, etc.) for everything else.

**Custom animation** — `.step-animate` class defined in `globals.css` for the multi-step form fade-in.

## Directory structure

```
app/
  layout.tsx            — Root layout: Navbar + Footer + WhatsAppButton
  page.tsx              — Homepage (assembles home/* sections)
  ecole/                pedagogie/  admissions/
    page.tsx            — Admissions info page
    demande/page.tsx    — Multi-step admission form (Phase 3)
  galerie/  alumni/  videos/  actualites/  contact/

components/
  layout/
    Navbar.tsx          — Sticky nav, transparent→solid on scroll, mobile hamburger
    Footer.tsx          — Black footer with WhatsApp link
    WhatsAppButton.tsx  — Fixed green WhatsApp bubble (bottom-right)
  home/                 — Homepage sections: Hero, Stats, Actualites, Niveaux,
                          GaleriePreview, InscriptionCTA
  admissions/
    MultiStepForm.tsx   — 10-step form with .step-animate transitions, recap + payment CTA
  contact/
    ContactForm.tsx     — Client component contact form

lib/
  payments/
    types.ts            — All TypeScript types (Paiement union, NiveauScolaire, etc.)
    index.ts            — Re-exports everything + formatXOF()
    mensualites.ts      — Tariffs, schedule generation, balance calc
    inscription.ts      — Frais, required documents per level
    cantine.ts          — Formulas and subscription helper
    tenues.ts           — Uniform catalogue and order helper
    etude-dirigee.ts    — Wed/Sat study sessions
    cours-vacances.ts   — Vacation course sessions
```

## Content & configuration

**Single source of truth for school data:** `lib/school-config.ts`
- Modify this ONE file to update contact info, stats, address, WhatsApp — changes propagate everywhere.
- Public alias: `content/school.ts` re-exports `SCHOOL` from `lib/school-config.ts`.

**Replacing images:** Drop files into `/public/images/` using the same filenames defined in `lib/images.ts`.
```
/public/images/hero/         — Hero photos (home.jpg, ecole-exterieur.jpg, pedagogie.jpg…)
/public/images/galerie/      — Gallery: gal-01.jpg … gal-12.jpg
/public/images/actus/        — News thumbnails: actu-01.jpg … actu-06.jpg
/public/images/placeholders/ — placeholder.svg (SVG fallback, do not delete)
```

**Page heroes:** All inner pages use `components/layout/PageHero.tsx`.
- Props: `eyebrow`, `title` (ReactNode), `subtitle`, `ctas[]`, `image`, `variant` (`light`|`dark`), `decorativeLetter`, `children`.
- `PageHero` owns navbar compensation (`pt-[68px] lg:pt-[76px]`) — never add `pt-*` to `<main>` on pages that start with `PageHero`.

## Key conventions

- Server Components by default; add `"use client"` only for interactivity (forms, scroll events, state).
- All monetary amounts stored as integers in **XOF**. Use `formatXOF()` from `lib/payments` to display.
- Navbar becomes solid (white bg) on all non-homepage pages and on scroll.
- The multi-step form advances automatically on card selection (niveau, année) but requires the "Continuer" button for text inputs.
- Gallery and video tiles use placeholder divs — swap with `next/image` using paths from `lib/images.ts` once assets are available.
- **Hero (`components/home/Hero.tsx`) is LOCKED** — do not modify layout, spacing, glass card, or typography.
