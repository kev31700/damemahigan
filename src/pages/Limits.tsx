
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Limits = () => {
  const hardLimits = [
    "Scat",
    "Insultes raciales",
    "Animaux",
    "Mineurs",
    "Sang",
    "Mutilation",
    "Marques permanentes",
    "Jeux dangereux",
    "Unsafe sex"
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

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-primary">Limites absolues</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hardLimits.map((limit) => (
              <li 
                key={limit}
                className="flex items-center p-3 bg-muted rounded-lg"
              >
                <span className="text-lg">{limit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

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
