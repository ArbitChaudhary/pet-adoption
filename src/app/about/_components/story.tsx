const Story = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              Our Story
            </h2>
          </div>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              PawsHome was founded in 2010 by Dr. Sarah Johnson, a passionate
              veterinarian who witnessed firsthand the countless animals in need
              of loving homes. What started as a small rescue operation in her
              backyard has grown into one of the most trusted animal adoption
              centers in the region.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Our journey began with a simple belief: every animal deserves a
              chance at a happy life. Over the years, we&spos;ve rescued
              thousands of dogs, cats, and birds from shelters, streets, and
              difficult situations, providing them with medical care,
              rehabilitation, and the love they need to thrive.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Today, PawsHome is home to a dedicated team of veterinarians,
              animal behaviorists, and caretakers who work tirelessly to ensure
              each pet receives individualized attention and care. We&apos;ve
              successfully placed over 10,000 pets in loving homes, and we
              continue to grow our impact every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
