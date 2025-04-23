document.addEventListener("DOMContentLoaded", function() {
    // Get the product ID from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // Get the value of 'id' parameter
  
    // Sample data (you can replace this with actual data or fetch from a database)
   // javascript/product-template.js
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const product = products[productId];

  if (product) {
    const productDetails = document.getElementById("product-details");
    productDetails.innerHTML = `
      <div class="product-detail">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <h2>${product.name}</h2>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <p class="product-description">${product.description}</p>
          <a href="#" class="btn btn-add-to-cart">Add to Cart</a>
        </div>
      </div>
    `;

    document.querySelector(".btn-add-to-cart").addEventListener("click", function (e) {
      e.preventDefault();

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product.id); // just store product ID
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${product.name} has been added to your cart.`);
    });
  } else {
    document.getElementById("product-details").innerHTML = "<p>Sorry, this product is not available.</p>";
  }
});

  
    // Get the product details based on the productId
    const product = products[productId];
  
    // If the product exists, populate the page with the product details
    if (product) {
      const productDetails = document.getElementById('product-details');
      productDetails.innerHTML = `
        <div class="product-detail">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <div class="product-info">
            <h2>${product.name}</h2>
            <p class="product-price">${product.price}</p>
            <p class="product-description">${product.description}</p>
            <a href="#" class="btn">Add to Cart</a>
          </div>
        </div>
      `;
    } else {
      // If no product is found, show an error message
      const productDetails = document.getElementById('product-details');
      productDetails.innerHTML = '<p>Sorry, this product is not available.</p>';
    }
  });
  
