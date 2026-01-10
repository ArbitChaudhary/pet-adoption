import { Heart, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-warm">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                PawsHome
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Finding loving homes for pets since 2010. Every animal deserves a
              family to call their own.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4
              className="font-semibold text-foreground"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/pets"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Available Pets
              </Link>
              <Link
                href="/team"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Our Team
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4
              className="font-semibold text-foreground"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Pet Street, Animal City, AC 12345</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@pawshome.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4
              className="font-semibold text-foreground"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Visiting Hours
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Monday - Friday: 9am - 6pm</p>
              <p>Saturday: 10am - 5pm</p>
              <p>Sunday: 12pm - 4pm</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PawsHome. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-primary fill-primary" />{" "}
            for pets
          </p>
        </div>
      </div>
    </footer>
  );
}
