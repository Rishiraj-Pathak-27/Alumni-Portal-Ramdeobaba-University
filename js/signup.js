// document.addEventListener('DOMContentLoaded', () => {
//   const signupForm = document.getElementById('signupForm');

//   signupForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;

//     // Basic validation
//     if (password !== confirmPassword) {
//       alert('Passwords do not match.');
//       return;
//     }

//     if (email && password && confirmPassword) {
//       // You can send the signup data to your backend for registration.
//       // For now, let's check if the email is a college email.
//       if (email.endsWith('@rknec.edu')) {
//         alert('Signup successful!');
//         // Redirect to the login page after successful signup
//         window.location.href = 'login.html';
//       } else {
//         alert('Please use your college email ID.');
//       }
//     } else {
//       alert('Please fill in all fields.');
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   // Load 3D background and theme toggle
//   loadScript("js/3d-background.js")
//   loadScript("js/theme-toggle.js")

//   // Form animation
//   const form = document.querySelector("form")
//   if (form) {
//     form.classList.add("fade-in")

//     // Add input focus animations
//     const inputs = form.querySelectorAll("input, textarea")
//     inputs.forEach((input) => {
//       input.addEventListener("focus", () => {
//         input.parentElement.classList.add("focused")
//       })

//       input.addEventListener("blur", () => {
//         if (!input.value) {
//           input.parentElement.classList.remove("focused")
//         }
//       })
//     })
//   }
// })

// // Helper function to load scripts
// function loadScript(src) {
//   const script = document.createElement("script")
//   script.src = src
//   script.async = true
//   document.body.appendChild(script)
// }



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

// Firebase configuration - use the same config across all files
const firebaseConfig = {
  apiKey: "AIzaSyC2vjXdQ2fD8h8BZwGIG8x7sudnZCVvUFU",
  authDomain: "alumni-portal-a4a6e.firebaseapp.com",
  databaseURL: "https://alumni-portal-a4a6e-default-rtdb.firebaseio.com",
  projectId: "alumni-portal-a4a6e",
  storageBucket: "alumni-portal-a4a6e.firebasestorage.app",
  messagingSenderId: "233790086192",
  appId: "1:233790086192:web:d095e9e445d41c5f9a21f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  // Load 3D background and theme toggle
  loadScript("js/3d-background.js");
  loadScript("js/theme-toggle.js");

  const signupForm = document.getElementById('signupForm');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message';
  messageDiv.style.display = 'none';
  messageDiv.style.padding = '10px';
  messageDiv.style.marginTop = '10px';
  messageDiv.style.borderRadius = '4px';
  messageDiv.style.transition = 'opacity 0.5s';
  
  if (signupForm) {
    signupForm.after(messageDiv);
    
    // Form animation
    signupForm.classList.add("fade-in");

    // Add input focus animations
    const inputs = signupForm.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          input.parentElement.classList.remove("focused");
        }
      });
    });

    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const phoneNumber = document.getElementById('phoneNumber')?.value || '';
      const about = document.getElementById('about')?.value || '';

      // Basic validation
      if (!email || !password || !name) {
        showMessage('Please fill in all required fields.', 'error');
        return;
      }

      if (password !== confirmPassword) {
        showMessage('Passwords do not match.', 'error');
        return;
      }

      // Email validation for college domain
      if (!email.endsWith('@rknec.edu')) {
        showMessage('Please use your college email ID.', 'error');
        return;
      }

      try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Store additional user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          about: about,
          createdAt: new Date().toISOString()
        });

        // Store user ID in localStorage for session management
        localStorage.setItem('loggedInUserId', user.uid);
        
        showMessage('Signup successful! Redirecting to login...', 'success');
        
        // Redirect to login page after successful signup
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      } catch (error) {
        console.error("Error during signup:", error);
        let errorMessage = 'An error occurred during signup.';
        
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already registered.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password should be at least 6 characters.';
        }
        
        showMessage(errorMessage, 'error');
      }
    });
  }

  function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    messageDiv.style.opacity = '1';
    
    if (type === 'error') {
      messageDiv.style.backgroundColor = '#ffebee';
      messageDiv.style.color = '#c62828';
      messageDiv.style.border = '1px solid #ef9a9a';
    } else {
      messageDiv.style.backgroundColor = '#e8f5e9';
      messageDiv.style.color = '#2e7d32';
      messageDiv.style.border = '1px solid #a5d6a7';
    }
    
    setTimeout(() => {
      messageDiv.style.opacity = '0';
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 500);
    }, 5000);
  }
});

// Helper function to load scripts
function loadScript(src) {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
}
