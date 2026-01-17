"use client";

import { useAppSelector } from "@/hooks/redux";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const NavCart = () => {
  const { totalQuantity } = useAppSelector((state) => state.cart);
  return (
    <div className="relative">
      <Link href={"/checkout"}>
        <ShoppingCart className="text-primary " size={20} />
        <span className="absolute text-[10px] rounded-full -top-2 -right-1.5 bg-primary text-white h-4 w-4 flex justify-center items-center ">
          {totalQuantity}
        </span>
      </Link>
    </div>
  );
};

export default NavCart;
