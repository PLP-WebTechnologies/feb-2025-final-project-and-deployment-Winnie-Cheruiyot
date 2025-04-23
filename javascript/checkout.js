document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cartItems");
    const checkoutForm = document.getElementById("checkoutForm");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Display cart items in checkout
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `<p>${item.name} - $${item.price} x ${item.qty}</p>`;
        cartItemsContainer.appendChild(itemDiv);
      });
    }
  
    // Handle checkout form submission
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = document.getElementById("name").value;
      const address = document.getElementById("address").value;
      const paymentMethod = document.getElementById("payment").value;
  
      alert(`Thank you for your order, ${name}! Your items will be shipped to ${address}. Payment method: ${paymentMethod}`);
  
      // Clear cart after purchase
      localStorage.removeItem("cart");
      window.location.href = "thank-you.html";  // Redirect to a thank you page
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const checkoutForm = document.getElementById("checkoutForm");
    const loadingSpinner = document.getElementById("loadingSpinner");
  
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Show the loading spinner
      loadingSpinner.style.display = "flex";
  
      // Simulate a delay for processing (e.g., a payment gateway)
      setTimeout(function () {
        loadingSpinner.style.display = "none";  // Hide the spinner after processing
        alert("Thank you for your order!");
        window.location.href = "confirmation.html";  // Redirect to confirmation page
      }, 3000);  // Simulate a 3-second delay
    });
  });
  
