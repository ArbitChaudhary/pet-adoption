"use client";

import { IPet } from "@/app/(pages)/pets/_common/pet-types";
import { Button } from "@/components/ui/button";
import { Calendar, PawPrint } from "lucide-react";
import Description from "./description";
import { useAppDispatch } from "@/hooks/redux";
import { addToCart } from "@/redux/reducers/cart-slice";

interface DetailsProps {
  pet: IPet;
}
const Details = ({ pet }: DetailsProps) => {
  const dispatch = useAppDispatch();
  const handleAdoptNow = () => {
    dispatch(
      addToCart({
        petId: pet?._id,
        petName: pet?.name,
        petBreed: pet?.breed,
        petAge: pet?.age,
        petPrice: pet?.price,
        petCategory: pet?.category,
        petGender: pet?.gender,
        petImage: pet?.image,
      })
    );
  };
  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-4xl md:text-5xl font-bold text-foreground mb-2"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          {pet.name}
        </h1>
        <p className="text-xl text-muted-foreground">{pet.breed}</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">{pet.age}</span>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2">
          <PawPrint className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">{pet.gender}</span>
        </div>
      </div>

      <Description description={pet?.description} name={pet?.name} />

      <div className="bg-gradient-warm rounded-2xl p-6 ">
        <h3
          className="text-xl font-bold mb-2"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Adoption Fee
        </h3>
        <p className="text-3xl font-bold">Rs. {pet?.price}</p>
        <p className="text-sm opacity-90 mt-1">
          Includes vaccinations, microchip & health check
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          className="flex-1 text-lg py-6"
          onClick={handleAdoptNow}
          // disabled={alreadyInCart}
        >
          {/* {alreadyInCart ? "In Cart" : "Adopt Now"} */}
          Adopt Now
        </Button>
      </div>
    </div>
  );
};

export default Details;
