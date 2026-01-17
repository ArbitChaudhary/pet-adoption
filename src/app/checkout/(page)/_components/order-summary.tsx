"use client";

import { useAppSelector } from "@/hooks/redux";

const OrderSummary = () => {
  const { cart } = useAppSelector((state) => state.cart);

  return (
    <div className="lg:col-span-1">
      <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 sticky top-24">
        <h2
          className="text-xl font-bold mb-4"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Order Summary
        </h2>

        <div className="space-y-3 mb-6">
          {cart.map((pet) => (
            <div key={pet.petId} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{pet.petName}</span>
              <span>${pet?.petPrice}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">0</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Adoption fee includes vaccinations, microchip & health check
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
