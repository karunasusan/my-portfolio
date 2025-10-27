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

  aboutCards.forEach((card) => {
    card.addEventListener("click", (e) => {
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

  hamburgerCheckbox.addEventListener("change", () => {
    pageWrapper.classList.toggle("menu-open", hamburgerCheckbox.checked);
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (hamburgerCheckbox.checked) {
        hamburgerCheckbox.checked = false;
        hamburgerCheckbox.dispatchEvent(new Event("change"));
      }
    });
  });

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
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  applyTheme(savedTheme);

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
      setTimeout(
        typeEffect,
        isDeleting && letterIndex === 0
          ? 1000
          : isDeleting
          ? typeSpeed
          : letterIndex === currentWord.length
          ? 2000
          : typeSpeed
      );
    }
    typeEffect();
  }

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

  // --- PROJECT SLIDESHOW LOGIC ---
  document.querySelectorAll(".project-slideshow").forEach((slideshow) => {
    const slides = slideshow.querySelectorAll(".slide");
    const dotsContainer = slideshow.querySelector(".slide-dots");
    const prevBtn = slideshow.querySelector(".prev-slide");
    const nextBtn = slideshow.querySelector(".next-slide");
    let currentSlide = 0;

    if (slides.length === 0) return;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.classList.add("slide-dot");
      if (i === 0) dot.classList.add("active");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => {
        showSlide(i);
      });
      dotsContainer.appendChild(dot);
    });

    const dots = slideshow.querySelectorAll(".slide-dot");

    function showSlide(index) {
      if (index >= slides.length) {
        index = 0;
      } else if (index < 0) {
        index = slides.length - 1;
      }

      // Update slides
      slides.forEach((slide) => slide.classList.remove("active"));
      slides[index].classList.add("active");

      // Update dots
      dots.forEach((dot) => dot.classList.remove("active"));
      dots[index].classList.add("active");

      currentSlide = index;
    }

    prevBtn.addEventListener("click", () => {
      showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener("click", () => {
      showSlide(currentSlide + 1);
    });

    let autoSlide = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000); // 5-second interval

    // Stop auto-slide on hover
    slideshow.addEventListener("mouseenter", () => clearInterval(autoSlide));
    slideshow.addEventListener("mouseleave", () => {
      autoSlide = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 5000);
    });

    // Initialize first slide
    showSlide(0);
  });

  const updateActiveNav = () => {
    let scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  };
  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  const contactForm = document.forms["contact"];
  if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const submitBtn = document.getElementById("submit-btn");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validationState = {
      name: false,
      email: false,
      message: false,
    };

    const checkFormValidity = () => {
      if (
        validationState.name &&
        validationState.email &&
        validationState.message
      ) {
        submitBtn.disabled = false;
      } else {
        submitBtn.disabled = true;
      }
    };

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

    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    messageInput.addEventListener("input", validateMessage);

    nameInput.addEventListener("blur", validateName);
    emailInput.addEventListener("blur", validateEmail);
    messageInput.addEventListener("blur", validateMessage);
  }

  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 400 ||
        document.documentElement.scrollTop > 400
      ) {
        scrollTopBtn.style.display = "flex";
      } else {
        scrollTopBtn.style.display = "none";
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

document.body.classList.add("loading");

const loader = document.getElementById("loader");

window.onload = () => {
  loader.classList.add("hidden");
  document.body.classList.remove("loading");
};
