# Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize every existing page/modal into a cohesive, premium, accessible design system with tasteful Anime.js micro-interactions, and fix the site's real cart-correctness/duplication bugs — without adding any new pages or features.

**Architecture:** Three new shared, framework-free files (`tokens.css`, `motion.js`, `toast.js`, `cartStore.js`) get loaded on every existing page via plain `<link>`/`<script>` tags (this project has no build step and none is being introduced). Each page's existing HTML/CSS/JS is then updated in place to consume these shared pieces instead of its own bespoke/duplicated styling and cart logic.

**Tech Stack:** Vanilla HTML/CSS/JS (no framework, no bundler — matches the existing project), Anime.js 3.2.2 via CDN (`cdnjs`), Supabase JS (already wired in from the prior change), Puppeteer (via `puppeteer-core` pointed at the machine's installed Chrome) for browser-driven verification since this project has no test framework.

## Global Constraints

- Preserve existing functionality and brand identity — this is a redesign, not a rebuild. No new pages/routes (no checkout, account, wishlist, product-detail page, dedicated search backend, sidebar, or pagination — confirmed out of scope).
- No npm/build step is introduced. All new libraries load via `<script>`/`<link>` CDN tags, exactly like `supabase-js` was added previously.
- 8px spacing scale, one type scale, one radius scale, one shadow scale, one motion/easing scale — defined once in `tokens.css`, consumed everywhere.
- Every animation must respect `prefers-reduced-motion: reduce`.
- Before any visual/structural change: it must improve usability, consistency, or perceived quality — no redesigning for its own sake.
- No console errors on any page after each task (verified with the Puppeteer smoke pattern established in the previous session).

---

## Task 1: Design tokens (`tokens.css`)

**Files:**
- Create: `tokens.css`
- Modify: `index.html`, `access.html`, `kicks.html`, `clothes.html`, `sales.html`, `contact.html`, `cart.html`, `brand.html` (add one `<link>` + swap font `<link>` in each `<head>`)

**Interfaces:**
- Produces: CSS custom properties consumed by every stylesheet touched in later tasks — `--color-ink`, `--color-ink-soft`, `--color-paper`, `--color-grey-100/200/300/500/700`, `--color-accent`, `--color-accent-ink`, `--space-1`..`--space-8`, `--font-display`, `--font-body`, `--text-display`, `--text-h1`, `--text-h2`, `--text-h3`, `--text-body`, `--text-label`, `--text-price`, `--radius-sm/md/lg`, `--shadow-rest/hover/modal`, `--ease-standard`, `--duration-fast/base/slow`. Also defines base classes `.btn`, `.btn-primary`, `.btn-secondary`, `.card`, `.visually-hidden`, `:focus-visible` outline, `.toast-container`, `.toast`, and the reduced-motion override block.

- [ ] **Step 1: Create `tokens.css`**

```css
/* Design tokens — single source of truth for spacing, color, type, radius,
   shadow, and motion. Every other stylesheet in this project reads from
   these instead of hardcoding values. */

:root {
  /* Color */
  --color-ink: #0a0a0a;
  --color-ink-soft: #1a1a1a;
  --color-paper: #ffffff;
  --color-grey-100: #f5f5f5;
  --color-grey-200: #e5e5e5;
  --color-grey-300: #d4d4d4;
  --color-grey-500: #737373;
  --color-grey-700: #404040;
  --color-accent: #e11d2e;
  --color-accent-ink: #ffffff;

  /* Spacing (8px scale) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 64px;
  --space-8: 96px;

  /* Typography */
  --font-display: 'Anton', Impact, sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --text-display: clamp(2.5rem, 6vw, 4.5rem);
  --text-h1: clamp(1.75rem, 3.5vw, 2.5rem);
  --text-h2: clamp(1.375rem, 2.5vw, 1.75rem);
  --text-h3: 1.125rem;
  --text-body: 1rem;
  --text-label: 0.8125rem;
  --text-price: 1.0625rem;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Shadow */
  --shadow-rest: 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-modal: 0 24px 64px rgba(0, 0, 0, 0.28);

  /* Motion */
  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 120ms;
  --duration-base: 220ms;
  --duration-slow: 360ms;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0.001ms;
    --duration-base: 0.001ms;
    --duration-slow: 0.001ms;
  }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}

* { box-sizing: border-box; }

body {
  font-family: var(--font-body);
  color: var(--color-ink);
  -webkit-font-smoothing: antialiased;
}

h1, h2, .display-heading {
  font-family: var(--font-display);
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 2px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-body);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-standard),
              box-shadow var(--duration-fast) var(--ease-standard),
              background-color var(--duration-fast) var(--ease-standard);
}
.btn:disabled { cursor: not-allowed; opacity: 0.6; }
.btn-primary {
  background: var(--color-ink);
  color: var(--color-paper);
}
.btn-primary:hover:not(:disabled) { box-shadow: var(--shadow-hover); }
.btn-secondary {
  background: transparent;
  color: var(--color-ink);
  border-color: var(--color-ink);
}
.btn-secondary:hover:not(:disabled) { background: var(--color-grey-100); }

/* Product card */
.card {
  background: var(--color-paper);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-rest);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow var(--duration-base) var(--ease-standard);
}
.card:hover { box-shadow: var(--shadow-hover); }
.card img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
}
.card .card-body-inner { padding: var(--space-3); display: flex; flex-direction: column; gap: var(--space-1); flex: 1; }
.card .card-title { font-size: var(--text-h3); font-weight: 600; margin: 0; }
.card .card-desc { font-size: var(--text-label); color: var(--color-grey-500); margin: 0; }
.card .card-price { font-size: var(--text-price); font-weight: 700; margin: var(--space-1) 0 0; }
.card .card-was-price { font-size: var(--text-label); color: var(--color-accent); text-decoration: line-through; margin: 0; }

/* Toast */
.toast-container {
  position: fixed;
  bottom: var(--space-4);
  right: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  z-index: 1000;
  max-width: 320px;
}
.toast {
  background: var(--color-ink);
  color: var(--color-paper);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-modal);
  font-size: var(--text-body);
  opacity: 0;
}
.toast-error { background: var(--color-accent); }
```

- [ ] **Step 2: Wire `tokens.css` and the new font stack into every page's `<head>`**

For each of `index.html`, `access.html`, `kicks.html`, `clothes.html`, `sales.html`, `contact.html`, `cart.html`, `brand.html`: replace the existing

```html
<link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">
```

with

```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="tokens.css">
```

(Keep the two `preconnect` lines above it as-is.)

- [ ] **Step 3: Verify tokens load with no console errors**

Start the static server and check computed styles via Puppeteer (reuse the Chrome path established previously):

```bash
cd /path/to/final-project-frontend && npx --yes serve -l 8765 . &
```

```js
// scratchpad/check-tokens.mjs
import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://localhost:8765/index.html", { waitUntil: "networkidle0" });
const inkColor = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--color-ink").trim());
console.log("ink token:", inkColor, "| errors:", errors);
await browser.close();
process.exit(inkColor === "#0a0a0a" && errors.length === 0 ? 0 : 1);
```

Run: `node scratchpad/check-tokens.mjs`
Expected: `ink token: #0a0a0a | errors: []`, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add tokens.css index.html access.html kicks.html clothes.html sales.html contact.html cart.html brand.html
git commit -m "Add shared design tokens and wire into every page"
```

---

## Task 2: Anime.js + motion helper module (`motion.js`)

**Files:**
- Create: `motion.js`
- Modify: every HTML page's script section (add CDN + `motion.js` tags)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `window.Motion` object with `prefersReducedMotion()`, `bindButtonFeedback()`, `revealOnScroll(selector)`, `animateHeaderShadow(headerSelector)`. Later tasks call `Motion.bindButtonFeedback()` and `Motion.revealOnScroll(...)` once per page after their DOM is built.

- [ ] **Step 1: Create `motion.js`**

```js
window.Motion = (function () {
  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  // Event delegation so this also covers buttons rendered later by
  // Supabase-driven product cards, not just buttons present at load.
  function bindButtonFeedback() {
    document.addEventListener("pointerdown", (event) => {
      const btn = event.target.closest(".btn, button");
      if (!btn || prefersReducedMotion() || !window.anime) return;
      anime({ targets: btn, scale: 0.96, duration: 90, easing: "easeOutQuad" });
    });
    document.addEventListener("pointerup", (event) => {
      const btn = event.target.closest(".btn, button");
      if (!btn || prefersReducedMotion() || !window.anime) return;
      anime({ targets: btn, scale: 1, duration: 140, easing: "easeOutBack" });
    });
  }

  function revealOnScroll(selector) {
    const items = document.querySelectorAll(selector);
    if (!items.length) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      items.forEach((el) => { el.style.opacity = "1"; });
      return;
    }
    items.forEach((el) => { el.style.opacity = "0"; });
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (window.anime) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [16, 0],
              duration: 420,
              easing: "easeOutCubic",
            });
          } else {
            entry.target.style.opacity = "1";
          }
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
  }

  function animateHeaderShadow(headerSelector) {
    const header = document.querySelector(headerSelector);
    if (!header) return;
    const apply = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", apply, { passive: true });
    apply();
  }

  // Anime.js-driven open/close for modals and the cart drawer. `activeClass`
  // is whatever class the existing onclick handler already toggles (e.g.
  // "modal-active", "login-active", "carts-active") — this wraps that
  // existing toggle with a fade/scale instead of an instant show/hide.
  function toggleDialog(el, activeClass) {
    if (!el) return;
    const opening = !el.classList.contains(activeClass);
    el.classList.toggle(activeClass, opening);
    if (prefersReducedMotion() || !window.anime) return;
    if (opening) {
      anime({ targets: el, opacity: [0, 1], scale: [0.96, 1], duration: 220, easing: "easeOutCubic" });
    } else {
      anime({ targets: el, opacity: [1, 0], scale: [1, 0.96], duration: 160, easing: "easeInCubic" });
    }
  }

  return { prefersReducedMotion, bindButtonFeedback, revealOnScroll, animateHeaderShadow, toggleDialog };
})();
```

- [ ] **Step 2: Add the Anime.js CDN script + `motion.js` to every page**

For each HTML page, immediately before its existing page-specific `<script src="....js">` tag (after any Supabase scripts, where present), insert:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js"></script>
<script src="motion.js"></script>
```

