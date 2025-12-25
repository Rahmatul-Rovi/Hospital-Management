// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Auth er jonno
import { getFirestore } from "firebase/firestore"; // Database er jonno
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs5SdSYqh2p1RE6Qojud6nYjSo909hmQ0",
  authDomain: "hospital-management-db24f.firebaseapp.com",
  projectId: "hospital-management-db24f",
  storageBucket: "hospital-management-db24f.firebasestorage.app",
  messagingSenderId: "935681116498",
  appId: "1:935681116498:web:919609f07353159b55128b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export default app;
export { auth, db };