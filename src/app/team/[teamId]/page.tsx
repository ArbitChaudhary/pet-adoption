import SectionTeamDetails from "./_components/section-team-details";

async function TeamDetailsPage({ params }: { params: { teamId: string } }) {
  const { teamId } = await params;
  return <SectionTeamDetails teamId={teamId} />;
}

export default TeamDetailsPage;
