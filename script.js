const products = [
    {
        id: 1,
        name: "Air Max 90",
        brand: "Nike",
        price: 120,
        description: "Classic Nike Air Max with iconic cushioning for all-day comfort.",
        sizes: ["8", "9", "10", "11"],
        colors: ["Black", "White"],
        images: ["images/sneaker1.jpg", "images/sneaker1-2.jpg", "images/sneaker1-3.jpg"],
    },
    {
        id: 2,
        name: "Ultraboost",
        brand: "Adidas",
        price: 150,
        description: "High-performance running shoe with responsive Boost technology.",
        sizes: ["8", "9", "10", "11"],
        colors: ["Black", "Red"],
        images: ["images/sneaker2.jpg", "images/sneaker2-2.jpg", "images/sneaker2-3.jpg"],
    },
    {
        id: 3,
        name: "Classic Runner",
        brand: "Puma",
        price: 90,
        description: "Lightweight and stylish sneaker for casual wear.",
        sizes: ["8", "9", "10"],
        colors: ["White", "Red"],
        images: [
            "images/sneaker3.jpg",
            "images/sneaker3-1.jpg",
            "images/sneaker3-2.jpg"
        ],
    },
];
// Cart and wishlist arrays
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Initialize pages
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    if (document.getElementById("featured-products")) {
        displayFeaturedProducts();
    }
    if (document.getElementById("shop-products")) {
        displayShopProducts();
        setupFilters();
    }
    if (document.getElementById("product-name")) {
        displayProductDetails();
    }
    if (document.getElementById("cart-items")) {
        displayCart();
    }
    if (document.getElementById("checkout-form")) {
        setupCheckout();
    }
    if (document.getElementById("receipt-items")) {
        displayReceipt();
    }
    if (document.getElementById("contact-form")) {
        setupContactForm();
    }
    setupBackToTop();
    lazyLoadImages(); // Ensure lazy loading for about/contact images
});

// Display featured products on homepage
function displayFeaturedProducts() {
    const container = document.getElementById("featured-products");
    products.slice(0, 4).forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img data-src="${product.images[0]}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.brand}</p>
            <p>$${product.price}</p>
            <a href="product-details.html?id=${product.id}" class="cta-button">View Details</a>
        `;
        container.appendChild(card);
    });
    lazyLoadImages();
}

// Display all products on shop page
function displayShopProducts(filteredProducts = products) {
    const container = document.getElementById("shop-products");
    container.innerHTML = "";
    filteredProducts.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img data-src="${product.images[0]}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.brand}</p>
            <p>$${product.price}</p>
            <a href="product-details.html?id=${product.id}" class="cta-button">View Details</a>
        `;
        container.appendChild(card);
    });
    lazyLoadImages();
}

// Setup search and filter functionality
function setupFilters() {
    const searchBar = document.getElementById("search-bar");
    const brandFilter = document.getElementById("filter-brand");
    const sizeFilter = document.getElementById("filter-size");
    const colorFilter = document.getElementById("filter-color");

    const applyFilters = () => {
        let filtered = products;
        const search = searchBar.value.toLowerCase();
        if (search) {
            filtered = filtered.filter(
                (p) =>
                    p.name.toLowerCase().includes(search) ||
                    p.brand.toLowerCase().includes(search)
            );
        }
        if (brandFilter.value) {
            filtered = filtered.filter((p) => p.brand === brandFilter.value);
        }
        if (sizeFilter.value) {
            filtered = filtered.filter((p) => p.sizes.includes(sizeFilter.value));
        }
        if (colorFilter.value) {
            filtered = filtered.filter((p) => p.colors.includes(colorFilter.value));
        }
        displayShopProducts(filtered);
    };

    searchBar.addEventListener("input", applyFilters);
    brandFilter.addEventListener("change", applyFilters);
    sizeFilter.addEventListener("change", applyFilters);
    colorFilter.addEventListener("change", applyFilters);
}

// Display product details
function displayProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));
    const product = products.find((p) => p.id === productId);

    if (!product) return;

    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-brand").textContent = product.brand;
    document.getElementById("product-price").textContent = `$${product.price}`;
    document.getElementById("product-description").textContent = product.description;

    const mainImage = document.getElementById("main-image");
    mainImage.setAttribute("data-src", product.images[0]);
    mainImage.classList.add("loaded"); // Main image loads immediately

    const thumbs = document.querySelectorAll(".slider-thumbs img");
    thumbs.forEach((thumb, index) => {
        thumb.setAttribute("data-src", product.images[index] || product.images[0]);
        thumb.addEventListener("click", () => {
            mainImage.src = thumb.src;
            thumbs.forEach((t) => t.classList.remove("active"));
            thumb.classList.add("active");
        });
    });
    lazyLoadImages();
}

