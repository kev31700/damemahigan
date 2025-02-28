
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPracticeById } from "@/lib/firestore";

const PracticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: practice, isLoading, error } = useQuery({
    queryKey: ['practice', id],
    queryFn: () => id ? getPracticeById(id) : null,
    enabled: !!id
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Chargement...</div>;
  }

  if (error || !practice) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Pratique non trouvée</h1>
        <Button onClick={() => navigate("/pratiques")}>Retour aux pratiques</Button>
      </div>
    );
  }

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
            <p className="text-lg text-gray-300">{practice.description}</p>
            {practice.longDescription && (
              <>
                <h3 className="text-xl font-semibold">Description détaillée</h3>
                <p className="text-gray-300">{practice.longDescription}</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticeDetail;
