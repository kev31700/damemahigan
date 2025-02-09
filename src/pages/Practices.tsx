
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

interface Practice {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const Practices = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [practices, setPractices] = useState<Practice[]>([
    {
      id: 1,
      title: "Pratique 1",
      description: "Description détaillée de la pratique 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      id: 2,
      title: "Pratique 2",
      description: "Description détaillée de la pratique 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    }
  ]);

  const [newPractice, setNewPractice] = useState({
    title: "",
    description: "",
    imageUrl: ""
  });

  const handleAddPractice = () => {
    if (!newPractice.title || !newPractice.description || !newPractice.imageUrl) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    setPractices([
      ...practices,
      {
        id: practices.length + 1,
        ...newPractice
      }
    ]);

    setNewPractice({
      title: "",
      description: "",
      imageUrl: ""
    });

    toast({
      title: "Succès",
      description: "La pratique a été ajoutée avec succès"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Nos Pratiques</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Ajouter une pratique</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Nouvelle Pratique</SheetTitle>
            </SheetHeader>
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
                <label className="text-sm font-medium">URL de l'image</label>
                <Input
                  value={newPractice.imageUrl}
                  onChange={(e) => setNewPractice({ ...newPractice, imageUrl: e.target.value })}
                  placeholder="URL de l'image"
                />
              </div>
              <Button onClick={handleAddPractice} className="w-full">
                Ajouter
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {practices.map((practice) => (
          <Card 
            key={practice.id}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => navigate(`/pratiques/${practice.id}`)}
          >
            <CardHeader>
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <img
                  src={practice.imageUrl}
                  alt={practice.title}
                  className="rounded-t-lg object-cover w-full h-full"
                />
              </AspectRatio>
              <CardTitle>{practice.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{practice.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Practices;
