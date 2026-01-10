const OurValues = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            Our Values
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Every member of our team shares these core values that guide
            everything we do.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-card shadow-soft">
              <div className="text-3xl mb-4">💝</div>
              <h3
                className="font-bold text-foreground mb-2"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                Compassion
              </h3>
              <p className="text-sm text-muted-foreground">
                We treat every animal with kindness, love, and respect they
                deserve.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card shadow-soft">
              <div className="text-3xl mb-4">🌟</div>
              <h3
                className="font-bold text-foreground mb-2"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                Excellence
              </h3>
              <p className="text-sm text-muted-foreground">
                We strive for the highest standards in animal care and adoption
                services.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card shadow-soft">
              <div className="text-3xl mb-4">🤝</div>
              <h3
                className="font-bold text-foreground mb-2"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                Community
              </h3>
              <p className="text-sm text-muted-foreground">
                We build lasting relationships with adopters and the community
                we serve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurValues;
