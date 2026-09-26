import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

// Live Firebase Configuration for quantumfx-ai project
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCzHfsLlQoiSzH3OvpbiU_mdBvhizTDsM4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "quantumfx-ai.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "quantumfx-ai",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "quantumfx-ai.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "523427738011",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:523427738011:web:a20a34b8c2558c5282713e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-CSDBNCK2W5"
};

// Initialize Firebase App & Auth Service
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup
};
