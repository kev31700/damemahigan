
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
      title: "Trampling",
      description: "Une pratique impliquant la pression et le contact des pieds, mettant en avant le jeu de domination et de soumission.",
      imageUrl: "https://images.unsplash.com/photo-1542841791-1925b02a2bbb"
    },
    {
      id: 2,
      title: "CBT",
      description: "Une pratique avancée de domination impliquant une stimulation contrôlée. Nécessite une expérience préalable.",
      imageUrl: "https://images.unsplash.com/photo-1617791160505-6f00504e3519"
    },
    {
      id: 3,
      title: "Anal",
      description: "Exploration des plaisirs et sensations à travers la stimulation anale, dans le respect des limites de chacun.",
      imageUrl: "https://images.unsplash.com/photo-1584362917165-526a968579e8"
    },
    {
      id: 4,
      title: "Médical",
      description: "Jeux de rôle médicaux dans un cadre sécurisé, explorant les dynamiques de pouvoir patient-praticien.",
      imageUrl: "https://images.unsplash.com/photo-1585435557343-3b092031a831"
    },
    {
      id: 5,
      title: "Féminisation",
      description: "Transformation et exploration de l'identité à travers l'expression féminine, dans un cadre bienveillant.",
      imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2"
    },
    {
      id: 6,
      title: "Bondage",
      description: "Art du ligotage et de la restriction, pratiqué avec expertise et attention particulière à la sécurité.",
      imageUrl: "https://images.unsplash.com/photo-1516916759473-600c07bc12d4"
    },
    {
      id: 7,
      title: "Impact",
      description: "Pratiques d'impact variées, du léger au plus intense, toujours dans le respect des limites établies.",
      imageUrl: "https://images.unsplash.com/photo-1571019613576-2b22c76fd955"
    },
    {
      id: 8,
      title: "Fireplay",
      description: "Jeu avec le feu sous supervision experte, créant des sensations uniques en toute sécurité.",
      imageUrl: "https://images.unsplash.com/photo-1575876664317-c0dfefe911aa"
    },
    {
      id: 9,
      title: "Waxplay",
      description: "Utilisation de la cire pour créer des sensations variées, pratiqué avec précision et contrôle.",
      imageUrl: "https://images.unsplash.com/photo-1602525666213-4e9b0bc6ac95"
    },
    {
      id: 10,
      title: "Tickling",
      description: "Exploration des sensations à travers le chatouillement, une pratique ludique de domination douce.",
      imageUrl: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28"
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
