import { Suspense } from "react";
import SectionTeamDetails from "./_components/section-team-details";
import PageLoader from "@/components/page-loader/page-loader";

async function TeamDetailsPage({ params }: { params: { teamId: string } }) {
  const { teamId } = await params;
  const response = await fetch(`${process.env.API_BASE_URL}/teams/${teamId}`, {
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch team details `);
  }
  const teamData = await response.json();
  return (
    <Suspense fallback={<PageLoader />}>
      <SectionTeamDetails teamId={teamId} team={teamData} />
    </Suspense>
  );
}

export default TeamDetailsPage;
