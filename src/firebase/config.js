// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvoFqXOlRxMTahLfJeHgGLK2TuwSxIdgA",
  authDomain: "hootel-log.firebaseapp.com",
  projectId: "hootel-log",
  storageBucket: "hootel-log.appspot.com",
  messagingSenderId: "522955640485",
  appId: "1:522955640485:web:51207027fba2b25e09c74c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Check if Firestore is initialized
if (!db) {
  console.error("Firestore failed to initialize!");
}

// Log that Firebase was initialized successfully
console.log("Firebase initialized successfully");

export default app; 