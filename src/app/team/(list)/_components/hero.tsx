const TeamHero = () => {
  return (
    <section className="py-12 md:py-20 gradient-hero">
      <div className="container text-center">
        <h1
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Meet Our <span className="text-gradient">Team</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Our dedicated team of professionals is passionate about animal welfare
          and committed to finding loving homes for every pet in our care.
        </p>
      </div>
    </section>
  );
};

export default TeamHero;
