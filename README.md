# Karuna Susan Benny - Personal Portfolio

Welcome to the repository for my personal portfolio website. This single-page site is built from scratch to showcase my journey, skills, and projects as a frontend developer. It is designed to be fully responsive, accessible, and performant.

---

## 🚀 Live Demo

You can view the live site here:
**[https://karunasusanbenny.netlify.app/](https://karunasusanbenny.netlify.app/)**

---

## ✨ Features

This portfolio is packed with features to create a modern and user-friendly experience:

- **Responsive Design:** Fully mobile-first layout that adapts to all screen sizes.
- **Dark/Light Theme:** A theme toggle that respects and saves the user's preference via `localStorage`.
- **Dynamic Typing Effect:** An engaging, auto-typing tagline in the hero section.
- **Contact Form:** A functional contact form with client-side validation, powered by Netlify Forms.
- **Scroll Animations:** Subtle fade-in animations for the education timeline as you scroll.
- **Accessibility:** Built with semantic HTML, `aria-` attributes, a "Skip to home" link, and full keyboard navigation support.
- **SEO Optimized:** Includes a `robots.txt`, relevant meta tags, Open Graph tags, and a JSON-LD schema for rich search results.

---

## 🛠️ Tech Stack

This project is built purely with foundational web technologies, with no frameworks or libraries.

- **HTML5:** Semantic and accessible markup.
- **CSS3:** Modern styling using Flexbox, Grid, CSS Variables, and responsive media queries.
- **JavaScript (ES6+):** Clean, modular JavaScript for all interactivity, DOM manipulation, and animations.

---

## 📦 Getting Started

To run this project locally, you only need a web browser and a code editor.

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/karunasusan/my-portfolio.git](https://github.com/karunasusan/my-portfolio.git)
    cd my-portfolio
    ```

2.  **Install development dependencies:**
    This project uses `npm` to manage Prettier for code formatting.

    ```bash
    npm install
    ```

3.  **Run the project:**
    You can open the `index.html` file directly in your browser. For the best development experience, I recommend using the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code.

---

## 🧹 Code Formatting

This repository uses **Prettier** to maintain consistent code formatting.

- **To check for formatting issues:**
  ```bash
  npm run format:check
  ```
- **To automatically format all files:**
  ```bash
  npm run format:write
  ```
  The `.prettierignore` file is set up to ignore minified files.

---

## 📤 Deployment

This static site is deployed and hosted with **Netlify**.

- The master branch is automatically built and deployed upon a push.
- The contact form is integrated with Netlify Forms.
- A custom `404.html` page is included.
