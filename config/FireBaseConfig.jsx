// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa8qEU1EDakjZM34EXdlm5QTl11o4Hccw",
  authDomain: "slingg-f409c.firebaseapp.com",
  projectId: "slingg-f409c",
  storageBucket: "slingg-f409c.appspot.com",
  messagingSenderId: "818933396674",
  appId: "1:818933396674:web:dccf511f9e77ad4a58b75b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);