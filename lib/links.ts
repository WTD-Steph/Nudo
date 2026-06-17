// Centralised link constants. Anywhere you'd write a route literal,
// import from here instead — single point of change when the marketing
// pages graduate to commerce, or when the founder hands over real URLs.

// External — TODO(founder): replace placeholders.
export const MARKETPLACE_URL = "#"; // Shopee / Tokopedia / Shopify — set when commerce ships.
export const EXAKT_URL = "#"; // TODO(exakt-url) — Exakt's own site.
export const IG_URL = "https://instagram.com"; // TODO(founder): real handle.
export const WA_URL = "https://wa.me/"; // TODO(founder): real number.
export const CONTACT_EMAIL = "hello@nudolab.com"; // TODO(founder): confirm.

// Internal routes.
export const ROUTES = {
  home: "/",
  shop: "/shop",
  shopCategory: (cat: string) => `/shop?category=${cat}`,
  product: (slug: string) => `/shop/${slug}`,
  kits: "/kits",
  kit: (slug: string) => `/kits/${slug}`,
  firstBrewKit: "/kits/first-brew",
  guides: "/guides",
  guide: (slug: string) => `/guides/${slug}`,
  firstBrewGuide: "/guides/first-brew",
  glossary: "/guides/coffee-words",
  journal: "/journal",
  journalPost: (slug: string) => `/journal/${slug}`,
  about: "/about",
  exakt: "/about/exakt",
  shipping: "/help/shipping-returns",
  trackOrder: "/help/track-order",
  contact: "/help/contact",
  signIn: "/account/sign-in",
  signOut: "/auth/sign-out",
  account: "/account",
  myJournal: "/account/journal",
  newBrew: "/account/journal/new",
  brew: (id: string) => `/account/journal/${id}`,
  beans: "/account/journal/beans",
  newBean: "/account/journal/beans/new",
  bean: (id: string) => `/account/journal/beans/${id}`,
  cart: "/cart",
} as const;

// Top nav.
export const NAV_LINKS = [
  { label: "Shop", href: ROUTES.shop },
  { label: "Kits", href: ROUTES.kits },
  { label: "Guides", href: ROUTES.guides },
  { label: "Journal", href: ROUTES.journal },
  { label: "About", href: ROUTES.about },
];

// Footer columns.
export const FOOTER_COLS = [
  {
    h: "Shop",
    items: [
      { label: "All products", href: ROUTES.shop },
      { label: "Espresso", href: ROUTES.shopCategory("espresso") },
      { label: "Pour-over", href: ROUTES.shopCategory("pour-over") },
      { label: "Drip bags", href: ROUTES.product("drip-bags") },
      { label: "Starter kits", href: ROUTES.kits },
      { label: "Gift cards", href: "/help/contact" },
    ],
  },
  {
    h: "Learn",
    items: [
      { label: "First-brew guide", href: ROUTES.firstBrewGuide },
      { label: "Coffee words, explained", href: ROUTES.glossary },
      { label: "Care & cleaning", href: ROUTES.guide("care-and-cleaning") },
      { label: "Journal", href: ROUTES.journal },
    ],
  },
  {
    h: "Help",
    items: [
      { label: "Shipping & returns", href: ROUTES.shipping },
      { label: "Track an order", href: ROUTES.trackOrder },
      { label: "Contact us", href: ROUTES.contact },
      { label: "About Nudo Lab", href: ROUTES.about },
    ],
  },
  {
    h: "Family",
    items: [
      { label: "Nudo Lab — starters", href: ROUTES.about },
      { label: "Exakt — for makers", href: ROUTES.exakt },
    ],
  },
];
