document.addEventListener("DOMContentLoaded", () => {
  const pageWrapper = document.getElementById("page-wrapper");
  const hamburgerCheckbox = document.getElementById("checkbox");
  const mobileNavLinks = document.querySelectorAll(
    ".mobile-nav-list .nav-item"
  );
  const aboutCards = document.querySelectorAll(".about-card");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-desktop .nav-item");
  const logo = document.querySelector(".logo-svg");
  const easterEggText = document.getElementById("easter-egg");

  // Easter Egg on Logo Double Click (Desktop Only)
  if (logo && easterEggText) {
    logo.addEventListener("dblclick", () => {
      if (window.innerWidth < 1024) return;
      logo.classList.add("hidden");
      easterEggText.classList.add("visible");
      const name = "KARUNA SUSAN BENNY";
      let i = 0;
      const typeWriter = () => {
        if (i < name.length) {
          easterEggText.innerHTML =
            name.substring(0, i + 1) + '<span class="cursor"></span>';
          i++;
          setTimeout(typeWriter, 150);
        }
      };
      typeWriter();
      setTimeout(() => {
        logo.classList.remove("hidden");
        easterEggText.classList.remove("visible");
        easterEggText.innerHTML = "";
      }, 60000); // Hide after 1 minute
    });
  }

  // About Card Toggle Logic
  aboutCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("active")) return; // Do nothing if already active
      aboutCards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
    });
  });

  // Close About Card when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".about-card")) {
      aboutCards.forEach((card) => card.classList.remove("active"));
    }
  });

  // Mobile Menu Toggle
  hamburgerCheckbox.addEventListener("change", () => {
    pageWrapper.classList.toggle("menu-open", hamburgerCheckbox.checked);
  });

  // Close Mobile Menu when a link is clicked
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (hamburgerCheckbox.checked) {
        hamburgerCheckbox.checked = false;
        hamburgerCheckbox.dispatchEvent(new Event("change")); // Trigger change event to close menu
      }
    });
  });

  // Theme Toggling Logic
  const desktopThemeToggle = document.getElementById("themeToggleDesktop");
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    const isLight = theme === "light";
    if (desktopThemeToggle) desktopThemeToggle.checked = isLight;
    if (mobileThemeToggle) mobileThemeToggle.checked = isLight;
  };
  const toggleTheme = () => {
    const newTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    applyTheme(newTheme);
  };
  if (desktopThemeToggle)
    desktopThemeToggle.addEventListener("change", toggleTheme);
  if (mobileThemeToggle)
    mobileThemeToggle.addEventListener("change", toggleTheme);
  // Apply saved theme or system preference
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  applyTheme(savedTheme);

  // Tagline Typing Effect
  const taglineWord = document.getElementById("tagline-word");
  if (taglineWord) {
    const words = [
      "web experiences.",
      "creative solutions.",
      "intuitive interfaces.",
    ];
    let wordIndex = 0,
      letterIndex = 0,
      isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];
      const typeSpeed = isDeleting ? 100 : 200; // Faster delete, slower type
      taglineWord.textContent = currentWord.substring(0, letterIndex);
      if (!isDeleting && letterIndex < currentWord.length) {
        letterIndex++;
      } else if (isDeleting && letterIndex > 0) {
        letterIndex--;
      } else {
        isDeleting = !isDeleting; // Switch state
        if (!isDeleting) {
          wordIndex = (wordIndex + 1) % words.length; // Move to next word
        }
      }
      // Determine delay before next character
      let delay = typeSpeed;
      if (!isDeleting && letterIndex === currentWord.length) {
        delay = 2000; // Pause after typing word
      } else if (isDeleting && letterIndex === 0) {
        delay = 1000; // Pause after deleting word
      }
      setTimeout(typeEffect, delay);
    }
    typeEffect(); // Start the effect
  }

  // Education Timeline Intersection Observer
  const timelineItems = document.querySelectorAll(".timeline-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            // Stagger the animation
            entry.target.classList.add("is-visible");
          }, index * 200);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the item is visible
    }
  );
  timelineItems.forEach((item) => {
    observer.observe(item);
  });

  // --- PROJECT SLIDESHOW LOGIC ---
  document.querySelectorAll(".project-card").forEach((projectCard) => {
    // Target the parent card
    const slideshow = projectCard.querySelector(".project-slideshow");
    const slides = slideshow.querySelectorAll(".slide");
    const dotsContainer = projectCard.querySelector(".slide-dots"); // Find dots relative to card
    const prevBtns = projectCard.querySelectorAll(".prev-slide"); // Find all prev buttons
    const nextBtns = projectCard.querySelectorAll(".next-slide"); // Find all next buttons
    let currentSlide = 0;

    if (slides.length === 0) return;

    // Create dots (even though they are hidden, keep for potential future use)
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.classList.add("slide-dot");
      if (i === 0) dot.classList.add("active");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => {
        showSlide(i);
      });
      if (dotsContainer) dotsContainer.appendChild(dot); // Check if dotsContainer exists
    });

    const dots = projectCard.querySelectorAll(".slide-dot");

    function showSlide(index) {
      // Wrap index around if out of bounds
      if (index >= slides.length) {
        index = 0;
      } else if (index < 0) {
        index = slides.length - 1;
      }

      // Update slides
      slides.forEach((slide) => slide.classList.remove("active"));
      slides[index].classList.add("active");

      // Update dots (if they exist and are visible)
      if (dots.length > 0) {
        dots.forEach((dot) => dot.classList.remove("active"));
        dots[index].classList.add("active");
      }

      currentSlide = index;
    }

    // Add event listeners to *all* previous buttons within this project card
    prevBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        showSlide(currentSlide - 1);
        resetAutoSlide(); // Reset timer on manual navigation
      });
    });

    // Add event listeners to *all* next buttons within this project card
    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        showSlide(currentSlide + 1);
        resetAutoSlide(); // Reset timer on manual navigation
      });
    });

    let autoSlideInterval;

    function startAutoSlide() {
      clearInterval(autoSlideInterval); // Clear existing timer
      autoSlideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 5000); // 5-second interval
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    // Stop auto-slide on hover over the slideshow area
    slideshow.addEventListener("mouseenter", () =>
      clearInterval(autoSlideInterval)
    );
    slideshow.addEventListener("mouseleave", startAutoSlide); // Resume on mouse leave

    // Initialize first slide and start auto-slide
    showSlide(0);
    startAutoSlide();
  });

  // Active Navigation Link Highlighting on Scroll
  const updateActiveNav = () => {
    let scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100; // Adjust offset as needed
      const sectionId = current.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
        // Also update mobile nav if needed (optional)
        mobileNavLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  };
  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav(); // Initial check on load

  // Contact Form Validation
  const contactForm = document.forms["contact"];
  if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const submitBtn = document.getElementById("submit-btn");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex

    const validationState = {
      name: false,
      email: false,
      message: false,
    };

    // Function to enable/disable submit button
    const checkFormValidity = () => {
      submitBtn.disabled = !(
        validationState.name &&
        validationState.email &&
        validationState.message
      );
    };

    // Validation functions for each field
    const validateName = () => {
      const value = nameInput.value.trim();
      if (value.length === 0) {
        nameError.textContent = "Name is required.";
        nameError.classList.add("visible");
        nameInput.classList.add("error");
        validationState.name = false;
      } else if (value.length < 2) {
        nameError.textContent = "Name must be at least 2 characters.";
        nameError.classList.add("visible");
        nameInput.classList.add("error");
        validationState.name = false;
      } else {
        nameError.textContent = "";
        nameError.classList.remove("visible");
        nameInput.classList.remove("error");
        validationState.name = true;
      }
      checkFormValidity();
    };

    const validateEmail = () => {
      const value = emailInput.value.trim();
      if (value.length === 0) {
        emailError.textContent = "Email is required.";
        emailError.classList.add("visible");
        emailInput.classList.add("error");
        validationState.email = false;
      } else if (!emailRegex.test(value)) {
        emailError.textContent = "Please enter a valid email format.";
        emailError.classList.add("visible");
        emailInput.classList.add("error");
        validationState.email = false;
      } else {
        emailError.textContent = "";
        emailError.classList.remove("visible");
        emailInput.classList.remove("error");
        validationState.email = true;
      }
      checkFormValidity();
    };

    const validateMessage = () => {
      const value = messageInput.value.trim();
      if (value.length === 0) {
        messageError.textContent = "Message is required.";
        messageError.classList.add("visible");
        messageInput.classList.add("error");
        validationState.message = false;
      } else if (value.length < 10) {
        messageError.textContent = "Message must be at least 10 characters.";
        messageError.classList.add("visible");
        messageInput.classList.add("error");
        validationState.message = false;
      } else {
        messageError.textContent = "";
        messageError.classList.remove("visible");
        messageInput.classList.remove("error");
        validationState.message = true;
      }
      checkFormValidity();
    };

    // Attach event listeners (validate on input and blur)
    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    messageInput.addEventListener("input", validateMessage);
    nameInput.addEventListener("blur", validateName);
    emailInput.addEventListener("blur", validateEmail);
    messageInput.addEventListener("blur", validateMessage);

    // Prevent default form submission if using Netlify/AJAX later
    // contactForm.addEventListener('submit', (e) => {
    //    e.preventDefault();
    //    // Add AJAX submission logic here if needed
    // });
  }

  // Scroll to Top Button Logic
  // Scroll to Top Button Logic
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const pageWrapperForScrollBtn = document.getElementById("page-wrapper"); // Get page wrapper reference
  const hamburgerCheckboxForScrollBtn = document.getElementById("checkbox"); // Get checkbox reference

  // Function to update button visibility based on scroll and menu state
  const updateScrollTopButtonVisibility = () => {
    if (!scrollTopBtn || !pageWrapperForScrollBtn) return; // Exit if elements not found

    const scrolledDown =
      document.body.scrollTop > 400 || document.documentElement.scrollTop > 400;
    const menuIsOpen = pageWrapperForScrollBtn.classList.contains("menu-open");

    if (scrolledDown && !menuIsOpen) {
      // Show button only if scrolled down AND menu is closed
      scrollTopBtn.style.display = "flex";
    } else {
      // Hide button if scrolled up OR menu is open
      scrollTopBtn.style.display = "none";
    }
  };

  if (
    scrollTopBtn &&
    pageWrapperForScrollBtn &&
    hamburgerCheckboxForScrollBtn
  ) {
    // Listener for scroll events
    window.addEventListener("scroll", updateScrollTopButtonVisibility);

    // Listener for menu toggle events
    hamburgerCheckboxForScrollBtn.addEventListener(
      "change",
      updateScrollTopButtonVisibility
    );

    // Initial check on page load
    updateScrollTopButtonVisibility();

    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

// --- Loader Logic ---
document.body.classList.add("loading"); // Add loading class initially
const loader = document.getElementById("loader");
window.onload = () => {
  if (loader) {
    loader.classList.add("hidden"); // Hide loader when page is fully loaded
  }
  document.body.classList.remove("loading"); // Remove loading class
};
