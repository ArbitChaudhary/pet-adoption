"use client";

import { Pet, pets } from "@/data/pets";
import ImageBox from "./image-box";
import { StaticImageData } from "next/image";
import Details from "./details";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface SectionPetDetailsProps {
  petId: string;
}

const SectionPetDetails = ({ petId }: SectionPetDetailsProps) => {
  const router = useRouter();
  const pet = pets.find((pet) => pet?.id === petId);
  return (
    <>
      <div className="container py-8 md:py-12">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/pets")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pets
        </Button>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <ImageBox
            imageUrl={pet?.image as StaticImageData}
            category={pet?.category as string}
          />
          <Details pet={pet as Pet} />
        </div>
      </div>
    </>
  );
};

export default SectionPetDetails;