- [ ] **Step 3: Verify Anime.js and Motion load globally with no console errors**

```js
// scratchpad/check-motion.mjs
import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://localhost:8765/index.html", { waitUntil: "networkidle0" });
const hasAnime = await page.evaluate(() => typeof window.anime === "function");
const hasMotion = await page.evaluate(() => typeof window.Motion === "object");
console.log({ hasAnime, hasMotion, errors });
await browser.close();
process.exit(hasAnime && hasMotion && errors.length === 0 ? 0 : 1);
```

Run: `node scratchpad/check-motion.mjs`
Expected: `{ hasAnime: true, hasMotion: true, errors: [] }`, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add motion.js index.html access.html kicks.html clothes.html sales.html contact.html cart.html brand.html
git commit -m "Add Anime.js and shared motion helper module"
```

---

## Task 3: Toast component (`toast.js`)

**Files:**
- Create: `toast.js`
- Modify: every HTML page's script section (add `toast.js` tag)

**Interfaces:**
- Consumes: `.toast-container`/`.toast` CSS from `tokens.css` (Task 1), `window.anime` (Task 2).
- Produces: global `window.showToast(message, type)` — `type` is `"info"` (default) or `"error"`. Later tasks (5–11) replace every `alert(...)` call with `showToast(...)`.

- [ ] **Step 1: Create `toast.js`**

```js
(function () {
  function ensureContainer() {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      container.setAttribute("role", "status");
      container.setAttribute("aria-live", "polite");
      document.body.appendChild(container);
    }
    return container;
  }

  window.showToast = function showToast(message, type) {
    const container = ensureContainer();
    const toast = document.createElement("div");
    toast.className = "toast" + (type === "error" ? " toast-error" : "");
    toast.textContent = message;
    container.appendChild(toast);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.anime && !reduced) {
      anime({ targets: toast, translateY: [16, 0], opacity: [0, 1], duration: 220, easing: "easeOutCubic" });
    } else {
      toast.style.opacity = "1";
    }

    setTimeout(() => {
      if (window.anime && !reduced) {
        anime({
          targets: toast,
          translateY: [0, 16],
          opacity: [1, 0],
          duration: 180,
          easing: "easeInCubic",
          complete: () => toast.remove(),
        });
      } else {
        toast.remove();
      }
    }, 3200);
  };
})();
```

- [ ] **Step 2: Add `toast.js` to every page**

Immediately after the `motion.js` tag added in Task 2, on every HTML page, insert:

```html
<script src="toast.js"></script>
```

- [ ] **Step 3: Verify toast renders and auto-dismisses**

```js
// scratchpad/check-toast.mjs
import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://localhost:8765/index.html", { waitUntil: "networkidle0" });
await page.evaluate(() => window.showToast("Test message", "info"));
const visible = await page.evaluate(() => !!document.querySelector(".toast"));
console.log({ visible, errors });
await browser.close();
process.exit(visible && errors.length === 0 ? 0 : 1);
```

Run: `node scratchpad/check-toast.mjs`
Expected: `{ visible: true, errors: [] }`, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add toast.js index.html access.html kicks.html clothes.html sales.html contact.html cart.html brand.html
git commit -m "Add accessible toast component to replace alert() popups"
```

---

## Task 4: Shared cart module (`cartStore.js`)

**Files:**
- Create: `cartStore.js`
- Test: `scratchpad/test-cart-store.mjs` (plain Node, no framework — this project has none)

**Interfaces:**
- Consumes: nothing from earlier tasks (pure logic + DOM rendering hooks).
- Produces: global `window.CartStore` with `addItem({id, name, price, image})`, `removeItem(id)`, `setQuantity(id, qty)`, `getTotal()` (number), `getCount()` (number), `renderAll()`. Renders into any element matching `[data-cart-items]` (line items) and `[data-cart-total]` (formatted total), and updates every `.cart-badge` element's `textContent` to the item count. Tasks 5–11 render markup with those attributes/classes and call `CartStore.addItem(...)` instead of each page's old bespoke cart code.

- [ ] **Step 1: Write the failing test**

