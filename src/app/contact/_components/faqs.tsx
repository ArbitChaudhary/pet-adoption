const FAQs = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl font-bold text-foreground mb-8 text-center"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-card shadow-soft">
              <h4
                className="font-bold text-foreground mb-2"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                What is the adoption process?
              </h4>
              <p className="text-muted-foreground text-sm">
                Our adoption process includes an application, meet-and-greet
                with the pet, home check, and final approval. The entire process
                typically takes 3-5 days.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card shadow-soft">
              <h4
                className="font-bold text-foreground mb-2"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                What are the adoption fees?
              </h4>
              <p className="text-muted-foreground text-sm">
                Adoption fees vary by animal and include vaccinations,
                spay/neuter surgery, microchipping, and health checkup. Fees
                typically range from $50 to $300.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card shadow-soft">
              <h4
                className="font-bold text-foreground mb-2"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                Can I return an adopted pet?
              </h4>
              <p className="text-muted-foreground text-sm">
                We understand that sometimes things don&apos;t work out. We
                accept returns within 30 days and will work with you to find the
                best solution for both you and the pet.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card shadow-soft">
              <h4
                className="font-bold text-foreground mb-2"
                style={{ fontFamily: "Fredoka, sans-serif" }}
              >
                Do you accept volunteers?
              </h4>
              <p className="text-muted-foreground text-sm">
                Yes! We welcome volunteers of all ages. Opportunities include
                dog walking, cat socialization, event support, and
                administrative help. Contact us to learn more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
