
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePractice, Practice } from "@/lib/storage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Image, RefreshCw } from "lucide-react";

interface PracticeEditFormProps {
  practice: Practice;
  onSuccess?: () => void;
}

const PracticeEditForm = ({ practice, onSuccess }: PracticeEditFormProps) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: practice.title,
    description: practice.description,
    imageUrl: practice.imageUrl,
    longDescription: practice.longDescription || ""
  });

  useEffect(() => {
    // Mettre à jour le formulaire si la pratique change
    setFormData({
      title: practice.title,
      description: practice.description,
      imageUrl: practice.imageUrl,
      longDescription: practice.longDescription || ""
    });
  }, [practice]);

  const updatePracticeMutation = useMutation({
    mutationFn: (updatedData: Partial<Omit<Practice, "id">>) => updatePractice(practice.id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['practices'] });
      toast.success("La pratique a été mise à jour avec succès");
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast.error("Une erreur est survenue lors de la mise à jour de la pratique");
      console.error(error);
    }
  });

  const handleUpdatePractice = () => {
    if (!formData.title || !formData.description) {
      toast.error("Le titre et la description sont obligatoires");
      return;
    }

    updatePracticeMutation.mutate(formData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result as string;
      setFormData({
        ...formData,
        imageUrl: imageDataUrl
      });
      
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      imageUrl: ""
    });
    toast.info("Image supprimée");
  };

  const handleReplaceImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label className="text-sm font-medium">Titre</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Titre de la pratique"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description de la pratique"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Description détaillée</label>
        <Textarea
          value={formData.longDescription}
          onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
          placeholder="Description détaillée de la pratique"
          className="min-h-[150px]"
        />
      </div>
      {!formData.imageUrl ? (
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
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="URL de l'image"
              />
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Image</label>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleReplaceImageClick}
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-4 w-4" />
                Remplacer
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleRemoveImage}
                className="flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Supprimer
              </Button>
            </div>
          </div>
          <div className="mt-2 border rounded overflow-hidden relative">
            <img 
              src={formData.imageUrl} 
              alt="Aperçu" 
              className="w-full h-[200px] object-cover"
            />
          </div>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
      <Button 
        onClick={handleUpdatePractice} 
        className="w-full"
        disabled={updatePracticeMutation.isPending}
      >
        {updatePracticeMutation.isPending ? "Mise à jour en cours..." : "Mettre à jour"}
      </Button>
    </div>
  );
};

export default PracticeEditForm;
