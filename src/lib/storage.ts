
// Type definitions
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

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

// Fonction pour télécharger une image vers Supabase Storage
const uploadImageToStorage = async (image: string, folderName: string): Promise<string> => {
  // Vérifier si l'image est déjà une URL ou un base64
  if (image.startsWith('http') && !image.includes('base64')) {
    return image; // Déjà une URL, pas besoin de télécharger
  }

  try {
    // Générer un nom de fichier unique
    const fileExt = 'jpg'; // Pour les images base64, on utilise jpg par défaut
    const fileName = `${folderName}/${uuidv4()}.${fileExt}`;
    
    // Convertir le base64 en blob pour téléchargement
    let fileData = image;
    
    // Si c'est une chaîne base64, enlever l'en-tête
    if (image.includes('base64,')) {
      fileData = image.split('base64,')[1];
    }
    
    // Télécharger le fichier vers Supabase Storage
    const { data, error } = await supabase.storage
      .from('mahigan-images')
      .upload(fileName, fileData, {
        contentType: 'image/jpeg',
        upsert: true
      });

    if (error) {
      console.error("Erreur lors du téléchargement de l'image:", error);
      return image; // Retourner l'image originale en cas d'erreur
    }

    // Obtenir l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from('mahigan-images')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error("Erreur lors du téléchargement de l'image:", error);
    return image; // Retourner l'image originale en cas d'erreur
  }
};

// Practices-related functions
export const getPractices = async (): Promise<Practice[]> => {
  try {
    const { data, error } = await supabase
      .from('practices')
      .select('*');
      
    if (error) {
      console.error("Erreur lors de la récupération des pratiques:", error);
      return [];
    }
    
    // Convertir les données Supabase au format attendu par l'application
    return data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.image_url,
      longDescription: item.long_description
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des pratiques:", error);
    return [];
  }
};

export const addPractice = async (practice: Omit<Practice, "id">): Promise<void> => {
  try {
    // Télécharger l'image si nécessaire
    const imageUrl = await uploadImageToStorage(practice.imageUrl, 'practices');
    
    const { error } = await supabase
      .from('practices')
      .insert({
        title: practice.title,
        description: practice.description,
        image_url: imageUrl,
        long_description: practice.longDescription
      });
      
    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de l'ajout d'une pratique:", error);
    throw error;
  }
};

export const deletePractice = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('practices')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de la suppression de la pratique:", error);
    throw error;
  }
};

export const getPracticeById = async (id: string): Promise<Practice | null> => {
  try {
    const { data, error } = await supabase
      .from('practices')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error("Erreur lors de la récupération de la pratique:", error);
      return null;
    }
    
    if (!data) return null;
    
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      imageUrl: data.image_url,
      longDescription: data.long_description
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de la pratique:", error);
    return null;
  }
};

export const updatePractice = async (id: string, practice: Partial<Omit<Practice, "id">>): Promise<void> => {
  try {
    let updateData: any = { ...practice };
    
    // Si une nouvelle image est fournie, la télécharger d'abord
    if (practice.imageUrl) {
      const imageUrl = await uploadImageToStorage(practice.imageUrl, 'practices');
      updateData.image_url = imageUrl;
      delete updateData.imageUrl;
    }
    
    // Convertir les autres champs au format Supabase
    if ('longDescription' in updateData) {
      updateData.long_description = updateData.longDescription;
      delete updateData.longDescription;
    }
    
    const { error } = await supabase
      .from('practices')
      .update(updateData)
      .eq('id', id);
      
    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la pratique:", error);
    throw error;
  }
};