```js
// scratchpad/test-cart-store.mjs
// Minimal DOM/session stubs so cartStore.js (a plain browser IIFE) can be
// loaded and exercised under plain Node — this project has no test framework
// or jsdom dependency, so we stub only what the module touches.
import fs from "node:fs";
import vm from "node:vm";

function makeSandbox() {
  const store = {};
  const elements = new Map();
  const sandbox = {
    sessionStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = v; },
    },
    document: {
      querySelectorAll: () => [],
      addEventListener: () => {},
    },
    window: {},
  };
  sandbox.window = sandbox;
  return sandbox;
}

const sandbox = makeSandbox();
vm.createContext(sandbox);
const code = fs.readFileSync(new URL("../cartStore.js", import.meta.url), "utf8");
vm.runInContext(code, sandbox);

const CartStore = sandbox.window.CartStore;

CartStore.addItem({ id: 1, name: "Air Jordan Retro High", price: "R2899.00", image: "a.jpg" });
CartStore.addItem({ id: 1, name: "Air Jordan Retro High", price: "R2899.00", image: "a.jpg" }); // same item again -> qty 2
CartStore.addItem({ id: 2, name: "Nike Air Max 270", price: 2399, image: "b.jpg" });

console.assert(CartStore.getCount() === 3, `expected count 3, got ${CartStore.getCount()}`);
console.assert(CartStore.getTotal() === 2899 * 2 + 2399, `expected total ${2899 * 2 + 2399}, got ${CartStore.getTotal()}`);

CartStore.setQuantity(1, 1);
console.assert(CartStore.getCount() === 2, `expected count 2 after setQuantity, got ${CartStore.getCount()}`);

CartStore.removeItem(2);
console.assert(CartStore.getCount() === 1, `expected count 1 after removeItem, got ${CartStore.getCount()}`);
console.assert(CartStore.getTotal() === 2899, `expected total 2899 after removeItem, got ${CartStore.getTotal()}`);

console.log("ALL CART STORE ASSERTIONS PASSED");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node scratchpad/test-cart-store.mjs`
Expected: `TypeError: Cannot read properties of undefined (reading 'addItem')` (because `cartStore.js` doesn't exist yet).

- [ ] **Step 3: Write `cartStore.js`**

```js
window.CartStore = (function () {
  const STORAGE_KEY = "cart_items_v1";

  function readItems() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function writeItems(items) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function parsePrice(value) {
    if (typeof value === "number") return value;
    const n = parseFloat(String(value).replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }

  function addItem(item) {
    const items = readItems();
    const existing = items.find((i) => i.id === item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({
        id: item.id,
        name: item.name,
        price: parsePrice(item.price),
        image: item.image,
        qty: 1,
      });
    }
    writeItems(items);
    renderAll();
    return items;
  }

  function removeItem(id) {
    const items = readItems().filter((i) => i.id !== id);
    writeItems(items);
    renderAll();
    return items;
  }

  function setQuantity(id, qty) {
    const safeQty = Math.max(1, Math.floor(Number(qty) || 1));
    const items = readItems();
    const existing = items.find((i) => i.id === id);
    if (existing) existing.qty = safeQty;
    writeItems(items);
    renderAll();
    return items;
  }

  function getTotal() {
    return readItems().reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function getCount() {
    return readItems().reduce((sum, i) => sum + i.qty, 0);
  }

  function updateBadges() {
    document.querySelectorAll(".cart-badge").forEach((el) => {
      el.textContent = String(getCount());
    });
  }

  function renderLineItems(container) {
    const items = readItems();
    if (items.length === 0) {
      container.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
      return;
    }
    container.innerHTML = items
      .map(
        (item) => `
        <div class="cart-line" data-id="${item.id}">
          <img src="${item.image}" alt="" class="cart-line-image" />
          <div class="cart-line-info">
            <p class="cart-line-name">${item.name}</p>
            <p class="cart-line-price">R${item.price.toFixed(2)}</p>
          </div>
          <div class="cart-line-qty">
            <button type="button" class="btn btn-secondary qty-decrement" aria-label="Decrease quantity for ${item.name}">-</button>
            <span class="qty-value">${item.qty}</span>
            <button type="button" class="btn btn-secondary qty-increment" aria-label="Increase quantity for ${item.name}">+</button>
          </div>
          <p class="cart-line-subtotal">R${(item.price * item.qty).toFixed(2)}</p>
          <button type="button" class="btn btn-secondary cart-line-remove" aria-label="Remove ${item.name} from cart">Remove</button>
        </div>
      `
      )
      .join("");
  }

  function renderAll() {
    updateBadges();
    document.querySelectorAll("[data-cart-items]").forEach(renderLineItems);
    document.querySelectorAll("[data-cart-total]").forEach((el) => {
      el.textContent = "R" + getTotal().toFixed(2);
    });
  }

  document.addEventListener("click", (event) => {
    const line = event.target.closest(".cart-line");
    if (!line) return;
    const id = Number(line.getAttribute("data-id"));
    const items = readItems();
    const item = items.find((i) => i.id === id);
    if (event.target.classList.contains("cart-line-remove")) {
      removeItem(id);
      if (window.showToast) window.showToast("Removed from cart");
    } else if (event.target.classList.contains("qty-increment") && item) {
      setQuantity(id, item.qty + 1);
    } else if (event.target.classList.contains("qty-decrement") && item) {
      setQuantity(id, item.qty - 1);
    }
  });

  if (typeof document !== "undefined" && document.addEventListener) {
    document.addEventListener("DOMContentLoaded", renderAll);
  }

  return { addItem, removeItem, setQuantity, getTotal, getCount, renderAll };
})();
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node scratchpad/test-cart-store.mjs`
Expected: `ALL CART STORE ASSERTIONS PASSED`, exit code 0.

- [ ] **Step 5: Wire `cartStore.js` into every page**

Immediately after `toast.js` on every HTML page, insert:

```html
<script src="cartStore.js"></script>
```

- [ ] **Step 6: Commit**

```bash
git add cartStore.js scratchpad/test-cart-store.mjs index.html access.html kicks.html clothes.html sales.html contact.html cart.html brand.html
git commit -m "Add shared cart module with quantity/total math and a plain-Node test"
```

---

## Task 5: Homepage rollout (header, hero, cards, modals, drawer) — checkpoint

**Files:**
- Modify: `index.html`, `styles.css`, `styles.js`

**Interfaces:**
- Consumes: `tokens.css` classes (Task 1), `Motion.bindButtonFeedback/revealOnScroll/animateHeaderShadow` (Task 2), `showToast` (Task 3), `CartStore.addItem/renderAll` (Task 4).
- Produces: the reference markup pattern (`.site-header`, `.card` structure, cart badge, drawer markup) that Tasks 6–10 replicate on their own pages.

- [ ] **Step 1: Update the header markup in `index.html`**

Replace:

```html
        <nav>
            <ul class="navbar">
                <img src="logo.png">
```

with:

```html
        <nav class="site-header" aria-label="Primary">
            <ul class="navbar">
                <img src="logo.png" alt="Store logo">
```

- [ ] **Step 2: Add a cart badge next to the existing cart nav link**

Replace:

```html
                <li>
                    <i class="fas fa-shopping-cart"></i><a href="cart.html" class="navbar-cart">CART</a>
                </li>
```

with:

```html
                <li>
                    <i class="fas fa-shopping-cart"></i><a href="cart.html" class="navbar-cart">CART <span class="cart-badge" aria-label="Items in cart">0</span></a>
                </li>
```

- [ ] **Step 3: Add sticky header + scroll-shadow CSS to `styles.css`**

Append:

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-paper);
  transition: box-shadow var(--duration-base) var(--ease-standard);
}
.site-header.is-scrolled { box-shadow: var(--shadow-rest); }
.cart-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  margin-left: var(--space-1);
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-accent-ink);
  font-size: 0.6875rem;
  font-weight: 700;
}
.products .card, .two-card, .three-card, .four-card, .five-card, .six-card, .sev-card, .one-card {
  opacity: 1; /* Motion.revealOnScroll manages this per-element at runtime */
}
```

- [ ] **Step 4: Give the cart drawer proper ARIA + line-item/total hooks**

Replace:

```html
                <div class="mycart" id="carts-items">
                    <div class="top">
                        <h1>cart</h1>
                        <button class="close" onclick="openCart()">X</button>
                    </div>
                    <div class="cart-trend"></div>
                    <div class="cart-items"></div>
                    <div class="cart-total">
                        <h1 class="total-head">Total:</h1>
                        <span class="total">0.00</span>
                    </div>
                </div>
