const Stats = () => {
  return (
    <section className="py-16 md:py-24 gradient-warm">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-primary-foreground">
          <div>
            <div
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              10,000+
            </div>
            <div className="text-sm opacity-90">Pets Adopted</div>
          </div>
          <div>
            <div
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              15+
            </div>
            <div className="text-sm opacity-90">Years of Service</div>
          </div>
          <div>
            <div
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              50+
            </div>
            <div className="text-sm opacity-90">Team Members</div>
          </div>
          <div>
            <div
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              500+
            </div>
            <div className="text-sm opacity-90">Volunteers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
