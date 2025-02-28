
import { useState } from "react";
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

const Pricing = () => {
  const { isAdmin } = useAdmin();
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newServiceDescription, setNewServiceDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<number | null>(null);

  // État local pour stocker les services et tarifs
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Lecture érotique",
      price: "100€",
      description: "30 à 45 minutes"
    },
    {
      id: 2,
      name: "Séance 1h",
      price: "150€",
      description: "Par séance"
    },
    {
      id: 3,
      name: "Séance 2h",
      price: "250€",
      description: "Par séance"
    },
    {
      id: 4,
      name: "Autre format",
      price: "Sur devis",
      description: "Contactez-nous pour plus d'informations"
    }
  ]);

  const addService = () => {
    if (!newServiceName.trim() || !newServicePrice.trim()) {
      toast.error("Le nom et le prix du service sont requis");
      return;
    }

    const newService = {
      id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
      name: newServiceName,
      price: newServicePrice,
      description: newServiceDescription || ""
    };

    setServices([...services, newService]);
    resetForm();
    setDialogOpen(false);
    toast.success("Service ajouté avec succès");
  };

  const editService = () => {
    if (editingService === null) return;
    if (!newServiceName.trim() || !newServicePrice.trim()) {
      toast.error("Le nom et le prix du service sont requis");
      return;
    }

    const updatedServices = services.map(service => 
      service.id === editingService 
        ? {
            ...service,
            name: newServiceName,
            price: newServicePrice,
            description: newServiceDescription
          }
        : service
    );

    setServices(updatedServices);
    resetForm();
    setDialogOpen(false);
    toast.success("Service modifié avec succès");
  };

  const removeService = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
      setServices(services.filter(service => service.id !== id));
      toast.success("Service supprimé avec succès");
    }
  };

  const openEditDialog = (service: any) => {
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
                  onClick={editingService !== null ? editService : addService} 
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
