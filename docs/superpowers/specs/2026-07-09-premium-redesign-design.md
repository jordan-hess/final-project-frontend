# Premium redesign — design spec

## Context

The site (a static HTML/CSS/JS sneaker-and-streetwear storefront, backed by
Supabase as of the previous change) works, but looks and feels like a
student project: an inconsistent cartoon display font ("Luckiest Guy"),
ad-hoc spacing, ~6 copy-pasted and partly-broken cart implementations
(one per page), native `alert()` popups for all feedback, and no shared
design tokens. The goal is to make it feel like a premium sneaker
platform (Nike / JD Sports / Foot Locker / GOAT / StockX tier) without
rebuilding it: same pages, same brand, same product data, same Supabase
backend — just executed with real design discipline.

## Guiding principle

Before any visual or structural change: does it improve usability,
consistency, or perceived quality? If not, skip it. No redesigning for
the sake of redesigning. Every change should make the app feel more
intentional, maintainable, and premium while preserving the existing
brand identity and functionality.

## Scope

**In scope** — every page and interactive surface that exists today:
Home (`index.html`), Sale (`sales.html`), Brands (`brand.html`),
Accessories (`access.html`), Footwear (`kicks.html`), Apparel
(`clothes.html`), Contact (`contact.html`), Cart (`cart.html`), the
login/register modals, and the slide-out cart drawer used on every
product page.

**Explicitly out of scope** — features that don't exist in this app and
would be new functionality, not a redesign: checkout flow, user
accounts/order history, wishlist, a dedicated product-detail page,
a real search backend, pagination/sorting, and a sidebar (this app has
never had one). If any of these turn out to be genuinely needed for a
page to make sense, that's a separate follow-up conversation, not part
of this pass.

> **Update 2026-07-10:** The "no sidebar" line above was written when it
> was true of the *intent* for this pass, but turned out not to describe
> the actual rendered layout: the primary nav's underlying CSS
> (`.navbar { width: 20vw; height: 100%; position: fixed; }`, unchanged
> since before this redesign started) has always rendered as a fixed,
> full-height, ~20vw-wide vertical column — i.e., a sidebar in
> everything but name. Given that reality, the "no sidebar" decision was
> deliberately reversed per explicit user request: convert that
> already-sidebar-shaped nav into an intentional, well-designed
> collapsible/hover-reveal icon-rail sidebar (Linear/Vercel/Stripe-style,
> with a click/tap toggle for touch and keyboard users, not hover-only)
> rather than leaving it as an accidental, unstyled artifact. See the
> sidebar work applied across all 8 pages via the shared `motion.js`
> helper and `tokens.css`, delivered alongside a broader visual/UX
> elevation pass on the same date.

## Design tokens

Defined once as CSS custom properties in `styles.css` (loaded on every
page already) and consumed everywhere — no page redefines its own
spacing/colors.

- **Color**: black/white/grey scale (`--color-ink`, `--color-paper`,
  `--color-grey-100…700`) plus a single restrained accent
  (`--color-accent`, a red) used *only* for sale badges, was-price
  strikethroughs, and CTA hover/focus emphasis. Everything else stays
  monochrome.
- **Spacing**: 8px scale — `--space-1` (4px) through `--space-12`
  (96px). Every margin/padding/gap in touched CSS uses one of these,
  no arbitrary pixel values.
- **Type**: display headings move from "Luckiest Guy" to a bold
  condensed face (Anton, loaded via the existing Google Fonts
  `<link>` pattern already in each page's `<head>`) for
  hero/section titles; body/UI text moves to Inter. A small scale:
  `--font-display`, `--font-h1`..`--font-h3`, `--font-body`,
  `--font-label`, `--font-price`.
- **Radius**: `--radius-sm` (4px, controls/inputs), `--radius-md`
  (8px, buttons), `--radius-lg` (12px, cards) — mostly square, matching
  the referenced brands rather than heavily rounded.
- **Shadow**: `--shadow-rest`, `--shadow-hover`, `--shadow-modal` — soft
  and subtle, used for card hover-lift, sticky header on scroll, and
  modal/drawer elevation only.
- **Motion**: one easing curve and duration set as tokens
  (`--ease-standard`, `--duration-fast/base/slow`) so every Anime.js
  call and CSS transition feels consistent instead of ad-hoc.

## Shared components (built once, reused everywhere)

- **Header**: sticky, gains a scroll shadow (token-driven) past a small
  scroll threshold, consistent logo/nav/icon spacing, responsive
  collapse to a mobile menu.
- **Product card**: one consistent card pattern (image aspect ratio,
  title/desc/price hierarchy, was-price strike in accent color,
  add-to-cart button placement) used by every category page instead of
  each page having its own slightly different card markup.
- **Buttons**: one primary (solid ink) / secondary (outlined) style,
  consistent height/padding from the spacing scale, Anime.js
  press/hover feedback (subtle scale + shadow, not bouncy).
- **Modal & cart drawer**: consistent open/close animation, backdrop,
  focus trap, Esc-to-close, ARIA `role="dialog"`/`aria-modal`.
- **Toast**: a small accessible live-region component
  (`role="status"`) replacing the current `alert()` calls used for
  "added to cart," "login successful," validation errors, etc. — this
  is the biggest usability win in the whole pass, since blocking
  browser popups are the single least "premium" thing about the
  current UX.

## Shared cart module (functional correctness fix)

Today, add-to-cart/quantity/remove/total logic is duplicated across
`styles.js`, `access.js`, `kicks.js`, `clothes.js`, `sales.js` — with
real bugs already found and partially fixed during the Supabase
migration (off-by-one indexing, undefined variables). To make totals,
quantities, and the cart badge *actually* correct and consistent
everywhere (as required), cart state + math + rendering move into one
shared module that every page includes, replacing the per-page
duplicates. This directly satisfies both the correctness requirement
and the "remove duplicated code" requirement — it's one change, not two.

## Motion plan (Anime.js, via CDN — no npm introduced)

Applied with intent, not everywhere-for-its-own-sake:

- Sticky header shadow on scroll.
- Scroll-triggered fade/translate-in for product grids and page
  sections (IntersectionObserver-driven).
- Button hover/press feedback.
- Product card hover-lift.
- Modal/drawer open & close transitions.
- Toast enter/exit.

All motion respects `prefers-reduced-motion: reduce` (durations
collapse to ~0 for users who request it). No parallax, no
scroll-jacking, no bouncy/elastic easings — fast, subtle, premium.

## Accessibility

Focus-visible outlines on all interactive elements, ARIA roles + focus
trap + Esc-to-close on modal/drawer, `aria-live` toast region, form
labels properly associated (several inputs currently lack `for`/`id`
pairing), alt text on product/nav images, and semantic landmarks
(`<nav>`, `<main>`, `<header>`) where currently missing.

## Responsive

Single shared breakpoint set (mobile / tablet / laptop / desktop) via
the token system; header, product grids, forms, and the cart drawer are
verified at each breakpoint rather than only designed for desktop.

## Sequencing

1. Design tokens + shared header/product-card/button CSS + toast
   component, applied to the homepage. Screenshot for sign-off.
2. Roll the same system out to Sales, Accessories, Footwear, Apparel,
   Contact, Cart page, and the login/register modals + cart drawer,
   consolidating the shared cart module as part of that pass.
3. Full-site accessibility + responsive QA pass.
4. Final review against the checklist in the original request (every
   button/link/form/modal works, no console errors, no duplicate
   calculations).
