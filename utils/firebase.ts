// utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

//Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDlBtmOQg-sU1oxdgIYqY7GRgKSlAfLQ18",
  authDomain: "hexreviewhackwashu.firebaseapp.com",
  projectId: "hexreviewhackwashu",
  storageBucket: "hexreviewhackwashu.appspot.com",
  messagingSenderId: "8594820300",
  appId: "1:8594820300:web:3d2983f9e363846ca94669",
};

// Initialize
const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
// Use these bad boys elsewhere
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Add GitHub provider configuration
export const githubProvider = new GithubAuthProvider();
githubProvider.addScope("user:email");
