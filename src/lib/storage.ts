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

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
}

export interface CarouselImage {
  id: string;
  src: string;
  alt: string;
}

export interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
  position?: number;
}

export interface ExcludedPractice {
  id: string;
  name: string;
}

export interface ContactFormData {
  id: string;
  nameOrPseudo: string;
  age: string;
  height: string;
  weight: string;
  experienceLevel: string;
  desiredPractices: string;
  limits: string;
  fetishSpecification: string;
  email: string;
  phone: string;
  contactPreference: string;
  sessionDuration: string;
  createdAt: string;
}

import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, where } from 'firebase/firestore';

// Collection references
const practicesCollection = collection(db, 'practices');
const testimonialsCollection = collection(db, 'testimonials');
const galleryCollection = collection(db, 'gallery');
const servicesCollection = collection(db, 'services');
const excludedPracticesCollection = collection(db, 'excludedPractices');
const carouselImagesCollection = collection(db, 'carouselImages');
const contactFormsCollection = collection(db, 'contactForms');

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

export const deletePractice = async (id: string): Promise<void> => {
  try {
    const docRef = doc(practicesCollection, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Erreur lors de la suppression de la pratique:", error);
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

// Gallery-related functions
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  try {
    const snapshot = await getDocs(galleryCollection);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id
      } as GalleryImage;
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des images:", error);
    return [];
  }
};

export const addGalleryImage = async (image: Omit<GalleryImage, "id">): Promise<void> => {
  try {
    await addDoc(galleryCollection, image);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'une image:", error);
    throw error;
  }
};

export const deleteGalleryImage = async (id: string): Promise<void> => {
  try {
    const docRef = doc(galleryCollection, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image:", error);
    throw error;
  }
};

// Services (pricing) related functions
export const getServices = async (): Promise<Service[]> => {
  try {
    const snapshot = await getDocs(servicesCollection);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id
      } as Service;
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des services:", error);
    return [];
  }
};

export const addService = async (service: Omit<Service, "id">): Promise<void> => {
  try {
    const snapshot = await getDocs(servicesCollection);
    const count = snapshot.size;
    
    // Set position to the end of the list by default
    const serviceWithPosition = {
      ...service,
      position: service.position !== undefined ? service.position : count
    };
    
    await addDoc(servicesCollection, serviceWithPosition);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un service:", error);
    throw error;
  }
};

export const updateService = async (id: string, service: Omit<Service, "id">): Promise<void> => {
  try {
    const docRef = doc(servicesCollection, id);
    await updateDoc(docRef, service);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du service:", error);
    throw error;
  }
};

export const updateServicesOrder = async (orderedServices: { id: string, position: number }[]): Promise<void> => {
  try {
    const batch = db.batch();
    
    orderedServices.forEach(service => {
      const docRef = doc(servicesCollection, service.id);
      batch.update(docRef, { position: service.position });
    });
    
    await batch.commit();
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'ordre des services:", error);
    throw error;
  }
};

export const deleteService = async (id: string): Promise<void> => {
  try {
    const docRef = doc(servicesCollection, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Erreur lors de la suppression du service:", error);
    throw error;
  }
};

// Excluded practices (limits) related functions
export const getExcludedPractices = async (): Promise<ExcludedPractice[]> => {
  try {
    const snapshot = await getDocs(excludedPracticesCollection);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id
      } as ExcludedPractice;
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des pratiques exclues:", error);
    return [];
  }
};

export const addExcludedPractice = async (practice: { name: string }): Promise<void> => {
  try {
    await addDoc(excludedPracticesCollection, practice);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'une pratique exclue:", error);
    throw error;
  }
};

export const deleteExcludedPractice = async (id: string): Promise<void> => {
  try {
    const docRef = doc(excludedPracticesCollection, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Erreur lors de la suppression de la pratique exclue:", error);
    throw error;
  }
};

// Carousel Images related functions
export const getCarouselImages = async (): Promise<CarouselImage[]> => {
  try {
    const snapshot = await getDocs(carouselImagesCollection);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id
      } as CarouselImage;
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des images du carousel:", error);
    return [];
  }
};

export const addCarouselImage = async (image: Omit<CarouselImage, "id">): Promise<void> => {
  try {
    await addDoc(carouselImagesCollection, image);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'une image au carousel:", error);
    throw error;
  }
};

export const deleteCarouselImage = async (id: string): Promise<void> => {
  try {
    const docRef = doc(carouselImagesCollection, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image du carousel:", error);
    throw error;
  }
};

// Contact form related functions
export const saveContactForm = async (formData: Omit<ContactFormData, "id" | "createdAt">): Promise<string> => {
  try {
    const dataToSave = {
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(contactFormsCollection, dataToSave);
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du formulaire de contact:", error);
    throw error;
  }
};

export const getContactForms = async (): Promise<ContactFormData[]> => {
  try {
    const q = query(contactFormsCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id
      } as ContactFormData;
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des formulaires de contact:", error);
    return [];
  }
};

export const getContactFormById = async (id: string): Promise<ContactFormData | null> => {
  try {
    const docRef = doc(contactFormsCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id } as ContactFormData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du formulaire de contact:", error);
    throw error;
  }
};

export const deleteContactForm = async (id: string): Promise<void> => {
  try {
    const docRef = doc(contactFormsCollection, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Erreur lors de la suppression du formulaire de contact:", error);
    throw error;
  }
};