// Function to detect and remove duplicate practices based on title
export const removeDuplicatePractices = async (): Promise<number> => {
  try {
    const { data: practices, error } = await supabase
      .from('practices')
      .select('*');
      
    if (error) throw error;
    
    const titleMap = new Map<string, string[]>();
    
    // Grouper les pratiques par titre (insensible à la casse)
    practices.forEach(practice => {
      const lowerTitle = practice.title.toLowerCase();
      if (!titleMap.has(lowerTitle)) {
        titleMap.set(lowerTitle, []);
      }
      titleMap.get(lowerTitle)?.push(practice.id);
    });
    
    // Identifier les doublons
    const duplicateIds: string[] = [];
    
    titleMap.forEach(ids => {
      if (ids.length > 1) {
        // Garder le premier, supprimer les autres
        duplicateIds.push(...ids.slice(1));
      }
    });
    
    if (duplicateIds.length > 0) {
      // Supprimer les doublons
      const { error: deleteError } = await supabase
        .from('practices')
        .delete()
        .in('id', duplicateIds);
        
      if (deleteError) throw deleteError;
    }
    
    return duplicateIds.length;
  } catch (error) {
    console.error("Erreur lors de la suppression des doublons:", error);
    throw error;
  }
};

// Testimonial-related functions
export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Erreur lors de la récupération des témoignages:", error);
      return [];
    }
    
    return data.map(item => ({
      id: item.id,
      content: item.content,
      date: item.date,
      response: item.response
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des témoignages:", error);
    return [];
  }
};

export const addTestimonial = async (testimonial: { content: string; date: string }): Promise<void> => {
  try {
    const { error } = await supabase
      .from('testimonials')
      .insert({
        content: testimonial.content,
        date: testimonial.date
      });
      
    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un témoignage:", error);
    throw error;
  }
};

export const updateTestimonialResponse = async (id: string, response: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('testimonials')
      .update({ response })
      .eq('id', id);
      
    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la réponse:", error);
    throw error;
  }
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de la suppression du témoignage:", error);
    throw error;
  }
};

// Gallery-related functions
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*');
      
    if (error) {
      console.error("Erreur lors de la récupération des images:", error);
      return [];
    }
    
    return data.map(item => ({
      id: item.id,
      url: item.url,
      title: item.title
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des images:", error);
    return [];
  }
};

export const addGalleryImage = async (image: Omit<GalleryImage, "id">): Promise<void> => {
  try {
    // Télécharger l'image si nécessaire
    const imageUrl = await uploadImageToStorage(image.url, 'gallery');
    
    const { error } = await supabase
      .from('gallery_images')
      .insert({
        url: imageUrl,
        title: image.title
      });
      
    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de l'ajout d'une image:", error);
    throw error;
  }
};

export const deleteGalleryImage = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image:", error);
    throw error;
  }
};

// Services (pricing) related functions
export const getServices = async (): Promise<Service[]> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*');
      
    if (error) {
      console.error("Erreur lors de la récupération des services:", error);
      return [];
    }
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      position: item.position
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des services:", error);
    return [];
  }
};

export const addService = async (service: Omit<Service, "id">): Promise<void> => {
  try {
    const { data: services, error: countError } = await supabase
      .from('services')
      .select('*');
      
    if (countError) throw countError;
    
    const count = services?.length || 0;
    
    // Set position to the end of the list by default
    const serviceWithPosition = {
      name: service.name,
      price: service.price,
      description: service.description,
      position: service.position !== undefined ? service.position : count
    };
    
    const { error } = await supabase
      .from('services')
      .insert(serviceWithPosition);
      
    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un service:", error);
    throw error;
  }
};

export const updateService = async (id: string, service: Omit<Service, "id">): Promise<void> => {
  try {
    const { error } = await supabase
      .from('services')
      .update({
        name: service.name,
        price: service.price,
        description: service.description,
        position: service.position
      })
      .eq('id', id);
      
    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du service:", error);
    throw error;
  }
};

export const updateServicesOrder = async (orderedServices: { id: string, position: number }[]): Promise<void> => {
  try {
    // Supabase ne prend pas en charge les mises à jour par lots, 
    // nous devons donc effectuer plusieurs requêtes de mise à jour
    for (const service of orderedServices) {
      const { error } = await supabase
        .from('services')
        .update({ position: service.position })
        .eq('id', service.id);
        
      if (error) throw error;
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'ordre des services:", error);
    throw error;
  }
};

export const deleteService = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de la suppression du service:", error);
    throw error;
  }
};