// Add to cart
function addToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));
    const product = products.find((p) => p.id === productId);
    const size = document.getElementById("product-size").value;

    const cartItem = cart.find((item) => item.id === productId && item.size === size);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, size, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showModal("Added to cart!");
}

// Add to wishlist
function addToWishlist() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        showModal("Added to wishlist!");
    }
}

// Display cart
function displayCart() {
    const container = document.getElementById("cart-items");
    container.innerHTML = "";
    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img data-src="${item.images[0]}" alt="${item.name}" style="width: 100px;">
            <div>
                <h4>${item.name}</h4>
                <p>Size: ${item.size}</p>
                <p>$${item.price}</p>
            </div>
            <div>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        container.appendChild(div);
    });
    updateCartSummary();
    lazyLoadImages();
}

// Update cart quantity
function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = cart.length >= 3 ? subtotal * 0.1 : 0;
    const total = subtotal - discount;

    document.getElementById("cart-subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("cart-discount").textContent = discount.toFixed(2);
    document.getElementById("cart-total").textContent = total.toFixed(2);
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll("#cart-count").forEach((el) => (el.textContent = count));
}

// Setup checkout
function setupCheckout() {
    const form = document.getElementById("checkout-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const transactionId = Math.random().toString(36).substr(2, 9);
        const order = {
            items: cart,
            date: new Date().toLocaleString(),
            transactionId,
            subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
            discount: cart.length >= 3 ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.1 : 0,
        };
        localStorage.setItem("lastOrder", JSON.stringify(order));
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        window.location.href = "receipt.html";
    });
}

// Display receipt
function displayReceipt() {
    const order = JSON.parse(localStorage.getItem("lastOrder"));
    if (!order) return;

    document.getElementById("transaction-id").textContent = order.transactionId;
    document.getElementById("order-date").textContent = order.date;

    const container = document.getElementById("receipt-items");
    order.items.forEach((item) => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img data-src="${item.images[0]}" alt="${item.name}" style="width: 100px;">
            <div>
                <h4>${item.name}</h4>
                <p>Size: ${item.size}</p>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
        `;
        container.appendChild(div);
    });

    document.getElementById("receipt-subtotal").textContent = order.subtotal.toFixed(2);
    document.getElementById("receipt-discount").textContent = order.discount.toFixed(2);
    document.getElementById("receipt-total").textContent = (order.subtotal - order.discount).toFixed(2);
    lazyLoadImages();
}

// Print receipt
function printReceipt() {
    window.print();
}

// Download receipt
function downloadReceipt() {
    const order = JSON.parse(localStorage.getItem("lastOrder"));
    let content = `SneakerHub Receipt\n\nTransaction ID: ${order.transactionId}\nDate: ${order.date}\n\nItems:\n`;
    order.items.forEach((item) => {
        content += `${item.name} (Size: ${item.size}) - $${item.price} x ${item.quantity}\n`;
    });
    content += `\nSubtotal: $${order.subtotal.toFixed(2)}\nDiscount: $${order.discount.toFixed(2)}\nTotal: $${(order.subtotal - order.discount).toFixed(2)}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "receipt.txt";
    a.click();
    URL.revokeObjectURL(url);
}

// Modal for notifications
function showModal(message) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = "flex";
}

// Back to top button
function setupBackToTop() {
    const button = document.querySelector(".back-to-top");
    window.addEventListener("scroll", () => {
        button.classList.toggle("show", window.scrollY > 300);
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add("loaded");
                img.removeAttribute("data-src");
                observer.unobserve(img);
            }
        });
    });
    images.forEach((img) => {
        // Fallback: Load if already in viewport
        if (img.getBoundingClientRect().top < window.innerHeight) {
            img.src = img.dataset.src;
            img.classList.add("loaded");
            img.removeAttribute("data-src");
        } else {
            observer.observe(img);
        }
    });
}
// Initialize contact form
if (document.getElementById("contact-form")) {
    setupContactForm();
}

// Setup contact form with character counter
function setupContactForm() {
    const form = document.getElementById("contact-form");
    const message = document.getElementById("message");
    const charCount = document.getElementById("char-count");

    // Update character count
    message.addEventListener("input", () => {
        charCount.textContent = message.value.length;
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const messageText = document.getElementById("message").value;

        // Simulate form submission
        showModal(`Thank you, ${name}! Your message has been received.`);
        form.reset();
        charCount.textContent = "0";
    });
}