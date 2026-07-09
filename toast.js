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
