
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAdmin } from "@/contexts/AdminContext";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { isAdmin } = useAdmin();
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState([
    {
      src: "/photo-1649972904349-6e44c42644a7",
      alt: "Dame Mahigan Photo 1"
    },
    {
      src: "/photo-1488590528505-98d2b5aba04b",
      alt: "Dame Mahigan Photo 2"
    },
    {
      src: "/photo-1518770660439-4636190af475",
      alt: "Dame Mahigan Photo 3"
    }
  ]);

  const addImage = () => {
    if (!newImageUrl.trim()) {
      toast.error("L'URL de l'image est requise");
      return;
    }

    const newImage = {
      src: newImageUrl,
      alt: newImageAlt || "Dame Mahigan Photo"
    };

    setImages([...images, newImage]);
    setNewImageUrl("");
    setNewImageAlt("");
    setDialogOpen(false);
    toast.success("Image ajoutée avec succès");
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
        src: imageDataUrl,
        alt: newImageAlt || file.name || "Dame Mahigan Photo"
      };

      setImages([...images, newImage]);
      toast.success("Image ajoutée avec succès");
      setDialogOpen(false);
      setNewImageAlt("");
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
      toast.success("Image supprimée avec succès");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4 bg-background">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Dame Mahigan
      </h1>
      
      <div className="max-w-3xl mx-auto mb-12 space-y-6 text-lg text-gray-300">
        <p className="leading-relaxed">
          Bienvenue dans mon univers sensuel et raffiné. Je suis Dame Mahigan, une dominatrice expérimentée qui privilégie l'écoute, la bienveillance et le respect mutuel.
        </p>
        
        <p className="leading-relaxed">
          Mon approche unique se démarque par l'absence de protocole strict. Je crois en l'importance d'une connexion authentique, où vos désirs et limites sont entendus et respectés, sans jugement.
        </p>

        <p className="leading-relaxed">
          Que vous soyez novice ou expérimenté, je saurai vous guider avec attention dans l'exploration de vos fantasmes, tout en veillant à votre bien-être et votre sécurité.
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto mb-12">
        {isAdmin && (
          <div className="mb-4 flex justify-end">
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
                      <label className="text-sm font-medium">Description (alt text)</label>
                      <Input
                        value={newImageAlt}
                        onChange={(e) => setNewImageAlt(e.target.value)}
                        placeholder="Description de l'image"
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
                      <label className="text-sm font-medium">Description (alt text)</label>
                      <Input
                        value={newImageAlt}
                        onChange={(e) => setNewImageAlt(e.target.value)}
                        placeholder="Description de l'image"
                      />
                    </div>
                    <Button onClick={addImage} className="w-full">Ajouter</Button>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        )}
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-[400px] object-cover rounded-lg"
                  />
                  {isAdmin && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removeImage(index)}
                    >
                      Supprimer
                    </Button>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="w-16 h-0.5 bg-gray-700 my-12"></div>

      <div className="max-w-3xl mx-auto mb-12 space-y-6 text-lg text-gray-300">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-primary">
          Le BDSM : Un Art de la Connexion
        </h2>
        
        <p className="leading-relaxed">
          Le BDSM (Bondage, Discipline, Domination, Soumission, Sadisme, Masochisme) est bien plus qu'une simple pratique : c'est un art qui repose sur la confiance, le consentement et la communication.
        </p>

        <p className="leading-relaxed">
          Dans cet univers, chaque session est une danse unique où les rôles sont clairement définis, les limites respectées, et la sécurité est toujours la priorité absolue. Le maître mot est le consentement éclairé, où chaque participant comprend et accepte pleinement les termes de l'échange.
        </p>

        <p className="leading-relaxed">
          L'essence du BDSM réside dans l'échange de pouvoir consensuel, créant un espace sécurisé où les fantasmes peuvent s'exprimer librement. Cette pratique permet d'explorer ses désirs profonds tout en maintenant un cadre bienveillant et structuré.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/80">
          <Link to="/pratiques">
            Découvrir mes Pratiques
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
          <Link to="/contact">
            Me Contacter
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
