import { TeamCard } from "@/components/ui/cards/team-card";
import { teamMembers } from "@/data/team";

const TeamGrid = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;
