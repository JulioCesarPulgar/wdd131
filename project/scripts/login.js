// Login simple usando localStorage
// Carrusel simple
document.addEventListener('DOMContentLoaded', function() {
  let slideIdx = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let autoSlideInterval;
  function showSlide(idx) {
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    slideIdx = idx;
  }
  function nextSlide() {
    showSlide((slideIdx + 1) % slides.length);
  }
  function prevSlide() {
    showSlide((slideIdx - 1 + slides.length) % slides.length);
  }
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000);
  }
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => { prevSlide(); stopAutoSlide(); startAutoSlide(); });
    nextBtn.addEventListener('click', () => { nextSlide(); stopAutoSlide(); startAutoSlide(); });
    startAutoSlide();
  }
  showSlide(slideIdx);

  // Show public books
  const publicBooksList = document.getElementById('public-books-list');
  if (publicBooksList) {
    const books = JSON.parse(localStorage.getItem('booksList') || '[]');
    if (books.length === 0) {
      publicBooksList.innerHTML = '<p>No public books yet.</p>';
    } else {
      publicBooksList.innerHTML = books.map(book => `
        <div class="book-card">
          <img src="${book.cover}" alt="Cover" loading="lazy" width="80">
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
          <a href="${book.pdf}" target="_blank" class="btn"><span class="nav-icon" aria-label="PDF">📄</span> View PDF</a>
        </div>
      `).join('');
    }
  }
});

// Admin login protection
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    // Only admin can access management
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('loggedUser', username);
      sessionStorage.setItem('adminAuth', 'true');
      loginMessage.textContent = `Welcome, administrator!`;
      setTimeout(() => {
        window.location.href = 'catalog.html';
      }, 1000);
    } else {
      loginMessage.textContent = 'Access restricted to administrators.';
    }
  });
}
