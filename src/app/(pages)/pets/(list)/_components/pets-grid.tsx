import { Button } from "@/components/ui/button";
import { PetCard } from "@/components/ui/cards/pet-card";
import { pets } from "@/data/pets";
import { Search, X } from "lucide-react";
import { IPet } from "../../_common/pet-types";

interface PetsGridProps {
  pets: IPet[];
}

const PetsGrid = ({ pets }: PetsGridProps) => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto">
        {/* Results Info */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {/* {filteredPets.length} */}
            </span>{" "}
            pets
            {/* {selectedCategory !== "all" && (
              <span>
                {" "}
                in{" "}
                <span className="capitalize font-semibold text-foreground">
                  {selectedCategory}s
                </span>
              </span>
            )} */}
          </p>
          {/* {(searchQuery || selectedCategory !== "all") && ( */}
          <Button
            variant="ghost"
            size="sm"
            //   onClick={clearFilters}
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
          {/* )} */}
        </div>

        {pets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-muted mb-6">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3
              className="text-xl font-bold text-foreground mb-2"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              No pets found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter to find what you&apos;re
              looking for.
            </p>
            <Button variant="default">View All Pets</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PetsGrid;
