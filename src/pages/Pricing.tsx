import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Nos Tarifs</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Séance 1h</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">150€</p>
            <p className="text-muted-foreground mt-2">Par séance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Séance 2h</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">250€</p>
            <p className="text-muted-foreground mt-2">Par séance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Autre format</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Sur devis</p>
            <p className="text-muted-foreground mt-2">Contactez-nous pour plus d'informations</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;