document.addEventListener('DOMContentLoaded', () => {
    const pageWrapper = document.getElementById('page-wrapper');
    const hamburgerCheckbox = document.getElementById('hamburger-checkbox');
    
    // --- Mobile Menu Slide Animation ---
    hamburgerCheckbox.addEventListener('change', () => {
        if (hamburgerCheckbox.checked) {
            pageWrapper.classList.add('menu-open');
        } else {
            pageWrapper.classList.remove('menu-open');
        }
    });

    // --- Theme Toggle Functionality ---
    const desktopThemeToggle = document.getElementById('themeToggleDesktop');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'light') {
            desktopThemeToggle.checked = true;
            mobileThemeToggle.checked = true;
        } else {
            desktopThemeToggle.checked = false;
            mobileThemeToggle.checked = false;
        }
    };

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    };

    desktopThemeToggle.addEventListener('click', toggleTheme);
    mobileThemeToggle.addEventListener('click', toggleTheme);

    // Load saved theme or set based on system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(systemPrefersDark ? 'dark' : 'light');
    }

    // --- Typing Tagline Effect ---
    const taglineWord = document.getElementById('tagline-word');
    if (taglineWord) {
        const words = ["web experiences.", "creative solutions.", "intuitive interfaces."];
        let wordIndex = 0;
        let letterIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            const currentText = isDeleting 
                ? currentWord.substring(0, letterIndex - 1)
                : currentWord.substring(0, letterIndex + 1);

            taglineWord.textContent = currentText;
            letterIndex = isDeleting ? letterIndex - 1 : letterIndex + 1;

            let typeSpeed = isDeleting ? 100 : 200;

            if (!isDeleting && letterIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && letterIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            setTimeout(typeEffect, typeSpeed);
        }
        typeEffect();
    }

    // --- Language Card Display ---
    const langSelect = document.getElementById('lang-select');
    const langDisplay = document.getElementById('lang-display');
    if (langSelect && langDisplay) {
        langSelect.addEventListener('change', (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            langDisplay.textContent = selectedOption.getAttribute('data-display');
            // NOTE: This is where you would call a translation function.
            // Example: translatePage(selectedOption.value);
            console.log(`Language changed to: ${selectedOption.value}`);
        });
    }

    /*
    // Placeholder for translation logic
    function translatePage(languageCode) {
        // This is a complex feature that requires a third-party library
        // or API to fetch and replace text content on the page.
        // For example, using a library like i18next or a service like the
        // Google Translate API.
        
        alert(`Page would now be translated to ${languageCode}.`);
    }
    */
});

