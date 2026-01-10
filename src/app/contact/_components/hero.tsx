const Hero = () => {
  return (
    <section className="py-12 md:py-20 gradient-hero">
      <div className="container text-center">
        <h1
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          style={{ fontFamily: "Fredoka, sans-serif" }}
        >
          Get In <span className="text-gradient">Touch</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Have questions about adoption or want to learn more about our mission?
          We&apos;d love to hear from you!
        </p>
      </div>
    </section>
  );
};

export default Hero;