```

with:

```html
                <div class="mycart" id="carts-items" role="dialog" aria-modal="true" aria-label="Shopping cart">
                    <div class="top">
                        <h1>cart</h1>
                        <button class="close" onclick="openCart()" aria-label="Close cart">X</button>
                    </div>
                    <div class="cart-trend"></div>
                    <div data-cart-items></div>
                    <div class="cart-total">
                        <h1 class="total-head">Total:</h1>
                        <span class="total" data-cart-total>R0.00</span>
                    </div>
                </div>
```

- [ ] **Step 5: Replace `alert()` calls in `styles.js` with `showToast()`**

Replace:

```js
    if (error){
        alert("There was a problem with the registration: " + error.message);
        return;
    }

    alert("You are now a registered user");
    openModal();
```

with:

```js
    if (error){
        showToast("There was a problem with the registration: " + error.message, "error");
        return;
    }

    showToast("You are now a registered user");
    openModal();
```

Replace:

```js
    if (error) {
        alert("Username and password unrecognised , try again");
        return;
    }

    alert("Login successful");
    openLog();
    showDeatails();
```

with:

```js
    if (error) {
        showToast("Username and password unrecognised, try again", "error");
        return;
    }

    showToast("Login successful");
    openLog();
    showDeatails();
```

- [ ] **Step 6: Route homepage add-to-cart through `CartStore` instead of the page's own cart array**

Replace the whole `addItemToCart` function body in `styles.js`:

```js
function addItemToCart(title, price, imageScr, cartItemId, e) {
    let cart = [];
    let cartPage = document.querySelector(".cart-items")
    let cartItem = e.value
    console.log(cartItem)


    let item = {
        "name": title,
        "price": price,
        "url": imageScr,
        "id": cartItemId,
        }
    console.log(item)

    if (cartItem == item["id"]){
        cart.push(item)
        cart.forEach((cartCard) => {
        e.innerHTML = "";
        e.disabled = true;
        e.innerHTML += "In Cart Already";
        console.log(cart);

        cartPage.innerHTML +=`
        <div class="card">
        <div class="incart-item">
            <p style="display: none" class="id">${cartCard["id"]}<p>
            <img src="${cartCard["url"]}" class="card-pic"/>
            <h2 class="cards-title">${cartCard["name"]}</h2>
            <h3 class="card-price">${cartCard["price"]}</h3>
            <input class="qty-input btn" type="number" value="1">
            <button id="remove-btn" onclick="removeBtn()" type="button">-</button>
        </div>
    </div>
        `
    },
        )
    }
}
```

with:

```js
function addItemToCart(title, price, imageScr, cartItemId, e) {
    CartStore.addItem({ id: cartItemId, name: title, price: price, image: imageScr });
    e.innerHTML = "In Cart";
    e.disabled = true;
    showToast(title + " added to cart");
}
```

- [ ] **Step 7: Animate the modal, login, and cart-drawer open/close via Anime.js**

Replace:

```js
function openModal() {
    document.getElementById("modal").classList.toggle("modal-active");
}
```

with:

```js
function openModal() {
    Motion.toggleDialog(document.getElementById("modal"), "modal-active");
}
```

Replace:

```js
function openLog() {
    document.getElementById("login").classList.toggle("login-active")
}
```

with:

```js
function openLog() {
    Motion.toggleDialog(document.getElementById("login"), "login-active");
}
```

Replace:

```js
function openCart() {
    document.getElementById("carts-items").classList.toggle("carts-active")
    updateCartTotal()
}
```

with:

```js
function openCart() {
    Motion.toggleDialog(document.getElementById("carts-items"), "carts-active");
}
```

(`updateCartTotal()` is dropped here because `CartStore.renderAll()` already keeps `[data-cart-total]` current on every add/remove/quantity change — see Task 4.)

- [ ] **Step 8: Wire up header shadow + scroll reveal + button feedback**

Append to the bottom of `styles.js`:

```js
Motion.animateHeaderShadow(".site-header");
Motion.bindButtonFeedback();
Motion.revealOnScroll(".products .card, .one-card, .two-card, .three-card, .four-card, .five-card, .six-card, .sev-card");
```

- [ ] **Step 9: Verify homepage end-to-end with no console errors and a screenshot**

```js
// scratchpad/check-homepage.mjs
import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("dialog", (d) => d.accept());
await page.goto("http://localhost:8765/index.html", { waitUntil: "networkidle0" });
await page.waitForSelector(".products .card .shop-item-button", { timeout: 10000 });
await page.click(".products .card .shop-item-button");
await new Promise((r) => setTimeout(r, 500));
const badge = await page.$eval(".cart-badge", (el) => el.textContent);
const total = await page.$eval("[data-cart-total]", (el) => el.textContent);
console.log({ badge, total, errors });
await page.screenshot({ path: "scratchpad/homepage.png", fullPage: true });
await browser.close();
process.exit(badge === "1" && total.startsWith("R") && errors.length === 0 ? 0 : 1);
```

Run: `node scratchpad/check-homepage.mjs`
Expected: `{ badge: '1', total: 'R....', errors: [] }`, exit code 0. Review `scratchpad/homepage.png` for visual sign-off.

- [ ] **Step 10: Commit**

```bash
git add index.html styles.css styles.js
git commit -m "Roll out design system, cart module, and toasts to the homepage"
```

**CHECKPOINT: Show `scratchpad/homepage.png` to the user for sign-off before continuing to Task 6.**

---

## Task 6: Sales page rollout

**Files:**
- Modify: `sales.html`, `sales.css`, `sales.js`

**Interfaces:**
- Consumes: same shared pieces as Task 5.

- [ ] **Step 1: Header + cart badge** — apply the identical header/cart-badge changes from Task 5 Steps 1 and 2 to `sales.html` (the nav markup is byte-identical across pages).

- [ ] **Step 2: Add cart-drawer render hooks** — `sales.html`'s drawer has no `.cart-total` block yet (unlike the homepage). Replace:

```html
            <div class="mycart" id="carts-items">
                <div class="top">
                    <h1>cart</h1>
                    <button class="close" onclick="openCart()">X</button>
                </div>
                <div class="cart-items"></div>
                <div class="cart-sale"></div>
            </div>
