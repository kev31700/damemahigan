
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { validateEmail } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "@/lib/emailUtils";
import { saveContactForm } from "@/lib/storage";
import { ArrowRight } from "lucide-react";

interface FormData {
  nameOrPseudo: string;
  age: string;
  height: string;
  weight: string;
  experienceLevel: string;
  desiredPractices: string;
  limits: string;
  fetishSpecification: string;
  email: string;
  phone: string;
  contactPreference: string;
  sessionDuration: string;
}

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    nameOrPseudo: "",
    age: "",
    height: "",
    weight: "",
    experienceLevel: "",
    desiredPractices: "",
    limits: "",
    fetishSpecification: "",
    email: "",
    phone: "",
    contactPreference: "",
    sessionDuration: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    // Vérifier les champs obligatoires
    const requiredFields: (keyof FormData)[] = [
      "nameOrPseudo", "age", "height", "weight", "experienceLevel",
      "desiredPractices", "limits", "email", "phone", "contactPreference", "sessionDuration"
    ];

    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        toast.error(`Le champ "${field}" est obligatoire`);
        return false;
      }
    }

    // Valider l'email
    if (!validateEmail(formData.email)) {
      toast.error("Veuillez entrer une adresse email valide");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Sauvegarder dans la base de données
      await saveContactForm(formData);

      // Envoyer l'email (optionnel)
      try {
        await sendEmail({
          to_email: "contact@damemahigan.com",
          to_name: "Dame Mahigan",
          subject: `Nouvelle demande de contact de ${formData.nameOrPseudo}`,
          message: `
            Nom/Pseudo: ${formData.nameOrPseudo}
            Âge: ${formData.age}
            Taille: ${formData.height}
            Poids: ${formData.weight}
            Niveau d'expérience: ${formData.experienceLevel}
            Pratiques souhaitées: ${formData.desiredPractices}
            Limites: ${formData.limits}
            Précisions fétichistes: ${formData.fetishSpecification || "Non spécifié"}
            Email: ${formData.email}
            Téléphone: ${formData.phone}
            Préférence de contact: ${formData.contactPreference}
            Durée de séance: ${formData.sessionDuration}
          `
        });
      } catch (emailError) {
        console.error("Erreur lors de l'envoi de l'email:", emailError);
        // Continuer même si l'envoi d'email échoue
      }

      // Succès
      setShowSuccessDialog(true);
      
      // Rediriger après 10 secondes
      setTimeout(() => {
        setShowSuccessDialog(false);
        navigate("/");
      }, 10000);
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      toast.error("Une erreur est survenue lors de l'envoi de votre demande");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Contactez-moi
      </h1>
      
      <div className="max-w-3xl mx-auto mb-8 text-center text-gray-600">
        <p>
          Pour prendre rendez-vous ou obtenir plus d'informations, veuillez remplir le formulaire ci-dessous.
          Je vous répondrai dans les meilleurs délais.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Formulaire de contact</CardTitle>
          <CardDescription>
            Tous les champs marqués d'un astérisque (*) sont obligatoires
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informations personnelles</h3>
              
              <div className="space-y-2">
                <Label htmlFor="nameOrPseudo">Nom ou Pseudo *</Label>
                <Input
                  id="nameOrPseudo"
                  name="nameOrPseudo"
                  value={formData.nameOrPseudo}
                  onChange={handleChange}
                  placeholder="Votre nom ou pseudo"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Âge *</Label>
                  <Input
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Votre âge"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">Taille *</Label>
                  <Input
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Votre taille"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Poids *</Label>
                  <Input
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Votre poids"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Préférences de séance</h3>
              
              <div className="space-y-2">
                <Label>Niveau d'expérience *</Label>
                <RadioGroup
                  value={formData.experienceLevel}
                  onValueChange={(value) => handleRadioChange("experienceLevel", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Débutant" id="experience-beginner" />
                    <Label htmlFor="experience-beginner">Débutant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Intermédiaire" id="experience-intermediate" />
                    <Label htmlFor="experience-intermediate">Intermédiaire</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Expérimenté" id="experience-advanced" />
                    <Label htmlFor="experience-advanced">Expérimenté</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="desiredPractices">Pratiques souhaitées *</Label>
                <Textarea
                  id="desiredPractices"
                  name="desiredPractices"
                  value={formData.desiredPractices}
                  onChange={handleChange}
                  placeholder="Décrivez les pratiques que vous souhaitez explorer"
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="limits">Vos limites *</Label>
                <Textarea
                  id="limits"
                  name="limits"
                  value={formData.limits}
                  onChange={handleChange}
                  placeholder="Indiquez vos limites"
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fetishSpecification">Précisions fétichistes (optionnel)</Label>
                <Textarea
                  id="fetishSpecification"
                  name="fetishSpecification"
                  value={formData.fetishSpecification}
                  onChange={handleChange}
                  placeholder="Si vous avez des intérêts fétichistes particuliers"
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Coordonnées</h3>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre adresse email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Votre numéro de téléphone"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Préférence de contact *</Label>
                <RadioGroup
                  value={formData.contactPreference}
                  onValueChange={(value) => handleRadioChange("contactPreference", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Email" id="contact-email" />
                    <Label htmlFor="contact-email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Téléphone" id="contact-phone" />
                    <Label htmlFor="contact-phone">Téléphone</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Les deux" id="contact-both" />
                    <Label htmlFor="contact-both">Les deux</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Durée de séance souhaitée *</Label>
                <RadioGroup
                  value={formData.sessionDuration}
                  onValueChange={(value) => handleRadioChange("sessionDuration", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1 heure" id="duration-1h" />
                    <Label htmlFor="duration-1h">1 heure</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2 heures" id="duration-2h" />
                    <Label htmlFor="duration-2h">2 heures</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Plus" id="duration-more" />
                    <Label htmlFor="duration-more">Plus (à discuter)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Demande envoyée avec succès</DialogTitle>
            <DialogDescription>
              Merci pour votre message. Je vous répondrai dans les plus brefs délais.
              Vous allez être redirigé vers la page d'accueil dans quelques secondes.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
