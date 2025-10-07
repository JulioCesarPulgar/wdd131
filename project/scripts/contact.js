// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  
  // Form field elements
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const subjectSelect = document.getElementById('subject');
  const messageTextarea = document.getElementById('message');
  
  // Error message elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');
  
  // Submit button elements
  const submitBtn = form.querySelector('.submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');

  // Validation functions
  function validateName(name) {
    if (name.trim().length === 0) {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    return '';
  }

  function validateEmail(email) {
    if (email.trim().length === 0) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  function validatePhone(phone) {
    if (phone.trim().length === 0) {
      return ''; // Phone is optional
    }
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
      return 'Please enter a valid phone number';
    }
    return '';
  }

  function validateSubject(subject) {
    if (subject === '') {
      return 'Please select a subject';
    }
    return '';
  }

  function validateMessage(message) {
    if (message.trim().length === 0) {
      return 'Message is required';
    }
    if (message.trim().length < 10) {
      return 'Message must be at least 10 characters';
    }
    return '';
  }

  // Display error message
  function showError(element, message) {
    element.textContent = message;
    element.previousElementSibling.classList.add('error');
  }

  // Clear error message
  function clearError(element) {
    element.textContent = '';
    element.previousElementSibling.classList.remove('error');
  }

  // Real-time validation
  nameInput.addEventListener('blur', function() {
    const error = validateName(this.value);
    if (error) {
      showError(nameError, error);
    } else {
      clearError(nameError);
    }
  });

  emailInput.addEventListener('blur', function() {
    const error = validateEmail(this.value);
    if (error) {
      showError(emailError, error);
    } else {
      clearError(emailError);
    }
  });

  phoneInput.addEventListener('blur', function() {
    const error = validatePhone(this.value);
    if (error) {
      showError(phoneError, error);
    } else {
      clearError(phoneError);
    }
  });

  subjectSelect.addEventListener('change', function() {
    const error = validateSubject(this.value);
    if (error) {
      showError(subjectError, error);
    } else {
      clearError(subjectError);
    }
  });

  messageTextarea.addEventListener('blur', function() {
    const error = validateMessage(this.value);
    if (error) {
      showError(messageError, error);
    } else {
      clearError(messageError);
    }
  });

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    const nameErr = validateName(nameInput.value);
    const emailErr = validateEmail(emailInput.value);
    const phoneErr = validatePhone(phoneInput.value);
    const subjectErr = validateSubject(subjectSelect.value);
    const messageErr = validateMessage(messageTextarea.value);

    // Display errors
    if (nameErr) showError(nameError, nameErr);
    else clearError(nameError);

    if (emailErr) showError(emailError, emailErr);
    else clearError(emailError);

    if (phoneErr) showError(phoneError, phoneErr);
    else clearError(phoneError);

    if (subjectErr) showError(subjectError, subjectErr);
    else clearError(subjectError);

    if (messageErr) showError(messageError, messageErr);
    else clearError(messageError);

    // If there are any errors, stop submission
    if (nameErr || emailErr || phoneErr || subjectErr || messageErr) {
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';

    // Simulate form submission (replace with actual API call)
    setTimeout(function() {
      // Hide form and show success message
      form.style.display = 'none';
      successMessage.style.display = 'block';

      // Log form data (in production, send to server)
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        subject: subjectSelect.value,
        message: messageTextarea.value,
        newsletter: document.getElementById('newsletter').checked
      };
      console.log('Form submitted:', formData);

      // Reset form after 3 seconds and show it again
      setTimeout(function() {
        form.reset();
        form.style.display = 'flex';
        successMessage.style.display = 'none';
        submitBtn.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
      }, 3000);
    }, 1500);
  });

  // FAQ Accordion functionality
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function(question) {
    question.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Close all other FAQ items
      faqQuestions.forEach(function(q) {
        q.setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isExpanded) {
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Keyboard navigation for FAQ
  faqQuestions.forEach(function(question) {
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
});