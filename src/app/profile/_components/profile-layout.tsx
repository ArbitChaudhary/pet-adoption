"use client";
import { PawPrint, Dog, Settings, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SectionAdopted from "./section-adopted";
import SectionWishlist from "./section-wishlist";
import { useState } from "react";
import SectionChangePassword from "./section-change-password";
const sidebarMenu = [
  { label: "Adopted", href: "/adopted", icon: PawPrint },
  { label: "Wishlist", href: "/wishlist", icon: Dog },
  { label: "Settings", href: "/settings", icon: Settings },
  {
    label: "Change Password",
    href: "/change-password",
    icon: LockKeyhole,
  },
];

const ProfileLayout = () => {
  const [currentPath, seCurrentPath] = useState<string>("/adopted");
  const sidebarItem = sidebarMenu.map((item) => {
    const Icon = item.icon;
    return (
      //   <Link key={item.label} href={item.href}>
      <div
        key={item.label}
        onClick={() => seCurrentPath(item.href)}
        className={`flex flex-row gap-4 items-center px-2 md:px-4 py-1 md:py-3 font-semibold hover:bg-accent/55 w-fit md:w-[230px] rounded-r-2xl hover:cursor-pointer ${currentPath === item.href ? "bg-accent text-blue-700 " : ""}`}
      >
        <Icon className="w-5 h-5" />
        <span className=" text-sm whitespace-nowrap">{item.label}</span>
      </div>
      //   </Link>
    );
  });
  return (
    <>
      <div className="container mx-auto min-h-screen">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="hidden md:block">{sidebarItem}</div>
          <div className=" md:hidden flex overflow-auto ">{sidebarItem}</div>
          {currentPath === "/adopted" && <SectionAdopted />}
          {currentPath === "/wishlist" && <SectionWishlist />}
          {currentPath === "/settings" && <div>Settings Page</div>}
          {currentPath === "/change-password" && <SectionChangePassword />}
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