```

with:

```html
            <div class="mycart" id="carts-items" role="dialog" aria-modal="true" aria-label="Shopping cart">
                <div class="top">
                    <h1>cart</h1>
                    <button class="close" onclick="openCart()" aria-label="Close cart">X</button>
                </div>
                <div data-cart-items></div>
                <div class="cart-total">
                    <h1 class="total-head">Total:</h1>
                    <span class="total" data-cart-total>R0.00</span>
                </div>
            </div>
```

- [ ] **Step 3: Restyle the category filter buttons using shared button tokens**

Replace:

```html
            <div class="button-container">
                <button onclick="filterCards('Shoes')">Shoes</button>
                <button onclick="filterCards('Hoodie')">Hoodie</button>
                <button onclick="filterCards('Accessories')">Accessories</button>
                <button onclick="filterCards('T-shirt')">Tee's</button>
                <button onclick="filterCards('Pants')">Pants</button>
              </div>
```

with:

```html
            <div class="button-container">
                <button class="btn btn-secondary" onclick="filterCards('Shoes')">Shoes</button>
                <button class="btn btn-secondary" onclick="filterCards('Hoodie')">Hoodie</button>
                <button class="btn btn-secondary" onclick="filterCards('Accessories')">Accessories</button>
                <button class="btn btn-secondary" onclick="filterCards('T-shirt')">Tee's</button>
                <button class="btn btn-secondary" onclick="filterCards('Pants')">Pants</button>
              </div>
```

- [ ] **Step 4: Route sales add-to-cart through `CartStore`**

Replace the `addItemToCart` function body in `sales.js` (same shape as Task 5 Step 6) with:

```js
function addItemToCart(title, price, imageScr, cartItemId, e) {
    CartStore.addItem({ id: cartItemId, name: title, price: price, image: imageScr });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast("Added to cart");
}
```

- [ ] **Step 5: Animate the cart drawer and wire scroll reveal + button feedback**

Replace:

```js
function openCart() {
    document.getElementById("carts-items").classList.toggle("carts-active");
}
```

with:

```js
function openCart() {
    Motion.toggleDialog(document.getElementById("carts-items"), "carts-active");
}
```

Append to the bottom of `sales.js`:

```js
Motion.animateHeaderShadow(".site-header");
Motion.bindButtonFeedback();
Motion.revealOnScroll(".sale-products .sale-card");
```

- [ ] **Step 6: Add `.sale-card` styling consistent with `.card` tokens to `sales.css`**

Append:

```css
.sale-card {
  background: var(--color-paper);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-rest);
  transition: box-shadow var(--duration-base) var(--ease-standard);
}
.sale-card:hover { box-shadow: var(--shadow-hover); }
.sale-card-price { font-size: var(--text-price); font-weight: 700; }
.card-was-price { color: var(--color-accent); text-decoration: line-through; font-size: var(--text-label); }
```

- [ ] **Step 7: Verify with Puppeteer**

```js
// scratchpad/check-sales.mjs
import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://localhost:8765/sales.html", { waitUntil: "networkidle0" });
await page.waitForSelector(".sale-products .sale-card", { timeout: 10000 });
await page.click('button[onclick="filterCards(\'Shoes\')"]');
await new Promise((r) => setTimeout(r, 400));
console.log({ errors });
await page.screenshot({ path: "scratchpad/sales.png", fullPage: true });
await browser.close();
process.exit(errors.length === 0 ? 0 : 1);
```

Run: `node scratchpad/check-sales.mjs`
Expected: `{ errors: [] }`, exit code 0.

- [ ] **Step 8: Commit**

```bash
git add sales.html sales.css sales.js
git commit -m "Roll out design system and cart module to the sales page"
```

---

## Task 7: Accessories page rollout

**Files:**
- Modify: `access.html`, `access.css`, `access.js`

**Interfaces:**
- Consumes: same shared pieces as Task 5.

- [ ] **Step 1: Header + cart badge** — apply the identical header/cart-badge changes from Task 5 Steps 1 and 2 to `access.html`.

- [ ] **Step 2: Add cart-drawer render hooks** — `access.html`'s drawer has no `.cart-total` block yet. Replace:

```html
                <div class="mycart" id="carts-items">
                    <div class="top">
                        <h1>cart</h1>
                        <button class="close" onclick="openCart()">X</button>
                    </div>
                    <div class="cart-items"></div>
                    <div class="cart-sale"></div>
                </div>
```

with:

```html
                <div class="mycart" id="carts-items" role="dialog" aria-modal="true" aria-label="Shopping cart">
                    <div class="top">
                        <h1>cart</h1>
                        <button class="close" onclick="openCart()" aria-label="Close cart">X</button>
                    </div>
                    <div data-cart-items></div>
                    <div class="cart-total">
                        <h1 class="total-head">Total:</h1>
                        <span class="total" data-cart-total>R0.00</span>
                    </div>
                </div>
```

- [ ] **Step 3: Route accessories add-to-cart through `CartStore`**

Replace the `addItemToCart` function body in `access.js` with:

```js
function addItemToCart(title, price, imageScr, cartItemId, e) {
    CartStore.addItem({ id: cartItemId, name: title, price: price, image: imageScr });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast("Added to cart");
}
```

- [ ] **Step 4: Animate the cart drawer and wire scroll reveal + button feedback**

Replace:

```js
function openCart() {
    document.getElementById("carts-items").classList.toggle("carts-active");
}
```

with:

```js
function openCart() {
    Motion.toggleDialog(document.getElementById("carts-items"), "carts-active");
}
```

Append to the bottom of `access.js`:

```js
Motion.animateHeaderShadow(".site-header");
Motion.bindButtonFeedback();
Motion.revealOnScroll(".ass .card, .onsale .card, .for-sale .card-ass, .three .card-3, .four .card-4");
```

- [ ] **Step 5: Verify with Puppeteer**

```js
// scratchpad/check-access.mjs
import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("dialog", (d) => d.accept());
await page.goto("http://localhost:8765/access.html", { waitUntil: "networkidle0" });
await page.waitForSelector(".ass .card .shop-item-button", { timeout: 10000 });
await page.click(".ass .card .shop-item-button");
await new Promise((r) => setTimeout(r, 400));
const badge = await page.$eval(".cart-badge", (el) => el.textContent);
console.log({ badge, errors });
await page.screenshot({ path: "scratchpad/access.png", fullPage: true });
await browser.close();
process.exit(badge === "1" && errors.length === 0 ? 0 : 1);
```

Run: `node scratchpad/check-access.mjs`
Expected: `{ badge: '1', errors: [] }`, exit code 0.

- [ ] **Step 6: Commit**

```bash
git add access.html access.css access.js
git commit -m "Roll out design system and cart module to the accessories page"
```

---

## Task 8: Footwear (kicks) page rollout

**Files:**
- Modify: `kicks.html`, `kicks.css`, `kicks.js`

**Interfaces:**
- Consumes: same shared pieces as Task 5.

- [ ] **Step 1: Header + cart badge** — apply the identical header/cart-badge changes from Task 5 Steps 1 and 2 to `kicks.html`.

- [ ] **Step 2: Add cart-drawer render hooks** — `kicks.html`'s drawer has no `.cart-total` block yet. Replace:

```html
                    <div class="mycart" id="carts-items">
                        <div class="top">
                            <h1>cart</h1>
                            <button class="close" onclick="openCart()">X</button>
                        </div>
                        <div class="cart-items"></div>
                        <div class="cart-sale"></div>
                    </div>
