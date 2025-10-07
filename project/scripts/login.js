// Login and Carousel - Improved version
document.addEventListener('DOMContentLoaded', function() {
  
  // ========== CAROUSEL ==========
  initCarousel();
  
  // ========== PUBLIC BOOKS ==========
  displayPublicBooks();
  
  // ========== ADMIN MENU LINK ==========
  checkAdminAccess();
});

// Carousel functionality
function initCarousel() {
  let slideIdx = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let autoSlideInterval;
  
  if (!slides.length) return;
  
  function showSlide(idx) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === idx);
      s.setAttribute('aria-hidden', i !== idx);
    });
    slideIdx = idx;
  }
  
  function nextSlide() {
    showSlide((slideIdx + 1) % slides.length);
  }
  
  function prevSlide() {
    showSlide((slideIdx - 1 + slides.length) % slides.length);
  }
  
  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 5000);
  }
  
  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  }
  
  // Event listeners
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => { 
      prevSlide(); 
      stopAutoSlide(); 
      startAutoSlide(); 
    });
    
    nextBtn.addEventListener('click', () => { 
      nextSlide(); 
      stopAutoSlide(); 
      startAutoSlide(); 
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
      }
    });
    
    // Pause on hover
    const carousel = document.querySelector('.carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAutoSlide);
      carousel.addEventListener('mouseleave', startAutoSlide);
    }
    
    startAutoSlide();
  }
  
  showSlide(slideIdx);
}

// Display public books
function displayPublicBooks() {
  const publicBooksList = document.getElementById('public-books-list');
  if (!publicBooksList) return;
  
  try {
    const books = JSON.parse(localStorage.getItem('booksList') || '[]');
    
    if (books.length === 0) {
      publicBooksList.innerHTML = `
        <div class="empty-state">
          <p>📚 No books available yet.</p>
          <p>Check back soon for new additions!</p>
        </div>
      `;
      return;
    }
    
    // Show featured books (limit to 6)
    const featuredBooks = books.slice(0, 6);
    
    publicBooksList.innerHTML = featuredBooks.map(book => `
      <div class="book-card" tabindex="0" aria-label="Book: ${escapeHtml(book.title)}">
        <img 
          src="${escapeHtml(book.cover)}" 
          alt="Cover of ${escapeHtml(book.title)}" 
          loading="lazy" 
          width="150"
          height="200"
          onerror="this.src='images/default-cover.png'; this.onerror=null;"
        />
        <h3>${escapeHtml(book.title)}</h3>
        <p><strong>Author:</strong> ${escapeHtml(book.author)}</p>
        ${book.genre ? `<p><strong>Genre:</strong> ${escapeHtml(book.genre)}</p>` : ''}
        <a href="${escapeHtml(book.pdf)}" target="_blank" rel="noopener noreferrer" class="btn">
          <span class="nav-icon" aria-label="PDF">📄</span> View PDF
        </a>
      </div>
    `).join('');
    
  } catch (e) {
    console.error('Error loading books:', e);
    publicBooksList.innerHTML = '<p>Error loading books. Please try again later.</p>';
  }
}

// Check admin access
function checkAdminAccess() {
  const adminMenuLink = document.getElementById('admin-menu-link');
  if (!adminMenuLink) return;
  
  const isAdmin = sessionStorage.getItem('adminAuth') === 'true';
  
  if (isAdmin) {
    adminMenuLink.innerHTML = '<span class="nav-icon" aria-label="Catalog">📚</span> Catalog';
    adminMenuLink.href = 'catalog.html';
  }
}

// Security: Escape HTML
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}