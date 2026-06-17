# Nudo Lab

Friendly brewing tools for beginners. **For every first brews.**

Marketing site for [Nudo Lab](https://www.nudo-lab.com). Designed in Tokyo, shipped worldwide from Singapore.

---

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS 3** (no UI library)
- Fonts via `next/font/google`: **Urbanist** (display + body), **JetBrains Mono** (UI labels), **Noto Sans JP** (`ヌードラボ` etc.)
- Hosted on **Vercel** (GitHub → main pushes auto-deploy)

## Local dev

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + type check
npm run lint
```

## Brand tokens

Canonical palette from the brand brief (`tailwind.config.ts` + `app/globals.css`):

| Token | Hex | Used for |
|---|---|---|
| `green` | `#0D330E` | Primary brand color · wordmark · primary CTAs · footer · headlines |
| `rust` | `#A3481A` | Illustration · italic emphasis on cream backgrounds · package design |
| `sand` | `#F1DAAE` | Secondary surface · nested cards · honest-expectations callouts |
| `mustard` | `#E3AD55` | Accent · "Bestseller"/"New" badges · headline underline · save% chips |
| `cream` | `#FDF8DE` | Primary surface · body background |
| `ink` | `#1A1A1A` | Body text (near-black, not pure) |

Color rules enforced in components:
- Default surface = Cream, default text = Ink.
- Sand-background blocks use `text-green` for small uppercase eyebrows (rust just misses AA on sand for ≤12px).
- Italic emphasis in headlines uses `text-rust`.

## Routes — 30+

| Route | Surface |
|---|---|
| `/` | Marketing homepage (Hero · Trust · Reassure · Catalog · StarterKit · Journey · Story · Newsletter) |
| `/shop` · `/shop?category=…` | Category landing + filterable product grid |
| `/shop/[slug]` × 11 | Product detail page (SSG); Sensory Cup opts into icon-grid + colors + how-to-enjoy |
| `/kits` · `/kits/[slug]` × 3 | First-Brew · Pour-Over · Sensory kits with bundle breakdown |
| `/guides` · `/guides/[slug]` × 4 | First-brew guide (1300 words) · 36-term glossary · Care · Why your first shot was bad |
| `/journal` · `/journal/[slug]` × 3 | Journal posts (ops, advice, voice) |
| `/about` · `/about/exakt` | Brand story · Exakt bridge with comparison table |
| `/help/contact` · `/help/track-order` · `/help/shipping-returns` | Real forms + policy + FAQ |
| `/api/subscribe` · `/api/contact` · `/api/track-order` | POST stubs — validate, log, return 200 (TODO provider) |
| `/og` | Dynamic OG generator (`@vercel/og` on edge) |
| `/sitemap.xml` · `/robots.txt` · `/manifest.webmanifest` | SEO + PWA bones |

## Structure

```
app/
  layout.tsx                  fonts, Organization JSON-LD, skip-link
  page.tsx                    home
  not-found.tsx, og/, sitemap.ts, robots.ts, manifest.ts
  shop/, kits/, guides/, journal/, about/, help/, api/
components/
  Wordmark, DOMark            brand marks
  Silhouettes                 Rust SVG fallbacks (Sensory Cup, Drip Bag)
  ProductGrid                 shared between / and /shop
  GuideLayout, JournalLayout  shared chrome with Tailwind arbitrary
                              selectors for typography
  Term, ProductChip           inline glossary tooltip + PDP link
  ContactForm, TrackOrderForm "use client" forms with validation +
                              aria-live announcements
  Newsletter                  client form posting /api/subscribe
  AnnouncementBar, ComingSoon, ExaktComparison, JsonLd
  sections/                   the 10 home sections
content/                      (empty — Phase 1 chose TS data files
                              over MDX; revisit if posts grow)
lib/
  links.ts                    NAV_LINKS, FOOTER_COLS, MARKETPLACE_URL,
                              EXAKT_URL, CONTACT_EMAIL — single edit
                              point when commerce ships
  products.ts (11)            type Product + per-product opt-in fields
  kits.ts (3)                 type Kit + product slug bundles
  guides.ts (4)               metadata; bodies in /guides/[slug]/page.tsx
  journal.ts (3)              metadata; bodies in /journal/[slug]/page.tsx
  glossary.ts (36)            term + short + long + see also
  seo.ts                      JSON-LD builders (Organization, Product,
                              Kit, ItemList, HowTo, Breadcrumb, FAQ,
                              Article)
  validation.ts               zero-dep email/contact/track-order validators
public/
  brand/                      5 wordmark colorways + 2 logomarks +
                              2 stickers (real PNGs from the Drive)
  products/                   19 product photos
  assets/drive/               raw Drive dump (gitignored;
                              regenerable via scripts/fetch_drive.py)
scripts/
  fetch_drive.py              re-runnable Drive folder pull
```

## What's done

### Phase 1 — Brand & shape
- Canonical brand tokens, Urbanist + Noto Sans JP via `next/font`
- All `href="#"` placeholders replaced with real routes
- Shop catalog rebuilt with 11 real products (incl. Sensory Cup, Drip Bags)
- Product detail template with opt-in special sections (sensory icons, colors, how-to-enjoy)
- About page with the brand story
- Exakt bridge with brand-brief comparison table
- Favicon + OG generator + brand-voice 404

### Phase 2 — Long-form content
- 4 guides (first-brew pillar + glossary + care + "why your first shot was bad")
- 36-term glossary with letter jump-bar, hash anchors, "See also"
- Journal with 3 posts (ops, advice, voice) — incl. the competitor-recommendation piece
- 3 starter kits with bundle breakdown, paired guides, honest expectations

### Phase 3 — SEO, A11y, infra
- JSON-LD on every page: Organization, WebSite, Product, Kit, ItemList, HowTo, FAQPage, BreadcrumbList
- Dynamic sitemap.xml, robots.txt, PWA manifest
- API stubs for subscribe / contact / track-order with zero-dep validation
- Real `/help/*` routes with forms, FAQ accordions, regional shipping table
- Newsletter wired to API with submitting/success/error states
- Skip-to-content link + `id="main-content"` on every page
- `prefers-reduced-motion` guard in globals
- **Zero axe-core violations** (wcag2a/wcag2aa) on `/`, a PDP, the first-brew guide, the Exakt bridge, contact, shipping

## Founder TODOs

Search the codebase for `TODO(...)` to find every blocked-on-you task. Highlights:

| Topic | Where | What to provide |
|---|---|---|
| **Commerce** | `lib/links.ts` `MARKETPLACE_URL` | Shopify Hydrogen / Medusa / Shopee/Tokopedia deep link path. When set, the PDP "Reserve" button can become "Buy on …" and `/cart` can be filled in. |
| **Exakt URL** | `lib/links.ts` `EXAKT_URL` | Exakt's site URL once live. Currently the Exakt bridge button falls back to `/about`. |
| **Newsletter provider** | `app/api/subscribe/route.ts` | Resend / ConvertKit / Mailchimp integration. Currently logs + 200s. |
| **Contact relay** | `app/api/contact/route.ts` | SMTP via Resend/Sendgrid, or helpdesk API. |
| **Order tracking** | `app/api/track-order/route.ts` | Shopify order lookup / AfterShip integration. |
| **Real photography** | `lib/products.ts` `silhouette` flags | Sensory Cup + Drip Bag use Rust SVGs until photos arrive. |
| **Logo SVGs** | `public/brand/*.png` | Currently PNGs; vector versions for crisp scaling. |
| **Instagram / WhatsApp** | `lib/links.ts` | Replace `IG_URL`, `WA_URL` placeholders. |
| **Contact email** | `lib/links.ts` `CONTACT_EMAIL` | Confirm `hello@nudolab.com` or set the real address. |
| **Shipping rates** | `app/help/shipping-returns/page.tsx` | Confirm the 4-region table (IDN Jakarta, IDN other, SEA, ROW). |
| **Real hours timezone** | `components/sections/TrustBand.tsx` | "9–6 ET" is a placeholder; switch to local (e.g. "9–17 WIB"). |
| **JP product subtitles** | `lib/products.ts` `jaSubtitle` | Confirm/refine the katakana for each product. |

## Deploy

GitHub repo: <https://github.com/WTD-Steph/Nudo>. Push to `main` → Vercel auto-deploys.

If Vercel isn't connected yet:
1. <https://vercel.com/new> → import `WTD-Steph/Nudo`
2. Accept the auto-detected Next.js settings (build command, install command, output)
3. Deploy

No env vars are required for the current scope.

## Useful commands

```bash
# Re-pull brand assets from the Drive folder
py scripts/fetch_drive.py "https://drive.google.com/drive/folders/<id>" public/assets/drive

# Audit accessibility
npm run dev   # in one tab
npx @axe-core/cli --tags wcag2a,wcag2aa http://localhost:3000/

# Validate JSON-LD
# Paste the rendered page source into https://search.google.com/test/rich-results
```