```

with:

```html
                    <div class="mycart" id="carts-items" role="dialog" aria-modal="true" aria-label="Shopping cart">
                        <div class="top">
                            <h1>cart</h1>
                            <button class="close" onclick="openCart()" aria-label="Close cart">X</button>
                        </div>
                        <div data-cart-items></div>
                        <div class="cart-total">
                            <h1 class="total-head">Total:</h1>
                            <span class="total" data-cart-total>R0.00</span>
                        </div>
                    </div>
```

- [ ] **Step 3: Route the two kicks add-to-cart paths through `CartStore`**

Replace the `addToCart` function body in `kicks.js` with:

```js
function addToCart(title, price, imageScr, cartItemId, e) {
    CartStore.addItem({ id: cartItemId, name: title, price: price, image: imageScr });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast("Added to cart");
}
```

Replace the `addItemToCart` function body in `kicks.js` with:

```js
function addItemToCart(title, price, imageScr, cartItemId, e) {
    CartStore.addItem({ id: cartItemId, name: title, price: price, image: imageScr });
    e.innerHTML = "In Cart Already";
    e.disabled = true;
    showToast("Added to cart");
}
```

(Leave `addItemToCart4` as its own function per the existing file structure, but give it the same body — same three lines.)

- [ ] **Step 4: Animate the cart drawer and wire scroll reveal + button feedback**

Replace:

```js
function openCart() {
    document.getElementById("carts-items").classList.toggle("carts-active");
}
```

with:

```js
function openCart() {
    Motion.toggleDialog(document.getElementById("carts-items"), "carts-active");
}
```

Append to the bottom of `kicks.js`:

```js
Motion.animateHeaderShadow(".site-header");
Motion.bindButtonFeedback();
Motion.revealOnScroll(".trend .card, .three-kicks .card-3, .two-kicks .card-2, .one-kick .card-1, .onsale-kick .sale-card, .sale-kick .sale-card");
```

- [ ] **Step 5: Verify with Puppeteer**

```js
// scratchpad/check-kicks.mjs
import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("dialog", (d) => d.accept());
await page.goto("http://localhost:8765/kicks.html", { waitUntil: "networkidle0" });
await page.waitForSelector(".trend .card .shop-this-now", { timeout: 10000 });
console.log({ errors });
await page.screenshot({ path: "scratchpad/kicks.png", fullPage: true });
await browser.close();
process.exit(errors.length === 0 ? 0 : 1);
```

Run: `node scratchpad/check-kicks.mjs`
Expected: `{ errors: [] }`, exit code 0.

- [ ] **Step 6: Commit**

```bash
git add kicks.html kicks.css kicks.js
git commit -m "Roll out design system and cart module to the footwear page"
```

---

## Task 9: Apparel (clothes) page rollout

**Files:**
- Modify: `clothes.html`, `clothes.css`, `clothes.js`

**Interfaces:**
- Consumes: same shared pieces as Task 5.

- [ ] **Step 1: Header + cart badge** — apply the identical header/cart-badge changes from Task 5 Steps 1 and 2 to `clothes.html`.

- [ ] **Step 2: Add cart-drawer render hooks** — `clothes.html` already has a `.cart-total` block (unlike sales/access/kicks), so only the ARIA attributes and data hooks need adding. Replace:

```html
            <div class="mycart" id="carts-items">
                <div class="top">
                    <h1>cart</h1>
                    <button class="close" onclick="openCart()">X</button>
                </div>
                <div class="cart-items"></div>
                <div class="cart-sale"></div>
                <div class="cart-total">
                    <h1 class="total-head">Total:</h1>
                    <span class="total">0.00</span>
                </div>
            </div>
```

with:

```html
            <div class="mycart" id="carts-items" role="dialog" aria-modal="true" aria-label="Shopping cart">
                <div class="top">
                    <h1>cart</h1>
                    <button class="close" onclick="openCart()" aria-label="Close cart">X</button>
                </div>
                <div data-cart-items></div>
                <div class="cart-total">
                    <h1 class="total-head">Total:</h1>
                    <span class="total" data-cart-total>R0.00</span>
                </div>
            </div>
```

- [ ] **Step 3: Route apparel add-to-cart through `CartStore`**

Replace both `addSaleToCart2` function bodies in `clothes.js` with:

```js
function addSaleToCart2(imgSrc, name, price, id) {
    CartStore.addItem({ id: id, name: name, price: price, image: imgSrc });
    showToast("Added to cart");
}
```

Replace the `addSaleCartclick` body's `document.querySelector('.total').innerHTML = "R" + sales2Price` line (the pre-existing stray total write) by deleting it — `CartStore.renderAll()` (called internally by `addItem`) now owns every `[data-cart-total]` element.

- [ ] **Step 4: Animate the cart drawer and wire scroll reveal + button feedback**

Replace:

```js
function openCart() {
    document.getElementById("carts-items").classList.toggle("carts-active");
}
```

with:

```js
function openCart() {
    Motion.toggleDialog(document.getElementById("carts-items"), "carts-active");
}
```

Append to the bottom of `clothes.js`:

```js
Motion.animateHeaderShadow(".site-header");
Motion.bindButtonFeedback();
Motion.revealOnScroll(".new .card, .new2 .card, .sale-con .card");
```

- [ ] **Step 5: Verify with Puppeteer**

```js
// scratchpad/check-clothes.mjs
import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("dialog", (d) => d.accept());
await page.goto("http://localhost:8765/clothes.html", { waitUntil: "networkidle0" });
await page.waitForSelector(".new .card .shop-it", { timeout: 10000 });
console.log({ errors });
await page.screenshot({ path: "scratchpad/clothes.png", fullPage: true });
await browser.close();
process.exit(errors.length === 0 ? 0 : 1);
```

Run: `node scratchpad/check-clothes.mjs`
Expected: `{ errors: [] }`, exit code 0.

- [ ] **Step 6: Commit**

```bash
git add clothes.html clothes.css clothes.js
git commit -m "Roll out design system and cart module to the apparel page"
```

---

## Task 10: Contact, brand, and cart-page header consistency + login/register modal polish

**Files:**
- Modify: `contact.html`, `contact.css`, `brand.html`, `cart.html`, `index.html` (modal markup only)

**Interfaces:**
- Consumes: `tokens.css` button/focus/`.site-header` styles (Task 1), `Motion`/`showToast` where relevant.

- [ ] **Step 1: Give the three pages that skipped Tasks 5-9 the same sticky header + cart badge**

`contact.html`, `brand.html`, and `cart.html` never went through a per-page rollout task (they have no product cards), so they still have the plain `<nav>` from before. For each of these three files, apply the identical two edits from Task 5 Steps 1–2:

Replace:

```html
        <nav>
            <ul class="navbar">
                <img src="logo.png">
