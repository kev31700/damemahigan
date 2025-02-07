import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const Gallery = () => {
  // This would be replaced with real image data from your backend
  const images = [
    { id: 1, url: "/placeholder.svg", title: "Image 1" },
    { id: 2, url: "/placeholder.svg", title: "Image 2" },
    { id: 3, url: "/placeholder.svg", title: "Image 3" },
    { id: 4, url: "/placeholder.svg", title: "Image 4" },
    { id: 5, url: "/placeholder.svg", title: "Image 5" },
    { id: 6, url: "/placeholder.svg", title: "Image 6" },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Galerie</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover transition-transform hover:scale-105"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Gallery;