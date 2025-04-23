document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const productCards = document.querySelectorAll("[data-category]");
  const searchInput = document.getElementById("searchInput");

  function showCard(card) {
    card.classList.add("show");
    card.classList.remove("fade");
    card.parentElement.style.display = "block";
  }

  function hideCard(card) {
    card.classList.remove("show");
    card.classList.add("fade");
    setTimeout(() => {
      card.parentElement.style.display = "none";
    }, 300); // match transition duration
  }

  function filterProducts() {
    const activeFilter = document.querySelector("[data-filter].active")?.getAttribute("data-filter") || "all";
    const searchText = searchInput.value.toLowerCase();

    productCards.forEach(card => {
      const category = card.getAttribute("data-category");
      const titleElement = card.querySelector(".card-title");
      const title = titleElement ? titleElement.textContent.toLowerCase() : "";

      const matchesCategory = activeFilter === "all" || category === activeFilter;
      const matchesSearch = title.includes(searchText);

      if (matchesCategory && matchesSearch) {
        showCard(card);
      } else {
        hideCard(card);
      }
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      filterButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
      filterProducts();
    });
  });
  searchInput.addEventListener("input", filterProducts);

  // Initialize all cards
  productCards.forEach(card => card.classList.add("show"));

  // 🛒 Cart Logic
  const openCartBtn = document.getElementById("openCart");
  const closeCartBtn = document.getElementById("closeCart");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  let cart = [];

  function updateCartUI() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p class="text-muted">Cart is empty.</p>`;
      cartTotal.textContent = "$0.00";
      cartCount.textContent = "0";
      return;
    }

    let total = 0;
    cart.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-2");
      itemDiv.innerHTML = `
        <div>
          <strong>${item.name}</strong><br>
          <small>$${item.price.toFixed(2)} x ${item.qty}</small>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-danger" data-remove="${item.name}">✕</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemDiv);
      total += item.price * item.qty;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = cart.reduce((acc, item) => acc + item.qty, 0);

    // Remove item from cart
    document.querySelectorAll("[data-remove]").forEach(btn => {
      btn.addEventListener("click", function () {
        const name = this.getAttribute("data-remove");
        cart = cart.filter(item => item.name !== name);
        updateCartUI();
      });
    });
  }

  // Add to cart buttons
  document.querySelectorAll(".btn-outline-success").forEach(button => {
    button.addEventListener("click", function () {
      const card = this.closest(".card");
      const name = card.querySelector(".card-title").textContent;
      const priceText = card.querySelector(".card-text").textContent.replace("$", "");
      const price = parseFloat(priceText);

      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      updateCartUI();
    });
  });

  // Toggle cart open/close
  openCartBtn.addEventListener("click", () => cartSidebar.classList.add("open"));
  closeCartBtn.addEventListener("click", () => cartSidebar.classList.remove("open"));

  // Initial update
  updateCartUI();
});
  // Debounce search input for better performance
  let debounceTimer;
  searchInput.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(filterProducts, 300);
  });

  // Initialize all cards as shown
  productCards.forEach(card => {
    card.classList.add("show");
    card.parentElement.style.display = "block";
  });
;
document.addEventListener("DOMContentLoaded", function () {
  // Cart Logic (same as before)
  const openCartBtn = document.getElementById("openCart");
  const closeCartBtn = document.getElementById("closeCart");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");
  const proceedToCheckoutBtn = document.getElementById("proceedToCheckout");

  let cart = [];

  function updateCartUI() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p class="text-muted">Cart is empty.</p>`;
      cartTotal.textContent = "$0.00";
      cartCount.textContent = "0";
      return;
    }

    let total = 0;
    cart.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-2");
      itemDiv.innerHTML = `
        <div>
          <strong>${item.name}</strong><br>
          <small>$${item.price.toFixed(2)} x ${item.qty}</small>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-danger" data-remove="${item.name}">✕</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemDiv);
      total += item.price * item.qty;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = cart.reduce((acc, item) => acc + item.qty, 0);

    // Remove item from cart
    document.querySelectorAll("[data-remove]").forEach(btn => {
      btn.addEventListener("click", function () {
        const name = this.getAttribute("data-remove");
        cart = cart.filter(item => item.name !== name);
        updateCartUI();
      });
    });
  }

  // Open and close cart
  openCartBtn.addEventListener("click", () => cartSidebar.classList.add("open"));
  closeCartBtn.addEventListener("click", () => cartSidebar.classList.remove("open"));

  // Proceed to checkout
  proceedToCheckoutBtn.addEventListener("click", () => {
    document.getElementById("checkoutModal").classList.add("open");
  });

  // Checkout form handling
  const checkoutForm = document.getElementById("checkoutForm");

  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const payment = document.getElementById("payment").value;

    alert(`Thank you for your purchase, ${name}! We will send the order to ${address}. Payment method: ${payment}`);

    // Clear the cart and close modal
    cart = [];
    updateCartUI();
    document.getElementById("checkoutModal").classList.remove("open");
  });

  // Add to cart functionality
  document.querySelectorAll(".btn-outline-success").forEach(button => {
    button.addEventListener("click", function () {
      const card = this.closest(".card");
      const name = card.querySelector(".card-title").textContent;
      const priceText = card.querySelector(".card-text").textContent.replace("$", "");
      const price = parseFloat(priceText);

      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      updateCartUI();
    });
  });

  // Initialize cart
  updateCartUI();
});
document.addEventListener("DOMContentLoaded", function () {
  const openCartBtn = document.getElementById("openCart");
  const closeCartBtn = document.getElementById("closeCart");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");
  const proceedToCheckoutBtn = document.getElementById("proceedToCheckout");
  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutForm = document.getElementById("checkoutForm");

  let cart = [];

  function updateCartUI() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p class="text-muted">Cart is empty.</p>`;
      cartTotal.textContent = "$0.00";
      cartCount.textContent = "0";
      return;
    }

    let total = 0;
    cart.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.innerHTML = `
        <div>
          <strong>${item.name}</strong><br>
          <small>$${item.price.toFixed(2)} x ${item.qty}</small>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-danger" data-remove="${item.name}">✕</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemDiv);
      total += item.price * item.qty;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = cart.reduce((acc, item) => acc + item.qty, 0);

    // Remove item from cart
    document.querySelectorAll("[data-remove]").forEach(btn => {
      btn.addEventListener("click", function () {
        const name = this.getAttribute("data-remove");
        cart = cart.filter(item => item.name !== name);
        updateCartUI();
      });
    });
  }

  // Open and close cart
  openCartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("open");
  });
  closeCartBtn.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
  });

  // Proceed to checkout
  proceedToCheckoutBtn.addEventListener("click", () => {
    checkoutModal.classList.add("open");
  });

  // Checkout form handling
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const payment = document.getElementById("payment").value;

    alert(`Thank you for your purchase, ${name}! We will send the order to ${address}. Payment method: ${payment}`);

    // Clear the cart and close modal
    cart = [];
    updateCartUI();
    checkoutModal.classList.remove("open");
  });

  // Add to cart functionality
  document.querySelectorAll(".btn-outline-success").forEach(button => {
    button.addEventListener("click", function () {
      const card = this.closest(".card");
      const name = card.querySelector(".card-title").textContent;
      const priceText = card.querySelector(".card-text").textContent.replace("$", "");
      const price = parseFloat(priceText);

      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      updateCartUI();
    });
  });

  // Initialize cart
  updateCartUI();
});


