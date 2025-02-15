
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Limits = () => {
  const excludedPractices = [
    "Uro",
    "Scato",
    "Age play",
    "Fellation",
    "Masturbation",
    "Accès à mon corps/intimité",
    "Nudité",
    "Kidnapping"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Mes Limites
      </h1>

      <div className="max-w-3xl mx-auto mb-8 text-lg text-gray-600 text-center">
        <p className="mb-6">
          La confiance et le respect mutuel sont les fondements de toute relation BDSM saine. 
          Voici mes limites non négociables, garantes de séances sûres et éthiques.
        </p>
      </div>

      <div className="space-y-8 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center text-primary">Pratiques exclues</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {excludedPractices.map((practice) => (
                <li 
                  key={practice}
                  className="flex items-center p-3 bg-muted rounded-lg"
                >
                  <span className="text-lg">{practice}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto mt-8 text-lg text-gray-600">
        <p className="mb-4">
          Cette liste n'est pas exhaustive et peut évoluer. D'autres limites peuvent s'appliquer selon les situations et les personnes.
        </p>
        <p>
          N'hésitez pas à discuter de vos propres limites lors de nos échanges. La communication ouverte et honnête est essentielle pour une expérience enrichissante et respectueuse.
        </p>
      </div>
    </div>
  );
};

export default Limits;
