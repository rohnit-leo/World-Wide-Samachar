import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDp5QwMfLxnFMIR3uekOIisOLw2vzm0NT8",
  authDomain: "true-chassis-4t3g1.firebaseapp.com",
  projectId: "true-chassis-4t3g1",
  storageBucket: "true-chassis-4t3g1.firebasestorage.app",
  messagingSenderId: "630951274376",
  appId: "1:630951274376:web:c835d94b05d83c0477fc3d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-worldwidesamacha-47343efe-61a3-4c60-8125-503b2e673379");
export const auth = getAuth(app);
