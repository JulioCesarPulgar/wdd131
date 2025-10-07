// Book catalog module - Improved version
const booksKey = 'booksList';
const booksSection = document.getElementById('books-section');
const booksListDiv = document.getElementById('books-list');
const addBookBtn = document.getElementById('add-book-btn');
const bookFormSection = document.getElementById('book-form-section');
const bookForm = document.getElementById('book-form');
const cancelBtn = document.getElementById('cancel-btn');
const pdfPreviewSection = document.getElementById('pdf-preview-section');
const pdfPreview = document.getElementById('pdf-preview');
const closePreviewBtn = document.getElementById('close-preview-btn');
const searchInput = document.getElementById('search-input');
const genreFilter = document.getElementById('genre-filter');
const feedbackDiv = document.getElementById('catalog-feedback');

// Local Storage helpers
function getBooks() {
  try {
    return JSON.parse(localStorage.getItem(booksKey) || '[]');
  } catch (e) {
    console.error('Error reading books from localStorage:', e);
    return [];
  }
}

function saveBooks(books) {
  try {
    localStorage.setItem(booksKey, JSON.stringify(books));
    return true;
  } catch (e) {
    console.error('Error saving books to localStorage:', e);
    showFeedback('Error saving data. Storage may be full.', 'error');
    return false;
  }
}

// Genre management
function getGenres(books) {
  const genres = [...new Set(books.map(b => b.genre).filter(Boolean))];
  return genres.sort();
}

function renderGenreFilter() {
  const books = getBooks();
  const genres = getGenres(books);
  genreFilter.innerHTML = '<option value="">All genres</option>' + 
    genres.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('');
}

