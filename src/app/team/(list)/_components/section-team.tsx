import { Suspense } from "react";
import { ITeam } from "../../common/team-types";
import TeamHero from "./hero";
import TeamGrid from "./team-grid";
import OurValues from "./values";
import PageLoader from "@/components/page-loader/page-loader";

interface SectionTeamProps {
  teams: ITeam[];
}

const SectionTeam = ({ teams }: SectionTeamProps) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <TeamHero />
      <TeamGrid teams={teams} />
      <OurValues />
    </Suspense>
  );
};

export default SectionTeam;
