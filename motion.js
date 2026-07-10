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

  // --- Dialog focus management -------------------------------------------
  // aria-modal="true" implies Escape-to-close and a Tab focus trap. Every
  // dialog on the site (register modal, login modal, cart drawer) opens
  // and closes exclusively through toggleDialog(), so the trap lives here
  // once instead of being duplicated per page/dialog.
  //
  // Dialogs can legitimately stack (the login modal is opened via a link
  // that lives *inside* the register modal, so the register modal is still
  // "active" underneath it). openDialogStack tracks that nesting so Escape
  // and Tab only ever affect the topmost dialog — closing it reveals the
  // one beneath with its own focus/trap still intact.
  const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const openDialogStack = [];
  let globalKeydownBound = false;

  function getFocusableElements(el) {
    const all = Array.from(el.querySelectorAll(FOCUSABLE_SELECTOR));
    const visible = all.filter((node) => node.offsetParent !== null);
    return visible.length ? visible : all;
  }

  // Prefer the dialog's own close/X button (the pattern used by every
  // dialog that has one); fall back to the first focusable element for
  // dialogs like #login that have no explicit close control.
  function getInitialFocusTarget(el, focusables) {
    const closeBtn = el.querySelector(".close");
    if (closeBtn && focusables.includes(closeBtn)) return closeBtn;
    return focusables[0] || null;
  }

  function ensureGlobalKeydownListener() {
    if (globalKeydownBound) return;
    globalKeydownBound = true;
    document.addEventListener(
      "keydown",
      (event) => {
        if (!openDialogStack.length) return;
        const top = openDialogStack[openDialogStack.length - 1];

        if (event.key === "Escape") {
          event.preventDefault();
          top.close();
          return;
        }

        if (event.key !== "Tab") return;
        const focusables = getFocusableElements(top.el);
        if (!focusables.length) {
          event.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (event.shiftKey) {
          if (active === first || !top.el.contains(active)) {
            event.preventDefault();
            last.focus();
          }
        } else if (active === last || !top.el.contains(active)) {
          event.preventDefault();
          first.focus();
        }
      },
      true
    );
  }

  // Every dialog root (#modal, #login, #carts-items) is now a full-viewport
  // flex backdrop wrapping a nested card/panel (see tokens.css's "Dialogs"
  // section), so a click that lands on the root itself (not one of its
  // descendants) is necessarily a click on the dim backdrop area — close on
  // it, same as Escape. Bound once per element, not once per open.
  const backdropBound = new WeakSet();
  function bindBackdropClose(el, close) {
    if (backdropBound.has(el)) return;
    backdropBound.add(el);
    el.addEventListener("click", (event) => {
      if (event.target === el) close();
    });
  }

  function openDialogFocusTrap(el, close) {
    ensureGlobalKeydownListener();
    bindBackdropClose(el, close);
    const previouslyFocused = document.activeElement;
    openDialogStack.push({ el, close, previouslyFocused });

    const focusables = getFocusableElements(el);
    const target = getInitialFocusTarget(el, focusables);
    if (target) target.focus();
  }

  function closeDialogFocusTrap(el) {
    const index = openDialogStack.findIndex((entry) => entry.el === el);
    if (index === -1) return;
    const [entry] = openDialogStack.splice(index, 1);
    if (entry.previouslyFocused && typeof entry.previouslyFocused.focus === "function") {
      entry.previouslyFocused.focus();
    }
  }

  // Anime.js-driven open/close for modals and the cart drawer. `activeClass`
  // is whatever class the existing onclick handler already toggles (e.g.
  // "modal-active", "login-active", "carts-active") — this wraps that
  // existing toggle with a fade/scale instead of an instant show/hide.
  //
  // Closing removes `activeClass` only after the fade-out animation
  // finishes (via anime's `complete` callback) rather than synchronously up
  // front. `activeClass` is what makes the dialog `display: flex` (its base
  // rule is `display: none`), so removing it immediately — as this used to
  // do — hid the element before a single animated frame could paint,
  // silently skipping the close animation entirely every time.
  function toggleDialog(el, activeClass) {
    if (!el) return;
    const opening = !el.classList.contains(activeClass);

    if (opening) {
      el.classList.add(activeClass);
      openDialogFocusTrap(el, () => toggleDialog(el, activeClass));
      if (prefersReducedMotion() || !window.anime) return;
      anime({ targets: el, opacity: [0, 1], scale: [0.96, 1], duration: 220, easing: "easeOutCubic" });
      return;
    }

    closeDialogFocusTrap(el);
    if (prefersReducedMotion() || !window.anime) {
      el.classList.remove(activeClass);
      return;
    }
    anime({
      targets: el,
      opacity: [1, 0],
      scale: [1, 0.96],
      duration: 160,
      easing: "easeInCubic",
      complete: () => el.classList.remove(activeClass),
    });
  }

  // --- Collapsible icon-rail sidebar --------------------------------------
  // Pinned state is persisted in localStorage and re-applied synchronously
  // by a tiny inline script at the top of <body> on every page (before this
  // file even loads) so there's no flash of the wrong state. This module
  // owns the *interactive* half: the toggle button's click handler and
  // syncing its aria-expanded/label, marking the current page's nav link,
  // and collapsing the pinned rail on outside-click for small screens
  // (where a permanently-docked 240px rail would crowd out the page).
  const SIDEBAR_STORAGE_KEY = "sidebarPinned";
  const MOBILE_BREAKPOINT = 640;

  function isSidebarPinned() {
    return document.documentElement.classList.contains("sidebar-pinned");
  }

  function syncSidebarToggleButtons() {
    const pinned = isSidebarPinned();
    document.querySelectorAll(".sidebar-toggle").forEach((btn) => {
      btn.setAttribute("aria-expanded", String(pinned));
      btn.setAttribute("aria-label", pinned ? "Collapse navigation" : "Expand navigation");
    });
  }

  function setSidebarPinned(pinned) {
    document.documentElement.classList.toggle("sidebar-pinned", pinned);
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(pinned));
    } catch (e) {
      /* localStorage unavailable (private mode, etc.) — state just won't persist */
    }
    syncSidebarToggleButtons();
  }

  // Called from the toggle button's onclick attribute, matching the same
  // onclick-driven pattern used by openCart()/openModal()/openLog() elsewhere.
  //
  // `event` is passed so that, when the user un-pins, we can blur the toggle
  // button itself. Without this the button (which lives inside .site-header)
  // keeps :focus-within true after the click that un-pinned it, so the CSS
  // hover/focus "peek" rule keeps the rail visually expanded — collapsing
  // only once focus/hover moves elsewhere. That reads as "the collapse
  // button doesn't work." Blurring on un-pin makes the collapse immediate,
  // matching the explicit, deliberate nature of the pin toggle (as opposed
  // to the incidental hover/tab-through peek, which is left untouched).
  function toggleSidebarPin(event) {
    const pinned = !isSidebarPinned();
    setSidebarPinned(pinned);
    if (!pinned && event && event.currentTarget && typeof event.currentTarget.blur === "function") {
      event.currentTarget.blur();
    }
  }

  function markActiveNavLink() {
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navbar li a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (href === current) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  // On phones, a pinned/docked rail reflows `.sep` down to a sliver, so
  // pinning there is treated as a transient overlay: tapping anywhere
  // outside the rail (or its toggle) closes it again.
  function bindSidebarOutsideClose() {
    document.addEventListener("click", (event) => {
      if (window.innerWidth > MOBILE_BREAKPOINT) return;
      if (!isSidebarPinned()) return;
      const header = document.querySelector(".site-header");
      if (!header) return;
      if (header.contains(event.target)) return;
      setSidebarPinned(false);
    });
  }

  function initSidebar() {
    syncSidebarToggleButtons();
    markActiveNavLink();
    bindSidebarOutsideClose();
  }

  if (typeof document !== "undefined" && document.addEventListener) {
    document.addEventListener("DOMContentLoaded", initSidebar);
  }

  return {
    prefersReducedMotion,
    bindButtonFeedback,
    revealOnScroll,
    animateHeaderShadow,
    toggleDialog,
    toggleSidebarPin,
    initSidebar,
  };
})();
