document.addEventListener("DOMContentLoaded", () => {
  // --- Element Definitions ---
  const pageWrapper = document.getElementById("page-wrapper");
  const hamburgerCheckbox = document.getElementById("checkbox");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileNavLinks = document.querySelectorAll(
    ".mobile-nav-list .nav-item"
  );
  const aboutCards = document.querySelectorAll(".about-card");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-desktop .nav-item");
  const logo = document.querySelector(".logo-svg");
  const easterEggText = document.getElementById("easter-egg");

  // --- Dynamic Copyright Year ---
  const yearEl = document.getElementById("copyright-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- Logo Easter Egg ---
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
      }, 60000);
    });
  }

  // --- About Card Toggling ---
  aboutCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("active")) return;
      aboutCards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".about-card")) {
      aboutCards.forEach((card) => card.classList.remove("active"));
    }
  });

  // --- Mobile Navigation Toggle ---
  if (hamburgerCheckbox && pageWrapper && mobileNav) {
    hamburgerCheckbox.addEventListener("change", () => {
      pageWrapper.classList.toggle("menu-open", hamburgerCheckbox.checked);
      mobileNav.classList.toggle("is-open", hamburgerCheckbox.checked);
    });
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (hamburgerCheckbox && hamburgerCheckbox.checked) {
        hamburgerCheckbox.checked = false;
        hamburgerCheckbox.dispatchEvent(new Event("change"));
      }
    });
  });

  // --- Theme Toggle ---
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

  if (desktopThemeToggle) {
    desktopThemeToggle.addEventListener("change", toggleTheme);
  }
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener("change", toggleTheme);
  }

  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  applyTheme(savedTheme);

  // --- Tagline Typewriter Animation ---
  const taglineWord = document.getElementById("tagline-word");
  if (taglineWord) {
    const words = [
      "beautiful interfaces.",
      "meaningful interactions.",
      "user focused websites.",
    ];
    let wordIndex = 0,
      letterIndex = 0,
      isDeleting = false;

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
      let delay = typeSpeed;
      if (!isDeleting && letterIndex === currentWord.length) {
        delay = 2000;
      } else if (isDeleting && letterIndex === 0) {
        delay = 1000;
      }
      setTimeout(typeEffect, delay);
    }
    typeEffect();
  }

  // --- Timeline Scroll Animation ---
  const timelineItems = document.querySelectorAll(".timeline-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, index * 200);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  timelineItems.forEach((item) => {
    observer.observe(item);
  });

  // --- Project Slideshow ---
  document.querySelectorAll(".project-card").forEach((projectCard) => {
    const slideshow = projectCard.querySelector(".project-slideshow");
    const slides = slideshow ? slideshow.querySelectorAll(".slide") : [];
    const dotsContainer = projectCard.querySelector(".slide-dots");
    const prevBtns = projectCard.querySelectorAll(".prev-slide");
    const nextBtns = projectCard.querySelectorAll(".next-slide");
    let currentSlide = 0;
    let autoSlideInterval;

    if (!slideshow || slides.length === 0) return;

    function showSlide(index) {
      if (index >= slides.length) {
        index = 0;
      } else if (index < 0) {
        index = slides.length - 1;
      }
      slides.forEach((slide) => slide.classList.remove("active"));
      slides[index].classList.add("active");
      currentSlide = index;

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll(".slide-dot");
        if (dots.length > 0) {
          dots.forEach((dot) => dot.classList.remove("active"));
          dots[index].classList.add("active");
        }
      }
    }

    function startAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 5000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.classList.add("slide-dot");
        if (i === 0) dot.classList.add("active");
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
        dot.addEventListener("click", () => {
          showSlide(i);
          resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
      });
    }

    prevBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        showSlide(currentSlide - 1);
        resetAutoSlide();
      });
    });

    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        showSlide(currentSlide + 1);
        resetAutoSlide();
      });
    });

    slideshow.addEventListener("mouseenter", () =>
      clearInterval(autoSlideInterval)
    );
    slideshow.addEventListener("mouseleave", startAutoSlide);

    showSlide(0);
    startAutoSlide();
  });

  // --- Skills Marquee ---
  const marqueeContent = document.getElementById("marquee-content");
  if (marqueeContent) {
    const icons = marqueeContent.querySelectorAll("i");

    icons.forEach((icon) => {
      const clone = icon.cloneNode(true);
      marqueeContent.appendChild(clone);
    });

    marqueeContent.classList.add("animated");
  }

  // --- Optimized Active Nav Highlighting (Fix for Forced Reflow) ---
  let sectionPositions = [];

  const cacheSectionPositions = () => {
    sectionPositions = [];
    sections.forEach((current) => {
      sectionPositions.push({
        id: current.getAttribute("id"),
        top: current.offsetTop,
        height: current.offsetHeight,
      });
    });
  };

  const updateActiveNav = () => {
    let scrollY = window.pageYOffset;
    let currentActiveFound = false;

    sectionPositions.forEach((section) => {
      const sectionTop = section.top - 100;
      const sectionId = section.id;
      const sectionHeight = section.height;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentActiveFound = true;
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + sectionId
          );
        });
        mobileNavLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + sectionId
          );
        });
      }
    });

    if (scrollY < 100 && !currentActiveFound) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#home");
      });
      mobileNavLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#home");
      });
    }
  };

  cacheSectionPositions(); // Calculate positions on load
  window.addEventListener("resize", cacheSectionPositions); // Recalculate on resize
  window.addEventListener("scroll", updateActiveNav); // Check on scroll
  updateActiveNav(); // Run once on load

  // --- Contact Form Validation ---
  const contactForm = document.forms["contact"];
  if (contactForm) {
    contactForm.setAttribute("novalidate", "");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const submitBtn = document.getElementById("submit-btn");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validationState = { name: false, email: false, message: false };

    const checkFormValidity = () => {
      submitBtn.disabled = !(
        validationState.name &&
        validationState.email &&
        validationState.message
      );
    };

    const validateField = (
      input,
      errorElement,
      validationKey,
      minLength = 0,
      regex = null,
      emptyMsg,
      lengthMsg,
      formatMsg
    ) => {
      const value = input.value.trim();
      let isValid = true;
      let errorMsg = "";

      if (value.length === 0) {
        isValid = false;
        errorMsg = emptyMsg;
      } else if (minLength > 0 && value.length < minLength) {
        isValid = false;
        errorMsg = lengthMsg;
      } else if (regex && !regex.test(value)) {
        isValid = false;
        errorMsg = formatMsg;
      }

      errorElement.textContent = errorMsg;
      errorElement.classList.toggle("visible", !isValid);
      input.classList.toggle("error", !isValid);
      validationState[validationKey] = isValid;
      checkFormValidity();
    };

    const validateName = () =>
      validateField(
        nameInput,
        nameError,
        "name",
        2,
        null,
        "Name is required.",
        "Name must be at least 2 characters.",
        ""
      );
    const validateEmail = () =>
      validateField(
        emailInput,
        emailError,
        "email",
        0,
        emailRegex,
        "Email is required.",
        "",
        "Please enter a valid email format."
      );
    const validateMessage = () =>
      validateField(
        messageInput,
        messageError,
        "message",
        10,
        null,
        "Message is required.",
        "Message must be at least 10 characters.",
        ""
      );

    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    messageInput.addEventListener("input", validateMessage);
    nameInput.addEventListener("blur", validateName);
    emailInput.addEventListener("blur", validateEmail);
    messageInput.addEventListener("blur", validateMessage);
  }

  // --- Scroll-to-Top Button ---
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const pageWrapperForScrollBtn = document.getElementById("page-wrapper");
  const hamburgerCheckboxForScrollBtn = document.getElementById("checkbox");

  const updateScrollTopButtonVisibility = () => {
    if (!scrollTopBtn || !pageWrapperForScrollBtn) return;
    const scrolledDown =
      document.body.scrollTop > 400 || document.documentElement.scrollTop > 400;
    const menuIsOpen = pageWrapperForScrollBtn.classList.contains("menu-open");
    scrollTopBtn.style.display = scrolledDown && !menuIsOpen ? "flex" : "none";
  };

  if (
    scrollTopBtn &&
    pageWrapperForScrollBtn &&
    hamburgerCheckboxForScrollBtn
  ) {
    window.addEventListener("scroll", updateScrollTopButtonVisibility);
    hamburgerCheckboxForScrollBtn.addEventListener(
      "change",
      updateScrollTopButtonVisibility
    );
    updateScrollTopButtonVisibility();
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

// --- Page Loader ---
document.body.classList.add("loading");
const loader = document.getElementById("loader");
window.onload = () => {
  if (loader) {
    loader.classList.add("hidden");
  }
  document.body.classList.remove("loading");
};
