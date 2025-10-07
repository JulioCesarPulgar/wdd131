// Admin login for Digital Library - Improved with security
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('admin-login-form');
  const loginMessage = document.getElementById('admin-login-message');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const submitBtn = loginForm.querySelector('button[type="submit"]');
  
  // Rate limiting
  const MAX_ATTEMPTS = 5;
  const LOCKOUT_TIME = 300000; // 5 minutes in milliseconds
  const attemptsKey = 'loginAttempts';
  const lockoutKey = 'loginLockout';
  
  // Check if user is locked out
  function isLockedOut() {
    const lockoutUntil = localStorage.getItem(lockoutKey);
    if (lockoutUntil) {
      const lockoutTime = parseInt(lockoutUntil);
      if (Date.now() < lockoutTime) {
        const remainingTime = Math.ceil((lockoutTime - Date.now()) / 1000);
        return remainingTime;
      } else {
        // Lockout expired
        localStorage.removeItem(lockoutKey);
        localStorage.removeItem(attemptsKey);
        return 0;
      }
    }
    return 0;
  }
  
  // Get login attempts
  function getAttempts() {
    return parseInt(localStorage.getItem(attemptsKey) || '0');
  }
  
  // Increment login attempts
  function incrementAttempts() {
    const attempts = getAttempts() + 1;
    localStorage.setItem(attemptsKey, attempts.toString());
    return attempts;
  }
  
  // Reset attempts
  function resetAttempts() {
    localStorage.removeItem(attemptsKey);
    localStorage.removeItem(lockoutKey);
  }
  
  // Show error message
  function showError(message, type = 'error') {
    loginMessage.textContent = message;
    loginMessage.className = `message ${type}`;
    loginMessage.style.display = 'block';
  }
  
  // Clear message
  function clearMessage() {
    loginMessage.textContent = '';
    loginMessage.className = '';
    loginMessage.style.display = 'none';
  }
  
  // Check lockout on page load
  const lockedSeconds = isLockedOut();
  if (lockedSeconds > 0) {
    submitBtn.disabled = true;
    showError(`Too many failed attempts. Try again in ${Math.ceil(lockedSeconds / 60)} minutes.`, 'error');
    
    // Update countdown
    const countdown = setInterval(() => {
      const remaining = isLockedOut();
      if (remaining <= 0) {
        clearInterval(countdown);
        submitBtn.disabled = false;
        clearMessage();
      } else {
        showError(`Too many failed attempts. Try again in ${Math.ceil(remaining / 60)} minutes.`, 'error');
      }
    }, 1000);
  }
  
  // Form validation
  function validateForm() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!username) {
      showError('Username is required.', 'error');
      usernameInput.focus();
      return false;
    }
    
    if (username.length < 3) {
      showError('Username must be at least 3 characters.', 'error');
      usernameInput.focus();
      return false;
    }
    
    if (!password) {
      showError('Password is required.', 'error');
      passwordInput.focus();
      return false;
    }
    
    if (password.length < 6) {
      showError('Password must be at least 6 characters.', 'error');
      passwordInput.focus();
      return false;
    }
    
    return true;
  }
  
  // Form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Check lockout
    if (isLockedOut() > 0) {
      return;
    }
    
    // Clear previous messages
    clearMessage();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';
    
    // Simulate authentication delay (prevents timing attacks)
    setTimeout(() => {
      // Check credentials (in production, this should be server-side)
      if (username === 'admin' && password === 'admin123') {
        // Successful login
        resetAttempts();
        localStorage.setItem('loggedUser', username);
        sessionStorage.setItem('adminAuth', 'true');
        
        showError('Welcome, administrator! Redirecting...', 'success');
        
        // Redirect to catalog
        setTimeout(() => {
          window.location.href = 'catalog.html';
        }, 1000);
        
      } else {
        // Failed login
        const attempts = incrementAttempts();
        const remainingAttempts = MAX_ATTEMPTS - attempts;
        
        if (remainingAttempts <= 0) {
          // Lock account
          const lockoutUntil = Date.now() + LOCKOUT_TIME;
          localStorage.setItem(lockoutKey, lockoutUntil.toString());
          showError(`Too many failed attempts. Account locked for ${LOCKOUT_TIME / 60000} minutes.`, 'error');
        } else {
          showError(`Invalid credentials. ${remainingAttempts} attempt${remainingAttempts === 1 ? '' : 's'} remaining.`, 'error');
        }
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-icon">🔓</span> Login';
        
        // Clear password field
        passwordInput.value = '';
        passwordInput.focus();
      }
    }, 500);
  });
  
  // Clear error on input
  usernameInput.addEventListener('input', clearMessage);
  passwordInput.addEventListener('input', clearMessage);
  
  // Show remaining attempts
  const attempts = getAttempts();
  if (attempts > 0 && attempts < MAX_ATTEMPTS) {
    const remaining = MAX_ATTEMPTS - attempts;
    showError(`${remaining} login attempt${remaining === 1 ? '' : 's'} remaining.`, 'info');
  }
});