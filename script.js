document.addEventListener('DOMContentLoaded', () => {
    const pageWrapper = document.getElementById('page-wrapper');
    const hamburgerCheckbox = document.getElementById('checkbox');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-list .nav-item');
    const aboutCards = document.querySelectorAll('.about-card');

    // --- About Card Click Logic for Mobile ---
    aboutCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (card.classList.contains('active')) {
                return;
            }
            aboutCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    // --- Click-off functionality ---
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.about-card')) {
            aboutCards.forEach(card => card.classList.remove('active'));
        }
    });

    // --- Mobile Menu Slide Animation ---
    hamburgerCheckbox.addEventListener('change', () => {
        pageWrapper.classList.toggle('menu-open', hamburgerCheckbox.checked);
    });

    // --- Auto-close mobile menu on link click ---
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburgerCheckbox.checked) {
                hamburgerCheckbox.checked = false;
                hamburgerCheckbox.dispatchEvent(new Event('change'));
            }
        });
    });

    // --- Theme Toggle Functionality ---
    const desktopThemeToggle = document.getElementById('themeToggleDesktop');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const isLight = theme === 'light';
        if (desktopThemeToggle) desktopThemeToggle.checked = isLight;
        if (mobileThemeToggle) mobileThemeToggle.checked = isLight;
    };

    const toggleTheme = () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    };

    if (desktopThemeToggle) desktopThemeToggle.addEventListener('change', toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('change', toggleTheme);

    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    // --- Typing Tagline Effect ---
    const taglineWord = document.getElementById('tagline-word');
    if (taglineWord) {
        const words = ["web experiences.", "creative solutions.", "intuitive interfaces."];
        let wordIndex = 0, letterIndex = 0, isDeleting = false;
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            const typeSpeed = isDeleting ? 100 : 200;

            taglineWord.textContent = currentWord.substring(0, letterIndex);

            if (!isDeleting && letterIndex < currentWord.length) {
                letterIndex++;
            } else if (isDeleting && letterIndex > 0) {
                letterIndex--;
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }
            
            setTimeout(typeEffect, isDeleting && letterIndex === 0 ? 1000 : (isDeleting ? typeSpeed : (letterIndex === currentWord.length ? 2000 : typeSpeed)));
        }
        typeEffect();
    }
});

// --- Scroll Reveal Animation for Education Timeline ---
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a delay based on the item's index to stagger the animation
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 200); // 200ms delay between each item

                // Stop observing the item once it has been revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the item is visible
    });

    // Observe each timeline item
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // --- Project Slideshow ---
    const slideshow = document.querySelector('.project-slideshow');
    if (slideshow) {
        const slides = slideshow.querySelectorAll('.slide');
        let currentSlide = 0;

        const showNextSlide = () => {
            // Hide the current slide
            slides[currentSlide].classList.remove('active');
            
            // Determine the next slide index
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Show the next slide
            slides[currentSlide].classList.add('active');
        };

        // Change slide every 30 seconds
        setInterval(showNextSlide, 30000); // 30000 milliseconds = 30 seconds
    }