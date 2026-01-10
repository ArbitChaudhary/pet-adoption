import { Button } from "@/components/ui/button";
import { Pet } from "@/data/pets";
import { Calendar, PawPrint } from "lucide-react";

interface DetailsProps {
  pet: Pet;
}
const Details = ({ pet }: DetailsProps) => {
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

      <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
        <h2
          className="text-xl font-bold mb-3"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          About {pet.name}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {pet.description}
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          {pet.name} is looking for a loving forever home. Our adoption process
          ensures that every pet finds the perfect match. When you adopt from
          us, you&apos;re not just getting a pet – you&apos;re gaining a loyal
          companion who will bring joy to your life every day.
        </p>
      </div>

      <div className="bg-gradient-warm rounded-2xl p-6 text-primary-foreground">
        <h3
          className="text-xl font-bold mb-2"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Adoption Fee
        </h3>
        <p className="text-3xl font-bold">
          $
          {pet.category === "dog"
            ? "250"
            : pet.category === "cat"
            ? "150"
            : "100"}
        </p>
        <p className="text-sm opacity-90 mt-1">
          Includes vaccinations, microchip & health check
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          className="flex-1 text-lg py-6"
          // onClick={handleAdoptNow}
          // disabled={alreadyInCart}
        >
          {/* {alreadyInCart ? "In Cart" : "Adopt Now"} */}
          Adopt Now
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="flex-1 text-lg py-6"
          // onClick={handleAddToCart}
          // disabled={alreadyInCart}
        >
          {/* {alreadyInCart ? "Already Added" : "Add to Cart"} */}
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Details;
