import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            Ready to Make a Difference?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Whether you&apos;re looking to adopt, volunteer, or donate, there
            are many ways to support our mission.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="default" size="lg" asChild>
              <Link href="/pets">
                View Our Pets
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
