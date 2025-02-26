
import { db } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';

export interface Testimonial {
  id?: string;
  content: string;
  date: string;
  response?: string;
}

export interface Practice {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  longDescription?: string;
}

export const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'testimonials'), testimonial);
    return { ...testimonial, id: docRef.id };
  } catch (error) {
    console.error('Error adding testimonial: ', error);
    throw error;
  }
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const q = query(collection(db, 'testimonials'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Testimonial));
  } catch (error) {
    console.error('Error getting testimonials: ', error);
    throw error;
  }
};

export const updateTestimonialResponse = async (testimonialId: string, response: string) => {
  try {
    const testimonialRef = doc(db, 'testimonials', testimonialId);
    await updateDoc(testimonialRef, { response });
    return { response };
  } catch (error) {
    console.error('Error updating testimonial response: ', error);
    throw error;
  }
};

export const addPractice = async (practice: Omit<Practice, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'practices'), practice);
    return { ...practice, id: docRef.id };
  } catch (error) {
    console.error('Error adding practice: ', error);
    throw error;
  }
};

export const getPractices = async (): Promise<Practice[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'practices'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Practice));
  } catch (error) {
    console.error('Error getting practices: ', error);
    throw error;
  }
};
