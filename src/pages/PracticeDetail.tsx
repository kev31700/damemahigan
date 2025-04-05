
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPracticeById, deletePractice } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, ArrowLeft } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import PracticeEditForm from "@/components/PracticeEditForm";

const PracticeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const queryClient = useQueryClient();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const { data: practice, isLoading, error } = useQuery({
    queryKey: ['practice', id],
    queryFn: () => getPracticeById(id || ""),
    enabled: !!id
  });

  const deletePracticeMutation = useMutation({
    mutationFn: (id: string) => deletePractice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['practices'] });
      toast.success("La pratique a été supprimée avec succès");
      navigate("/pratiques");
    },
    onError: (error) => {
      toast.error("Une erreur est survenue lors de la suppression de la pratique");
      console.error(error);
    }
  });

  const handleDelete = () => {
    if (id) {
      deletePracticeMutation.mutate(id);
    }
  };

  const handleEditSuccess = () => {
    setEditDialogOpen(false);
    toast.success("Pratique mise à jour avec succès");
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Chargement...</div>;
  }

  if (error || !practice) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500 mb-4">Erreur lors du chargement de la pratique</p>
        <Button variant="outline" onClick={() => navigate("/pratiques")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux pratiques
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-start">
        <Button variant="outline" onClick={() => navigate("/pratiques")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux pratiques
        </Button>
        
        {isAdmin && (
          <div className="flex space-x-2">
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <Pencil className="h-4 w-4" />
                  Modifier
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Modifier la pratique</DialogTitle>
                  <DialogDescription>
                    Modifiez les détails de cette pratique et sauvegardez vos changements.
                  </DialogDescription>
                </DialogHeader>
                <PracticeEditForm practice={practice} onSuccess={handleEditSuccess} />
              </DialogContent>
            </Dialog>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex items-center gap-1">
                  <Trash className="h-4 w-4" />
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. Elle supprimera définitivement cette pratique.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="rounded-lg overflow-hidden shadow-lg bg-card">
            <img 
              src={practice.imageUrl} 
              alt={practice.title} 
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-4xl font-bold text-primary">{practice.title}</h1>
          
          <div className="prose max-w-none dark:prose-invert">
            <p className="text-xl">{practice.description}</p>
            
            {practice.longDescription && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-4">Description détaillée</h3>
                <p>{practice.longDescription}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeDetail;
