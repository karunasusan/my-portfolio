document.addEventListener('DOMContentLoaded', () => {
    const pageWrapper = document.getElementById('page-wrapper');
    const hamburgerCheckbox = document.getElementById('checkbox');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-list .nav-item');
    const aboutCards = document.querySelectorAll('.about-card');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-desktop .nav-item');
    const logo = document.querySelector('.logo-svg');
    const easterEggText = document.getElementById('easter-egg');

    // --- Easter Egg Logic ---
    if (logo && easterEggText) {
        logo.addEventListener('dblclick', () => {
            if (window.innerWidth < 1024) return; // Only on desktop

            logo.classList.add('hidden');
            easterEggText.classList.add('visible');
            
            // Typing animation for the easter egg
            const name = "KARUNA SUSAN BENNY";
            let i = 0;
            const typeWriter = () => {
                if (i < name.length) {
                    easterEggText.innerHTML = name.substring(0, i + 1) + '<span class="cursor"></span>';
                    i++;
                    setTimeout(typeWriter, 150);
                }
            };
            typeWriter();

            // Revert after 1 minute
            setTimeout(() => {
                logo.classList.remove('hidden');
                easterEggText.classList.remove('visible');
                easterEggText.innerHTML = '';
            }, 60000); // 60000ms = 1 minute
        });
    }

    // --- About Card Click Logic for Mobile ---
    aboutCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (card.classList.contains('active')) return;
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

    // --- Scroll Reveal Animation for Education Timeline ---
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // --- Project Slideshow ---
    const slideshow = document.querySelector('.project-slideshow');
    if (slideshow) {
        const slides = slideshow.querySelectorAll('.slide');
        let currentSlide = 0;
        const showNextSlide = () => {
            if (slides.length > 0) {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }
        };
        setInterval(showNextSlide, 30000);
    }

    // --- Navbar Active on Scroll ---
    const updateActiveNav = () => {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // --- START: Form Validation Logic ---
    const contactForm = document.forms['contact'];
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = document.getElementById('submit-btn');

        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');

        // Simple regex for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // An object to track the validity of each field
        const validationState = {
            name: false,
            email: false,
            message: false
        };

        // This function checks the state and enables/disables the submit button
        const checkFormValidity = () => {
            if (validationState.name && validationState.email && validationState.message) {
                submitBtn.disabled = false;
            } else {
                submitBtn.disabled = true;
            }
        };

        // --- Validation Functions ---
        const validateName = () => {
            const value = nameInput.value.trim();
            if (value.length === 0) {
                nameError.textContent = "Name is required.";
                nameError.classList.add('visible');
                nameInput.classList.add('error');
                validationState.name = false;
            } else if (value.length < 2) {
                nameError.textContent = "Name must be at least 2 characters.";
                nameError.classList.add('visible');
                nameInput.classList.add('error');
                validationState.name = false;
            } else {
                nameError.textContent = "";
                nameError.classList.remove('visible');
                nameInput.classList.remove('error');
                validationState.name = true;
            }
            checkFormValidity();
        };

        const validateEmail = () => {
            const value = emailInput.value.trim();
            if (value.length === 0) {
                emailError.textContent = "Email is required.";
                emailError.classList.add('visible');
                emailInput.classList.add('error');
                validationState.email = false;
            } else if (!emailRegex.test(value)) {
                emailError.textContent = "Please enter a valid email format.";
                emailError.classList.add('visible');
                emailInput.classList.add('error');
                validationState.email = false;
            } else {
                emailError.textContent = "";
                emailError.classList.remove('visible');
                emailInput.classList.remove('error');
                validationState.email = true;
            }
            checkFormValidity();
        };

        const validateMessage = () => {
            const value = messageInput.value.trim();
            if (value.length === 0) {
                messageError.textContent = "Message is required.";
                messageError.classList.add('visible');
                messageInput.classList.add('error');
                validationState.message = false;
            } else if (value.length < 10) {
                messageError.textContent = "Message must be at least 10 characters.";
                messageError.classList.add('visible');
                messageInput.classList.add('error');
                validationState.message = false;
            } else {
                messageError.textContent = "";
                messageError.classList.remove('visible');
                messageInput.classList.remove('error');
                validationState.message = true;
            }
            checkFormValidity();
        };

        // --- Add Event Listeners ---
        // We use 'input' to validate as the user types
        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        messageInput.addEventListener('input', validateMessage);

        // We also check on 'blur' (when user clicks away) 
        // in case they just click past a field
        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        messageInput.addEventListener('blur', validateMessage);
    }
    // --- END: Form Validation Logic ---

    // --- START: Scroll-to-Top Button Logic ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        // Show or hide the button based on scroll position
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
                scrollTopBtn.style.display = "flex";
            } else {
                scrollTopBtn.style.display = "none";
            }
        });

        // Scroll to top when clicked
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    // --- END: Scroll-to-Top Button Logic ---
});

// --- START: Loader Logic ---
// 1. Add 'loading' class to body to hide content initially
document.body.classList.add('loading');

// 2. Get the loader element
const loader = document.getElementById('loader');

// 3. Listen for when the whole page (images, etc.) is loaded
window.onload = () => {
    // 4. Hide the loader
    loader.classList.add('hidden');
    // 5. Show the main content
    document.body.classList.remove('loading');
};
// --- END: Loader Logic ---

document.addEventListener('DOMContentLoaded', () => {
    const pageWrapper = document.getElementById('page-wrapper');});