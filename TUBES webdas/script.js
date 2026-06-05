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
// Fix: backdrop-filter on .navbar--scrolled creates a stacking context that
// traps z-index inside it — including the hamburger button. So even z-index:99999
// on the hamburger still renders *under* the overlay because they're in different
// stacking contexts. Solution: put the close button INSIDE the overlay itself,
// so it's guaranteed to be in the same stacking context and always on top.

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

// Build body-level overlay (avoids backdrop-filter stacking context trap)
const mobileOverlay = document.createElement('div');
mobileOverlay.id = 'mobileNav';
mobileOverlay.setAttribute('aria-hidden', 'true');

// Close button lives INSIDE the overlay — not subject to navbar stacking context
const closeBtn = document.createElement('button');
closeBtn.className = 'mobile-nav__close';
closeBtn.setAttribute('aria-label', 'Close menu');
closeBtn.innerHTML = `
  <span></span>
  <span></span>
`;

// Clone links from original nav
const linksList = document.createElement('ul');
linksList.innerHTML = navLinks.innerHTML;

mobileOverlay.appendChild(closeBtn);
mobileOverlay.appendChild(linksList);
document.body.appendChild(mobileOverlay);

function openMenu() {
  mobileOverlay.classList.add('mobile-nav--open');
  mobileOverlay.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileOverlay.classList.remove('mobile-nav--open');
  mobileOverlay.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// Hamburger opens, close button closes
hamburger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);

// Close on link click
mobileOverlay.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMenu);
});

// Close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// ── Scroll animation ──────────────────────────────
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
