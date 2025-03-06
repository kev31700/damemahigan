import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { getContactFormById, deleteContactForm } from "@/lib/storage";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const ContactFormDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }
    
    if (id) {
      loadContactForm(id);
    }
  }, [id, isAdmin, navigate]);

  const loadContactForm = async (formId: string) => {
    try {
      setLoading(true);
      const form = await getContactFormById(formId);
      if (form) {
        setFormData(form);
      } else {
        toast({
          title: "Non trouvé",
          description: "Le formulaire de contact demandé n'existe pas.",
          variant: "destructive",
        });
        navigate("/admin/contact-forms");
      }
    } catch (error) {
      console.error("Error loading contact form:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails du formulaire de contact.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      setDeleting(true);
      await deleteContactForm(id);
      toast({
        title: "Succès",
        description: "Le formulaire de contact a été supprimé.",
      });
      navigate("/admin/contact-forms");
    } catch (error) {
      console.error("Error deleting contact form:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le formulaire de contact.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getSessionDurationLabel = (value: string) => {
    switch (value) {
      case "1h": return "1 heure";
      case "2h": return "2 heures";
      case "puppy": return "Séance Puppy";
      case "custom": return "Sur devis";
      default: return value;
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        className="mb-4"
        onClick={() => navigate("/admin/contact-forms")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Retour à la liste
      </Button>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : formData ? (
        <Card>
          <CardHeader>
            <CardTitle>Détails du formulaire de contact</CardTitle>
            <div className="text-sm text-muted-foreground">
              Soumis le {formData.createdAt ? formatDate(formData.createdAt) : "Date inconnue"}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium">Informations personnelles</h3>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Nom/Pseudo:</span> {formData.nameOrPseudo}
                  </div>
                  <div>
                    <span className="font-medium">Âge:</span> {formData.age} ans
                  </div>
                  <div>
                    <span className="font-medium">Taille:</span> {formData.height} cm
                  </div>
                  <div>
                    <span className="font-medium">Poids:</span> {formData.weight} kg
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {formData.email}
                  </div>
                  <div>
                    <span className="font-medium">Téléphone:</span> {formData.phone}
                  </div>
                  <div>
                    <span className="font-medium">Préférence de contact:</span> {formData.contactPreference}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium">Détails de la session</h3>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Niveau d'expérience:</span> {formData.experienceLevel}
                  </div>
                  <div>
                    <span className="font-medium">Format de séance:</span> {getSessionDurationLabel(formData.sessionDuration)}
                  </div>
                  <div>
                    <span className="font-medium">Pratiques désirées:</span>
                    <p className="mt-1 whitespace-pre-line bg-muted p-2 rounded-md">{formData.desiredPractices}</p>
                  </div>
                  <div>
                    <span className="font-medium">Limites:</span>
                    <p className="mt-1 whitespace-pre-line bg-muted p-2 rounded-md">{formData.limits}</p>
                  </div>
                  {formData.fetishSpecification && (
                    <div>
                      <span className="font-medium">Spécification (fetish):</span>
                      <p className="mt-1 whitespace-pre-line bg-muted p-2 rounded-md">{formData.fetishSpecification}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Supprimer
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          Formulaire de contact non trouvé.
        </div>
      )}
    </div>
  );
};

export default ContactFormDetail;
