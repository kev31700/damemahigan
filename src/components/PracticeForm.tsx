
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPractice } from "@/lib/firestore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PracticeFormProps {
  onSuccess?: () => void;
}

const PracticeForm = ({ onSuccess }: PracticeFormProps) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newPractice, setNewPractice] = useState({
    title: "",
    description: "",
    imageUrl: "",
    longDescription: ""
  });

  const addPracticeMutation = useMutation({
    mutationFn: addPractice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['practices'] });
      toast.success("La pratique a été ajoutée avec succès");
      setNewPractice({
        title: "",
        description: "",
        imageUrl: "",
        longDescription: ""
      });
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast.error("Une erreur est survenue lors de l'ajout de la pratique");
    }
  });

  const handleAddPractice = () => {
    if (!newPractice.title || !newPractice.description || !newPractice.imageUrl) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    addPracticeMutation.mutate(newPractice);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result as string;
      setNewPractice({
        ...newPractice,
        imageUrl: imageDataUrl
      });
      
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label className="text-sm font-medium">Titre</label>
        <Input
          value={newPractice.title}
          onChange={(e) => setNewPractice({ ...newPractice, title: e.target.value })}
          placeholder="Titre de la pratique"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={newPractice.description}
          onChange={(e) => setNewPractice({ ...newPractice, description: e.target.value })}
          placeholder="Description de la pratique"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Description détaillée</label>
        <Textarea
          value={newPractice.longDescription || ""}
          onChange={(e) => setNewPractice({ ...newPractice, longDescription: e.target.value })}
          placeholder="Description détaillée de la pratique"
        />
      </div>
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Mon album photo</TabsTrigger>
          <TabsTrigger value="url">URL</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <div className="space-y-2">
            <label className="text-sm font-medium">Sélectionner une photo</label>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </TabsContent>
        <TabsContent value="url">
          <div className="space-y-2">
            <label className="text-sm font-medium">URL de l'image</label>
            <Input
              value={newPractice.imageUrl}
              onChange={(e) => setNewPractice({ ...newPractice, imageUrl: e.target.value })}
              placeholder="URL de l'image"
            />
          </div>
        </TabsContent>
      </Tabs>
      {newPractice.imageUrl && (
        <div className="mt-2 border rounded overflow-hidden max-h-[100px]">
          <img 
            src={newPractice.imageUrl} 
            alt="Aperçu" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <Button 
        onClick={handleAddPractice} 
        className="w-full"
        disabled={addPracticeMutation.isPending}
      >
        {addPracticeMutation.isPending ? "Ajout en cours..." : "Ajouter"}
      </Button>
    </div>
  );
};

export default PracticeForm;
