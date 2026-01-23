"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IPet } from "@/app/pets/(pets)/_common/pet-types";
import { useAddWishlistItemMutation } from "@/redux/actions/wishlist-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setIsLoginModalOpen } from "@/redux/reducers/global-slice";
import { toast } from "sonner";

interface PetCardProps {
  pet: IPet;
}

const categoryColors = {
  dog: "bg-pet-dog/10 text-pet-dog border-pet-dog/20",
  cat: "bg-pet-cat/10 text-pet-cat border-pet-cat/20",
  bird: "bg-pet-bird/10 text-pet-bird border-pet-bird/20",
};

export function PetCard({ pet }: PetCardProps) {
  const { user } = useAppSelector((state) => state.global);
  const [addWishlistItem, { isLoading }] = useAddWishlistItemMutation();
  const dispatch = useAppDispatch();

  const handleAddToWishlist = async () => {
    if (!user) {
      dispatch(setIsLoginModalOpen(true));
      return;
    }
    try {
      await addWishlistItem({ petId: pet._id, userId: user?._id }).unwrap;
      //eslint-disable-next-line
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Failed to add wishlist",
      );
    }
  };
  return (
    <Link href={`/pets/${pet._id}`}>
      <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={pet?.image}
            alt={pet.name}
            fill
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              // className={`${
              //   categoryColors[pet.category]
              // } border font-medium capitalize`}
              className="border font-medium capitalize"
            >
              {pet.category}
            </Badge>
          </div>
          <button className="absolute top-3 right-3 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-primary hover:text-primary-foreground">
            <Heart className="h-5 w-5" onClick={handleAddToWishlist} />
          </button>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3
                className="text-lg font-bold text-foreground"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                {pet.name}
              </h3>
              <p className="text-sm text-muted-foreground">{pet.breed}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{pet.age}</span>
            <span>•</span>
            <span>{pet.gender}</span>
          </div>
          <p
            dangerouslySetInnerHTML={{ __html: pet?.description }}
            className="text-sm text-muted-foreground line-clamp-2"
          />

          <div className="flex items-center gap-2 pt-2">
            <Button variant="default" size="sm" className="flex-1">
              Adopt Me
            </Button>
            <Button variant="outline" size="sm">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
