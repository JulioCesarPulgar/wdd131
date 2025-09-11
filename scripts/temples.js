// Footer dynamic year and last modified
const yearSpan = document.getElementById('currentyear');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
const lastModified = document.getElementById('lastModified');
if (lastModified) {
  lastModified.textContent = document.lastModified;
}
// Hamburger menu functionality
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');
if (menuBtn && mainNav) {
  menuBtn.addEventListener('click', () => {
    if (mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      menuBtn.innerHTML = '&#9776;'; // Hamburger
    } else {
      mainNav.classList.add('open');
      menuBtn.innerHTML = '&times;'; // X symbol
    }
  });
}
