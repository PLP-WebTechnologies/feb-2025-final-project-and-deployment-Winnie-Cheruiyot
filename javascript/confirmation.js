document.addEventListener("DOMContentLoaded", function () {
    const orderDetailsContainer = document.getElementById("orderDetails");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (cart.length === 0) {
      orderDetailsContainer.innerHTML = "<p>No items in your order.</p>";
    } else {
      cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `<p>${item.name} - $${item.price} x ${item.qty} = $${(item.price * item.qty).toFixed(2)}</p>`;
        orderDetailsContainer.appendChild(itemDiv);
      });
  
      const totalAmount = cart.reduce((total, item) => total + (item.price * item.qty), 0);
      const totalDiv = document.createElement("div");
      totalDiv.innerHTML = `<p><strong>Total Amount: $${totalAmount.toFixed(2)}</strong></p>`;
      orderDetailsContainer.appendChild(totalDiv);
    }
  
    // Optionally, clear the cart after displaying the order details (or keep it for review)
    localStorage.removeItem("cart");
  });
  
