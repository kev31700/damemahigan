
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { getContactForms, deleteContactForm, ContactFormData } from "@/lib/storage";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactForms = () => {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contactForms, setContactForms] = useState<ContactFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }
    
    loadContactForms();
  }, [isAdmin, navigate]);

  const loadContactForms = async () => {
    try {
      setLoading(true);
      const forms = await getContactForms();
      setContactForms(forms);
    } catch (error) {
      console.error("Error loading contact forms:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les formulaires de contact.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeleting(id);
      await deleteContactForm(id);
      setContactForms(prev => prev.filter(form => form.id !== id));
      toast({
        title: "Succès",
        description: "Le formulaire de contact a été supprimé.",
      });
    } catch (error) {
      console.error("Error deleting contact form:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le formulaire de contact.",
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/admin/contact-forms/${id}`);
  };

  if (!isAdmin) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Formulaires de Contact</CardTitle>
          <CardDescription>
            Gérez et consultez les demandes de contact
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : contactForms.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucun formulaire de contact trouvé.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Session</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactForms.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell>
                        {new Date(form.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric"
                        })}
                      </TableCell>
                      <TableCell>{form.nameOrPseudo}</TableCell>
                      <TableCell>{form.email}</TableCell>
                      <TableCell>{form.phone}</TableCell>
                      <TableCell>{form.sessionDuration}</TableCell>
                      <TableCell className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(form.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> Voir
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(form.id)}
                          disabled={deleting === form.id}
                        >
                          {deleting === form.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForms;
