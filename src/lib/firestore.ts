
import { supabase } from "@/integrations/supabase/client";

// Type definition for practices
export interface Practice {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  longDescription?: string;
}

// Type definition for testimonials
export interface Testimonial {
  id: string;
  content: string;
  date: string;
  response?: string;
}

// Interface pour représenter les données de la table pratique dans Supabase
interface PratiqueRow {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  longDescription?: string;
  created_at: string;
}

// Interface pour représenter les données de la table testimonials dans Supabase
interface TestimonialRow {
  id: number;
  content: string;
  date?: string;
  response?: string;
  created_at: string;
}

export const getPractices = async (): Promise<Practice[]> => {
  // Use the correct table name "pratique" instead of "practices"
  const { data, error } = await supabase
    .from('pratique')
    .select('*') as unknown as { data: PratiqueRow[] | null; error: Error | null };

  if (error) {
    console.error("Erreur lors de la récupération des pratiques:", error);
    throw error;
  }

  return (data || []).map(item => ({
    id: item.id.toString(),
    title: item.title || '',
    description: item.description || '',
    imageUrl: item.imageUrl || '/placeholder.svg',
    longDescription: item.longDescription || ''
  }));
};

export const addPractice = async (practice: Omit<Practice, "id">): Promise<void> => {
  // Use the correct table name "pratique" instead of "practices"
  const { error } = await supabase
    .from('pratique')
    .insert([{
      title: practice.title,
      description: practice.description,
      imageUrl: practice.imageUrl,
      longDescription: practice.longDescription
    }]);

  if (error) {
    console.error("Erreur lors de l'ajout d'une pratique:", error);
    throw error;
  }
};

export const getPracticeById = async (id: string): Promise<Practice | null> => {
  // Use the correct table name "pratique" instead of "practices"
  const { data, error } = await supabase
    .from('pratique')
    .select('*')
    .eq('id', parseInt(id))
    .maybeSingle() as unknown as { data: PratiqueRow | null; error: Error | null };

  if (error) {
    console.error("Erreur lors de la récupération de la pratique:", error);
    throw error;
  }

  if (!data) {
    return null;
  }

  return {
    id: data.id.toString(),
    title: data.title || '',
    description: data.description || '',
    imageUrl: data.imageUrl || '/placeholder.svg',
    longDescription: data.longDescription || ''
  };
};

// Testimonial related functions
export const getTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false }) as { data: TestimonialRow[] | null; error: Error | null };

  if (error) {
    console.error("Erreur lors de la récupération des témoignages:", error);
    throw error;
  }

  return (data || []).map(item => ({
    id: item.id.toString(),
    content: item.content,
    date: item.date || new Date(item.created_at).toLocaleDateString(),
    response: item.response
  }));
};

export const addTestimonial = async (testimonial: { content: string; date: string }): Promise<void> => {
  const { error } = await supabase
    .from('testimonials')
    .insert([testimonial as unknown as TestimonialRow]);

  if (error) {
    console.error("Erreur lors de l'ajout d'un témoignage:", error);
    throw error;
  }
};

export const updateTestimonialResponse = async (id: string, response: string): Promise<void> => {
  const { error } = await supabase
    .from('testimonials')
    .update({ response } as unknown as TestimonialRow)
    .eq('id', parseInt(id));

  if (error) {
    console.error("Erreur lors de la mise à jour de la réponse:", error);
    throw error;
  }
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', parseInt(id));

  if (error) {
    console.error("Erreur lors de la suppression du témoignage:", error);
    throw error;
  }
};
