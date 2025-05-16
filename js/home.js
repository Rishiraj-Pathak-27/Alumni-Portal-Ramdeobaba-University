// Placeholder for any future functionality (if needed)
document.addEventListener('DOMContentLoaded', () => {
    console.log('Home page loaded.');
  });
  // script.js

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const mainContent = document.getElementById('main-content');

  // Add a slight delay for better UX (optional)
  setTimeout(() => {
    preloader.style.display = 'none';
    mainContent.style.display = 'block';
  }, 6000); // 6 second delay
});

document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 3000);
      }, 3000);
    });
  }

  // Load 3D background and theme toggle
  loadScript('js/3d-background.js');
  loadScript('js/theme-toggle.js');
  
  // Add animation classes to elements
  const intro = document.querySelector('.intro');
  if (intro) {
    intro.classList.add('fade-in');
  }
});

// Helper function to load scripts
function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
}

