
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangle, Database } from "lucide-react";
import { migrateDataToSupabase } from "@/lib/dataMigrationToSupabase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminMigrationTool = () => {
  const [isMigrating, setIsMigrating] = useState(false);

  const handleMigration = async () => {
    setIsMigrating(true);
    try {
      await migrateDataToSupabase();
    } catch (error) {
      console.error("Erreur pendant la migration:", error);
      toast.error("La migration a échoué");
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          disabled={isMigrating}
        >
          <Database className="h-4 w-4" />
          {isMigrating ? "Migration en cours..." : "Migrer les données vers Supabase"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Confirmer la migration
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action va migrer toutes vos données existantes de Firebase vers Supabase.
            <br /><br />
            <strong>Important :</strong> Cette opération peut prendre du temps et ne doit être effectuée qu'une seule fois 
            pour éviter les doublons. Assurez-vous de ne pas interrompre le processus.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleMigration}>
            Démarrer la migration
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdminMigrationTool;
