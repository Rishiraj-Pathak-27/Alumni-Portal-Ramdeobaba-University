const API_BASE_URL = 'http://localhost:3000/api/forum'; // Replace with your backend URL

// Function to fetch and display forum posts
async function loadForumPosts() {
  try {
    const response = await fetch(API_BASE_URL);
    const posts = await response.json();

    if (response.ok) {
      const forumContainer = document.getElementById('forumContainer');
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('forum-post');
        postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p><strong>Posted by:</strong> ${post.author}</p>
          <p><strong>Discussion:</strong> ${post.content}</p>
        `;
        forumContainer.appendChild(postElement);
      });
    } else {
      alert('Failed to load forum posts.');
    }
  } catch (error) {
    console.error('Error fetching forum posts:', error);
   
  }
}

// Load forum posts on page load
document.addEventListener('DOMContentLoaded', loadForumPosts);

document.addEventListener('DOMContentLoaded', () => {
  // Load 3D background and theme toggle
  loadScript('js/3d-background.js');
  loadScript('js/theme-toggle.js');
  
  // Sample forum data (replace with your actual data fetching logic)
  const samplePosts = [
    {
      id: 1,
      title: 'Tips for new graduates entering the job market',
      content: 'As someone who graduated a few years ago, I wanted to share some advice...',
      author: 'Rahul Sharma',
      date: '2024-03-18',
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      title: 'Alumni meetup next month',
      content: 'We are organizing an alumni meetup next month. Details inside...',
      author: 'Priya Patel',
      date: '2024-03-22',
      likes: 42,
      comments: 15
    }
  ];
  
  // Render forum posts
  const forumContainer = document.getElementById('forumContainer');
  if (forumContainer) {
    if (samplePosts.length > 0) {
      samplePosts.forEach((post, index) => {
        const forumPost = document.createElement('div');
        forumPost.className = 'forum-post';
        forumPost.style.animationDelay = `${index * 0.1}s`;
        
        forumPost.innerHTML = `
          <div class="post-header">
            <div class="post-author">${post.author}</div>
            <div class="post-date">${formatDate(post.date)}</div>
          </div>
          <h3 class="post-title">${post.title}</h3>
          <div class="post-content">${post.content}</div>
          <div class="post-actions">
            <div class="post-action">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              ${post.likes} Likes
            </div>
            <div class="post-action">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              ${post.comments} Comments
            </div>
          </div>
        `;
        
        forumContainer.appendChild(forumPost);
      });
    } else {
      forumContainer.innerHTML = `
        <div class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <h3>No forum posts yet</h3>
          <p>Be the first to start a discussion</p>
        </div>
      `;
    }
  }
});

// Format date helper
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Helper function to load scripts
function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
}

