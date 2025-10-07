// Book catalog module
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

function getBooks() {
  return JSON.parse(localStorage.getItem(booksKey) || '[]');
}
function saveBooks(books) {
  localStorage.setItem(booksKey, JSON.stringify(books));
}
function getGenres(books) {
  const genres = [...new Set(books.map(b => b.genre).filter(Boolean))];
  return genres.sort();
}
function renderGenreFilter() {
  const books = getBooks();
  const genres = getGenres(books);
  genreFilter.innerHTML = '<option value="">All genres</option>' + genres.map(g => `<option value="${g}">${g}</option>`).join('');
}
function renderBooks() {
  const books = getBooks();
  let filtered = books;
  const search = (searchInput?.value || '').toLowerCase();
  const genre = genreFilter?.value || '';
  if (search) {
    filtered = filtered.filter(b => b.title.toLowerCase().includes(search) || b.author.toLowerCase().includes(search));
  }
  if (genre) {
    filtered = filtered.filter(b => b.genre === genre);
  }
  if (filtered.length === 0) {
    booksListDiv.innerHTML = '<p>No books found.</p>';
    return;
  }
  booksListDiv.innerHTML = filtered.map((book, idx) => `
    <div class="book-card" tabindex="0" aria-label="Book: ${book.title}">
      <img src="${book.cover}" alt="Cover" loading="lazy" width="80" onerror="this.src='images/default-cover.png'">
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Genre:</strong> ${book.genre || 'N/A'}</p>
      <p><strong>Year:</strong> ${book.year || 'N/A'}</p>
      <p>${book.description ? book.description : ''}</p>
      <button onclick="editBook(${idx})" title="Edit"><span class="nav-icon" aria-label="Edit">✏️</span></button>
      <button onclick="deleteBook(${idx})" title="Delete"><span class="nav-icon" aria-label="Delete">🗑️</span></button>
      <button onclick="previewPDF('${book.pdf}')" title="Preview PDF"><span class="nav-icon" aria-label="PDF">📄</span></button>
    </div>
  `).join('');
}
window.editBook = function(idx) {
  const books = getBooks();
  const book = books[idx];
  document.getElementById('book-id').value = idx;
  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  document.getElementById('genre').value = book.genre || '';
  document.getElementById('year').value = book.year || '';
  document.getElementById('description').value = book.description || '';
  document.getElementById('pdf').value = book.pdf;
  document.getElementById('cover').value = book.cover;
  bookFormSection.style.display = 'block';
  booksSection.style.display = 'none';
  pdfPreviewSection.style.display = 'none';
  document.getElementById('form-title').textContent = 'Edit Book';
}
window.deleteBook = function(idx) {
  if (confirm('Delete this book?')) {
    const books = getBooks();
    books.splice(idx, 1);
    saveBooks(books);
    renderBooks();
    renderGenreFilter();
    showFeedback('Book deleted.', 'success');
  }
}
window.previewPDF = function(pdfUrl) {
  pdfPreview.src = pdfUrl;
  pdfPreviewSection.style.display = 'block';
  booksSection.style.display = 'none';
  bookFormSection.style.display = 'none';
}
addBookBtn.addEventListener('click', () => {
  bookForm.reset();
  document.getElementById('book-id').value = '';
  bookFormSection.style.display = 'block';
  booksSection.style.display = 'none';
  pdfPreviewSection.style.display = 'none';
  document.getElementById('form-title').textContent = 'Add Book';
});
cancelBtn.addEventListener('click', () => {
  bookFormSection.style.display = 'none';
  booksSection.style.display = 'block';
});
closePreviewBtn.addEventListener('click', () => {
  pdfPreviewSection.style.display = 'none';
  booksSection.style.display = 'block';
});
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
  if (!title || !author || !pdf || !cover || !genre) {
    showFeedback('Please fill in all required fields.', 'error');
    return;
  }
  const books = getBooks();
  const bookObj = { title, author, genre, year, description, pdf, cover };
  if (idx === '') {
    books.push(bookObj);
    showFeedback('Book added!', 'success');
  } else {
    books[idx] = bookObj;
    showFeedback('Book updated!', 'success');
  }
  saveBooks(books);
  renderBooks();
  renderGenreFilter();
  bookFormSection.style.display = 'none';
  booksSection.style.display = 'block';
});
function showFeedback(msg, type) {
  if (!feedbackDiv) return;
  feedbackDiv.textContent = msg;
  feedbackDiv.className = type;
  setTimeout(() => { feedbackDiv.textContent = ''; feedbackDiv.className = ''; }, 2500);
}
if (searchInput) searchInput.addEventListener('input', renderBooks);
if (genreFilter) genreFilter.addEventListener('change', renderBooks);
// Initialization
renderBooks();
renderGenreFilter();
function getBooks() {
  return JSON.parse(localStorage.getItem(booksKey) || '[]');
}
function saveBooks(books) {
  localStorage.setItem(booksKey, JSON.stringify(books));
}
function renderBooks() {
  const books = getBooks();
  if (books.length === 0) {
    booksListDiv.innerHTML = '<p>No hay libros aún.</p>';
    return;
  }
  booksListDiv.innerHTML = books.map((book, idx) => `
    <div class="book-card">
      <img src="${book.cover}" alt="Portada" loading="lazy" width="80">
      <h3>${book.title}</h3>
      <p><strong>Autor:</strong> ${book.author}</p>
      <button onclick="editBook(${idx})">Editar</button>
      <button onclick="deleteBook(${idx})">Eliminar</button>
      <button onclick="previewPDF('${book.pdf}')">Previsualizar PDF</button>
    </div>
  `).join('');
}
window.editBook = function(idx) {
  const books = getBooks();
  const book = books[idx];
  document.getElementById('book-id').value = idx;
  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  document.getElementById('pdf').value = book.pdf;
  document.getElementById('cover').value = book.cover;
  bookFormSection.style.display = 'block';
  booksSection.style.display = 'none';
  pdfPreviewSection.style.display = 'none';
  document.getElementById('form-title').textContent = 'Editar Libro';
}
window.deleteBook = function(idx) {
  if (confirm('¿Eliminar este libro?')) {
    const books = getBooks();
    books.splice(idx, 1);
    saveBooks(books);
    renderBooks();
  }
}
window.previewPDF = function(pdfUrl) {
  pdfPreview.src = pdfUrl;
  pdfPreviewSection.style.display = 'block';
  booksSection.style.display = 'none';
  bookFormSection.style.display = 'none';
}
addBookBtn.addEventListener('click', () => {
  bookForm.reset();
  document.getElementById('book-id').value = '';
  bookFormSection.style.display = 'block';
  booksSection.style.display = 'none';
  pdfPreviewSection.style.display = 'none';
  document.getElementById('form-title').textContent = 'Añadir Libro';
});
cancelBtn.addEventListener('click', () => {
  bookFormSection.style.display = 'none';
  booksSection.style.display = 'block';
});
closePreviewBtn.addEventListener('click', () => {
  pdfPreviewSection.style.display = 'none';
  booksSection.style.display = 'block';
});
bookForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const idx = document.getElementById('book-id').value;
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const pdf = document.getElementById('pdf').value.trim();
  const cover = document.getElementById('cover').value.trim();
  if (!title || !author || !pdf || !cover) return;
  const books = getBooks();
  const bookObj = { title, author, pdf, cover };
  if (idx === '') {
    books.push(bookObj);
  } else {
    books[idx] = bookObj;
  }
  saveBooks(books);
  renderBooks();
  bookFormSection.style.display = 'none';
  booksSection.style.display = 'block';
});
// Inicialización
renderBooks();
