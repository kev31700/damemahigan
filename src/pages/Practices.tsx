import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Practices = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Nos Pratiques</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pratique 1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Description détaillée de la pratique 1. Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pratique 2</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Description détaillée de la pratique 2. Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Practices;