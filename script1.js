const products = [
  {
    id: 1,
    name: "Apple Watch Ultra 2",
    price: 999,
    img: "img/watchapple.avif"
  },
  {
    id: 2,
    name: "iPhone 17 Pro Max",
    price: 1099,
    img: "img/iphone17promax.avif"
  },
  {
    id: 3,
    name: "Washing Machine",
    price: 499,
    img: "img/washingmachine.avif"
  },
  {
    id: 4,
    name: "Toaster",
    price: 79,
    img: "img/tost.avif"
  }
];


function getCart() {
  const cookies = document.cookie.split("; ").filter(Boolean);
  const cartCookie = cookies.find(c => c.startsWith("cart="));
  if (!cartCookie) return {};

  try {
    const value = decodeURIComponent(cartCookie.split("=")[1]);
    return JSON.parse(value) || {};
  } catch (e) {
    console.error("Error with cookie", e);
    return {};
  }
}

function saveCart(cart) {
  const value = encodeURIComponent(JSON.stringify(cart));
  const maxAge = 60 * 60 * 24 * 30;
  document.cookie = `cart=${value};path=/;max-age=${maxAge}`;
}

function addToCart(productId) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart(cart);
  updateHeaderSummary()
}

function clearCart() {
  document.cookie = "cart={};path=/;max-age=0";
}

function getCartSummary() {
  const cart = getCart();
  let totalPrice = 0;
  let totalCount = 0;

  for (const id in cart) {
    const qty = cart[id];
    const product = products.find(p => p.id === Number(id));
    if (!product) continue;
    totalCount += qty;
    totalPrice += product.price * qty;
  }

  return { totalPrice, totalCount };
}


function updateHeaderSummary() {
  const el = document.getElementById("cart-total-price");
  if (!el) return;
  const { totalPrice } = getCartSummary();
  el.textContent = totalPrice + " $";
}


function renderCatalog() {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="product-name">${p.name}</div>
      <div class="product-price">${p.price} $</div>
      <button class="buy-btn">Купити</button>
    `;

    card.querySelector(".buy-btn").addEventListener("click", () => {
      addToCart(p.id);
    });

    container.appendChild(card);
  });
}

function renderCartPage() {
  const listEl = document.getElementById("cart-items");
  const summaryEl = document.getElementById("cart-summary");
  if (!listEl || !summaryEl) return;

  const cart = getCart();
  listEl.innerHTML = "";

  const ids = Object.keys(cart);
  if (ids.length === 0) {
    listEl.innerHTML = "<p>Кошик порожній</p>";
    summaryEl.textContent = "";
    return;
  }

  ids.forEach(id => {
    const product = products.find(p => p.id === Number(id));
    if (!product) return;

    const qty = cart[id];
    const row = document.createElement("div");
    row.className = "cart-row";

    row.innerHTML = `
      <div class="cart-item-name">${product.name}</div>
      <div class="cart-item-price">${product.price} $</div>
      <div class="cart-item-qty">Кількість: ${qty}</div>
      <div class="cart-item-total">${product.price * qty} $</div>
    `;

    listEl.appendChild(row);
  });

  const { totalPrice } = getCartSummary();
  summaryEl.textContent = "Загальна вартість: " + totalPrice + " $";
}

document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  renderCartPage();
  updateHeaderSummary();
});
