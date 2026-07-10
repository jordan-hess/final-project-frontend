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

  function openDialogFocusTrap(el, close) {
    ensureGlobalKeydownListener();
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
  function toggleDialog(el, activeClass) {
    if (!el) return;
    const opening = !el.classList.contains(activeClass);
    el.classList.toggle(activeClass, opening);
    if (opening) {
      openDialogFocusTrap(el, () => toggleDialog(el, activeClass));
    } else {
      closeDialogFocusTrap(el);
    }
    if (prefersReducedMotion() || !window.anime) return;
    if (opening) {
      anime({ targets: el, opacity: [0, 1], scale: [0.96, 1], duration: 220, easing: "easeOutCubic" });
    } else {
      anime({ targets: el, opacity: [1, 0], scale: [1, 0.96], duration: 160, easing: "easeInCubic" });
    }
  }

  return { prefersReducedMotion, bindButtonFeedback, revealOnScroll, animateHeaderShadow, toggleDialog };
})();
