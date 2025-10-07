// Article page logic - Improved version
document.addEventListener('DOMContentLoaded', function () {
  initArticlePage();
});

// Get query parameter from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Articles data (in production, fetch from API/database)
const articles = [
  {
    id: '1',
    title: 'The Art of Writing',
    author: 'Jane Smith',
    category: 'Inspiration',
    date: '2025-01-15',
    image: 'images/blog1.jpg',
    content: `Writing is a journey of self-discovery. Every word penned is a step towards understanding the world and oneself. Authors share their thoughts, dreams, and experiences, inviting readers to join them on this creative adventure.<br><br>In this article, Jane Smith explores the creative process, the challenges of writer's block, and the joy of finding one's voice. She shares personal anecdotes and advice for aspiring writers.<br><br>The key to good writing is practice and persistence. Don't be afraid to make mistakes, as they are part of the learning process.`,
  },
  {
    id: '2',
    title: 'Literature as a Mirror',
    author: 'Carlos Rivera',
    category: 'Reflection',
    date: '2025-01-20',
    image: 'images/blog2.jpg',
    content: `Literature reflects the complexities of life. Through stories, poems, and essays, writers explore human emotions, societal changes, and timeless truths, helping readers see themselves and others more clearly.<br><br>Carlos Rivera discusses how literature can be a tool for empathy and understanding, and how authors use their work to comment on the world around them.`,
  },
  {
    id: '3',
    title: 'Letter to the Fans',
    author: 'Emily Turner',
    category: 'Community',
    date: '2025-01-25',
    image: 'images/blog3.jpg',
    content: `Dear readers, your passion for books fuels our creativity. Every page is written with you in mind, hoping to spark curiosity, joy, and reflection. Thank you for being part of our literary family.<br><br>Emily Turner shares her gratitude and stories from her interactions with fans, highlighting the importance of community in the literary world.`,
  },
  {
    id: '4',
    title: 'Imagination Unleashed',
    author: 'Mark Lee',
    category: 'Creativity',
    date: '2025-01-28',
    image: 'images/blog4.jpg',
    content: `Imagination is the heart of storytelling. Authors encourage everyone to dream big, create worlds, and explore ideas beyond the ordinary. Literature is where imagination finds its voice.<br><br>Mark Lee explores techniques for boosting creativity and the role of imagination in both writing and reading.`,
  },
  {
    id: '5',
    title: 'The Writing Process',
    author: 'Sophia Kim',
    category: 'Craft',
    date: '2025-02-01',
    image: 'images/blog5.jpg',
    content: `From brainstorming to editing, writing is a craft that requires patience and dedication. Authors share tips and personal routines to help aspiring writers develop their own style and discipline.<br><br>Sophia Kim details her writing routine, favorite tools, and advice for staying motivated throughout the process.`,
  },
  {
    id: '6',
    title: 'Exploring Genres',
    author: 'Daniel Green',
    category: 'Genres',
    date: '2025-02-05',
    image: 'images/blog6.jpg',
    content: `Genres offer unique perspectives and experiences. Whether it's fantasy, mystery, romance, or non-fiction, each genre invites readers to discover new worlds and ideas.<br><br>Daniel Green provides an overview of popular genres and tips for choosing the right one for your next read or writing project.`,
  },
  {
    id: '7',
    title: 'Building a Reading Culture',
    author: 'Olivia Brown',
    category: 'Culture',
    date: '2025-02-08',
    image: 'images/blog7.jpg',
    content: `Reading enriches lives and communities. Authors advocate for libraries, book clubs, and family reading time, believing that a love for books should be nurtured from childhood.<br><br>Olivia Brown shares ideas for promoting reading in schools, families, and communities.`,
  },
  {
    id: '8',
    title: "Overcoming Writer's Block",
    author: 'Alex Martinez',
    category: 'Motivation',
    date: '2025-02-12',
    image: 'images/blog8.jpg',
    content: `Writer's block is a common challenge. Authors share strategies to reignite creativity, such as free writing, changing environments, and reading widely.<br><br>Alex Martinez offers practical exercises and encouragement for writers facing creative obstacles.`,
  },
  {
    id: '9',
    title: 'The Future of Digital Publishing',
    author: 'Priya Singh',
    category: 'Technology',
    date: '2025-02-15',
    image: 'images/blog9.jpg',
    content: `Digital platforms have revolutionized literature. Authors discuss the opportunities and challenges of publishing online, reaching global audiences, and adapting to new technologies.<br><br>Priya Singh analyzes trends in digital publishing and what they mean for authors and readers.`,
  },
];

