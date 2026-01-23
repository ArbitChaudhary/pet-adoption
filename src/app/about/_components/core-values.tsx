const CoreValues = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            Our Core Values
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These principles guide everything we do at PawsHome.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all duration-300">
            <div className="text-4xl mb-4">💝</div>
            <h4
              className="font-bold text-foreground mb-2"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Compassion
            </h4>
            <p className="text-sm text-muted-foreground">
              Treating every animal with kindness and respect.
            </p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all duration-300">
            <div className="text-4xl mb-4">🔬</div>
            <h4
              className="font-bold text-foreground mb-2"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Excellence
            </h4>
            <p className="text-sm text-muted-foreground">
              Providing the highest standard of animal care.
            </p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all duration-300">
            <div className="text-4xl mb-4">🤝</div>
            <h4
              className="font-bold text-foreground mb-2"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Integrity
            </h4>
            <p className="text-sm text-muted-foreground">
              Maintaining transparency in all our operations.
            </p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all duration-300">
            <div className="text-4xl mb-4">🌍</div>
            <h4
              className="font-bold text-foreground mb-2"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Community
            </h4>
            <p className="text-sm text-muted-foreground">
              Building relationships that last a lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
