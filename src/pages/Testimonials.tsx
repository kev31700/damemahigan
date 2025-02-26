
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTestimonials, addTestimonial, updateTestimonialResponse, type Testimonial } from "@/lib/firestore";

const Testimonials = () => {
  const [newTestimonial, setNewTestimonial] = useState("");
  const [isAdmin] = useState(false); // This should be connected to actual auth state
  const queryClient = useQueryClient();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials
  });

  const addTestimonialMutation = useMutation({
    mutationFn: addTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      setNewTestimonial("");
      toast.success("Témoignage ajouté avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de l'ajout du témoignage");
    }
  });

  const updateResponseMutation = useMutation({
    mutationFn: ({ id, response }: { id: string; response: string }) => 
      updateTestimonialResponse(id, response),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success("Réponse ajoutée avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de l'ajout de la réponse");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.trim()) {
      toast.error("Le témoignage ne peut pas être vide");
      return;
    }

    const testimonial = {
      content: newTestimonial,
      date: new Date().toLocaleDateString(),
    };

    addTestimonialMutation.mutate(testimonial);
  };

  const handleResponse = (testimonialId: string) => {
    const response = prompt("Votre réponse:");
    if (response) {
      updateResponseMutation.mutate({ id: testimonialId, response });
    }
  };

  if (isLoading) {
    return <div className="text-center mt-8">Chargement...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Témoignages</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={newTestimonial}
          onChange={(e) => setNewTestimonial(e.target.value)}
          placeholder="Partagez votre expérience..."
          className="min-h-[120px]"
          disabled={addTestimonialMutation.isPending}
        />
        <Button 
          type="submit" 
          className="w-full"
          disabled={addTestimonialMutation.isPending}
        >
          {addTestimonialMutation.isPending ? "Publication en cours..." : "Publier le témoignage"}
        </Button>
      </form>

      <div className="space-y-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-card p-6 rounded-lg shadow-sm space-y-4"
          >
            <div className="flex justify-between items-start">
              <p className="text-card-foreground">{testimonial.content}</p>
              <span className="text-sm text-muted-foreground">
                {testimonial.date}
              </span>
            </div>

            {testimonial.response && (
              <div className="ml-6 p-4 bg-muted rounded-md">
                <p className="text-sm font-medium">Réponse:</p>
                <p className="text-muted-foreground">{testimonial.response}</p>
              </div>
            )}

            {isAdmin && testimonial.id && (
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                >
                  Supprimer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleResponse(testimonial.id!)}
                  disabled={updateResponseMutation.isPending}
                >
                  Répondre
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
