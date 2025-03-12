const productContainer = document.getElementById('productContainer');
const cartTable = document.getElementById('cartTable').querySelector('tbody');

function getProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function renderProducts() {
  const products = getProducts();
  productContainer.innerHTML = ''; 

  products.forEach((product, index) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${index})">Add to Cart</button>
      </div>
    `;
    productContainer.appendChild(productCard);
  });
}

function renderCart() {
  const cart = getCart();
  cartTable.innerHTML = ''; 

  cart.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td><img src="${product.image}" alt="${product.name}" width="50"></td>
      <td><button onclick="removeFromCart(${index})">Remove</button></td>
    `;
    cartTable.appendChild(row);
  });
}

function addToCart(index) {
  const products = getProducts();
  const cart = getCart();
  cart.push(products[index]);
  saveCart(cart);
  renderCart();
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

renderProducts();
renderCart();