const Hero = () => {
  return (
    <section className="py-12 md:py-20 gradient-hero">
      <div className="container text-center mx-auto">
        <h1
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          About <span className="text-gradient">PawsHome</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Dedicated to rescuing, rehabilitating, and rehoming animals in need
          since 2010.
        </p>
      </div>
    </section>
  );
};

export default Hero;
