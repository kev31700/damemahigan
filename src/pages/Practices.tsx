
import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getPractices, removeDuplicatePractices } from "@/lib/storage";
import { useAdmin } from "@/contexts/AdminContext";
import PracticeCard from "@/components/PracticeCard";
import AddPracticeModal from "@/components/AddPracticeModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Practices = () => {
  const { isAdmin } = useAdmin();

  const { data: practices = [], isLoading, refetch } = useQuery({
    queryKey: ['practices'],
    queryFn: getPractices
  });

  const removeDuplicatesMutation = useMutation({
    mutationFn: removeDuplicatePractices,
    onSuccess: (count) => {
      if (count > 0) {
        toast.success(`${count} pratique(s) en double ont été supprimées`);
        refetch();
      } else {
        toast.info("Aucun doublon trouvé");
      }
    },
    onError: () => {
      toast.error("Erreur lors de la suppression des doublons");
    }
  });

  const handleRemoveDuplicates = () => {
    removeDuplicatesMutation.mutate();
  };

  if (isLoading) {
    return <div className="text-center mt-8">Chargement...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Nos Pratiques</h1>
        {isAdmin && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleRemoveDuplicates}
              disabled={removeDuplicatesMutation.isPending}
            >
              {removeDuplicatesMutation.isPending ? "Suppression..." : "Supprimer les doublons"}
            </Button>
            <AddPracticeModal />
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {practices.map((practice) => (
          <PracticeCard key={practice.id} practice={practice} />
        ))}
      </div>
    </div>
  );
};

export default Practices;
