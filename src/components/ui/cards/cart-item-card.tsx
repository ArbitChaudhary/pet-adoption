"use client";
import { ICartItem, removeFromCart } from "@/redux/reducers/cart-slice";
import { Button } from "../button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useAppDispatch } from "@/hooks/redux";

interface CartItemCardProps {
  cartItem: ICartItem;
}

const CartItemCard = ({ cartItem }: CartItemCardProps) => {
  const dispatch = useAppDispatch();
  return (
    <div
      key={cartItem.petId}
      className="bg-card rounded-2xl p-4 shadow-soft border border-border/50 flex gap-4"
    >
      <Image
        src={(cartItem?.image as string) || ""}
        alt={cartItem.name}
        height={96}
        width={96}
        className="w-24 h-24 rounded-xl object-cover relative"
      />
      <div className="flex-1">
        <h3
          className="font-bold text-lg"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          {cartItem.name}
        </h3>
        <p className="text-sm text-muted-foreground">{cartItem.breed}</p>
        <p className="text-primary font-bold mt-2">${cartItem?.price}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-destructive hover:text-destructive"
        onClick={() => dispatch(removeFromCart(cartItem.petId))}
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default CartItemCard;
