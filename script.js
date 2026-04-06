const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");
const currentYear = document.querySelector("#current-year");
const navLinks = document.querySelectorAll('.site-nav a:not(.nav-cta), .mobile-menu a:not(.nav-cta)');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear().toString();
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  });
}

const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const updateActiveNav = () => {
  const scrollPosition = window.scrollY + 140;

  let activeId = "";
  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("is-active", isActive);
  });
};

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const projectType = String(formData.get("projectType") || "").trim();
    const details = String(formData.get("details") || "").trim();

    const subject = encodeURIComponent(`${projectType} from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nDetails:\n${details}`
    );

    window.location.href = `mailto:rudrahankare2006@gmail.com?subject=${subject}&body=${body}`;
    formMessage.textContent = `Thanks ${name}! Your message is ready in your email app.`;
    contactForm.reset();
  });
}
