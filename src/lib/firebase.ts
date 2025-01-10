import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDB8pBG1iTlDpTWMmT9Kz9n46bpJ5xNiuE",
  authDomain: "eadtoolz.firebaseapp.com",
  projectId: "eadtoolz",
  storageBucket: "eadtoolz.firebasestorage.app",
  messagingSenderId: "129638124727",
  appId: "1:129638124727:web:7fa677442eff7c55e05132"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);