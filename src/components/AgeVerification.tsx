import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const AgeVerification = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const verified = localStorage.getItem("age-verified");
    if (!verified) {
      setOpen(true);
    }
  }, []);

  const handleVerify = (isAdult: boolean) => {
    if (isAdult) {
      localStorage.setItem("age-verified", "true");
      setOpen(false);
      toast({
        title: "Bienvenue",
        description: "Merci de votre confirmation. Vous pouvez maintenant accéder au site.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Ce site est réservé aux personnes majeures.",
      });
      // Redirect to a safe page or show a blocking message
      document.body.innerHTML = "<div style='padding: 20px; text-align: center;'><h1>Accès Refusé</h1><p>Ce site est réservé aux personnes majeures.</p></div>";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Vérification de l'âge</DialogTitle>
          <DialogDescription>
            Ce site est réservé aux personnes majeures (+18 ans).
            Veuillez confirmer votre âge pour continuer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="secondary" onClick={() => handleVerify(false)}>
            Je suis mineur
          </Button>
          <Button onClick={() => handleVerify(true)}>
            Je confirme avoir plus de 18 ans
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};