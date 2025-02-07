import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Nos Tarifs</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Formule Basic</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">50€</p>
            <p className="text-gray-600">Par séance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Formule Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">80€</p>
            <p className="text-gray-600">Par séance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Formule VIP</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">120€</p>
            <p className="text-gray-600">Par séance</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;