"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
// import { useToast } from "@/hooks/use-toast";

export function Newsletter() {
  const [email, setEmail] = useState("");
  //   const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      //   toast.success({
      //     title: "Thanks for subscribing! 🎉",
      //     description: "You'll receive updates about our adorable pets.",
      //   });
      toast.success(
        "Thanks for subscribing! 🎉 You'll receive updates about our adorable pets."
      );
      setEmail("");
    }
  };

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl gradient-warm mb-6 animate-bounce-gentle">
            <Mail className="h-7 w-7 text-primary-foreground" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Subscribe to our newsletter and be the first to know about new pets
            looking for homes, adoption events, and heartwarming stories.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 rounded-xl bg-background"
              required
            />
            <Button type="submit" variant="default" size="lg">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
            <Heart className="h-3 w-3 text-primary" /> We promise not to spam.
            Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
