// javascript/product-detail.js
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const product = products.find(p => p.id === productId);
  
    if (product) {
      document.getElementById("product-title").textContent = product.title;
      document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;
      document.getElementById("product-description").textContent = product.description;
      document.getElementById("product-image").src = product.image;
      document.getElementById("product-image").alt = product.title;
    } else {
      document.body.innerHTML = `<div class="container py-5 text-center"><h2>Product not found</h2></div>`;
    }
  });
  
