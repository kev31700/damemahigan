
import { supabase } from "@/integrations/supabase/client";

export interface Practice {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  longDescription?: string;
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
    .eq('id', id)
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
