
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPractices } from "@/lib/storage";
import { useAdmin } from "@/contexts/AdminContext";
import PracticeCard from "@/components/PracticeCard";
import AddPracticeModal from "@/components/AddPracticeModal";

const Practices = () => {
  const { isAdmin } = useAdmin();

  const { data: practices = [], isLoading } = useQuery({
    queryKey: ['practices'],
    queryFn: getPractices
  });

  if (isLoading) {
    return <div className="text-center mt-8">Chargement...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Nos Pratiques</h1>
        {isAdmin && <AddPracticeModal />}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {practices.map((practice) => (
          <PracticeCard key={practice.id} practice={practice} />
        ))}
      </div>
    </div>
  );
};

export default Practices;
