// script.js — Vatican City

// Navbar berubah tampilan saat user scroll ke bawah
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('navbar--scrolled');
  } else {
    navbar.classList.remove('navbar--scrolled');
  }
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

// Buat overlay menu mobile
const mobileOverlay = document.createElement('div');
mobileOverlay.id = 'mobileNav';

// Tombol X untuk tutup menu, ditaruh di dalam overlay
const closeBtn = document.createElement('button');
closeBtn.className = 'mobile-nav__close';
closeBtn.setAttribute('aria-label', 'Close menu');
closeBtn.innerHTML = `
  <span></span>
  <span></span>
`;

// Salin link dari navbar ke dalam overlay
const linksList = document.createElement('ul');
linksList.innerHTML = navLinks.innerHTML;

mobileOverlay.appendChild(closeBtn);
mobileOverlay.appendChild(linksList);
document.body.appendChild(mobileOverlay);

function openMenu() {
  mobileOverlay.classList.add('mobile-nav--open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileOverlay.classList.remove('mobile-nav--open');
  document.body.style.overflow = '';
}

// Hamburger buka menu, tombol X tutup menu
hamburger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);

// Klik link di menu mobile juga menutup menu
mobileOverlay.querySelectorAll('a').forEach(function(a) {
  a.addEventListener('click', closeMenu);
});

// Tekan ESC untuk menutup menu
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeMenu();
});

// Animasi elemen muncul saat di-scroll (Intersection Observer)
const observer = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

// Sembunyikan elemen dulu, lalu pantau kapan mereka terlihat
document.querySelectorAll('.card, .facts__inner, .facts__source').forEach(function(el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

// Validasi form newsletter di footer
const btn = document.querySelector('.footer__form button');
const input = document.querySelector('.footer__form input');

if (btn && input) {
  btn.addEventListener('click', function() {
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
