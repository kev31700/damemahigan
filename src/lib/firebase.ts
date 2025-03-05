import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Practice, Testimonial, GalleryImage, Service, ExcludedPractice, CarouselImage } from './storage';

const firebaseConfig = {
  apiKey: "AIzaSyBANj7xlVOPEv8HawCprWQf1lNB5sejDFU",
  authDomain: "mahigan-bd7ae.firebaseapp.com",
  projectId: "mahigan-bd7ae",
  storageBucket: "mahigan-bd7ae.appspot.com",
  messagingSenderId: "615958796849",
  appId: "1:615958796849:web:e76756d40780e90239d310",
  measurementId: "G-C3JWV7VFZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Collection references
const practicesCollection = collection(db, 'practices');
const testimonialsCollection = collection(db, 'testimonials');
const galleryCollection = collection(db, 'gallery');
const servicesCollection = collection(db, 'services');
const excludedPracticesCollection = collection(db, 'excludedPractices');
const carouselImagesCollection = collection(db, 'carouselImages');

// Initial data for first-time setup
const initialPractices: Practice[] = [
  {
    id: "1",
    title: "Méditation guidée",
    description: "Une pratique méditative pour atteindre un état de calme et de clarté mentale.",
    imageUrl: "/placeholder.svg",
    longDescription: "La méditation guidée est une technique qui vous aide à vous concentrer et à vous détendre. Elle peut réduire le stress, améliorer la concentration et favoriser le bien-être émotionnel."
  },
  {
    id: "2",
    title: "Respiration consciente",
    description: "Techniques de respiration pour la relaxation et la gestion du stress.",
    imageUrl: "/placeholder.svg",
    longDescription: "La respiration consciente est une pratique simple mais puissante qui vous permet de vous recentrer et de calmer votre esprit en vous concentrant sur votre souffle."
  },
  {
    id: "3",
    title: "Collier et laisse",
    description: "Pratique de soumission et de contrôle symbolique.",
    imageUrl: "/placeholder.svg",
    longDescription: "L'utilisation du collier et de la laisse symbolise la relation de pouvoir et de contrôle entre dominateur et soumis, créant un lien psychologique fort."
  },
  {
    id: "4",
    title: "Bondage",
    description: "Art de l'immobilisation consentie par cordes, liens ou autres accessoires.",
    imageUrl: "/placeholder.svg",
    longDescription: "Le bondage est une pratique qui consiste à restreindre les mouvements du partenaire à l'aide de cordes, menottes ou autres accessoires, créant une vulnérabilité contrôlée et un sentiment d'abandon."
  },
  {
    id: "5",
    title: "Privations sensorielles",
    description: "Techniques de limitation des sens pour intensifier les sensations.",
    imageUrl: "/placeholder.svg",
    longDescription: "En privant un ou plusieurs sens (vue, ouïe, etc.), cette pratique permet d'intensifier les autres sensations et de créer une expérience immersive unique."
  },
  {
    id: "6",
    title: "Positions et attitudes imposées",
    description: "Contrôle de la posture et des comportements durant la session.",
    imageUrl: "/placeholder.svg",
    longDescription: "L'imposition de positions ou d'attitudes spécifiques renforce la dynamique de pouvoir et permet d'explorer différentes facettes de la soumission."
  },
  {
    id: "7",
    title: "Discipline",
    description: "Apprentissage de règles et protocoles avec conséquences en cas de manquement.",
    imageUrl: "/placeholder.svg",
    longDescription: "La discipline établit un cadre clair avec des règles et des conséquences, permettant d'explorer la structure et l'obéissance dans un environnement sécurisé."
  },
  {
    id: "8",
    title: "Fessées",
    description: "Stimulation érotique par la fessée.",
    imageUrl: "/placeholder.svg",
    longDescription: "Les fessées peuvent être administrées à main nue ou avec divers accessoires, créant un mélange de sensations qui vont de la chaleur légère à la douleur contrôlée."
  },
  {
    id: "9",
    title: "Châtiments corporels",
    description: "Pratiques diverses de stimulation douloureuse consentie.",
    imageUrl: "/placeholder.svg",
    longDescription: "Les châtiments corporels englobent diverses pratiques consensuelles qui explorent les limites entre douleur et plaisir, toujours dans un cadre de consentement et de sécurité."
  },
  {
    id: "10",
    title: "Puppy-play",
    description: "Jeu de rôle où le soumis adopte comportements et postures canines.",
    imageUrl: "/placeholder.svg",
    longDescription: "Le puppy-play permet d'explorer une forme ludique de soumission, où le partenaire adopte des comportements canins, créant une dynamique unique de jeu et d'affection."
  },
  {
    id: "11",
    title: "Bougies",
    description: "Utilisation de cire chaude pour la stimulation sensorielle.",
    imageUrl: "/placeholder.svg",
    longDescription: "L'utilisation de bougies spéciales permet de jouer avec la sensation de chaleur sur la peau, créant un contraste sensoriel intense et esthétique."
  },
  {
    id: "12",
    title: "Tortures des seins",
    description: "Stimulation intense et contrôlée de la poitrine.",
    imageUrl: "/placeholder.svg",
    longDescription: "Cette pratique englobe diverses techniques de stimulation des seins, allant de caresses douces à l'utilisation d'accessoires spécifiques pour créer des sensations intenses."
  },
  {
    id: "13",
    title: "Tortures des parties génitales",
    description: "Techniques diverses de stimulation intense des zones génitales.",
    imageUrl: "/placeholder.svg",
    longDescription: "Cette pratique explore la stimulation contrôlée et parfois intense des zones génitales, jouant sur les limites entre plaisir et inconfort."
  },
  {
    id: "14",
    title: "Electro stimulation",
    description: "Utilisation de courant électrique faible pour la stimulation érotique.",
    imageUrl: "/placeholder.svg",
    longDescription: "L'électrostimulation utilise des appareils spécialement conçus pour délivrer des impulsions électriques légères, créant des sensations uniques impossibles à reproduire autrement."
  },
  {
    id: "15",
    title: "Jeux médicaux",
    description: "Simulation de scénarios médicaux dans un contexte érotique.",
    imageUrl: "/placeholder.svg",
    longDescription: "Les jeux médicaux recréent l'atmosphère clinique et la relation patient/praticien, permettant d'explorer les dynamiques de pouvoir et de vulnérabilité dans un cadre structuré."
  },
  {
    id: "16",
    title: "Chasteté imposée",
    description: "Contrôle de la sexualité par des dispositifs ou règles de restriction.",
    imageUrl: "/placeholder.svg",
    longDescription: "La chasteté imposée utilise des dispositifs physiques ou des règles strictes pour contrôler l'accès à la stimulation sexuelle, créant une forme unique de contrôle et d'anticipation."
  },
  {
    id: "17",
    title: "Privation d'orgasme",
    description: "Techniques de contrôle du plaisir et de l'orgasme.",
    imageUrl: "/placeholder.svg",
    longDescription: "Cette pratique consiste à amener le partenaire au bord de l'orgasme sans permettre la libération, intensifiant ainsi le désir et créant une forme profonde de soumission."
  },
  {
    id: "18",
    title: "Marquage temporaire",
    description: "Création de marques non permanentes sur le corps.",
    imageUrl: "/placeholder.svg",
    longDescription: "Le marquage temporaire peut inclure des techniques comme les suçons, l'impression de cordes ou l'utilisation d'encres temporaires pour créer des motifs symboliques sur la peau."
  },
  {
    id: "19",
    title: "Dilatations",
    description: "Techniques d'étirement progressif des orifices corporels.",
    imageUrl: "/placeholder.svg",
    longDescription: "La dilatation explore l'élargissement progressif et contrôlé des orifices corporels, offrant des sensations de plénitude et d'étirement uniques."
  },
  {
    id: "20",
    title: "Fisting",
    description: "Pratique d'insertion de la main dans les orifices corporels.",
    imageUrl: "/placeholder.svg",
    longDescription: "Le fisting est une pratique avancée qui requiert patience, communication et beaucoup de lubrifiant, offrant des sensations intenses de plénitude et de connexion intime."
  },
  {
    id: "21",
    title: "Godes et Sextoys",
    description: "Utilisation d'accessoires pour la stimulation sexuelle.",
    imageUrl: "/placeholder.svg",
    longDescription: "L'utilisation de jouets sexuels permet d'explorer diverses sensations et stimulations, complétant l'expérience physique avec une grande variété d'options."
  },
  {
    id: "22",
    title: "Relation d'esclave",
    description: "Dynamique de soumission totale dans un cadre défini.",
    imageUrl: "/placeholder.svg",
    longDescription: "La relation d'esclave représente une forme profonde de soumission où le partenaire cède volontairement le contrôle dans un cadre négocié, créant une dynamique intense d'abandon et de service."
  },
  {
    id: "23",
    title: "Fétichisme",
    description: "Attirance érotique pour des objets, matières ou parties du corps spécifiques.",
    imageUrl: "/placeholder.svg",
    longDescription: "Le fétichisme explore l'attraction pour des éléments particuliers (vêtements, matières, parties du corps) qui deviennent le centre de l'attention érotique et de la stimulation."
  },
  {
    id: "24",
    title: "Fouet et cravache",
    description: "Utilisation d'instruments à lanière pour la stimulation corporelle.",
    imageUrl: "/placeholder.svg",
    longDescription: "Le fouet et la cravache sont des instruments qui permettent une grande variété de sensations, de la caresse délicate à la stimulation intense, nécessitant technique et précision."
  },
  {
    id: "25",
    title: "Lecture érotique",
    description: "Partage de textes à caractère érotique pour stimuler l'imagination.",
    imageUrl: "/placeholder.svg",
    longDescription: "La lecture érotique engage l'esprit et stimule l'imagination, créant une forme d'intimité intellectuelle qui peut compléter ou intensifier l'expérience physique."
  },
  {
    id: "26",
    title: "Trampling",
    description: "Pratique consistant à marcher ou se tenir sur le corps du partenaire.",
    imageUrl: "/placeholder.svg",
    longDescription: "Le trampling explore les sensations de pression et de poids, pouvant être pratiqué avec différents niveaux d'intensité et diverses parties du corps pour des sensations variées."
  }
];

const initialTestimonials: Testimonial[] = [
  {
    id: "1",
    content: "Les séances avec Dame Mahigan m'ont aidé à retrouver mon équilibre intérieur. Je recommande vivement!",
    date: new Date().toLocaleDateString(),
    response: "Merci pour votre témoignage. C'est un plaisir de vous accompagner dans votre cheminement."
  }
];

const initialGalleryImages: GalleryImage[] = [
  {
    id: "1",
    url: "/placeholder.svg",
    title: "Image 1"
  },
  {
    id: "2",
    url: "/placeholder.svg",
    title: "Image 2"
  },
  {
    id: "3",
    url: "/placeholder.svg",
    title: "Image 3"
  },
  {
    id: "4",
    url: "/placeholder.svg",
    title: "Image 4"
  },
  {
    id: "5",
    url: "/placeholder.svg",
    title: "Image 5"
  },
  {
    id: "6",
    url: "/placeholder.svg",
    title: "Image 6"
  }
];

const initialServices: Service[] = [
  {
    id: "1",
    name: "Lecture érotique",
    price: "100€",
    description: "30 à 45 minutes"
  },
  {
    id: "2",
    name: "Séance 1h",
    price: "150€",
    description: "Par séance"
  },
  {
    id: "3",
    name: "Séance 2h",
    price: "250€",
    description: "Par séance"
  },
  {
    id: "4",
    name: "Autre format",
    price: "Sur devis",
    description: "Contactez-nous pour plus d'informations"
  }
];

const initialExcludedPractices: ExcludedPractice[] = [
  {
    id: "1",
    name: "Uro"
  },
  {
    id: "2",
    name: "Scato"
  },
  {
    id: "3",
    name: "Age play"
  },
  {
    id: "4",
    name: "Fellation"
  },
  {
    id: "5",
    name: "Masturbation"
  },
  {
    id: "6",
    name: "Accès à mon corps/intimité"
  },
  {
    id: "7",
    name: "Nudité"
  },
  {
    id: "8",
    name: "Kidnapping"
  }
];

const initialCarouselImages: CarouselImage[] = [
  {
    id: "1",
    src: "/photo-1649972904349-6e44c42644a7",
    alt: "Dame Mahigan Photo 1"
  },
  {
    id: "2",
    src: "/photo-1488590528505-98d2b5aba04b",
    alt: "Dame Mahigan Photo 2"
  },
  {
    id: "3",
    src: "/photo-1518770660439-4636190af475",
    alt: "Dame Mahigan Photo 3"
  }
];

// Helper function to initialize collections if they're empty
export const initializeFirebase = async () => {
  try {
    const practicesSnapshot = await getDocs(practicesCollection);
    if (practicesSnapshot.empty) {
      console.log("Initializing practices collection...");
      for (const practice of initialPractices) {
        await addDoc(practicesCollection, practice);
      }
    }

    const testimonialsSnapshot = await getDocs(testimonialsCollection);
    if (testimonialsSnapshot.empty) {
      console.log("Initializing testimonials collection...");
      for (const testimonial of initialTestimonials) {
        await addDoc(testimonialsCollection, testimonial);
      }
    }

    const gallerySnapshot = await getDocs(galleryCollection);
    if (gallerySnapshot.empty) {
      console.log("Initializing gallery collection...");
      for (const image of initialGalleryImages) {
        await addDoc(galleryCollection, image);
      }
    }

    const servicesSnapshot = await getDocs(servicesCollection);
    if (servicesSnapshot.empty) {
      console.log("Initializing services collection...");
      for (const service of initialServices) {
        await addDoc(servicesCollection, service);
      }
    }

    const excludedPracticesSnapshot = await getDocs(excludedPracticesCollection);
    if (excludedPracticesSnapshot.empty) {
      console.log("Initializing excluded practices collection...");
      for (const practice of initialExcludedPractices) {
        await addDoc(excludedPracticesCollection, practice);
      }
    }

    const carouselImagesSnapshot = await getDocs(carouselImagesCollection);
    if (carouselImagesSnapshot.empty) {
      console.log("Initializing carousel images collection...");
      for (const image of initialCarouselImages) {
        await addDoc(carouselImagesCollection, image);
      }
    }
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
};

// Call initialization
initializeFirebase();
