# Nudo Lab

Friendly brewing tools for beginners. **For every first brews.**

Marketing site for [Nudo Lab](https://nudolab.com), part of the WTD family.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS 3**
- Hosted on **Vercel**
- Fonts: Urbanist (display + body), JetBrains Mono (UI labels)

## Local dev

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Brand tokens

Defined in `tailwind.config.ts` and `app/globals.css`:

- `charcoal` (`#212121`), `charcoal-2`, `charcoal-soft`
- `cream` (`#f9f4de`), `cream-2`, `cream-soft`
- `warm` (`#e8c97a`) — headline underline + accent
- `clay` (`#c46a3a`) — italic emphasis color

## Structure

```
app/
  layout.tsx       — fonts, metadata, html shell
  page.tsx         — homepage composition
  globals.css      — token vars + small helpers (hl-underline, frame-stripes)
components/
  Wordmark.tsx     — NUDO. logo
  DOMark.tsx       — D + O logogram (SVG)
  sections/
    Nav.tsx
    Hero.tsx
    TrustBand.tsx
    Reassure.tsx
    Catalog.tsx        ("use client" — filter chips)
    StarterKit.tsx
    Journey.tsx
    Story.tsx
    Newsletter.tsx     ("use client" — form state)
    Footer.tsx
```

## Deploy

Connected to Vercel. Pushes to `main` auto-deploy. Repo: <https://github.com/WTD-Steph/Nudo>.
