"use client";
import { TeamCard } from "@/components/ui/cards/team-card";
import { teamMembers } from "@/data/team";
import { ITeam } from "../../common/team-types";

interface TeamGridProps {
  teams: ITeam[] | [];
}

const TeamGrid = ({ teams }: TeamGridProps) => {
  console.log("Teams in TeamGrid:", teams);
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.map((team) => (
            <TeamCard key={team._id} member={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;
