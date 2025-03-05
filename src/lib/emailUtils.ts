
export const sendEmailNotification = async (
  formData: {
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
  },
  recipientEmail: string
) => {
  try {
    // Format the email content
    const emailContent = `
      Nouveau formulaire de contact reçu:
      
      Nom/Pseudo: ${formData.nameOrPseudo}
      Âge: ${formData.age}
      Taille: ${formData.height} cm
      Poids: ${formData.weight} kg
      Niveau d'expérience: ${formData.experienceLevel}
      Pratiques désirées: ${formData.desiredPractices}
      Limites: ${formData.limits}
      Spécification (fetish): ${formData.fetishSpecification || "Non spécifié"}
      Email: ${formData.email}
      Téléphone: ${formData.phone}
      Préférence de contact: ${formData.contactPreference}
      Format horaire souhaité: ${formData.sessionDuration}
    `;

    // Use EmailJS to send the notification
    // Note: In a real-world scenario, this would normally be done through a backend service
    // For demo purposes, we're using a client-side approach with EmailJS
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: "default_service", // Replace with your EmailJS service ID
        template_id: "template_contact_form", // Replace with your EmailJS template ID
        user_id: "YOUR_EMAILJS_USER_ID", // Replace with your EmailJS user ID
        template_params: {
          to_email: recipientEmail,
          from_name: formData.nameOrPseudo,
          subject: `Nouveau formulaire de contact de ${formData.nameOrPseudo}`,
          message: emailContent,
          reply_to: formData.email,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email notification");
    }

    return true;
  } catch (error) {
    console.error("Error sending email notification:", error);
    return false;
  }
};
