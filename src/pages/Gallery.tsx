
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryImage, getGalleryImages, addGalleryImage, deleteGalleryImage } from "@/lib/storage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Gallery = () => {
  const { isAdmin } = useAdmin();
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageTitle, setNewImageTitle] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // Fetch images from Firebase
  const { data: images = [], isLoading, error } = useQuery({
    queryKey: ['gallery'],
    queryFn: getGalleryImages
  });

  // Add image mutation
  const addImageMutation = useMutation({
    mutationFn: addGalleryImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      setNewImageUrl("");
      setNewImageTitle("");
      setDialogOpen(false);
      toast.success("Image ajoutée avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de l'ajout de l'image");
      console.error(error);
    }
  });

  // Delete image mutation
  const deleteImageMutation = useMutation({
    mutationFn: deleteGalleryImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast.success("Image supprimée avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression de l'image");
      console.error(error);
    }
  });

  const addImage = () => {
    if (!newImageUrl.trim()) {
      toast.error("L'URL de l'image est requise");
      return;
    }

    const newImage = {
      url: newImageUrl,
      title: newImageTitle || `Image ${images.length + 1}`
    };

    addImageMutation.mutate(newImage);
  };

  const addImageFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result as string;
      
      const newImage = {
        url: imageDataUrl,
        title: newImageTitle || file.name || `Image ${images.length + 1}`
      };

      addImageMutation.mutate(newImage);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    
    reader.readAsDataURL(file);
  };

  const removeImage = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
      deleteImageMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="container mx-auto px-4 py-8 text-center">Chargement...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center">Une erreur est survenue</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Galerie</h1>
        {isAdmin && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>Ajouter une image</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle image</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="upload" className="mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Mon album photo</TabsTrigger>
                  <TabsTrigger value="url">URL</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Sélectionner une photo</label>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={addImageFromFile}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Titre</label>
                    <Input
                      value={newImageTitle}
                      onChange={(e) => setNewImageTitle(e.target.value)}
                      placeholder="Titre de l'image"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="url" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">URL de l'image</label>
                    <Input
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="URL de l'image"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Titre</label>
                    <Input
                      value={newImageTitle}
                      onChange={(e) => setNewImageTitle(e.target.value)}
                      placeholder="Titre de l'image"
                    />
                  </div>
                  <Button onClick={addImage} className="w-full">Ajouter</Button>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden relative">
            <CardContent className="p-0">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover transition-transform hover:scale-105"
              />
              {isAdmin && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(image.id);
                  }}
                >
                  Supprimer
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
