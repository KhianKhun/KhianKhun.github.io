/* 
AI Usage (CMU 15-113 requirement):
- I used AI to generate an initial portfolio template: section structure (hero/about/projects/contact),
  responsive layout ideas (grid + media queries), and basic JS interactions (theme toggle, mobile nav).
- I then modified it by simplifying the design, adding my own content placeholders, and ensuring the
  code is readable and explainable at my level.
*/

const root = document.documentElement;

function setTheme(theme) {
  if (theme === "light") root.classList.add("light");
  else root.classList.remove("light");
  localStorage.setItem("theme", theme);
}

function getSavedTheme() {
  return localStorage.getItem("theme") || "dark";
}

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
setTheme(getSavedTheme());

themeToggle?.addEventListener("click", () => {
  const isLight = root.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu after clicking a link
navLinks?.addEventListener("click", (e) => {
  const target = e.target;
  if (target instanceof HTMLAnchorElement) {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Simple client-side form validation (no backend)
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !email || !message) {
    statusEl.textContent = "Please fill in all fields.";
    return;
  }
  if (!emailOk) {
    statusEl.textContent = "Please enter a valid email address.";
    return;
  }

  statusEl.textContent = "Looks good. (This demo only validates; it does not send.)";
  form.reset();
});

// --- Easter egg: self-link + toast ---
const selfLink = document.getElementById("selfLink");
const toast = document.getElementById("toast");

const eggLines = [
  "Recursion!",
  "You are reading what you are reading!",
  "Self-reference detected. Proceed carefully!",
];

let toastTimer = null;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
}

selfLink?.addEventListener("click", (e) => {
  e.preventDefault();

  window.scrollTo({ top: 0, behavior: "smooth" });

  const msg = eggLines[Math.floor(Math.random() * eggLines.length)];
  showToast(msg);

  history.replaceState(null, "", "#top");
});
