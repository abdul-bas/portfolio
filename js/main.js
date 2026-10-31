document.addEventListener("DOMContentLoaded", () => {
  // ---- Footer year ----
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Sticky header background on scroll ----
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    if (window.scrollY > 20) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");

  navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  // ---- Active nav link tracking ----
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-list a");

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  sections.forEach((section) => navObserver.observe(section));

  // ---- Scroll-triggered reveal ----
  
  const skillCards = Array.from(document.querySelectorAll(".skills-grid .card"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const cardIndex = skillCards.indexOf(el);

        if (cardIndex !== -1) {
          const delay = cardIndex * 90;
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-visible");
          window.setTimeout(() => {
            el.style.transitionDelay = "";
          }, delay + 600);
        } else {
          el.classList.add("is-visible");
        }

        revealObserver.unobserve(el);
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".scroll-reveal").forEach((el) => revealObserver.observe(el));

  // ---- Contact form: compose a pre-filled email ----
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !subject || !message) return;

      const body = `From: ${name} (${email})\n\n${message}`;
      const mailto = `mailto:abdulbasith.dev@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
    });
  }
});