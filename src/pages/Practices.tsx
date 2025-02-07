import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Practices = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Nos Pratiques</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <img
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
                alt="Pratique 1"
                className="rounded-t-lg object-cover w-full h-full"
              />
            </AspectRatio>
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
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <img
                src="https://images.unsplash.com/photo-1485833077593-4278bba3f11f"
                alt="Pratique 2"
                className="rounded-t-lg object-cover w-full h-full"
              />
            </AspectRatio>
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