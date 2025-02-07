import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Bienvenue
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-8">
        Découvrez notre univers unique et nos services exceptionnels. 
        Nous sommes là pour vous accompagner dans votre parcours.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link to="/galerie">
            Découvrir la Galerie
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/contact">
            Nous Contacter
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;