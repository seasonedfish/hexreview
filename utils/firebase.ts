// utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

//Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// Initialize
const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
// Use these bad boys elsewhere
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);