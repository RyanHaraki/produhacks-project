// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
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
