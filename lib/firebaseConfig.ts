

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// If using @react-native-firebase, database is already initialized as:
import database from '@react-native-firebase/database';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtwWNikQ-_hhIOQU-fI6C2NYGui8ubl78",
  authDomain: "plant-49e17.firebaseapp.com",
  projectId: "plant-49e17",
  storageBucket: "plant-49e17.firebasestorage.app",
  messagingSenderId: "96263305027",
  appId: "1:96263305027:web:74bc317371a47062ffa1f6",
  measurementId: "G-Y8N3WMXQYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default database();