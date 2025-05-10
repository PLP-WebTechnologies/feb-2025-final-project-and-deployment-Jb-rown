# SneakerHub E-Commerce Website

## Overview
SneakerHub is a modern, responsive e-commerce website built for sneaker enthusiasts. It offers a seamless shopping experience with features like product browsing, cart management, and a contact form. The site showcases a curated collection of sneakers, enhanced with visually appealing background images, Font Awesome social media icons, and a dark-themed Mombasa map for the store’s location. Built using pure HTML5, CSS3, and Vanilla JavaScript, SneakerHub prioritizes performance and simplicity.

## Features
- **Responsive Design**: Adapts to all screen sizes, from mobile to desktop.
- **Product Catalog**: Displays sneakers with images, prices, and details, sourced from a JavaScript array.
- **Cart Functionality**: Add, remove, and view items in the cart, with local storage persistence.
- **Lazy Loading**: Optimizes image loading for faster page performance.
- **Background Images**: Enhances visual appeal with sneaker-themed (`hero.jpg`), brand-focused (`about-bg.jpg`), and Mombasa-themed (`mombasa-bg.jpg`) backgrounds.
- **Font Awesome Icons**: Scalable social media icons for Instagram, Twitter, and Facebook.
- **Mombasa Map**: Dark-styled Google Maps integration for the store’s location in Mombasa, Kenya.
- **Contact Form**: Allows users to send messages with character count validation.
- **Back-to-Top Button**: Improves navigation on long pages.

## Technologies
- **HTML5**: Semantic markup for structure.
- **CSS3**: Flexbox and media queries for styling and responsiveness.
- **Vanilla JavaScript**: Handles dynamic content, cart logic, and map integration.
- **Font Awesome**: Provides scalable social media icons.
- **Google Maps JavaScript API**: Displays the Mombasa store location.
- **Local Storage**: Persists cart data across sessions.

## File Structure
```
sneaker-store/
├── index.html              # Homepage with hero section and featured products
├── about.html              # About page with brand story and team bios
├── contact.html            # Contact page with form, social icons, and map
├── style.css           # Styles for layout, backgrounds, and responsiveness
├── script.js           # Logic for product display, cart, map, and lazy loading
├── images/
│   ├── hero.jpg            # Hero background for index.html
│   ├── about-bg.jpg        # Background for about.html
│   ├── mombasa-bg.jpg      # Background for contact.html
│   ├── about-team.jpg      # Team image for about.html
│   ├── team-john.jpg       # Team member image
│   ├── team-jane.jpg       # Team member image
│   ├── team-mike.jpg       # Team member image
│   ├── air-max-90-main.jpg # Product image
│   ├── air-max-90-side.jpg # Product image
│   ├── air-max-90-top.jpg  # Product image
│   ├── ultraboost-main.jpg # Product image
│   └── (other product images)
```

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd sneaker-store
   ```

2. **Add Images**:
   - Place `hero.jpg`, `about-bg.jpg`, `mombasa-bg.jpg`, and other images in the `images/` folder.
   - Source images from [Unsplash](https://unsplash.com/) and optimize with [TinyPNG](https://tinypng.com/) (~1920x1080px, <200KB).

3. **Configure Google Maps API**:
   - Obtain an API key from [Google Cloud Console](https://console.cloud.google.com/).
   - Replace `YOUR_API_KEY` in `contact.html` with your key:
     ```html
     <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
     ```

4. **Run a Local Server**:
   - Use Python’s HTTP server to serve the site:
     ```bash
     python -m http.server 8000
     ```
   - Open `http://localhost:8000` in a browser.

## Usage
- **Homepage (`index.html`)**: View featured sneakers and navigate to the shop or other pages.
- **Shop (`shop.html`)**: Browse all products and add items to the cart.
- **Cart (`cart.html`)**: Manage cart items and proceed to checkout.
- **About (`about.html`)**: Learn about SneakerHub’s story and team.
- **Contact (`contact.html`)**: Send a message, view the Mombasa store location, and follow social media links.
- **Navigation**: Use the sticky nav bar to switch between pages; cart count updates dynamically.
- **Lazy Loading**: Images load as they enter the viewport, improving performance.

## Testing
- **Browser Compatibility**: Tested on Chrome, Firefox, and Safari.
- **Responsive Design**: Verify on mobile (<768px) and desktop screens.
- **DevTools**:
  - **Network Tab**: Ensure images load with 200 status.
  - **Console**: Check for lazy loading logs or errors.
- **Map**: Confirm the dark-themed map displays with a valid API key.
- **Icons**: Ensure Font Awesome icons load; requires internet for CDN.

## Troubleshooting
- **Images Not Loading**:
  - Verify `images/` contains `hero.jpg`, `about-bg.jpg`, `mombasa-bg.jpg`, etc.
  - Check `../images/` paths in `style.css`.
  - Clear browser cache (Ctrl+Shift+R).
- **Font Awesome Icons**:
  - Ensure internet access for CDN (`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css`).
  - Fallback: Use inline SVGs (contact developer for code).
- **Google Map**:
  - Add a valid API key or use the satellite iframe fallback:
    ```html
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.756210874143!2d39.65639661475347!3d-4.043740097098845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMDInMzcuNSJTIDM5wrAzOSc0Mi4yIkU!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus&maptype=satellite" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
    ```
- **Errors**: Share DevTools 404s or console logs for debugging.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m "Add feature-name"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request with a clear description.

## Future Enhancements
- Add a slideshow for hero backgrounds.
- Implement a parallax effect for background images.
- Integrate a backend for dynamic product data and form submissions.
- Add search and filter functionality to the shop page.

## License
© 2025 SneakerHub. All rights reserved.

## Contact
For support or inquiries:
- Email: support@sneakerhub.com
- Phone: (+254) 703285635
- Address: 123 Sneaker Street, Mombasa, Kenya
- Social Media: Follow us on [Instagram](https://instagram.com), [Twitter](https://twitter.com), and [Facebook](https://facebook.com).

---
