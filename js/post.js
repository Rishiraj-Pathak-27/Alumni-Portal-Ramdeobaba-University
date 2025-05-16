// Handle form submission
// document.getElementById('jobPostForm').addEventListener('submit', function (event) {
//     event.preventDefault();

//     // Get form values
//     const jobTitle = document.getElementById('jobTitle').value;
//     const companyName = document.getElementById('companyName').value;
//     const jobDescription = document.getElementById('jobDescription').value;
//     const location = document.getElementById('location').value;
//     const applyLink = document.getElementById('applyLink').value;

//     // Create a job post object
//     const newPost = {
//         jobTitle,
//         companyName,
//         jobDescription,
//         location,
//         applyLink,
//     };

//     // Get existing posts from LocalStorage
//     const existingPosts = JSON.parse(localStorage.getItem('jobPosts')) || [];

//     // Add the new post to the list
//     existingPosts.push(newPost);

//     // Save updated posts to LocalStorage
//     localStorage.setItem('jobPosts', JSON.stringify(existingPosts));

//     // Reset the form
//     document.getElementById('jobPostForm').reset();

//     // Show a success message
//     const formMessage = document.getElementById('formMessage');
//     formMessage.textContent = 'Job post created successfully!';
//     setTimeout(() => {
//         formMessage.textContent = '';
//     }, 3000);
// });



// document.getElementById('jobPostForm').addEventListener('submit', function (event) {
//     event.preventDefault();

//     // Get form values
//     const jobTitle = document.getElementById('jobTitle').value;
//     const companyName = document.getElementById('companyName').value;
//     const jobDescription = document.getElementById('jobDescription').value;
//     const location = document.getElementById('location').value;
//     const applyLink = document.getElementById('applyLink').value;

//     // Create a job post object
//     const newPost = {
//         jobTitle,
//         companyName,
//         jobDescription,
//         location,
//         applyLink,
//     };

//     // Get existing posts from LocalStorage
//     const existingPosts = JSON.parse(localStorage.getItem('jobPosts')) || [];

//     // Add the new post to the list
//     existingPosts.push(newPost);

//     // Save updated posts to LocalStorage
//     localStorage.setItem('jobPosts', JSON.stringify(existingPosts));

//     // Reset the form
//     document.getElementById('jobPostForm').reset();

//     // Show a success message
//     const formMessage = document.getElementById('formMessage');
//     formMessage.textContent = 'Job post created successfully!';
//     setTimeout(() => {
//         formMessage.textContent = '';
//     }, 3000);
// });





import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrKpHWWJAwCrZZt2kS2VebZtPDLFwiCRA",
    authDomain: "alumni-portal-2.firebaseapp.com",
    databaseURL: "https://alumni-portal-2-default-rtdb.firebaseio.com",
    projectId: "alumni-portal-2",
    storageBucket: "alumni-portal-2.firebasestorage.app",
    messagingSenderId: "482570946833",
    appId: "1:482570946833:web:1cdd488333d8d98d1924b0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//get ref to database services
const db = getDatabase(app);
function showMessage(message, divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}
document.getElementById("submit").addEventListener('click', function (e) {
    e.preventDefault();
    set(ref(db, 'USERS/' + document.getElementById("jobTitle").value),
        {
            jobTitle: document.getElementById("jobTitle").value,
            companyName: document.getElementById("companyName").value,
            jobDescription: document.getElementById("jobDescription").value,
            location: document.getElementById("location").value,
            applyLink: document.getElementById("applyLink").value
        });
    showMessage("Job posted successfully !!", "jobPost")
    });

    document.addEventListener('DOMContentLoaded', () => {
        // Load 3D background and theme toggle
        loadScript('js/3d-background.js');
        loadScript('js/theme-toggle.js');
        
        // Form animation
        const form = document.querySelector('form');
        if (form) {
          form.classList.add('fade-in');
          
          // Add input focus animations
          const inputs = form.querySelectorAll('input, textarea');
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
          
          // Form submission
          form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message (replace with actual form submission logic)
            const messageDiv = document.getElementById('jobPost');
            if (messageDiv) {
              messageDiv.className = 'messageDiv success';
              messageDiv.style.display = 'block';
              messageDiv.textContent = 'Job post created successfully!';
              
              // Reset form
              setTimeout(() => {
                form.reset();
              }, 1000);
            }
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
      

// Handle form submission
document.getElementById('jobPostForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const jobTitle = document.getElementById('jobTitle').value;
    const companyName = document.getElementById('companyName').value;
    const jobDescription = document.getElementById('jobDescription').value;
    const location = document.getElementById('location').value;
    const applyLink = document.getElementById('applyLink').value;

    // Create a job post object
    const newPost = {
        jobTitle,
        companyName,
        jobDescription,
        location,
        applyLink,
    };

    // Get existing posts from LocalStorage
    const existingPosts = JSON.parse(localStorage.getItem('jobPosts')) || [];

    // Add the new post to the list
    existingPosts.push(newPost);

    // Save updated posts to LocalStorage
    localStorage.setItem('jobPosts', JSON.stringify(existingPosts));

    // Reset the form
    document.getElementById('jobPostForm').reset();

    // Show a success message
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = 'Job post created successfully!';
    setTimeout(() => {
        formMessage.textContent = '';
    }, 3000);
});