// Initialize article page
function initArticlePage() {
  const articleId = getQueryParam('id');

  if (!articleId) {
    showError('No article specified.');
    return;
  }

  renderArticle(articleId);
  initRating(articleId);
  initComments(articleId);
}

// Render article
function renderArticle(articleId) {
  const article = articles.find(a => a.id === articleId);

  if (!article) {
    showError('Article not found.');
    return;
  }

  // Update meta tags for SEO
  document.title = `${article.title} | Digital Library`;

  // Update content
  document.getElementById('article-title').textContent = article.title;
  document.getElementById('article-meta').innerHTML = `
    <span class="author">by ${escapeHtml(article.author)}</span> • 
    <span class="category">${escapeHtml(article.category)}</span>
    ${article.date ? ` • <span class="date">${formatDate(article.date)}</span>` : ''}
  `;

  const articleImage = document.getElementById('article-image');
  articleImage.src = article.image;
  articleImage.alt = article.title;
  articleImage.style.display = 'block';

  document.getElementById('article-content').innerHTML = article.content;
}

// Show error message
function showError(message) {
  document.getElementById('article-title').textContent = 'Error';
  document.getElementById('article-meta').textContent = '';
  document.getElementById('article-image').style.display = 'none';
  document.getElementById('article-content').innerHTML = `<p class="error-message">${escapeHtml(message)}</p>`;

  // Hide rating and comments sections
  document.getElementById('article-rating').style.display = 'none';
  document.getElementById('article-comments').style.display = 'none';
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// ========== RATING SYSTEM ==========
function initRating(articleId) {
  const ratingStars = document.getElementById('rating-stars');
  const ratingFeedback = document.getElementById('rating-feedback');
  let userHasRated = false;

  function getRatings() {
    try {
      return JSON.parse(localStorage.getItem(`ratings-${articleId}`) || '[]');
    } catch (e) {
      console.error('Error reading ratings:', e);
      return [];
    }
  }

  function saveRating(rating) {
    try {
      const ratings = getRatings();
      ratings.push(rating);
      localStorage.setItem(`ratings-${articleId}`, JSON.stringify(ratings));
      return true;
    } catch (e) {
      console.error('Error saving rating:', e);
      return false;
    }
  }

  function getAverageRating(ratings) {
    if (!ratings.length) return 0;
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
  }

  function renderStars() {
    const ratings = getRatings();
    const avg = getAverageRating(ratings);
    const total = ratings.length;

    ratingStars.innerHTML = '';

    // Display section
    const displayDiv = document.createElement('div');
    displayDiv.className = 'rating-display';
    displayDiv.innerHTML = `
      <div class="rating-average">
        <span class="avg-number">${avg.toFixed(1)}</span>
        <span class="avg-stars">${'★'.repeat(Math.round(avg))}${'☆'.repeat(5 - Math.round(avg))}</span>
      </div>
      <p class="rating-count">${total} rating${total === 1 ? '' : 's'}</p>
    `;
    ratingStars.appendChild(displayDiv);

    // Interactive stars for user rating
    if (!userHasRated) {
      const interactiveDiv = document.createElement('div');
      interactiveDiv.className = 'rating-interactive';
      interactiveDiv.innerHTML = '<p>Rate this article:</p>';

      const starsContainer = document.createElement('div');
      starsContainer.className = 'stars-container';

      for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.textContent = '☆';
        star.className = 'star-button';
        star.setAttribute('data-value', i);
        star.setAttribute('role', 'button');
        star.setAttribute('tabindex', '0');
        star.setAttribute('aria-label', `Rate ${i} star${i > 1 ? 's' : ''}`);

        // Hover effect
        star.addEventListener('mouseenter', function () {
          highlightStars(i);
        });

        // Click to rate
        star.addEventListener('click', function () {
          submitRating(i);
        });

        // Keyboard support
        star.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            submitRating(i);
          }
        });

        starsContainer.appendChild(star);
      }

      // Reset stars on mouse leave
      starsContainer.addEventListener('mouseleave', function () {
        resetStars();
      });

      interactiveDiv.appendChild(starsContainer);
      ratingStars.appendChild(interactiveDiv);
    }
  }

  function highlightStars(count) {
    const stars = ratingStars.querySelectorAll('.star-button');
    stars.forEach((star, index) => {
      star.textContent = index < count ? '★' : '☆';
    });
  }

  function resetStars() {
    const stars = ratingStars.querySelectorAll('.star-button');
    stars.forEach(star => {
      star.textContent = '☆';
    });
  }

  function submitRating(rating) {
    if (saveRating(rating)) {
      userHasRated = true;
      ratingFeedback.textContent = `Thank you! You rated this article ${rating} star${rating > 1 ? 's' : ''}.`;
      ratingFeedback.className = 'feedback success';
      ratingFeedback.style.display = 'block';

      // Hide feedback after 3 seconds
      setTimeout(() => {
        ratingFeedback.style.display = 'none';
      }, 3000);

      renderStars();
    } else {
      ratingFeedback.textContent = 'Error saving your rating. Please try again.';
      ratingFeedback.className = 'feedback error';
      ratingFeedback.style.display = 'block';
    }
  }

  renderStars();
}

