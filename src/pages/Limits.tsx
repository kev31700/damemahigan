
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAdmin } from "@/contexts/AdminContext";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Plus, Trash } from "lucide-react";
import { ExcludedPractice, getExcludedPractices, addExcludedPractice, deleteExcludedPractice } from "@/lib/storage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Limits = () => {
  const { isAdmin } = useAdmin();
  const [newPractice, setNewPractice] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch excluded practices from Firebase
  const { data: excludedPractices = [], isLoading, error } = useQuery({
    queryKey: ['excludedPractices'],
    queryFn: getExcludedPractices
  });

  // Add practice mutation
  const addPracticeMutation = useMutation({
    mutationFn: addExcludedPractice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['excludedPractices'] });
      setNewPractice("");
      setDialogOpen(false);
      toast.success("Pratique ajoutée avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de l'ajout de la pratique");
      console.error(error);
    }
  });

  // Delete practice mutation
  const deletePracticeMutation = useMutation({
    mutationFn: deleteExcludedPractice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['excludedPractices'] });
      toast.success("Pratique supprimée avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression de la pratique");
      console.error(error);
    }
  });

  const addPractice = () => {
    if (!newPractice.trim()) {
      toast.error("Le nom de la pratique est requis");
      return;
    }

    if (excludedPractices.some(p => p.name === newPractice)) {
      toast.error("Cette pratique est déjà dans la liste");
      return;
    }

    addPracticeMutation.mutate({ name: newPractice });
  };

  const removePractice = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette pratique ?")) {
      deletePracticeMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="container mx-auto px-4 py-8 text-center">Chargement...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center">Une erreur est survenue</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Mes Limites
      </h1>

      <div className="max-w-3xl mx-auto mb-8 text-lg text-gray-600 text-center">
        <p className="mb-6">
          La confiance et le respect mutuel sont les fondements de toute relation BDSM saine. 
          Voici mes limites non négociables, garantes de séances sûres et éthiques.
        </p>
      </div>

      <div className="space-y-8 max-w-3xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-2xl text-center text-primary">Pratiques exclues</CardTitle>
            {isAdmin && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    Ajouter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter une nouvelle limite</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium">Nom de la pratique exclue</label>
                      <Input
                        value={newPractice}
                        onChange={(e) => setNewPractice(e.target.value)}
                        placeholder="Nom de la pratique"
                      />
                    </div>
                    <Button onClick={addPractice} className="w-full">Ajouter</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {excludedPractices.map((practice) => (
                <li 
                  key={practice.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <span className="text-lg">{practice.name}</span>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePractice(practice.id)}
                      className="h-6 w-6"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto mt-8 text-lg text-gray-600">
        <p className="mb-4">
          Cette liste n'est pas exhaustive et peut évoluer. D'autres limites peuvent s'appliquer selon les situations et les personnes.
        </p>
        <p>
          N'hésitez pas à discuter de vos propres limites lors de nos échanges. La communication ouverte et honnête est essentielle pour une expérience enrichissante et respectueuse.
        </p>
      </div>
    </div>
  );
};

export default Limits;
