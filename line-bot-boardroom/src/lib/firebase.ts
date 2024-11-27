// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiAH5-i2D9LMuESJUIt0C3V7_IlNe8Ngk",
  authDomain: "line-bot-boardroom.firebaseapp.com",
  databaseURL:
    "https://line-bot-boardroom-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "line-bot-boardroom",
  storageBucket: "line-bot-boardroom.firebasestorage.app",
  messagingSenderId: "400319558549",
  appId: "1:400319558549:web:bdab5e5d52c7c31d457c9c",
  measurementId: "G-5J0YQE08G7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
