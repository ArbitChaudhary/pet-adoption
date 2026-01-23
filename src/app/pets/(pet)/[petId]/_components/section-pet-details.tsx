"use client";

import ImageBox from "./image-box";
import Details from "./details";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { IPet } from "@/app/pets/(pets)/_common/pet-types";

interface SectionPetDetailsProps {
  petId: string;
  pet: IPet;
}

const SectionPetDetails = ({ petId, pet }: SectionPetDetailsProps) => {
  const router = useRouter();
  console.log("Pet in SectionPetDetails:", pet);
  return (
    <>
      <div className="container px-4 md:px-2 py-8 md:py-12 mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/pets")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pets
        </Button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ImageBox imageUrl={pet?.image} category={pet?.category as string} />
          <Details pet={pet as IPet} />
        </div>
      </div>
    </>
  );
};

export default SectionPetDetails;
