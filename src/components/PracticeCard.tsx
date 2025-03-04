
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Practice } from "@/lib/storage";

interface PracticeCardProps {
  practice: Practice;
}

const PracticeCard = ({ practice }: PracticeCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="cursor-pointer transition-transform hover:scale-105"
      onClick={() => navigate(`/pratiques/${practice.id}`)}
    >
      <CardHeader>
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img
            src={practice.imageUrl}
            alt={practice.title}
            className="rounded-t-lg object-cover w-full h-full"
          />
        </AspectRatio>
        <CardTitle>{practice.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">{practice.description}</p>
      </CardContent>
    </Card>
  );
};

export default PracticeCard;