// ========== COMMENTS SYSTEM ==========
function initComments(articleId) {
  const commentForm = document.getElementById('comment-form');
  const commentText = document.getElementById('comment-text');
  const commentsList = document.getElementById('comments-list');

  function getComments() {
    try {
      return JSON.parse(localStorage.getItem(`comments-${articleId}`) || '[]');
    } catch (e) {
      console.error('Error reading comments:', e);
      return [];
    }
  }

  function saveComment(comment) {
    try {
      const comments = getComments();
      comments.push({
        text: comment,
        date: new Date().toISOString(),
        id: Date.now()
      });
      localStorage.setItem(`comments-${articleId}`, JSON.stringify(comments));
      return true;
    } catch (e) {
      console.error('Error saving comment:', e);
      return false;
    }
  }

  function renderComments() {
    const comments = getComments();
    commentsList.innerHTML = '';

    if (comments.length === 0) {
      commentsList.innerHTML = '<li class="no-comments">No comments yet. Be the first to comment!</li>';
      return;
    }

    // Sort comments by date (newest first)
    comments.sort((a, b) => new Date(b.date) - new Date(a.date));

    comments.forEach(comment => {
      const li = document.createElement('li');
      li.className = 'comment-item';
      
      const commentDate = new Date(comment.date);
      const timeAgo = getTimeAgo(commentDate);

      li.innerHTML = `
        <div class="comment-header">
          <span class="comment-author">Anonymous</span>
          <span class="comment-date">${timeAgo}</span>
        </div>
        <p class="comment-text">${escapeHtml(comment.text)}</p>
      `;
      
      commentsList.appendChild(li);
    });
  }

  function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  // Form submission
  commentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const text = commentText.value.trim();
    
    if (!text) {
      alert('Please write a comment before submitting.');
      return;
    }

    if (text.length < 3) {
      alert('Comment must be at least 3 characters long.');
      return;
    }

    if (text.length > 500) {
      alert('Comment must be less than 500 characters.');
      return;
    }

    if (saveComment(text)) {
      commentText.value = '';
      renderComments();
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'comment-success';
      successMsg.textContent = 'Comment posted successfully!';
      commentForm.appendChild(successMsg);
      
      setTimeout(() => successMsg.remove(), 3000);
    } else {
      alert('Error posting comment. Please try again.');
    }
  });

  // Character counter
  commentText.addEventListener('input', function () {
    const remaining = 500 - this.value.length;
    let counter = commentForm.querySelector('.char-counter');
    
    if (!counter) {
      counter = document.createElement('div');
      counter.className = 'char-counter';
      commentText.parentNode.appendChild(counter);
    }
    
    counter.textContent = `${this.value.length}/500 characters`;
    counter.style.color = remaining < 50 ? '#d9534f' : '#666';
  });

  renderComments();
}