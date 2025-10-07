// Admin login for Digital Library
const loginForm = document.getElementById('admin-login-form');
const loginMessage = document.getElementById('admin-login-message');

if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('loggedUser', username);
      sessionStorage.setItem('adminAuth', 'true');
      loginMessage.textContent = 'Welcome, administrator!';
      setTimeout(() => {
        window.location.href = 'catalog.html';
      }, 1000);
    } else {
      loginMessage.textContent = 'Access restricted to administrators.';
    }
  });
}
