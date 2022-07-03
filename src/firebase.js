// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.firebase_api_key,
  authDomain: "library-project-d2fd6.firebaseapp.com",
  projectId: "library-project-d2fd6",
  storageBucket: "library-project-d2fd6.appspot.com",
  messagingSenderId: "257203323030",
  appId: "1:257203323030:web:e565c63eea98c9d60502b7",
  measurementId: "G-JH90N2KTHR"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();

export default db;
