// script.js — Vatican City

// ── Navbar scroll effect ───────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('navbar--scrolled');
  } else {
    navbar.classList.remove('navbar--scrolled');
  }
});

// ── Mobile hamburger ───────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('navbar__links--open');
  hamburger.classList.toggle('navbar__hamburger--open', open);
});

// close menu on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('navbar__links--open');
    hamburger.classList.remove('navbar__hamburger--open');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.card, .facts__inner, .facts__source').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

// ── Newsletter subscribe ───────────────────────────
const btn = document.querySelector('.footer__form button');
const input = document.querySelector('.footer__form input');

if (btn && input) {
  btn.addEventListener('click', () => {
    const email = input.value.trim();
    if (!email || !email.includes('@')) {
      input.style.borderColor = '#c0392b';
      input.placeholder = 'Please enter a valid email';
      return;
    }
    input.style.borderColor = '';
    btn.textContent = 'Subscribed ✓';
    btn.style.background = '#27ae60';
    btn.disabled = true;
    input.value = '';
    input.placeholder = 'Thank you!';
  });
}
