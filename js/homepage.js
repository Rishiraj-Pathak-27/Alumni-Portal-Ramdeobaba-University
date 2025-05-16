// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


// const firebaseConfig = {
//     apiKey: "AIzaSyAo21ZP_OCJXqbxxh4M3ujrllWTlJxfng8",
//     authDomain: "alumni-portal-a4a6e.firebaseapp.com",
//     databaseURL: "https://alumni-portal-a4a6e-default-rtdb.firebaseio.com",
//     projectId: "alumni-portal-a4a6e",
//     storageBucket: "alumni-portal-a4a6e.firebasestorage.app",
//     messagingSenderId: "233790086192",
//     appId: "1:233790086192:web:3134c3629720e6d39a21f5"
//   };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth = getAuth();
// const db = getFirestore();


// onAuthStateChanged(auth, (user)=>{
//     const loggedInUserId = localStorage.getItem('loggedInUserId');
//     if(loggedInUserId){
//         const docRef=doc(db, "users", loggedInUserId);
//         getDoc(docRef)
//         .then((docSnap)=>{
//             if(docSnap.exists()){
//                 const userData = docSnap.data();
//                 document.getElementById('loggedUserFName').innerText=userData.name;
//                 document.getElementById('loggedUserEmail').innerText=userData.email;
//                 document.getElementById('loggedUserPNumber').innerText=userData.phoneNumber;
//                 document.getElementById('loggedUserAbout').innerText=userData.about;
                
//             }
//             else{
//                 console.log("no document found matching id");
//             }
//         })
//         .catch((error)=>{
//             console.log("Error getting document");
//         })
//     }
//     else{
//         console.log("User id not found in local storage");
//     if (!confirm("Are you Sure to Logout?")) {
//         return;
//     }
//         window.location.href='/login.html';
//     }
// })


// const logoutButton = document.getElementById("logout");

// logoutButton.addEventListener("click", ()=>{
//     localStorage.removeItem('loggedInUserId');
//     signOut(auth)
//     .then(()=>{
//         window.location.href='login.html';
//     })
//     .catch((error)=>{
//         console.error("Error Signing Out: ", error);
//     })
// })
// // console.log("homepage.js");

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAo21ZP_OCJXqbxxh4M3ujrllWTlJxfng8",
  authDomain: "alumni-portal-a4a6e.firebaseapp.com",
  databaseURL: "https://alumni-portal-a4a6e-default-rtdb.firebaseio.com",
  projectId: "alumni-portal-a4a6e",
  storageBucket: "alumni-portal-a4a6e.firebasestorage.app",
  messagingSenderId: "233790086192",
  appId: "1:233790086192:web:3134c3629720e6d39a21f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  // Check authentication state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const userId = user.uid;
      localStorage.setItem('loggedInUserId', userId);
      
      // Fetch user data from Firestore
      const docRef = doc(db, "users", userId);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            
            // Update UI with user data
            const userNameElements = document.querySelectorAll('.user-name, #loggedUserFName');
            const userEmailElements = document.querySelectorAll('.user-email, #loggedUserEmail');
            const userPhoneElements = document.querySelectorAll('.user-phone, #loggedUserPNumber');
            const userAboutElements = document.querySelectorAll('.user-about, #loggedUserAbout');
            
            userNameElements.forEach(el => {
              if (el) el.textContent = userData.name || 'N/A';
            });
            
            userEmailElements.forEach(el => {
              if (el) el.textContent = userData.email || 'N/A';
            });
            
            userPhoneElements.forEach(el => {
              if (el) el.textContent = userData.phoneNumber || 'N/A';
            });
            
            userAboutElements.forEach(el => {
              if (el) el.textContent = userData.about || 'No information provided';
            });
          } else {
            console.log("No user document found!");
          }
        })
        .catch((error) => {
          console.error("Error getting user document:", error);
        });
    } else {
      // User is signed out, redirect to login
      window.location.href = 'login.html';
    }
  });
  
  // Set up logout functionality
  const logoutButtons = document.querySelectorAll('#logout, .logout-button');
  logoutButtons.forEach(button => {
    if (button) {
      button.addEventListener('click', () => {
        if (!confirm("Are you sure you want to logout?")) {
          return;
        }
        
        // Clear local storage and sign out
        localStorage.removeItem('loggedInUserId');
        signOut(auth)
          .then(() => {
            window.location.href = 'login.html';
          })
          .catch((error) => {
            console.error("Error signing out:", error);
          });
      });
    }
  });
  
  // Load additional scripts
  loadScript('js/3d-background.js');
  loadScript('js/theme-toggle.js');
});

// Helper function to load scripts
function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
}
