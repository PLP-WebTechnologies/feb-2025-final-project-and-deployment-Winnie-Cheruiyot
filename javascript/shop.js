// javascript/shop.js
document.addEventListener("DOMContentLoaded", function () {
    const shopContainer = document.getElementById("shop-products");
  
    for (let id in products) {
      const p = products[id];
      shopContainer.innerHTML += `
        <div class="product-card">
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>$${p.price.toFixed(2)}</p>
          <a href="product.html?id=${p.id}" class="btn">View Details</a>
        </div>
      `;
    }
  });
  
