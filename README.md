# Personal Portfolio Website

This is the complete source code for my personal portfolio website, built from scratch to showcase my skills, projects, and professional background as a frontend developer.

The live site is hosted on Netlify:
**[https://karunasusanbenny.netlify.app/](https://karunasusanbenny.netlify.app/)**

---

## Project Overview

This is a fully responsive, modern, single-page portfolio designed to be a high-performance, accessible, and user-friendly web experience. It is built entirely with foundational web technologies (HTML, CSS, and vanilla JavaScript) and no frameworks.

The site includes a "Home" section with a dynamic tagline, an "About Me" section with skills, a "Projects" showcase, an "Education" timeline, and a functional "Contact" form. It also features auxiliary pages for a [Privacy Policy](httpss://karunasusanbenny.netlify.app/privacy.html) and a custom 404 page, all fully integrated with the site's theme.

## ✨ Key Features

This repository is packed with modern web development features:

- **Responsive & Mobile-First Design:** The layout adapts seamlessly from mobile to desktop, built using modern CSS Flexbox and Grid.
- **Dual Theme (Dark/Light):** A theme toggle allows users to switch between dark and light modes. This preference is saved in `localStorage` and respects the user's system-level preference (`prefers-color-scheme`) on first visit.
- **Rich Interactivity (Vanilla JS):** All interactive elements are built with clean, modular, and performant ES6+ JavaScript:
  - **Dynamic Typing Effect:** An auto-typing and deleting tagline in the hero section.
  - **Project Slideshow:** An automated, looping slideshow for project images.
  - **Skills Marquee:** A pausable, infinite-scrolling marquee for the tech stack section.
  - **Client-Side Form Validation:** The contact form provides real-time validation for name, email, and message fields before submission.
- **Performance Optimized:**
  - **Asset Preloading:** Uses `<link rel="preload">` and `<link rel="preconnect">` for critical fonts and styles to speed up load times.
  - **Deferred Scripts:** All JavaScript is loaded with `defer` to prevent render-blocking.
  - **Minified Assets:** Minified versions of `style.min.css` and `script.min.js` are provided.
- **Accessibility (A11y):**
  - Built with semantic HTML5 (e.g., `<main>`, `<nav>`, `<section>`).
  - Includes a "Skip to home" link for keyboard navigation.
  - Uses `aria-label` attributes and visually-hidden text for icon-only buttons.
- **SEO & Security:**
  - **JSON-LD Schema:** Provides a rich schema for search engines to understand the page content.
  - **Meta & Open Graph:** Comprehensive meta, Open Graph, and Twitter card tags for optimal search and social media sharing.
  - **Search Engine Ready:** Includes a `robots.txt` and `sitemap.xml`.
  - **Security Headers:** A custom `_headers` file is configured for Netlify to set `Strict-Transport-Security` and `X-Frame-Options`.

---

## 🛠️ Tech Stack

This project is built purely with foundational web technologies, with no frameworks or libraries.

- **HTML5:** Semantic, accessible, and SEO-optimized markup.
- **CSS3:** Modern styling using:
  - CSS Variables (for theming)
  - Flexbox & Grid
  - Media Queries (for responsive design)
  - Keyframe Animations
- **JavaScript (ES6+):**
  - DOM Manipulation
  - Event Listeners
  - `localStorage`
  - Intersection Observer (for scroll animations)

---

## 📦 Getting Started

To run this project locally, you only need a web browser and a code editor.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/karunasusan/my-portfolio.git
    cd my-portfolio
    ```

2.  **Run the project:**
    Open the `index.html` file directly in your browser. For the best development experience (with hot-reloading), I recommend using the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code.

---

## 📤 Deployment

This static site is deployed and hosted with **Netlify**.

- The main branch is automatically built and deployed upon a push.
- The contact form is integrated with **Netlify Forms** by adding the `data-netlify="true"` attribute to the `<form>` tag.
- Custom `_headers` are used for site security.
- A custom `404.html` page is included.