// Excluded practices (limits) related functions
export const getExcludedPractices = async (): Promise<ExcludedPractice[]> => {
  try {
    const { data, error } = await supabase
      .from('excluded_practices')
      .select('*');
      
    if (error) {
      console.error("Erreur lors de la récupération des pratiques exclues:", error);
      return [];
    }
    
    return data.map(item => ({
      id: item.id,
      name: item.name
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des pratiques exclues:", error);
    return [];
  }
};

export const addExcludedPractice = async (practice: { name: string }): Promise<void> => {
  try {
    const { error } = await supabase
      .from('excluded_practices')
      .insert({
        name: practice.name
      });
      
    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de l'ajout d'une pratique exclue:", error);
    throw error;
  }
};

export const deleteExcludedPractice = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('excluded_practices')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de la suppression de la pratique exclue:", error);
    throw error;
  }
};

// Carousel Images related functions
export const getCarouselImages = async (): Promise<CarouselImage[]> => {
  try {
    const { data, error } = await supabase
      .from('carousel_images')
      .select('*');
      
    if (error) {
      console.error("Erreur lors de la récupération des images du carousel:", error);
      return [];
    }
    
    return data.map(item => ({
      id: item.id,
      src: item.src,
      alt: item.alt
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des images du carousel:", error);
    return [];
  }
};

export const addCarouselImage = async (image: Omit<CarouselImage, "id">): Promise<void> => {
  try {
    // Télécharger l'image si nécessaire
    const imageUrl = await uploadImageToStorage(image.src, 'carousel');
    
    const { error } = await supabase
      .from('carousel_images')
      .insert({
        src: imageUrl,
        alt: image.alt
      });
      
    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de l'ajout d'une image au carousel:", error);
    throw error;
  }
};

export const deleteCarouselImage = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('carousel_images')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image du carousel:", error);
    throw error;
  }
};

// Contact form related functions
export const saveContactForm = async (formData: Omit<ContactFormData, "id" | "createdAt">): Promise<string> => {
  try {
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('contact_forms')
      .insert({
        name_or_pseudo: formData.nameOrPseudo,
        age: formData.age,
        height: formData.height,
        weight: formData.weight,
        experience_level: formData.experienceLevel,
        desired_practices: formData.desiredPractices,
        limits: formData.limits,
        fetish_specification: formData.fetishSpecification,
        email: formData.email,
        phone: formData.phone,
        contact_preference: formData.contactPreference,
        session_duration: formData.sessionDuration,
        created_at: now
      })
      .select();
      
    if (error) throw error;
    
    return data ? data[0].id : '';
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du formulaire de contact:", error);
    throw error;
  }
};

export const getContactForms = async (): Promise<ContactFormData[]> => {
  try {
    const { data, error } = await supabase
      .from('contact_forms')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Erreur lors de la récupération des formulaires de contact:", error);
      return [];
    }
    
    return data.map(item => ({
      id: item.id,
      nameOrPseudo: item.name_or_pseudo,
      age: item.age,
      height: item.height,
      weight: item.weight,
      experienceLevel: item.experience_level,
      desiredPractices: item.desired_practices,
      limits: item.limits,
      fetishSpecification: item.fetish_specification,
      email: item.email,
      phone: item.phone,
      contactPreference: item.contact_preference,
      sessionDuration: item.session_duration,
      createdAt: item.created_at
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des formulaires de contact:", error);
    return [];
  }
};

export const getContactFormById = async (id: string): Promise<ContactFormData | null> => {
  try {
    const { data, error } = await supabase
      .from('contact_forms')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error("Erreur lors de la récupération du formulaire de contact:", error);
      return null;
    }
    
    if (!data) return null;
    
    return {
      id: data.id,
      nameOrPseudo: data.name_or_pseudo,
      age: data.age,
      height: data.height,
      weight: data.weight,
      experienceLevel: data.experience_level,
      desiredPractices: data.desired_practices,
      limits: data.limits,
      fetishSpecification: data.fetish_specification,
      email: data.email,
      phone: data.phone,
      contactPreference: data.contact_preference,
      sessionDuration: data.session_duration,
      createdAt: data.created_at
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du formulaire de contact:", error);
    return null;
  }
};

export const deleteContactForm = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('contact_forms')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  } catch (error) {
    console.error("Erreur lors de la suppression du formulaire de contact:", error);
    throw error;
  }
};
