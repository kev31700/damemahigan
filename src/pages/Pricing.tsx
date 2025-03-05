
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Pencil, Plus, Trash } from "lucide-react";
import { Service, getServices, addService, updateService, deleteService } from "@/lib/storage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Pricing = () => {
  const { isAdmin } = useAdmin();
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newServiceDescription, setNewServiceDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch services from Firebase
  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: getServices
  });

  // Add service mutation
  const addServiceMutation = useMutation({
    mutationFn: addService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      resetForm();
      setDialogOpen(false);
      toast.success("Service ajouté avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de l'ajout du service");
      console.error(error);
    }
  });

  // Update service mutation
  const updateServiceMutation = useMutation({
    mutationFn: ({ id, service }: { id: string; service: Omit<Service, "id"> }) => 
      updateService(id, service),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      resetForm();
      setDialogOpen(false);
      toast.success("Service modifié avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de la modification du service");
      console.error(error);
    }
  });

  // Delete service mutation
  const deleteServiceMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success("Service supprimé avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression du service");
      console.error(error);
    }
  });

  const addNewService = () => {
    if (!newServiceName.trim() || !newServicePrice.trim()) {
      toast.error("Le nom et le prix du service sont requis");
      return;
    }

    const newService = {
      name: newServiceName,
      price: newServicePrice,
      description: newServiceDescription || ""
    };

    addServiceMutation.mutate(newService);
  };

  const editService = () => {
    if (editingService === null) return;
    if (!newServiceName.trim() || !newServicePrice.trim()) {
      toast.error("Le nom et le prix du service sont requis");
      return;
    }

    const updatedService = {
      name: newServiceName,
      price: newServicePrice,
      description: newServiceDescription
    };

    updateServiceMutation.mutate({ id: editingService, service: updatedService });
  };

  const removeService = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
      deleteServiceMutation.mutate(id);
    }
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service.id);
    setNewServiceName(service.name);
    setNewServicePrice(service.price);
    setNewServiceDescription(service.description);
    setDialogOpen(true);
  };

  const resetForm = () => {
    setNewServiceName("");
    setNewServicePrice("");
    setNewServiceDescription("");
    setEditingService(null);
  };

  if (isLoading) return <div className="container mx-auto px-4 py-8 text-center">Chargement...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center">Une erreur est survenue</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Nos Tarifs</h1>
        {isAdmin && (
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>Ajouter un service</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingService !== null ? "Modifier le service" : "Ajouter un nouveau service"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium">Nom du service</label>
                  <Input
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    placeholder="Nom du service"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Prix</label>
                  <Input
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    placeholder="Prix du service"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    value={newServiceDescription}
                    onChange={(e) => setNewServiceDescription(e.target.value)}
                    placeholder="Description du service"
                  />
                </div>
                <Button 
                  onClick={editingService !== null ? editService : addNewService} 
                  className="w-full"
                >
                  {editingService !== null ? "Modifier" : "Ajouter"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="relative">
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{service.price}</p>
              <p className="text-muted-foreground mt-2">{service.description}</p>
              
              {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(service)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeService(service.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
