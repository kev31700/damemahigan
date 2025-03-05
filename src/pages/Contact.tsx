import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { saveContactForm } from "@/lib/storage";
import { Loader2 } from "lucide-react";
import emailjs from 'emailjs-com';

const EMAILJS_SERVICE_ID = "service_0f9n6tj";
const EMAILJS_TEMPLATE_ID = "template_2kx66e9";
const EMAILJS_USER_ID = "oDx-jv8_vOqJh7Pso";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
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
    sessionDuration: "",
  });

  useEffect(() => {
    emailjs.init(EMAILJS_USER_ID);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formId = await saveContactForm(formData);
      console.log("Form saved to Firebase with ID:", formId);
      
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.nameOrPseudo,
          age: formData.age,
          height: formData.height,
          weight: formData.weight,
          experience_level: formData.experienceLevel,
          desired_practices: formData.desiredPractices,
          limits: formData.limits,
          fetish_specification: formData.fetishSpecification || "Non spécifié",
          email: formData.email,
          phone: formData.phone,
          contact_preference: formData.contactPreference,
          session_duration: formData.sessionDuration,
          recipient: "l.j.mahigan@gmail.com",
        }
      );
      
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      
      setFormData({
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
        sessionDuration: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string, field?: string) => {
    if (typeof e === "string" && field) {
      setFormData((prev) => ({ ...prev, [field]: e }));
    } else if (typeof e !== "string") {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle>Contactez-nous</CardTitle>
          <CardDescription>
            Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nameOrPseudo">Nom et prénom ou pseudo *</Label>
              <Input
                id="nameOrPseudo"
                name="nameOrPseudo"
                value={formData.nameOrPseudo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Âge *</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="18"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Taille (cm) *</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Poids (kg) *</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Niveau d'expérience *</Label>
              <Select name="experienceLevel" onValueChange={(value) => handleChange(value, "experienceLevel")} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="novice">Novice</SelectItem>
                  <SelectItem value="intermediate">Intermédiaire</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredPractices">Pratiques désirées *</Label>
              <Textarea
                id="desiredPractices"
                name="desiredPractices"
                value={formData.desiredPractices}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="limits">Limites *</Label>
              <Textarea
                id="limits"
                name="limits"
                value={formData.limits}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fetishSpecification">Spécification (fetish)</Label>
              <Textarea
                id="fetishSpecification"
                name="fetishSpecification"
                value={formData.fetishSpecification}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Numéro de téléphone *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Préférence de contact *</Label>
              <RadioGroup
                onValueChange={(value) => handleChange(value, "contactPreference")}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="contact-email" />
                  <Label htmlFor="contact-email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="contact-phone" />
                  <Label htmlFor="contact-phone">Téléphone</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Format horaire souhaité *</Label>
              <RadioGroup
                onValueChange={(value) => handleChange(value, "sessionDuration")}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1h" id="duration-1h" />
                  <Label htmlFor="duration-1h">1 heure</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2h" id="duration-2h" />
                  <Label htmlFor="duration-2h">2 heures</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="duration-custom" />
                  <Label htmlFor="duration-custom">Sur devis</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full">
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : "Envoyer"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
