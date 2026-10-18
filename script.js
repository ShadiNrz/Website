"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#nav-links");
const navigationLinks = [...navigation.querySelectorAll('a[href^="#"]')];

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("open", !isOpen);
});

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav")) closeMenu();
});
window.matchMedia("(min-width: 761px)").addEventListener("change", closeMenu);

const sections = [...document.querySelectorAll("main > section[id]")];
let scrollPending = false;
function updateNavigation() {
  let activeId = sections[0].id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 150) activeId = section.id;
  }
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 5
  ) {
    activeId = sections[sections.length - 1].id;
  }
  navigationLinks.forEach((link) => {
    const active = link.hash === `#${activeId}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  scrollPending = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!scrollPending) {
      scrollPending = true;
      window.requestAnimationFrame(updateNavigation);
    }
  },
  { passive: true },
);
window.addEventListener("resize", updateNavigation);
updateNavigation();

const filters = [...document.querySelectorAll(".filter")];
const publications = [...document.querySelectorAll(".publication")];
filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle("active", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });
    let visibleCount = 0;
    publications.forEach((publication) => {
      const visible =
        button.dataset.filter === "all" ||
        publication.dataset.year === button.dataset.filter;
      publication.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    document.querySelector("#publication-count").textContent =
      `${visibleCount} publications shown.`;
  });
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
