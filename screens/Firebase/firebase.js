// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrnLUN7074E1ULGbRdWHGkcJ87AFtDba0",
  authDomain: "lungcare-a2352.firebaseapp.com",
  projectId: "lungcare-a2352",
  storageBucket: "lungcare-a2352.appspot.com",
  messagingSenderId: "869002522409",
  appId: "1:869002522409:web:cb068fe43e679f347a1138",
  measurementId: "G-Q18EY58355"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);


export {app,auth}