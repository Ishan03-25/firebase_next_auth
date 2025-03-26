// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import dotenv from "dotenv";

dotenv.config();
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.NEXT_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyBo1qD0hmd2nCWISEYE37s7LFW7DWUxToI",
  authDomain: "deliotte-bc965.firebaseapp.com",
  projectId: "deliotte-bc965",
  storageBucket: "deliotte-bc965.firebasestorage.app",
  messagingSenderId: "692043003635",
  appId: "1:692043003635:web:7a421d051fc66b37b3a986",
  measurementId: "G-CX7HMT6LP5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { auth, app };
