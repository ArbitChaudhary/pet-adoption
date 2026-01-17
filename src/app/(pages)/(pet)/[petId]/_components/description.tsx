interface DescriptionProps {
  description: string;
  name?: string;
}

const Description = ({ description, name }: DescriptionProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
      <h2
        className="text-xl font-bold mb-3"
        style={{ fontFamily: "Fredoka, sans-serif" }}
      >
        About {name}
      </h2>
      <p
        dangerouslySetInnerHTML={{ __html: description }}
        className="text-muted-foreground leading-relaxed wrap-break-word w-full"
      />

      <p className="text-muted-foreground leading-relaxed mt-4">
        {name} is looking for a loving forever home. Our adoption process
        ensures that every pet finds the perfect match. When you adopt from us,
        you&apos;re not just getting a pet – you&apos;re gaining a loyal
        companion who will bring joy to your life every day.
      </p>
    </div>
  );
};

export default Description;
