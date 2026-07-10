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
          <img src="${escapeHtml(item.image)}" alt="" class="cart-line-image" />
          <div class="cart-line-info">
            <p class="cart-line-name">${escapeHtml(item.name)}</p>
            <p class="cart-line-price">R${item.price.toFixed(2)}</p>
          </div>
          <div class="cart-line-qty">
            <button type="button" class="btn btn-secondary qty-decrement" aria-label="Decrease quantity for ${escapeHtml(item.name)}">-</button>
            <span class="qty-value">${item.qty}</span>
            <button type="button" class="btn btn-secondary qty-increment" aria-label="Increase quantity for ${escapeHtml(item.name)}">+</button>
          </div>
          <p class="cart-line-subtotal">R${(item.price * item.qty).toFixed(2)}</p>
          <button type="button" class="btn btn-secondary cart-line-remove" aria-label="Remove ${escapeHtml(item.name)} from cart">Remove</button>
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
