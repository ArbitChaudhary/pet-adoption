import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import heroImage from "@/assets/hero-pets.jpg";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Happy pets"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
      </div>
      <div className="container relative z-10 mx-auto">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <Heart className="h-4 w-4" />
            <span>Over 10,000+ pets adopted</span>
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            Find Your Perfect{" "}
            <span className="text-gradient">Furry Friend</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Every pet deserves a loving home. Browse our adorable dogs, cats,
            and birds waiting to become part of your family. Start your journey
            to unconditional love today.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="default" size="lg" asChild>
              <Link href="/pets">
                Meet Our Pets
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
