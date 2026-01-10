import SectionTeam from "./_components/section-team";

export default async function TeamPage() {
  const response = await fetch(`${process.env.API_BASE_URL}/teams`, {
    cache: "no-cache",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch teams");
  }
  const teams = await response.json();
  return <SectionTeam teams={teams?.teams} />;
}
