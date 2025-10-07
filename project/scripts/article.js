// Article page logic
// Get article ID from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const articleId = getQueryParam('id');

// Example articles data (should be replaced with dynamic data or fetched from storage)
const articles = [
  {
    id: '1',
    title: 'The Art of Writing',
    author: 'Jane Smith',
    category: 'Inspiration',
    image: 'images/blog1.jpg',
    content: `Writing is a journey of self-discovery. Every word penned is a step towards understanding the world and oneself. Authors share their thoughts, dreams, and experiences, inviting readers to join them on this creative adventure.<br><br>In this article, Jane Smith explores the creative process, the challenges of writer's block, and the joy of finding one's voice. She shares personal anecdotes and advice for aspiring writers.`,
  },
  {
    id: '2',
    title: 'Literature as a Mirror',
    author: 'Carlos Rivera',
    category: 'Reflection',
    image: 'images/blog2.jpg',
    content: `Literature reflects the complexities of life. Through stories, poems, and essays, writers explore human emotions, societal changes, and timeless truths, helping readers see themselves and others more clearly.<br><br>Carlos Rivera discusses how literature can be a tool for empathy and understanding, and how authors use their work to comment on the world around them.`,
  },
  {
    id: '3',
    title: 'Letter to the Fans',
    author: 'Emily Turner',
    category: 'Community',
    image: 'images/blog3.jpg',
    content: `Dear readers, your passion for books fuels our creativity. Every page is written with you in mind, hoping to spark curiosity, joy, and reflection. Thank you for being part of our literary family.<br><br>Emily Turner shares her gratitude and stories from her interactions with fans, highlighting the importance of community in the literary world.`,
  },
  {
    id: '4',
    title: 'Imagination Unleashed',
    author: 'Mark Lee',
    category: 'Creativity',
    image: 'images/blog4.jpg',
    content: `Imagination is the heart of storytelling. Authors encourage everyone to dream big, create worlds, and explore ideas beyond the ordinary. Literature is where imagination finds its voice.<br><br>Mark Lee explores techniques for boosting creativity and the role of imagination in both writing and reading.`,
  },
  {
    id: '5',
    title: 'The Writing Process',
    author: 'Sophia Kim',
    category: 'Craft',
    image: 'images/blog5.jpg',
    content: `From brainstorming to editing, writing is a craft that requires patience and dedication. Authors share tips and personal routines to help aspiring writers develop their own style and discipline.<br><br>Sophia Kim details her writing routine, favorite tools, and advice for staying motivated throughout the process.`,
  },
  {
    id: '6',
    title: 'Exploring Genres',
    author: 'Daniel Green',
    category: 'Genres',
    image: 'images/blog6.jpg',
    content: `Genres offer unique perspectives and experiences. Whether it's fantasy, mystery, romance, or non-fiction, each genre invites readers to discover new worlds and ideas.<br><br>Daniel Green provides an overview of popular genres and tips for choosing the right one for your next read or writing project.`,
  },
  {
    id: '7',
    title: 'Building a Reading Culture',
    author: 'Olivia Brown',
    category: 'Culture',
    image: 'images/blog7.jpg',
    content: `Reading enriches lives and communities. Authors advocate for libraries, book clubs, and family reading time, believing that a love for books should be nurtured from childhood.<br><br>Olivia Brown shares ideas for promoting reading in schools, families, and communities.`,
  },
  {
    id: '8',
    title: "Overcoming Writer's Block",
    author: 'Alex Martinez',
    category: 'Motivation',
    image: 'images/blog8.jpg',
    content: `Writer's block is a common challenge. Authors share strategies to reignite creativity, such as free writing, changing environments, and reading widely.<br><br>Alex Martinez offers practical exercises and encouragement for writers facing creative obstacles.`,
  },
  {
    id: '9',
    title: 'The Future of Digital Publishing',
    author: 'Priya Singh',
    category: 'Technology',
    image: 'images/blog9.jpg',
    content: `Digital platforms have revolutionized literature. Authors discuss the opportunities and challenges of publishing online, reaching global audiences, and adapting to new technologies.<br><br>Priya Singh analyzes trends in digital publishing and what they mean for authors and readers.`,
  },
  {
    id: '10',
    title: 'Collaboration in Writing',
    author: 'Mia Chen',
    category: 'Teamwork',
    image: 'images/blog10.jpg',
    content: `Collaboration brings fresh perspectives and new ideas. Authors share their experiences working with co-writers, editors, and illustrators to create richer stories.<br><br>Mia Chen discusses the benefits and challenges of collaborative writing projects.`,
  },
  {
    id: '11',
    title: 'Promoting Your Book',
    author: 'Lucas White',
    category: 'Marketing',
    image: 'images/blog11.jpg',
    content: `Promotion is key to reaching readers. Authors discuss strategies for marketing books, building an online presence, and connecting with audiences.<br><br>Lucas White shares his experience with book launches and online marketing.`,
  },
  {
    id: '12',
    title: "The Author's Journey",
    author: 'Ana Torres',
    category: 'Experience',
    image: 'images/blog12.jpg',
    content: `Every author has a unique journey. From first drafts to published works, writers share their stories, challenges, and triumphs in the world of literature.<br><br>Ana Torres reflects on her path to becoming an author and the lessons learned along the way.`,
  },
];

