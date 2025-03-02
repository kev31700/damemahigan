
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

export const getPractices = async (): Promise<Practice[]> => {
  const { data, error } = await supabase
    .from('practices')
    .select('*');

  if (error) {
    console.error("Erreur lors de la récupération des pratiques:", error);
    throw error;
  }

  return data.map(item => ({
    id: item.id.toString(),
    title: item.title,
    description: item.description,
    imageUrl: item.imageUrl || '/placeholder.svg',
    longDescription: item.longDescription || ''
  }));
};

export const addPractice = async (practice: Omit<Practice, "id">): Promise<void> => {
  const { error } = await supabase
    .from('practices')
    .insert([practice]);

  if (error) {
    console.error("Erreur lors de l'ajout d'une pratique:", error);
    throw error;
  }
};

export const getPracticeById = async (id: string): Promise<Practice | null> => {
  const { data, error } = await supabase
    .from('practices')
    .select('*')
    .eq('id', parseInt(id))
    .maybeSingle();

  if (error) {
    console.error("Erreur lors de la récupération de la pratique:", error);
    throw error;
  }

  if (!data) {
    return null;
  }

  return {
    id: data.id.toString(),
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl || '/placeholder.svg',
    longDescription: data.longDescription || ''
  };
};

// Testimonial related functions
export const getTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Erreur lors de la récupération des témoignages:", error);
    throw error;
  }

  return data?.map(item => ({
    id: item.id.toString(),
    content: item.content,
    date: item.date || new Date(item.created_at).toLocaleDateString(),
    response: item.response
  })) || [];
};

export const addTestimonial = async (testimonial: { content: string; date: string }): Promise<void> => {
  const { error } = await supabase
    .from('testimonials')
    .insert([testimonial]);

  if (error) {
    console.error("Erreur lors de l'ajout d'un témoignage:", error);
    throw error;
  }
};

export const updateTestimonialResponse = async (id: string, response: string): Promise<void> => {
  const { error } = await supabase
    .from('testimonials')
    .update({ response })
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
