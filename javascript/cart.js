// javascript/cart.js
document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalDisplay = document.getElementById("cart-total");
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotalDisplay.innerHTML = "";
      return;
    }
  
    const productCounts = {};
    cart.forEach(id => {
      productCounts[id] = (productCounts[id] || 0) + 1;
    });
  
    let total = 0;
    cartItemsContainer.innerHTML = "";
  
    Object.entries(productCounts).forEach(([id, quantity]) => {
      const product = products[id];
      if (product) {
        const itemTotal = product.price * quantity;
        total += itemTotal;
  
        const itemHTML = `
          <div class="cart-item">
            <img src="${product.image}" alt="${product.name}" class="cart-item-image">
            <div class="cart-item-info">
              <h4>${product.name}</h4>
              <p>$${product.price.toFixed(2)} x ${quantity} = $${itemTotal.toFixed(2)}</p>
              <div class="qty-controls">
                <button class="decrease" data-id="${id}">−</button>
                <button class="increase" data-id="${id}">+</button>
                <button class="remove-item-btn" data-id="${id}">Remove</button>
              </div>
            </div>
          </div>
        `;
        cartItemsContainer.innerHTML += itemHTML;
      }
    });
  
    cartTotalDisplay.innerHTML = `
      <strong>Total: $${total.toFixed(2)}</strong>
      <div class="cart-actions">
        <button id="clear-cart">Clear Cart</button>
        <button id="checkout">Checkout</button>
      </div>
    `;
  
    // 🔄 Quantity controls
    document.querySelectorAll(".increase").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        cart.push(id);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });
    });
  
    document.querySelectorAll(".decrease").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const index = cart.indexOf(id);
        if (index !== -1) {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          location.reload();
        }
      });
    });
  
    // ❌ Remove all of a single item
    document.querySelectorAll(".remove-item-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        cart = cart.filter(item => item !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });
    });
  
    // 🧹 Clear entire cart
    document.getElementById("clear-cart").addEventListener("click", () => {
      localStorage.removeItem("cart");
      location.reload();
    });
  
    // ✅ Fake checkout
    document.getElementById("checkout").addEventListener("click", () => {
      alert("Thanks for your purchase! (This is a demo.)");
      localStorage.removeItem("cart");
      location.reload();
    });
  });
  
