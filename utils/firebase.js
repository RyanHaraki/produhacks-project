// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.NEXT_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_FIREBASE_APP_ID,
  apiKey: "AIzaSyCQ7AaVP8lFYdocFQ2yvhVrnaS_3HLF9Yc",
  authDomain: "produhacks-818cb.firebaseapp.com",
  projectId: "produhacks-818cb",
  storageBucket: "produhacks-818cb.appspot.com",
  messagingSenderId: "159987897505",
  appId: "1:159987897505:web:e9cc19884cc53a4f0b0ce0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
