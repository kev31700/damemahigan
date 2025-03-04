// Mock data type definitions - keeping the same structure as before
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

// Initial sample practices
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

// Initial sample testimonials
const initialTestimonials: Testimonial[] = [
  {
    id: "1",
    content: "Les séances avec Dame Mahigan m'ont aidé à retrouver mon équilibre intérieur. Je recommande vivement!",
    date: new Date().toLocaleDateString(),
    response: "Merci pour votre témoignage. C'est un plaisir de vous accompagner dans votre cheminement."
  }
];

// Local storage keys
const PRACTICES_STORAGE_KEY = 'damemahigan_practices';
const TESTIMONIALS_STORAGE_KEY = 'damemahigan_testimonials';

// Helper to initialize storage with sample data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(PRACTICES_STORAGE_KEY)) {
    localStorage.setItem(PRACTICES_STORAGE_KEY, JSON.stringify(initialPractices));
  }
  
  if (!localStorage.getItem(TESTIMONIALS_STORAGE_KEY)) {
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(initialTestimonials));
  }
};

// Initialize storage on module load
initializeStorage();

// Practices-related functions
export const getPractices = async (): Promise<Practice[]> => {
  try {
    const practicesData = localStorage.getItem(PRACTICES_STORAGE_KEY);
    return practicesData ? JSON.parse(practicesData) : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des pratiques:", error);
    return [];
  }
};

export const addPractice = async (practice: Omit<Practice, "id">): Promise<void> => {
  try {
    const practices = await getPractices();
    const newPractice = {
      ...practice,
      id: Date.now().toString()
    };
    
    practices.push(newPractice);
    localStorage.setItem(PRACTICES_STORAGE_KEY, JSON.stringify(practices));
  } catch (error) {
    console.error("Erreur lors de l'ajout d'une pratique:", error);
    throw error;
  }
};

export const getPracticeById = async (id: string): Promise<Practice | null> => {
  try {
    const practices = await getPractices();
    const practice = practices.find(p => p.id === id);
    return practice || null;
  } catch (error) {
    console.error("Erreur lors de la récupération de la pratique:", error);
    throw error;
  }
};

// Testimonial-related functions
export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const testimonialsData = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
    const testimonials = testimonialsData ? JSON.parse(testimonialsData) : [];
    return testimonials.sort((a: Testimonial, b: Testimonial) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des témoignages:", error);
    return [];
  }
};

export const addTestimonial = async (testimonial: { content: string; date: string }): Promise<void> => {
  try {
    const testimonials = await getTestimonials();
    const newTestimonial = {
      ...testimonial,
      id: Date.now().toString()
    };
    
    testimonials.push(newTestimonial);
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonials));
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un témoignage:", error);
    throw error;
  }
};

export const updateTestimonialResponse = async (id: string, response: string): Promise<void> => {
  try {
    const testimonials = await getTestimonials();
    const updatedTestimonials = testimonials.map(t => 
      t.id === id ? { ...t, response } : t
    );
    
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(updatedTestimonials));
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la réponse:", error);
    throw error;
  }
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  try {
    const testimonials = await getTestimonials();
    const filteredTestimonials = testimonials.filter(t => t.id !== id);
    
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(filteredTestimonials));
  } catch (error) {
    console.error("Erreur lors de la suppression du témoignage:", error);
    throw error;
  }
};
