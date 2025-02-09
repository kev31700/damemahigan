
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Dame Mahigan
      </h1>
      
      <div className="max-w-3xl mx-auto mb-12 space-y-6 text-lg text-gray-600">
        <p className="leading-relaxed">
          Bienvenue dans mon univers sensuel et raffiné. Je suis Dame Mahigan, une dominatrice expérimentée qui privilégie l'écoute, la bienveillance et le respect mutuel.
        </p>
        
        <p className="leading-relaxed">
          Mon approche unique se démarque par l'absence de protocole strict. Je crois en l'importance d'une connexion authentique, où vos désirs et limites sont entendus et respectés, sans jugement.
        </p>

        <p className="leading-relaxed">
          Que vous soyez novice ou expérimenté, je saurai vous guider avec attention dans l'exploration de vos fantasmes, tout en veillant à votre bien-être et votre sécurité.
        </p>
      </div>

      <div className="w-16 h-0.5 bg-gray-200 my-12"></div>

      <div className="max-w-3xl mx-auto mb-12 space-y-6 text-lg text-gray-600">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-primary">
          Le BDSM : Un Art de la Connexion
        </h2>
        
        <p className="leading-relaxed">
          Le BDSM (Bondage, Discipline, Domination, Soumission, Sadisme, Masochisme) est bien plus qu'une simple pratique : c'est un art qui repose sur la confiance, le consentement et la communication.
        </p>

        <p className="leading-relaxed">
          Dans cet univers, chaque session est une danse unique où les rôles sont clairement définis, les limites respectées, et la sécurité est toujours la priorité absolue. Le maître mot est le consentement éclairé, où chaque participant comprend et accepte pleinement les termes de l'échange.
        </p>

        <p className="leading-relaxed">
          L'essence du BDSM réside dans l'échange de pouvoir consensuel, créant un espace sécurisé où les fantasmes peuvent s'exprimer librement. Cette pratique permet d'explorer ses désirs profonds tout en maintenant un cadre bienveillant et structuré.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link to="/pratiques">
            Découvrir mes Pratiques
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/contact">
            Me Contacter
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
