
// Type definitions
export interface Practice {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  longDescription?: string;
}

export interface Testimonial {
  id: string;
  content: string;
  date: string;
  response?: string;
}

import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, where } from 'firebase/firestore';

// Collection references
const practicesCollection = collection(db, 'practices');
const testimonialsCollection = collection(db, 'testimonials');

// Practices-related functions
export const getPractices = async (): Promise<Practice[]> => {
  try {
    const snapshot = await getDocs(practicesCollection);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id
      } as Practice;
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des pratiques:", error);
    return [];
  }
};

export const addPractice = async (practice: Omit<Practice, "id">): Promise<void> => {
  try {
    await addDoc(practicesCollection, practice);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'une pratique:", error);
    throw error;
  }
};

export const getPracticeById = async (id: string): Promise<Practice | null> => {
  try {
    const docRef = doc(practicesCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id } as Practice;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la pratique:", error);
    throw error;
  }
};

// Testimonial-related functions
export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const q = query(testimonialsCollection, orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id
      } as Testimonial;
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des témoignages:", error);
    return [];
  }
};

export const addTestimonial = async (testimonial: { content: string; date: string }): Promise<void> => {
  try {
    await addDoc(testimonialsCollection, testimonial);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un témoignage:", error);
    throw error;
  }
};

export const updateTestimonialResponse = async (id: string, response: string): Promise<void> => {
  try {
    const docRef = doc(testimonialsCollection, id);
    await updateDoc(docRef, { response });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la réponse:", error);
    throw error;
  }
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  try {
    const docRef = doc(testimonialsCollection, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Erreur lors de la suppression du témoignage:", error);
    throw error;
  }
};
