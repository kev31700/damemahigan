
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Cette fonction permet de migrer les données de Firebase vers Supabase
export const migrateDataToSupabase = async () => {
  try {
    toast.info("Migration des données en cours...");
    
    // Migration des pratiques
    await migratePractices();
    
    // Migration des témoignages
    await migrateTestimonials();
    
    // Migration des images de la galerie
    await migrateGallery();
    
    // Migration des services (tarifs)
    await migrateServices();
    
    // Migration des pratiques exclues (limites)
    await migrateExcludedPractices();
    
    // Migration des images du carousel
    await migrateCarouselImages();
    
    // Migration des formulaires de contact
    await migrateContactForms();
    
    toast.success("Migration des données terminée avec succès");
  } catch (error) {
    console.error("Erreur lors de la migration des données:", error);
    toast.error("Erreur lors de la migration des données");
  }
};

const migratePractices = async () => {
  const practicesCollection = collection(db, 'practices');
  const snapshot = await getDocs(practicesCollection);
  
  if (snapshot.empty) return;
  
  const practices = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      title: data.title,
      description: data.description,
      image_url: data.imageUrl,
      long_description: data.longDescription
    };
  });
  
  // Insertion par lots
  for (const practice of practices) {
    const { error } = await supabase
      .from('practices')
      .insert(practice);
      
    if (error) console.error("Error inserting practice:", error);
  }
};

const migrateTestimonials = async () => {
  const testimonialsCollection = collection(db, 'testimonials');
  const snapshot = await getDocs(testimonialsCollection);
  
  if (snapshot.empty) return;
  
  const testimonials = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      content: data.content,
      date: data.date,
      response: data.response
    };
  });
  
  // Insertion par lots
  for (const testimonial of testimonials) {
    const { error } = await supabase
      .from('testimonials')
      .insert(testimonial);
      
    if (error) console.error("Error inserting testimonial:", error);
  }
};

const migrateGallery = async () => {
  const galleryCollection = collection(db, 'gallery');
  const snapshot = await getDocs(galleryCollection);
  
  if (snapshot.empty) return;
  
  const images = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      url: data.url,
      title: data.title
    };
  });
  
  // Insertion par lots
  for (const image of images) {
    const { error } = await supabase
      .from('gallery_images')
      .insert(image);
      
    if (error) console.error("Error inserting gallery image:", error);
  }
};

const migrateServices = async () => {
  const servicesCollection = collection(db, 'services');
  const snapshot = await getDocs(servicesCollection);
  
  if (snapshot.empty) return;
  
  const services = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      name: data.name,
      price: data.price,
      description: data.description,
      position: data.position
    };
  });
  
  // Insertion par lots
  for (const service of services) {
    const { error } = await supabase
      .from('services')
      .insert(service);
      
    if (error) console.error("Error inserting service:", error);
  }
};

const migrateExcludedPractices = async () => {
  const excludedPracticesCollection = collection(db, 'excludedPractices');
  const snapshot = await getDocs(excludedPracticesCollection);
  
  if (snapshot.empty) return;
  
  const practices = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      name: data.name
    };
  });
  
  // Insertion par lots
  for (const practice of practices) {
    const { error } = await supabase
      .from('excluded_practices')
      .insert(practice);
      
    if (error) console.error("Error inserting excluded practice:", error);
  }
};

const migrateCarouselImages = async () => {
  const carouselImagesCollection = collection(db, 'carouselImages');
  const snapshot = await getDocs(carouselImagesCollection);
  
  if (snapshot.empty) return;
  
  const images = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      src: data.src,
      alt: data.alt
    };
  });
  
  // Insertion par lots
  for (const image of images) {
    const { error } = await supabase
      .from('carousel_images')
      .insert(image);
      
    if (error) console.error("Error inserting carousel image:", error);
  }
};

const migrateContactForms = async () => {
  const contactFormsCollection = collection(db, 'contactForms');
  const snapshot = await getDocs(contactFormsCollection);
  
  if (snapshot.empty) return;
  
  const forms = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      name_or_pseudo: data.nameOrPseudo,
      age: data.age,
      height: data.height,
      weight: data.weight,
      experience_level: data.experienceLevel,
      desired_practices: data.desiredPractices,
      limits: data.limits,
      fetish_specification: data.fetishSpecification,
      email: data.email,
      phone: data.phone,
      contact_preference: data.contactPreference,
      session_duration: data.sessionDuration,
      created_at: data.createdAt
    };
  });
  
  // Insertion par lots
  for (const form of forms) {
    const { error } = await supabase
      .from('contact_forms')
      .insert(form);
      
    if (error) console.error("Error inserting contact form:", error);
  }
};
