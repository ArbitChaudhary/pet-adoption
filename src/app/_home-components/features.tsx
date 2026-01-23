import { Home, Shield, Users } from "lucide-react";

const Features = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all duration-300 group">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl gradient-warm mb-5 group-hover:scale-110 transition-transform">
              <Home className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Safe Shelter
            </h3>
            <p className="text-muted-foreground">
              Our pets live in a clean, comfortable environment with proper care
              until they find their forever homes.
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all duration-300 group">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl gradient-warm mb-5 group-hover:scale-110 transition-transform">
              <Shield className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Health Checked
            </h3>
            <p className="text-muted-foreground">
              Every pet is vaccinated, spayed/neutered, and thoroughly examined
              by our veterinary team.
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all duration-300 group">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl gradient-warm mb-5 group-hover:scale-110 transition-transform">
              <Users className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Support Team
            </h3>
            <p className="text-muted-foreground">
              Our dedicated team provides guidance and support throughout the
              adoption process and beyond.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
