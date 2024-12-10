// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7gPTNfH0kCkUF6CKgETKxejiabD_cdoo",
  authDomain: "chatapp-3c5b9.firebaseapp.com",
  databaseURL: "https://chatapp-3c5b9.firebaseio.com",
  projectId: "chatapp-3c5b9",
  storageBucket: "chatapp-3c5b9.appspot.com",
  messagingSenderId: "668631283513",
  appId: "1:668631283513:web:6ef524cc740ca4b575dae8",
  measurementId: "G-ZS6B8QVY1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db: Firestore = getFirestore(app); // Firestore Database
export const storage: FirebaseStorage = getStorage(app);
export const auth = getAuth(app);