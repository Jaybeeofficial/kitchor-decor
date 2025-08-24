// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
});



 AOS.init({
      duration: 1000,
      once: true
    });


// Project Filter (using data-category)
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active state from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');

      if (filter === "all" || category === filter) {
        card.style.display = "block";
        card.style.opacity = "1";
      } else {
        card.style.display = "none";
        card.style.opacity = "0";
      }
    });
  });
});


// ====== CART FUNCTIONALITY ======
// ====== CART FUNCTIONALITY ======

// Selectors
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count");
const cartOffcanvas = document.getElementById("cart-offcanvas");
const closeCartBtn = document.getElementById("close-cart");
const cartBody = document.getElementById("cart-body");
const cartFooter = document.getElementById("cart-footer");

// State
let cart = [];

// ====== Open & Close Cart ======
function openCart() {
  cartOffcanvas.classList.add("active");
}
function closeCart() {
  cartOffcanvas.classList.remove("active");
}

if (cartIcon) cartIcon.addEventListener("click", openCart);
if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeCart();
});

// ====== Add to Cart ======
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");
    if (!card) return;

    const name = card.getAttribute("data-name");
    const price = parseFloat(card.getAttribute("data-price"));

    // Check if product already in cart
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    renderCart();
  });
});

// ====== Render Cart ======
function renderCart() {
  cartBody.innerHTML = "";

  if (cart.length === 0) {
    cartBody.innerHTML = `<p class="empty-msg">Your cart is empty.</p>`;
  } else {
    cart.forEach((item, idx) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)} × ${item.qty} = <strong>$${(item.price * item.qty).toFixed(2)}</strong></p>
        </div>
        <div class="controls">
          <button class="dec">-</button>
          <span>${item.qty}</span>
          <button class="inc">+</button>
          <button class="remove">&times;</button>
        </div>
      `;

      // Increase
      row.querySelector(".inc").addEventListener("click", () => {
        item.qty++;
        renderCart();
      });

      // Decrease
      row.querySelector(".dec").addEventListener("click", () => {
        item.qty--;
        if (item.qty <= 0) cart.splice(idx, 1);
        renderCart();
      });

      // Remove
      row.querySelector(".remove").addEventListener("click", () => {
        cart.splice(idx, 1);
        renderCart();
      });

      cartBody.appendChild(row);
    });
  }

  // Total
  const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

  // Footer section (total + checkout)
  if (cartFooter) {
    if (cart.length === 0) {
      cartFooter.innerHTML = "";
    } else {
      cartFooter.innerHTML = `
        <div class="cart-total">
          <strong>Total:</strong> <span>$${total.toFixed(2)}</span>
        </div>
        <button class="btn checkout-btn">Checkout</button>
      `;
    }
  }

  // Count badge
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  if (cartCount) {
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? "inline-block" : "none";
  }
}

// ====== Initialize ======
renderCart();






document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusMsg = document.getElementById("form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      statusMsg.textContent = "Please fill out all fields.";
      statusMsg.style.color = "red";
      return;
    }

    // Simple email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      statusMsg.textContent = "Enter a valid email address.";
      statusMsg.style.color = "red";
      return;
    }

    // Success
    statusMsg.textContent = "Thank you! Your message has been sent.";
    statusMsg.style.color = "green";

    // Reset form
    form.reset();
  });
});



// Appointment form handling
const appointmentForm = document.getElementById("appointment-form");
const successMsg = document.getElementById("success-message");

if (appointmentForm) {
  appointmentForm.addEventListener("submit", function(e){
    e.preventDefault();
    successMsg.style.display = "block";

    // Auto redirect to home after 3s
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);
  });
}


// Initialize ScrollReveal
  ScrollReveal({
    reset: false, // animations only happen once
    distance: "150px",
    duration: 2500,
    delay: 500
  });

  // Apply reveals
  ScrollReveal().reveal('.hero, .shop-intro, .blog-hero, .contact-hero, .appointment-hero', { origin: 'top' });
  ScrollReveal().reveal('.shop-grid .product-card, .blog-post, .contact-form, .contact-info, .map, .appointment-form', { origin: 'bottom', interval: 200 });
