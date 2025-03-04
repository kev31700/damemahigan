
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Practice, Testimonial } from './storage';

const firebaseConfig = {
  apiKey: "AIzaSyBANj7xlVOPEv8HawCprWQf1lNB5sejDFU",
  authDomain: "mahigan-bd7ae.firebaseapp.com",
  projectId: "mahigan-bd7ae",
  storageBucket: "mahigan-bd7ae.appspot.com",
  messagingSenderId: "615958796849",
  appId: "1:615958796849:web:e76756d40780e90239d310",
  measurementId: "G-C3JWV7VFZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Collection references
const practicesCollection = collection(db, 'practices');
const testimonialsCollection = collection(db, 'testimonials');

// Initial data for first-time setup
const initialPractices: Practice[] = [
  {
    id: "1",
    title: "Méditation guidée",
    description: "Une pratique méditative pour atteindre un état de calme et de clarté mentale.",
    imageUrl: "/placeholder.svg",
    longDescription: "La méditation guidée est une technique qui vous aide à vous concentrer et à vous détendre. Elle peut réduire le stress, améliorer la concentration et favoriser le bien-être émotionnel."
  },
  {
    id: "2",
    title: "Respiration consciente",
    description: "Techniques de respiration pour la relaxation et la gestion du stress.",
    imageUrl: "/placeholder.svg",
    longDescription: "La respiration consciente est une pratique simple mais puissante qui vous permet de vous recentrer et de calmer votre esprit en vous concentrant sur votre souffle."
  }
];

const initialTestimonials: Testimonial[] = [
  {
    id: "1",
    content: "Les séances avec Dame Mahigan m'ont aidé à retrouver mon équilibre intérieur. Je recommande vivement!",
    date: new Date().toLocaleDateString(),
    response: "Merci pour votre témoignage. C'est un plaisir de vous accompagner dans votre cheminement."
  }
];

// Helper function to initialize collections if they're empty
export const initializeFirebase = async () => {
  try {
    const practicesSnapshot = await getDocs(practicesCollection);
    if (practicesSnapshot.empty) {
      console.log("Initializing practices collection...");
      for (const practice of initialPractices) {
        await addDoc(practicesCollection, practice);
      }
    }

    const testimonialsSnapshot = await getDocs(testimonialsCollection);
    if (testimonialsSnapshot.empty) {
      console.log("Initializing testimonials collection...");
      for (const testimonial of initialTestimonials) {
        await addDoc(testimonialsCollection, testimonial);
      }
    }
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
};

// Call initialization
initializeFirebase();
