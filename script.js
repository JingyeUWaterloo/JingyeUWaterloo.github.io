const sidebar = document.querySelector(".sidebar");
const mobileMenu = document.querySelector(".mobile-menu");
const navItems = [...document.querySelectorAll(".nav-item")];
const sections = [...document.querySelectorAll("main section[id]")];

if (mobileMenu && sidebar) {
  mobileMenu.addEventListener("click", () => {
    const expanded = mobileMenu.getAttribute("aria-expanded") === "true";
    mobileMenu.setAttribute("aria-expanded", String(!expanded));
    sidebar.classList.toggle("open");
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    sidebar?.classList.remove("open");
    mobileMenu?.setAttribute("aria-expanded", "false");
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navItems.forEach((item) => {
      item.classList.toggle(
        "active",
        item.getAttribute("href") === `#${visible.target.id}`
      );
    });
  },
  { threshold: [0.2, 0.45, 0.65], rootMargin: "-8% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
);

document.querySelectorAll(".reveal").forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 3, 2) * 55}ms`;
  revealObserver.observe(el);
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
