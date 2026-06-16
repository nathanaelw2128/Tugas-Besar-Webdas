
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
const navLinks = document.getElementById('navLinks');

// Buat overlay menu mobile
const mobileOverlay = document.createElement('div');
mobileOverlay.id = 'mobileNav';

// Tombol X untuk tutup menu, ditaruh di dalam overlay
const closeBtn = document.createElement('button');
closeBtn.className = 'mobile-nav__close';
closeBtn.setAttribute('aria-label', 'Close menu');
closeBtn.textContent = '✕';

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
mobileOverlay.querySelectorAll('a').forEach(function (a) {
  a.addEventListener('click', closeMenu);
});

