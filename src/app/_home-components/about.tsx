import { Button } from "@/components/ui/button";
import { pets } from "@/data/pets";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  const featuredPets = pets.slice(0, 4);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              About <span className="text-gradient">PawsHome</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Founded in 2010, PawsHome is dedicated to rescuing,
              rehabilitating, and rehoming animals in need. We believe every pet
              deserves a chance at a happy life with a loving family.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our passionate team of veterinarians, animal behaviorists, and
              caretakers work tirelessly to ensure each animal receives the best
              care possible. We also educate the community about responsible pet
              ownership.
            </p>
            <div className="flex flex-wrap gap-8 mb-8">
              <div>
                <div
                  className="text-3xl font-bold text-primary"
                  style={{ fontFamily: "Fredoka, sans-serif" }}
                >
                  10,000+
                </div>
                <div className="text-sm text-muted-foreground">
                  Pets Adopted
                </div>
              </div>
              <div>
                <div
                  className="text-3xl font-bold text-primary"
                  style={{ fontFamily: "Fredoka, sans-serif" }}
                >
                  15+
                </div>
                <div className="text-sm text-muted-foreground">
                  Years of Service
                </div>
              </div>
              <div>
                <div
                  className="text-3xl font-bold text-primary"
                  style={{ fontFamily: "Fredoka, sans-serif" }}
                >
                  50+
                </div>
                <div className="text-sm text-muted-foreground">
                  Team Members
                </div>
              </div>
            </div>
            <Button variant="default" asChild>
              <Link href="/about">Read Our Story</Link>
            </Button>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {featuredPets.slice(0, 4).map((pet, index) => (
                <div
                  key={pet.id}
                  className={`rounded-2xl overflow-hidden shadow-card ${
                    index === 0 || index === 3 ? "mt-8" : ""
                  }`}
                >
                  <Image
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
