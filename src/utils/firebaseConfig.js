// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3htdyKBTsgeoqbsL3cLo_OVyCh1iiKjk",
  authDomain: "alswidany-app.firebaseapp.com",
  projectId: "alswidany-app",
  storageBucket: "alswidany-app.firebasestorage.app",
  messagingSenderId: "917047444106",
  appId: "1:917047444106:web:c48f1764bdbcc2e5242373",
  measurementId: "G-FY98Z1VR50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);