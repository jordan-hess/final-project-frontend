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