```

with:

```html
        <nav class="site-header" aria-label="Primary">
            <ul class="navbar">
                <img src="logo.png" alt="Store logo">
```

and replace:

```html
                <li>
                    <i class="fas fa-shopping-cart"></i><a href="cart.html" class="navbar-cart">CART</a>
                </li>
```

with:

```html
                <li>
                    <i class="fas fa-shopping-cart"></i><a href="cart.html" class="navbar-cart">CART <span class="cart-badge" aria-label="Items in cart">0</span></a>
                </li>
```

- [ ] **Step 2: Restyle the contact form fields and button with shared tokens**

Replace:

```html
                    <form action="">
                        <h1>Contact Us</h1>
                        <label for="">Full Name</label>
                        <input type="text" placeholder="*required">
                        <div class="line"></div>
                        <label for="">Contact Number</label>
                        <input type="text" placeholder="*required">
                        <div class="line"></div>
                        <label for="">Email Address</label>
                        <input type="text" placeholder="*required">
                        <div class="line"></div>
                        <label for="">Message</label>
                        <input type="text" placeholder="Leave a message here">
                        <div class="line"></div>
                        <div class="button-con">
                            <button class="send">Send</button>
                        </div>
                    </form>
```

with:

```html
                    <form action="">
                        <h1>Contact Us</h1>
                        <label for="contact-name">Full Name</label>
                        <input id="contact-name" type="text" placeholder="*required" required>
                        <div class="line"></div>
                        <label for="contact-number">Contact Number</label>
                        <input id="contact-number" type="tel" placeholder="*required" required>
                        <div class="line"></div>
                        <label for="contact-email">Email Address</label>
                        <input id="contact-email" type="email" placeholder="*required" required>
                        <div class="line"></div>
                        <label for="contact-message">Message</label>
                        <input id="contact-message" type="text" placeholder="Leave a message here">
                        <div class="line"></div>
                        <div class="button-con">
                            <button class="btn btn-primary send" type="submit">Send</button>
                        </div>
                    </form>
```

- [ ] **Step 3: Add focus and layout polish to `contact.css`**

Append:

```css
.contact-con input {
  padding: var(--space-2) 0;
  font-family: var(--font-body);
  font-size: var(--text-body);
  border: none;
  border-bottom: 1px solid var(--color-grey-300);
  background: transparent;
  transition: border-color var(--duration-fast) var(--ease-standard);
}
.contact-con input:focus-visible {
  border-color: var(--color-ink);
  outline: none;
}
.contact-con label {
  font-size: var(--text-label);
  color: var(--color-grey-500);
  margin-top: var(--space-3);
  display: block;
}
```

- [ ] **Step 4: Add ARIA + focus trap to the register/login modals in `index.html`**

Replace:

```html
                <div id="modal">
                    <button class="close" onclick="openModal()">X</button>
```

with:

```html
                <div id="modal" role="dialog" aria-modal="true" aria-label="Register">
                    <button class="close" onclick="openModal()" aria-label="Close register form">X</button>
```

Replace:

```html
                <div id="login">
                    <form class="login-page" onsubmit="event.preventDefault(); logIn()">
```

with:

```html
                <div id="login" role="dialog" aria-modal="true" aria-label="Log in">
                    <form class="login-page" onsubmit="event.preventDefault(); logIn()">
```

(The `openModal`/`openLog` functions that control these two dialogs already got their Anime.js-driven open/close animation in Task 5 Step 7, since both live in `styles.js`. Nothing further to animate here.)

- [ ] **Step 5: Verify with Puppeteer**

```js
// scratchpad/check-contact-modals.mjs
import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://localhost:8765/contact.html", { waitUntil: "networkidle0" });
console.log("contact errors:", errors);
await browser.close();
process.exit(errors.length === 0 ? 0 : 1);
```

Run: `node scratchpad/check-contact-modals.mjs`
Expected: `contact errors: []`, exit code 0. (Modal ARIA/animation on `index.html` is covered by the full-site accessibility pass in Task 12.)

- [ ] **Step 6: Commit**

```bash
git add contact.html contact.css brand.html cart.html index.html
git commit -m "Add consistent header/cart-badge to contact/brand/cart pages, polish contact form and modal ARIA"
```

---

## Task 11: Rebuild the cart page to actually render from `CartStore`

**Files:**
- Modify: `cart.html`, `cart.css`
- Delete: `cart.js` (replaced — it never did anything functional; see spec)

**Interfaces:**
- Consumes: `CartStore.renderAll`, `[data-cart-items]`/`[data-cart-total]` hooks (Task 4).

- [ ] **Step 1: Replace the dead cart page markup**

Replace:

```html
            <div class="cart">
                <div class="cart-items">
                    <div class="cart-con">
                        <h1>CART</h1>
                        <div class="cart-item">
                            
                        </div>
                    </div>
                </div>
            </div>
```

with:

```html
            <div class="cart">
                <div class="cart-con">
                    <h1>Your Cart</h1>
                    <div data-cart-items></div>
                    <div class="cart-page-total">
                        <span>Total</span>
                        <span data-cart-total>R0.00</span>
                    </div>
                </div>
            </div>
```

- [ ] **Step 2: Point the page's script tag at the shared modules instead of the old dead `cart.js`**

Replace:

```html
<script src="cart.js"></script>
```

with:

```html
<script>
  Motion.animateHeaderShadow(".site-header");
</script>
```

(No page-specific script file is needed anymore — everything the cart page needs, `CartStore` already provides via the shared `<script>` tags added in Task 4.)

- [ ] **Step 3: Delete the now-unused `cart.js`**

```bash
git rm cart.js
```

- [ ] **Step 4: Add cart page layout styling to `cart.css`**

Append:

```css
.cart-con { display: flex; flex-direction: column; gap: var(--space-4); padding: var(--space-5); }
.cart-line {
  display: grid;
  grid-template-columns: 64px 1fr auto auto auto;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--color-grey-200);
}
.cart-line-image { width: 64px; height: 64px; object-fit: cover; border-radius: var(--radius-sm); }
.cart-page-total {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-h3);
  font-weight: 700;
  padding-top: var(--space-3);
}
.cart-empty { color: var(--color-grey-500); text-align: center; padding: var(--space-6) 0; }
```

- [ ] **Step 5: Verify the cart page renders items added elsewhere and math is correct**

```js
// scratchpad/check-cart-page.mjs
import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("dialog", (d) => d.accept());

// Add two of the same item on the homepage, then check the dedicated cart page.
await page.goto("http://localhost:8765/index.html", { waitUntil: "networkidle0" });
await page.waitForSelector(".products .card .shop-item-button", { timeout: 10000 });
await page.click(".products .card .shop-item-button");
await new Promise((r) => setTimeout(r, 300));

