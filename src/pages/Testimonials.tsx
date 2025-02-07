import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Testimonial {
  id: number;
  content: string;
  date: string;
  response?: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newTestimonial, setNewTestimonial] = useState("");
  const [isAdmin] = useState(false); // This should be connected to actual auth state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.trim()) {
      toast.error("Le témoignage ne peut pas être vide");
      return;
    }

    const testimonial: Testimonial = {
      id: Date.now(),
      content: newTestimonial,
      date: new Date().toLocaleDateString(),
    };

    setTestimonials([testimonial, ...testimonials]);
    setNewTestimonial("");
    toast.success("Témoignage ajouté avec succès");
  };

  const handleDelete = (id: number) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
    toast.success("Témoignage supprimé");
  };

  const handleResponse = (id: number, response: string) => {
    setTestimonials(
      testimonials.map((t) =>
        t.id === id ? { ...t, response } : t
      )
    );
    toast.success("Réponse ajoutée");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Témoignages</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={newTestimonial}
          onChange={(e) => setNewTestimonial(e.target.value)}
          placeholder="Partagez votre expérience..."
          className="min-h-[120px]"
        />
        <Button type="submit" className="w-full">
          Publier le témoignage
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

            {isAdmin && (
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(testimonial.id)}
                >
                  Supprimer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const response = prompt("Votre réponse:");
                    if (response) handleResponse(testimonial.id, response);
                  }}
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