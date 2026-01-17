"use client";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import RegisterModal from "@/modal/auth/register/register-modal";
import LoginModal from "@/modal/auth/login/login-modal";
import UserVerifyModal from "@/modal/auth/verify/verify-modal";
import AuthorizedNavbar from "./authorized";
import NavCart from "./nav-cart";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pets", label: "Our Pets" },
  { href: "/team", label: "Our Team" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isRegisterModalOpen, isLoginModalOpen, isUserVerifyModalOpen } =
    useAppSelector((state) => state.global);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-warm">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span
              className="text-xl font-bold text-foreground"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              PawsHome
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* <CustomButton
              variant="outline"
              className="bg-transparent border-2 border-primary rounded-2xl font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
              label="Sign In"
              onClick={() => dispatch(setIsLoginModalOpen(true))}
            /> */}

            <NavCart />
            <AuthorizedNavbar />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-in">
            <nav className="container py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="outline" className="mt-2">
                Adopt Now
              </Button>
            </nav>
          </div>
        )}
      </header>
      {isRegisterModalOpen && <RegisterModal />}
      {isLoginModalOpen && <LoginModal />}
      {isUserVerifyModalOpen && <UserVerifyModal />}
    </>
  );
}
