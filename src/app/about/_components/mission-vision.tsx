import { Heart, Target } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-8 rounded-2xl bg-card shadow-soft">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl gradient-warm mb-6">
              <Target className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3
              className="text-2xl font-bold text-foreground mb-4"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Our Mission
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To rescue animals in need, provide them with exceptional care, and
              find them loving forever homes. We strive to reduce pet
              homelessness through responsible adoption practices, community
              education, and compassionate animal welfare services.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-card shadow-soft">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl gradient-warm mb-6">
              <Heart className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3
              className="text-2xl font-bold text-foreground mb-4"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Our Vision
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              A world where every pet has a loving family and no animal suffers
              from neglect or abandonment. We envision a community where
              responsible pet ownership is the norm and every animal is valued
              as a cherished companion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
