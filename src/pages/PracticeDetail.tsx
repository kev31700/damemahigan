
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PracticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const practices = {
    1: {
      title: "Trampling",
      description: "Une pratique impliquant la pression et le contact des pieds, mettant en avant le jeu de domination et de soumission.",
      imageUrl: "https://images.unsplash.com/photo-1542841791-1925b02a2bbb",
      longDescription: "Le trampling est une pratique BDSM qui implique l'utilisation des pieds pour exercer une pression sur différentes parties du corps du soumis. Cette pratique peut varier en intensité, allant d'une pression légère à plus intense, toujours dans le respect des limites établies. La séance peut se faire pieds nus ou avec différents types de chaussures, selon les préférences. Une attention particulière est portée à la sécurité, notamment concernant les zones sensibles du corps."
    },
    2: {
      title: "CBT",
      description: "Une pratique avancée de domination impliquant une stimulation contrôlée. Nécessite une expérience préalable.",
      imageUrl: "https://images.unsplash.com/photo-1617791160505-6f00504e3519",
      longDescription: "Le CBT est une pratique BDSM avancée qui requiert une expertise particulière et une connaissance approfondie de l'anatomie. Cette pratique implique différentes techniques de stimulation et de restriction, toujours réalisées de manière progressive et contrôlée. Une communication claire et un respect strict des limites sont essentiels. Cette pratique nécessite une expérience préalable et une confiance établie entre les partenaires."
    },
    3: {
      title: "Anal",
      description: "Exploration des plaisirs et sensations à travers la stimulation anale, dans le respect des limites de chacun.",
      imageUrl: "https://images.unsplash.com/photo-1584362917165-526a968579e8",
      longDescription: "La pratique anale requiert une approche progressive et respectueuse. Elle commence par une préparation adéquate, incluant l'utilisation de lubrifiants adaptés et une communication constante. Les sensations peuvent être intensifiées par l'utilisation de différents jouets ou accessoires, toujours dans le respect des limites de chacun. La propreté et l'hygiène sont des aspects primordiaux de cette pratique."
    },
    4: {
      title: "Médical",
      description: "Jeux de rôle médicaux dans un cadre sécurisé, explorant les dynamiques de pouvoir patient-praticien.",
      imageUrl: "https://images.unsplash.com/photo-1585435557343-3b092031a831",
      longDescription: "Le jeu de rôle médical explore la dynamique particulière entre patient et praticien dans un cadre BDSM sécurisé. Cette pratique peut inclure l'utilisation d'instruments médicaux adaptés, des examens simulés, et des scénarios variés. L'accent est mis sur l'aspect psychologique de la domination et de la soumission, tout en maintenant des conditions d'hygiène strictes. Une attention particulière est portée à la sécurité et au confort du patient."
    },
    5: {
      title: "Féminisation",
      description: "Transformation et exploration de l'identité à travers l'expression féminine, dans un cadre bienveillant.",
      imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
      longDescription: "La féminisation est une pratique qui permet d'explorer l'expression de genre à travers une transformation guidée et bienveillante. Elle peut inclure le maquillage, l'habillage, l'apprentissage de la démarche et des manières féminines. Cette pratique met l'accent sur le respect et l'acceptation, permettant une exploration sécurisée de l'identité dans un environnement sans jugement."
    },
    6: {
      title: "Bondage",
      description: "Art du ligotage et de la restriction, pratiqué avec expertise et attention particulière à la sécurité.",
      imageUrl: "https://images.unsplash.com/photo-1516916759473-600c07bc12d4",
      longDescription: "Le bondage est un art qui requiert une expertise technique et une attention constante à la sécurité. Les techniques de ligotage peuvent varier du simple au complexe, utilisant différents types de cordes et matériaux. Chaque session inclut une vérification régulière de la circulation sanguine et du confort. La pratique peut intégrer des éléments esthétiques et artistiques, créant des motifs complexes tout en maintenant le confort et la sécurité du sujet."
    },
    7: {
      title: "Impact",
      description: "Pratiques d'impact variées, du léger au plus intense, toujours dans le respect des limites établies.",
      imageUrl: "https://images.unsplash.com/photo-1571019613576-2b22c76fd955",
      longDescription: "Les pratiques d'impact englobent une large gamme d'intensités et de techniques, utilisant différents instruments comme les mains, les fouets, les cravaches ou les palettes. Chaque séance commence par un échauffement progressif et respecte un rythme adapté aux limites du receveur. Une attention particulière est portée aux zones de frappe sécuritaires et à la technique pour éviter tout risque de blessure."
    },
    8: {
      title: "Fireplay",
      description: "Jeu avec le feu sous supervision experte, créant des sensations uniques en toute sécurité.",
      imageUrl: "https://images.unsplash.com/photo-1575876664317-c0dfefe911aa",
      longDescription: "Le fireplay est une pratique qui nécessite une expertise particulière et des mesures de sécurité strictes. Cette technique utilise le feu de manière contrôlée pour créer des sensations uniques. Chaque séance est réalisée avec un équipement spécialisé et des protocoles de sécurité rigoureux, incluant la présence d'extincteurs et de couvertures anti-feu. Cette pratique n'est réalisée que par des praticiens expérimentés dans un environnement contrôlé."
    },
    9: {
      title: "Waxplay",
      description: "Utilisation de la cire pour créer des sensations variées, pratiqué avec précision et contrôle.",
      imageUrl: "https://images.unsplash.com/photo-1602525666213-4e9b0bc6ac95",
      longDescription: "Le waxplay implique l'utilisation de bougies spécialement conçues pour cette pratique, avec des points de fusion différents créant diverses sensations. La technique inclut le contrôle de la hauteur de chute de la cire et la température. Les zones du corps sont soigneusement sélectionnées pour maximiser le plaisir tout en assurant la sécurité. La préparation de la peau et le nettoyage post-session font partie intégrante du protocole."
    },
    10: {
      title: "Tickling",
      description: "Exploration des sensations à travers le chatouillement, une pratique ludique de domination douce.",
      imageUrl: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28",
      longDescription: "Le tickling est une forme de domination douce qui joue sur la sensibilité du corps aux chatouillements. Cette pratique peut utiliser différents outils comme les doigts, les plumes, ou d'autres accessoires pour créer des sensations variées. Les sessions sont structurées pour alterner entre moments d'intensité et de repos, permettant une exploration progressive des limites dans un cadre ludique et contrôlé."
    }
  };

  const practice = practices[id as keyof typeof practices];

  if (!practice) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Pratique non trouvée</h1>
        <Button onClick={() => navigate("/pratiques")}>Retour aux pratiques</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate("/pratiques")}
        className="mb-6"
      >
        Retour aux pratiques
      </Button>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <img
              src={practice.imageUrl}
              alt={practice.title}
              className="rounded-t-lg object-cover w-full h-full"
            />
          </AspectRatio>
          <CardTitle className="text-3xl">{practice.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">{practice.description}</p>
            <h3 className="text-xl font-semibold">Description détaillée</h3>
            <p className="text-gray-600">{practice.longDescription}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticeDetail;
