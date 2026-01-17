import { Button } from "@/components/ui/button";
import { PetCard } from "@/components/ui/cards/pet-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { IPet } from "../(pages)/pets/_common/pet-types";

interface PetsProps {
  pets: IPet[] | [];
}

const Pets = ({ pets }: PetsProps) => {
  const featuredPets = pets?.slice(0, 4) ?? [];
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            Meet Our Adorable Pets
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These loving animals are waiting for a family to call their own.
            Each one has a unique personality and so much love to give.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="default" size="lg" asChild>
            <Link href="/pets">
              View All Pets
              <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pets;
