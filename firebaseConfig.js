// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2j0higiMMFNHmEPWZ7C3bvB4cVsg3wwY",
  authDomain: "arviointikirja.firebaseapp.com",
  databaseURL: "https://arviointikirja-default-rtdb.firebaseio.com",
  projectId: "arviointikirja",
  storageBucket: "arviointikirja.appspot.com",
  messagingSenderId: "729654841858",
  appId: "1:729654841858:web:f0f7f01fbc2a09d16e4d1b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);