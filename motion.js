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
