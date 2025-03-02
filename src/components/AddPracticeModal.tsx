
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import PracticeForm from "./PracticeForm";

const AddPracticeModal = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Ajouter une pratique</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nouvelle Pratique</SheetTitle>
        </SheetHeader>
        <PracticeForm />
      </SheetContent>
    </Sheet>
  );
};

export default AddPracticeModal;
