  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
  import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
   } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCplVmv5ym1Uwt-Ahf3-9uJgablaEa3hgA",
    authDomain: "smart-for-share.firebaseapp.com",
    projectId: "smart-for-share",
    storageBucket: "smart-for-share.appspot.com",
    messagingSenderId: "806576465525",
    appId: "1:806576465525:web:9b83cbd5f17c1a6845ba3c",
    measurementId: "G-EZSWRWZ9PQ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);


  export {
    getFirestore,
    collection,
    addDoc,
    getDocs ,
    db,
    deleteDoc,
    doc
   }