// app.js – Handles product rendering, cart logic, and dark mode toggle

// Utility: load product data from JSON
async function loadProducts() {
  const response = await fetch('products.json');
  const data = await response.json();
  return data.products;
}

// Render product cards into the grid
function renderProducts(products) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" />
      <div class="product-info">
        <h3 class="product-title">${p.title}</h3>
        <p class="product-price">$${p.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${p.id}">Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Cart handling – stored in localStorage as array of product IDs
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  const cart = getCart();
  countEl.textContent = cart.length;
}

function addToCart(productId) {
  const cart = getCart();
  cart.push(productId);
  setCart(cart);
}

// Dark mode toggle – persisted in localStorage
function initDarkMode() {
  const toggle = document.getElementById('dark-mode-toggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') html.classList.add('dark');

  toggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Initialize everything
async function init() {
  const products = await loadProducts();
  renderProducts(products);
  updateCartCount();
  initDarkMode();

  // Delegate add‑to‑cart clicks
  document.getElementById('product-grid').addEventListener('click', e => {
    if (e.target.matches('.add-to-cart')) {
      const id = parseInt(e.target.dataset.id, 10);
      addToCart(id);
    }
  });
}

init();
