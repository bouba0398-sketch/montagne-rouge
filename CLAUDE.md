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

## Key conventions

- Server Components by default; add `"use client"` only for interactivity (forms, scroll events, state).
- All monetary amounts stored as integers in **XOF**. Use `formatXOF()` from `lib/payments` to display.
- Navbar becomes solid (white bg) on all non-homepage pages and on scroll.
- The multi-step form advances automatically on card selection (niveau, année) but requires the "Continuer" button for text inputs.
- Gallery and video tiles currently use placeholder divs — swap with `next/image` once media assets are available.
- WhatsApp number placeholder: `+221 77 000 00 00` — update in `WhatsAppButton.tsx`, `Footer.tsx`, `InscriptionCTA.tsx`, `contact/page.tsx`, and the form recap.