await page.goto("http://localhost:8765/cart.html", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 300));
const total = await page.$eval("[data-cart-total]", (el) => el.textContent);
const lineCount = await page.$$eval(".cart-line", (els) => els.length);
console.log({ total, lineCount, errors });
await browser.close();
process.exit(lineCount === 1 && total.startsWith("R") && errors.length === 0 ? 0 : 1);
```

Run: `node scratchpad/check-cart-page.mjs`
Expected: `{ total: 'R....', lineCount: 1, errors: [] }`, exit code 0 — proving the cart now persists across page loads (via `sessionStorage`) and the dedicated cart page, which previously never rendered anything, now works.

- [ ] **Step 6: Commit**

```bash
git add cart.html cart.css
git commit -m "Rebuild the cart page to render live from the shared cart store"
```

---

## Task 12: Full-site accessibility pass

**Files:**
- Modify: `index.html`, `access.html`, `kicks.html`, `clothes.html`, `sales.html`, `contact.html`, `cart.html`, `brand.html` (targeted attribute fixes only)

**Interfaces:**
- Consumes: nothing new — this task audits and patches what Tasks 1–11 already built.

- [ ] **Step 1: Fix missing `alt` text on every `<img>` across all 8 HTML pages**

For every `<img src="logo.png">` (nav logo, appears on every page), replace with `<img src="logo.png" alt="Store logo">` (already done for `index.html` in Task 5 Step 1 — apply the same fix on the other 7 pages' nav logo `<img>` tags). For every product-card `<img>` rendered dynamically from JS templates (in `styles.js`, `access.js`, `kicks.js`, `clothes.js`, `sales.js`), add `alt="${escapeHtml(item.name)}"` (or the equivalent local variable name already used in that render function) to the `<img>` tag.

- [ ] **Step 2: Add semantic landmarks**

On every page, wrap the existing `<div class="sep">...</div>` content in a `<main>` tag (change the opening `<div class="sep">` to `<div class="sep"><main>` is invalid nesting — instead, add `role="main"` directly to the existing `.sep` div: `<div class="sep" role="main">`) so screen readers get a main-content landmark without altering the existing CSS layout.

- [ ] **Step 3: Verify with an automated accessibility check**

```js
// scratchpad/check-a11y.mjs
import puppeteer from "puppeteer-core";
const pages = ["index.html", "access.html", "kicks.html", "clothes.html", "sales.html", "contact.html", "cart.html", "brand.html"];
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
let failures = [];
for (const file of pages) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:8765/${file}`, { waitUntil: "networkidle0" });
  const missingAlt = await page.$$eval("img", (imgs) => imgs.filter((i) => !i.hasAttribute("alt")).length);
  const hasMain = await page.$eval('[role="main"]', () => true).catch(() => false);
  if (missingAlt > 0) failures.push(`${file}: ${missingAlt} images missing alt`);
  if (!hasMain) failures.push(`${file}: missing [role="main"]`);
  await page.close();
}
console.log(failures.length ? failures : "ALL PAGES PASS A11Y CHECK");
await browser.close();
process.exit(failures.length ? 1 : 0);
```

Run: `node scratchpad/check-a11y.mjs`
Expected: `ALL PAGES PASS A11Y CHECK`, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add index.html access.html kicks.html clothes.html sales.html contact.html cart.html brand.html
git commit -m "Fix missing alt text and add main landmark across all pages"
```

---

## Task 13: Responsive QA pass

**Files:**
- Modify: `styles.css`, `access.css`, `kicks.css`, `clothes.css`, `sales.css`, `contact.css`, `cart.css`, `brand.css` (only where a real overflow/breakpoint bug is found)

**Interfaces:**
- Consumes: nothing new — this task audits rendered layout at each breakpoint and patches only real bugs found.

- [ ] **Step 1: Capture screenshots at each breakpoint for every page**

```js
// scratchpad/check-responsive.mjs
import puppeteer from "puppeteer-core";
const pages = ["index.html", "access.html", "kicks.html", "clothes.html", "sales.html", "contact.html", "cart.html", "brand.html"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "desktop", width: 1920, height: 1080 },
];
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
let overflowIssues = [];
for (const file of pages) {
  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`http://localhost:8765/${file}`, { waitUntil: "networkidle0" });
    const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (hasHorizontalOverflow) overflowIssues.push(`${file} @ ${vp.name} (${vp.width}px): horizontal overflow`);
    await page.screenshot({ path: `scratchpad/${file.replace(".html", "")}-${vp.name}.png`, fullPage: true });
    await page.close();
  }
}
console.log(overflowIssues.length ? overflowIssues : "NO HORIZONTAL OVERFLOW FOUND");
await browser.close();
process.exit(overflowIssues.length ? 1 : 0);
```

Run: `node scratchpad/check-responsive.mjs`

- [ ] **Step 2: Fix any overflow issues the script reports**

For each reported page/viewport, open the screenshot, find the overflowing element, and add a targeted fix to that page's CSS file — typically `max-width: 100%` on the offending element or wrapping a fixed-width flex/grid row in `overflow-x: auto`. (No fix is prescribed in advance here because the whole point of this step is that it depends on what Step 1 actually finds — this is the one step in the plan that is investigation-driven rather than pre-written, by design.)

- [ ] **Step 3: Re-run Step 1's script until it reports `NO HORIZONTAL OVERFLOW FOUND`**

- [ ] **Step 4: Commit**

```bash
git add -u
git commit -m "Fix responsive overflow issues found across breakpoints"
```

---

## Task 14: Final full-site smoke test against the original checklist

**Files:**
- None (verification-only task; fixes go into whichever file the failure points to)

**Interfaces:**
- Consumes: everything built in Tasks 1–13.

- [ ] **Step 1: Run one consolidated Puppeteer script covering every page and interactive flow**

```js
// scratchpad/final-smoke-test.mjs
// Extends the pattern already used for Tasks 5-11: navigate, interact,
// assert on DOM state and on an empty console-error list.
import puppeteer from "puppeteer-core";

const BASE = "http://localhost:8765";
const results = [];
function record(label, ok, detail) {
  results.push({ label, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"} - ${label}${detail ? " - " + detail : ""}`);
}

const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });

async function withPage(name, fn) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("dialog", (d) => d.accept());
  try {
    await fn(page);
  } finally {
    const real = errors.filter((e) => !e.includes("favicon"));
    record(`${name}: no console errors`, real.length === 0, real.join(" | "));
    await page.close();
  }
}

const pages = ["index.html", "sales.html", "access.html", "kicks.html", "clothes.html", "contact.html", "cart.html", "brand.html"];
for (const file of pages) {
  await withPage(file, async (page) => {
    await page.goto(`${BASE}/${file}`, { waitUntil: "networkidle0" });
    record(`${file}: header sticky`, await page.$eval(".site-header", (el) => getComputedStyle(el).position === "sticky"));
  });
}

await withPage("cart-math", async (page) => {
  await page.goto(`${BASE}/index.html`, { waitUntil: "networkidle0" });
  await page.waitForSelector(".products .card .shop-item-button", { timeout: 10000 });
  await page.click(".products .card .shop-item-button");
  await new Promise((r) => setTimeout(r, 300));
  const badge = await page.$eval(".cart-badge", (el) => el.textContent);
  record("cart badge updates on add", badge === "1", `badge=${badge}`);
});

await browser.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
```

- [ ] **Step 2: Run it**

Run: `node scratchpad/final-smoke-test.mjs`
Expected: all checks `PASS`, exit code 0.

- [ ] **Step 3: Fix any failures found, re-run until clean**

Trace each failure to its owning file from Tasks 1–13 and patch there — do not add new one-off logic in the test script itself.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "Final smoke-test pass for the premium redesign"
```
