
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PracticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Pour l'instant, nous utilisons des données statiques
  // Dans une version future, ces données viendraient d'une base de données
  const practice = {
    id: 1,
    title: "Pratique 1",
    description: "Description détaillée de la pratique 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate("/pratiques")}
        className="mb-6"
      >
        Retour aux pratiques
      </Button>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <img
              src={practice.imageUrl}
              alt={practice.title}
              className="rounded-t-lg object-cover w-full h-full"
            />
          </AspectRatio>
          <CardTitle className="text-3xl">{practice.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">{practice.description}</p>
            <h3 className="text-xl font-semibold">Description détaillée</h3>
            <p className="text-gray-600">{practice.longDescription}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticeDetail;
