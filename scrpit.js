/* ------------------------------------- */
/* ✨ FUNCTIONALITY FOR THE PORTFOLIO    */
/* ------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------- */
    /* 📱 MOBILE NAVIGATION           */
    /* ----------------------------- */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');

    // Show menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    // Hide menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Hide menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    /* ----------------------------- */
    /* FROSSTED HEADER ON SCROLL   */
    /* ----------------------------- */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ----------------------------- */
    /* SCROLL-TO-TOP BUTTON        */
    /* ----------------------------- */
    const scrollUp = document.getElementById('scroll-up');

    window.addEventListener('scroll', () => {
        if (window.scrollY >= 400) {
            scrollUp.classList.add('show');
        } else {
            scrollUp.classList.remove('show');
        }
    });
});