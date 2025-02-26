
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBANj7xlVOPEv8HawCprWQf1lNB5sejDFU",
  authDomain: "mahigan-bd7ae.firebaseapp.com",
  projectId: "mahigan-bd7ae",
  storageBucket: "mahigan-bd7ae.firebasestorage.app",
  messagingSenderId: "615958796849",
  appId: "1:615958796849:web:e76756d40780e90239d310",
  measurementId: "G-C3JWV7VFZ8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
