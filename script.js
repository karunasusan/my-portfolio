document.addEventListener('DOMContentLoaded', () => {
    const pageWrapper = document.getElementById('page-wrapper');
    const hamburgerCheckbox = document.getElementById('checkbox');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-list .nav-item');
    
    // --- Mobile Menu Slide Animation ---
    hamburgerCheckbox.addEventListener('change', () => {
        pageWrapper.classList.toggle('menu-open', hamburgerCheckbox.checked);
    });

    // --- Auto-close mobile menu on link click ---
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburgerCheckbox.checked) {
                hamburgerCheckbox.checked = false;
                // Manually trigger the change event to ensure the class is toggled
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
        desktopThemeToggle.checked = isLight;
        mobileThemeToggle.checked = isLight;
    };

    const toggleTheme = () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    };

    desktopThemeToggle.addEventListener('change', toggleTheme);
    mobileThemeToggle.addEventListener('change', toggleTheme);

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

    // --- Language Translation Logic ---
    const desktopLangSelect = document.getElementById('desktop-lang-select');
    // Mobile language select removed from HTML, so no need for its JS
    const langDisplay = document.getElementById('lang-display');
    const googleTranslateMeta = document.querySelector('meta[name="google"]');

    const languages = {
        "en": { "name": "English", "display": "Aa" }, "es": { "name": "Español", "display": "Aa" },
        "fr": { "name": "Français", "display": "Aa" }, "de": { "name": "Deutsch", "display": "Aa" },
        "hi": { "name": "हिन्दी", "display": "आ" }, "ml": { "name": "മലയാളം", "display": "അ" }
    };

    function populateLanguageDropdowns() {
        const selects = [desktopLangSelect]; // Only desktop select now
        selects.forEach(select => {
            if (!select) return;
            select.innerHTML = '';
            for (const code in languages) {
                const option = document.createElement('option');
                option.value = code;
                option.textContent = languages[code].name;
                option.dataset.display = languages[code].display;
                select.appendChild(option);
            }
        });
    }

    function handleLanguageChange(event) {
        const langCode = event.target.value;
        const selectedOption = event.target.options[event.target.selectedIndex];
        
        if (langDisplay) {
            langDisplay.textContent = selectedOption.dataset.display;
        }
        
        document.documentElement.lang = langCode;
        if (googleTranslateMeta) {
            googleTranslateMeta.content = 'translate';
        }
        
        console.log(`Language set to ${langCode}. Browser should now offer to translate.`);
    }
    
    populateLanguageDropdowns();
    if (desktopLangSelect) desktopLangSelect.addEventListener('change', handleLanguageChange);
});