// const API_BASE_URL = 'AIzaSyBrKpHWWJAwCrZZt2kS2VebZtPDLFwiCRA'; // Replace with your backend URL

// // Function to fetch and display job posts
// async function loadJobs() {
//   try {
//     const response = await fetch(API_BASE_URL);
//     const jobs = await response.json();

//     if (response.ok) {
//       const jobContainer = document.getElementById('jobContainer');
//       jobs.forEach(job => {
//         const jobElement = document.createElement('div');
//         jobElement.classList.add('job-post');
//         jobElement.innerHTML = `
//           <h3>${job.title}</h3>
//           <p><strong>Company:</strong> ${job.company}</p>
//           <p><strong>Location:</strong> ${job.location}</p>
//           <p><strong>Description:</strong> ${job.description}</p>
//         `;
//         jobContainer.appendChild(jobElement);
//       });
//     } else {
//       alert('Failed to load job posts.');
//     }
//   } catch (error) {
//     console.error('Error fetching job posts:', error);
//     alert('Failed to load job posts. Please try again later.');
//   }
// }
// // Load jobs on page load
// document.addEventListener('DOMContentLoaded', loadJobs);//THIS WAS THE MAIN JAVASCRIPT






// {Retrieve job posts from LocalStorage
// function loadJobPosts() {
//   const jobPostsContainer = document.getElementById('jobPostsContainer');

//   // Get posts from LocalStorage
//   const jobPosts = JSON.parse(localStorage.getItem('jobPosts')) || [];

//   // Clear the container
//   jobPostsContainer.innerHTML = '';

//   if (jobPosts.length === 0) {
//       jobPostsContainer.innerHTML = '<p>No job opportunities available at the moment.</p>';
//       return;
//   }

//   // Create and append job posts dynamically
//   jobPosts.forEach(post => {
//       const postElement = document.createElement('div');
//       postElement.classList.add('job-post');

//       postElement.innerHTML = `
//           <h2>${post.jobTitle}</h2>
//           <p><strong>Company:</strong> ${post.companyName}</p>
//           <p><strong>Location:</strong> ${post.location}</p>
//           <p>${post.jobDescription}</p>
//           <a href="${post.applyLink}" target="_blank">Apply Here</a>
//       `;

//       jobPostsContainer.appendChild(postElement);
//   });
// }

// // Call the function to load job posts on page load
// document.addEventListener('DOMContentLoaded', loadJobPosts);}//THIS WAS ASLO DOES SAME THING BUT FOR NOW WE HAVE TO DUMB THIS







// document.addEventListener('DOMContentLoaded', function () {
//   const jobContainer = document.getElementById('jobContainer');
//   const jobPosts = JSON.parse(localStorage.getItem('jobPosts')) || [];

//   // Clear the container
//   jobContainer.innerHTML = '';

//   if (jobPosts.length === 0) {
//       jobContainer.innerHTML = '<p>No job opportunities available at the moment.</p>';
//       return;
//   }

//   // Create and append job posts dynamically
//   jobPosts.forEach(post => {
//       const postElement = document.createElement('div');
//       postElement.classList.add('job-post');
//       postElement.innerHTML = `
//           <h2>${post.jobTitle}</h2>
//           <p><strong>Company:</strong> ${post.companyName}</p>
//           <p><strong>Location:</strong> ${post.location}</p>
//           <p><strong>Description:</strong>${post.jobDescription}</p>
//           <a href="${post.applyLink}" target="_blank">Apply Here</a>
//       `;
//       jobContainer.appendChild(postElement);
//   });
// });


////////////////////////////////////////////////////////////


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
const db = getDatabase(app);

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function() {
        messageDiv.style.opacity = 0;
    }, 5000);
}

function showSuccessWithTimer() {
    const formMessage = document.getElementById('formMessage') || document.getElementById('jobPost');
    
    if (!formMessage) return;
    
    // Create timer and redirect elements
    let countdown = 5;
    
    // Initial success message
    formMessage.innerHTML = `
        <div style="text-align: center;">
            <p style="color: green; font-weight: bold; margin-bottom: 10px;">Job post created successfully!</p>
            <p>Redirecting to job posts in <span id="countdown">${countdown}</span> seconds...</p>
            <button id="visitNowBtn" style="
                background-color: #007bff; 
                color: white; 
                border: none; 
                padding: 8px 16px; 
                border-radius: 4px; 
                cursor: pointer; 
                margin-top: 10px;
                font-size: 14px;
            ">Visit Job Posts Now</button>
        </div>
    `;
    
    formMessage.style.display = "block";
    formMessage.style.opacity = "1";
    
    // Add click handler for immediate redirect
    document.getElementById('visitNowBtn').addEventListener('click', function() {
        window.location.href = 'jobs.html';
    });
    
    // Start countdown timer
    const timer = setInterval(function() {
        countdown--;
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.textContent = countdown;
        }
        
        if (countdown <= 0) {
            clearInterval(timer);
            window.location.href = 'jobs.html';
        }
    }, 1000);
    
    // Clear message after redirect (backup)
    setTimeout(() => {
        if (formMessage) {
            formMessage.innerHTML = '';
            formMessage.style.display = "none";
        }
    }, 6000);
}

// Firebase submission handler
document.getElementById("submit").addEventListener('click', function (e) {
    e.preventDefault();
    
    const jobTitle = document.getElementById("jobTitle").value;
    const companyName = document.getElementById("companyName").value;
    const jobDescription = document.getElementById("jobDescription").value;
    const location = document.getElementById("location").value;
    const applyLink = document.getElementById("applyLink").value;
    
    // Save to Firebase
    set(ref(db, 'USERS/' + jobTitle), {
        jobTitle: jobTitle,
        companyName: companyName,
        jobDescription: jobDescription,
        location: location,
        applyLink: applyLink
    });
    
    // Also save to localStorage as backup
    const newPost = {
        jobTitle,
        companyName,
        jobDescription,
        location,
        applyLink,
    };
    
    const existingPosts = JSON.parse(localStorage.getItem('jobPosts')) || [];
    existingPosts.push(newPost);
    localStorage.setItem('jobPosts', JSON.stringify(existingPosts));
    
    // Reset form
    document.getElementById("jobPostForm").reset();
    
    // Show success message with timer
    showSuccessWithTimer();
});

// Alternative form handler (if using different submit method)
document.getElementById('jobPostForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
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
    
    // Save to localStorage
    const existingPosts = JSON.parse(localStorage.getItem('jobPosts')) || [];
    existingPosts.push(newPost);
    localStorage.setItem('jobPosts', JSON.stringify(existingPosts));
    
    // Also save to Firebase if available
    if (db) {
        set(ref(db, 'USERS/' + jobTitle), newPost);
    }
    
    // Reset the form
    document.getElementById('jobPostForm').reset();
    
    // Show success message with timer
    showSuccessWithTimer();
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
    }
});

// Helper function to load scripts
function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
}