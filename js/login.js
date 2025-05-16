document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // Assuming email validation and simple login
      if (email && password) {
        // You can make an API request here to verify the login credentials
        // For now, a simple check for college email
        if (email.endsWith('@rknec.edu')) {
          alert('Login successful!');
          // Redirect to the dashboard or homepage
          window.location.href = 'dashboard.html';
        } else {
          alert('Please use your college email ID.');
        }
      } else {
        alert('Please fill in all fields.');
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Load 3D background and theme toggle
    loadScript('js/3d-background.js');
    loadScript('js/theme-toggle.js');
    
    // Form animation
    const form = document.getElementById('loginForm');
    if (form) {
      form.classList.add('fade-in');
      
      // Add input focus animations
      const inputs = form.querySelectorAll('input');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
          if (!input.value) {
            input.parentElement.classList.remove('focused');
          }
        });
      });
    }
  });
  
  // Helper function to load scripts
  function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }
  
  
