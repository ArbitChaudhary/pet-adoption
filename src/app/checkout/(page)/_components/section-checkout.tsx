"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setIsLoginModalOpen } from "@/redux/reducers/global-slice";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import OrderSummary from "./order-summary";
import CartItemCard from "@/components/ui/cards/cart-item-card";
import OrderForm from "./order-form";

const SectionCheckout = () => {
  const { user } = useAppSelector((state) => state.global);
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (!user) {
    return (
      <div className="container py-20 text-center mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
        <p className="text-muted-foreground mb-6">
          You need to be signed in to complete your adoption.
        </p>
        <Button onClick={() => dispatch(setIsLoginModalOpen(true))}>
          Sign In
        </Button>
      </div>
    );
  }
  if (cart.length === 0) {
    return (
      <div className="container py-20 text-center mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">
          Browse our pets and find your perfect companion.
        </p>
        <Button onClick={() => router.push("/pets")}>View Pets</Button>
      </div>
    );
  }
  return (
    <>
      <div className="container py-8 md:py-12 mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/pets")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Button>

        <h1
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Complete Your Adoption
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Your Pets ({cart.length})
            </h2>

            {cart.map((pet) => (
              <CartItemCard key={pet?.petId} cartItem={pet} />
            ))}

            {/* Adoption Form */}
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 mt-8">
              <h2
                className="text-xl font-bold mb-6"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                Your Information
              </h2>
              <OrderForm />
            </div>
          </div>

          {/* Order Summary */}
          <OrderSummary />
        </div>
      </div>
    </>
  );
};

export default SectionCheckout;
