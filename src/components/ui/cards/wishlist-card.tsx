import { Pet } from "@/data/pets";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface WishlistCardProps {
  pet: Pet;
}

export function WishlistCard({ pet }: WishlistCardProps) {
  const { removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = () => {
    addToCart(pet);
    toast.success(`${pet.name} added to cart!`);
  };

  const inCart = isInCart(pet.id);

  const handleRemove = () => {
    removeFromWishlist(pet.id);
    toast.success(`${pet.name} removed from wishlist`);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className="bg-white/90 text-foreground capitalize"
          >
            {pet.category}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-bold text-white">{pet.name}</h3>
          <p className="text-white/80 text-sm">{pet.breed}</p>
        </div>
        <button
          onClick={handleRemove}
          className="absolute top-3 left-3 p-2 rounded-full bg-white/90 hover:bg-destructive hover:text-white transition-colors"
        >
          <Heart className="h-4 w-4 fill-destructive text-destructive" />
        </button>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span>{pet.age}</span>
          <span className="capitalize">{pet.gender}</span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={handleAddToCart}
            disabled={inCart}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {inCart ? "In Cart" : "Add to Cart"}
          </Button>
          <Button size="sm" variant="ghost" asChild>
            <Link to={`/pets/${pet.id}`}>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="sm" variant="ghost" onClick={handleRemove}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
