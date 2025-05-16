// Placeholder for any dynamic data or interactions
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard page loaded.');
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Load 3D background and theme toggle
    loadScript('js/3d-background.js');
    loadScript('js/theme-toggle.js');
    
    // Add animation classes to elements
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add('fade-in');
    });
  });
  
  // Helper function to load scripts
  function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }

// Move logout event listener inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const logout = document.getElementById('logout');
  if (logout) {
    logout.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default link behavior if any
      alert('Logging out...');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1000); // 1 second delay
    });
  }
});
  
  
  