// Security: Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Render books with improved error handling
function renderBooks() {
  const books = getBooks();
  let filtered = books;
  
  // Apply filters
  const search = (searchInput?.value || '').toLowerCase().trim();
  const genre = genreFilter?.value || '';
  
  if (search) {
    filtered = filtered.filter(b => 
      b.title.toLowerCase().includes(search) || 
      b.author.toLowerCase().includes(search)
    );
  }
  
  if (genre) {
    filtered = filtered.filter(b => b.genre === genre);
  }
  
  // Empty state
  if (filtered.length === 0) {
    booksListDiv.innerHTML = `
      <div class="empty-state">
        <p>📚 No books found.</p>
        ${search || genre ? '<p>Try adjusting your filters.</p>' : ''}
      </div>
    `;
    return;
  }
  
  // Render books
  booksListDiv.innerHTML = filtered.map((book, idx) => {
    const originalIdx = books.indexOf(book); // Get original index for edit/delete
    return `
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
        <p><strong>Genre:</strong> ${escapeHtml(book.genre || 'N/A')}</p>
        <p><strong>Year:</strong> ${escapeHtml(book.year || 'N/A')}</p>
        ${book.description ? `<p class="book-description">${escapeHtml(book.description)}</p>` : ''}
        
        <div class="book-actions">
          <button onclick="editBook(${originalIdx})" class="btn-edit" title="Edit book">
            <span class="nav-icon" aria-label="Edit">✏️</span> Edit
          </button>
          <button onclick="deleteBook(${originalIdx})" class="btn-delete" title="Delete book">
            <span class="nav-icon" aria-label="Delete">🗑️</span> Delete
          </button>
          <button onclick="previewPDF('${escapeHtml(book.pdf)}')" class="btn-preview" title="Preview PDF">
            <span class="nav-icon" aria-label="PDF">📄</span> Preview
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Edit book
window.editBook = function(idx) {
  const books = getBooks();
  const book = books[idx];
  
  if (!book) {
    showFeedback('Book not found.', 'error');
    return;
  }
  
  document.getElementById('book-id').value = idx;
  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  document.getElementById('genre').value = book.genre || '';
  document.getElementById('year').value = book.year || '';
  document.getElementById('description').value = book.description || '';
  document.getElementById('pdf').value = book.pdf;
  document.getElementById('cover').value = book.cover;
  
  showSection('form');
  document.getElementById('form-title').textContent = 'Edit Book';
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Delete book with confirmation
window.deleteBook = function(idx) {
  const books = getBooks();
  const book = books[idx];
  
  if (!book) {
    showFeedback('Book not found.', 'error');
    return;
  }
  
  if (confirm(`Are you sure you want to delete "${book.title}" by ${book.author}?`)) {
    books.splice(idx, 1);
    
    if (saveBooks(books)) {
      renderBooks();
      renderGenreFilter();
      showFeedback('Book deleted successfully.', 'success');
    }
  }
}

// Preview PDF
window.previewPDF = function(pdfUrl) {
  if (!pdfUrl) {
    showFeedback('PDF URL not available.', 'error');
    return;
  }
  
  pdfPreview.src = pdfUrl;
  showSection('preview');
}

// Section management
function showSection(section) {
  booksSection.style.display = 'none';
  bookFormSection.style.display = 'none';
  pdfPreviewSection.style.display = 'none';
  
  switch(section) {
    case 'list':
      booksSection.style.display = 'block';
      break;
    case 'form':
      bookFormSection.style.display = 'block';
      break;
    case 'preview':
      pdfPreviewSection.style.display = 'block';
      break;
  }
}

// Add book button
addBookBtn.addEventListener('click', () => {
  bookForm.reset();
  document.getElementById('book-id').value = '';
  showSection('form');
  document.getElementById('form-title').textContent = 'Add Book';
  document.getElementById('title').focus();
});

// Cancel button
cancelBtn.addEventListener('click', () => {
  if (bookForm.querySelector('input, textarea').value && 
      !confirm('Discard changes?')) {
    return;
  }
  showSection('list');
});

// Close preview button
closePreviewBtn.addEventListener('click', () => {
  pdfPreview.src = '';
  showSection('list');
});

// Form submission
bookForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const idx = document.getElementById('book-id').value;
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const genre = document.getElementById('genre').value.trim();
  const year = document.getElementById('year').value.trim();
  const description = document.getElementById('description').value.trim();
  const pdf = document.getElementById('pdf').value.trim();
  const cover = document.getElementById('cover').value.trim();
  
  // Validation
  if (!title || !author || !pdf || !cover || !genre) {
    showFeedback('Please fill in all required fields.', 'error');
    return;
  }
  
  // Validate URLs
  if (!isValidUrl(pdf) || !isValidUrl(cover)) {
    showFeedback('Please enter valid URLs for PDF and cover.', 'error');
    return;
  }
  
  const books = getBooks();
  const bookObj = { 
    title, 
    author, 
    genre, 
    year, 
    description, 
    pdf, 
    cover,
    dateAdded: idx === '' ? new Date().toISOString() : (books[idx]?.dateAdded || new Date().toISOString()),
    dateModified: new Date().toISOString()
  };
  
  if (idx === '') {
    books.push(bookObj);
    showFeedback('Book added successfully!', 'success');
  } else {
    books[idx] = bookObj;
    showFeedback('Book updated successfully!', 'success');
  }
  
  if (saveBooks(books)) {
    renderBooks();
    renderGenreFilter();
    showSection('list');
  }
});

// URL validation
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Feedback messages
function showFeedback(msg, type) {
  if (!feedbackDiv) return;
  
  feedbackDiv.textContent = msg;
  feedbackDiv.className = `feedback ${type}`;
  feedbackDiv.style.display = 'block';
  
  // Auto-hide after 3 seconds
  setTimeout(() => { 
    feedbackDiv.textContent = ''; 
    feedbackDiv.className = ''; 
    feedbackDiv.style.display = 'none';
  }, 3000);
}

// Debounce function for search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Search with debounce
if (searchInput) {
  const debouncedRender = debounce(renderBooks, 300);
  searchInput.addEventListener('input', debouncedRender);
}

// Genre filter
if (genreFilter) {
  genreFilter.addEventListener('change', renderBooks);
}

// Keyboard navigation for book cards
document.addEventListener('keydown', function(e) {
  const focusedCard = document.activeElement;
  if (focusedCard && focusedCard.classList.contains('book-card')) {
    if (e.key === 'Enter') {
      const editBtn = focusedCard.querySelector('.btn-edit');
      if (editBtn) editBtn.click();
    }
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  renderBooks();
  renderGenreFilter();
  
  // Set initial focus
  if (searchInput) {
    searchInput.focus();
  }
});

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getBooks, saveBooks, renderBooks };
}