function renderArticle() {
  const article = articles.find(a => a.id === articleId);
  if (!article) {
    document.getElementById('article-title').textContent = 'Article Not Found';
    document.getElementById('article-meta').textContent = '';
    document.getElementById('article-image').style.display = 'none';
    document.getElementById('article-content').textContent = '';
    return;
  }
  document.getElementById('article-title').textContent = article.title;
  document.getElementById('article-meta').textContent = `by ${article.author} • ${article.category}`;
  document.getElementById('article-image').src = article.image;
  document.getElementById('article-image').alt = article.title;
  document.getElementById('article-content').innerHTML = article.content;
}

// Rating logic
const ratingStars = document.getElementById('rating-stars');
const ratingFeedback = document.getElementById('rating-feedback');
let currentRating = 0;

function getRatings() {
  return JSON.parse(localStorage.getItem('ratings-' + articleId) || '[]');
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
  // Show average rating visually
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.textContent = i <= Math.round(avg) ? '★' : '☆';
    star.style.fontSize = '2em';
    ratingStars.appendChild(star);
  }
  // Interactive stars for user rating
  const interactive = document.createElement('div');
  interactive.style.marginTop = '0.5em';
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.textContent = i <= currentRating ? '★' : '☆';
    star.style.cursor = 'pointer';
    star.style.fontSize = '1.5em';
    star.setAttribute('data-value', i);
    star.onclick = function () {
      currentRating = i;
      // Save rating
      const ratings = getRatings();
      ratings.push(i);
      localStorage.setItem('ratings-' + articleId, JSON.stringify(ratings));
      ratingFeedback.textContent = `¡Gracias! Valoraste este artículo con ${i} estrella${i > 1 ? 's' : ''}.`;
      renderStars();
    };
    interactive.appendChild(star);
  }
  ratingStars.appendChild(interactive);
  // Show average and count
  const info = document.createElement('div');
  info.style.marginTop = '0.5em';
  info.textContent = `Promedio: ${avg.toFixed(2)} / 5 (${total} valoración${total === 1 ? '' : 'es'})`;
  ratingStars.appendChild(info);
}

// Comments logic
const commentForm = document.getElementById('comment-form');
const commentText = document.getElementById('comment-text');
const commentsList = document.getElementById('comments-list');

function loadComments() {
  const comments = JSON.parse(localStorage.getItem('comments-' + articleId) || '[]');
  commentsList.innerHTML = '';
  comments.forEach(comment => {
    const li = document.createElement('li');
    li.textContent = comment;
    commentsList.appendChild(li);
  });
}

commentForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = commentText.value.trim();
  if (text) {
    const comments = JSON.parse(localStorage.getItem('comments-' + articleId) || '[]');
    comments.push(text);
    localStorage.setItem('comments-' + articleId, JSON.stringify(comments));
    commentText.value = '';
    loadComments();
  }
});

// Initialize page
renderArticle();
renderStars();
loadComments();
