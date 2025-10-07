// Login simple usando localStorage
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  if (username && password) {
    localStorage.setItem('loggedUser', username);
    loginMessage.textContent = `Bienvenido, ${username}!`;
    setTimeout(() => {
      window.location.href = 'catalog.html';
    }, 1000);
  } else {
    loginMessage.textContent = 'Usuario y contraseña requeridos.';
  }
});

// Si ya está logueado, redirige
if (localStorage.getItem('loggedUser')) {
  window.location.href = 'catalog.html';
}
