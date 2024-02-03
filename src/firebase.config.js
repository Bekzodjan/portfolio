// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpm53lpc5Vs4izV3tRnrSD4nuJys3IZEY",
  authDomain: "portfolio-bekzod.firebaseapp.com",
  projectId: "portfolio-bekzod",
  storageBucket: "portfolio-bekzod.appspot.com",
  messagingSenderId: "321580607306",
  appId: "1:321580607306:web:e50f48974f66e82bb443b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebase = getFirestore(app)