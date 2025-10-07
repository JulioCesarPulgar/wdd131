// CRUD de libros usando localStorage y previsualizador PDF
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
