import { useParams } from "react-router-dom";
import SectionEditTeam from "./components/section-edit-team";
import { useGetTeamByIdQuery } from "../common/team-api";
import TriangleLoader from "@/components/ui/triangle-loader";

function EditTeamPage() {
  const { teamId } = useParams();
  const { isLoading, data } = useGetTeamByIdQuery(teamId!);
  if (isLoading) return <TriangleLoader />;
  return <SectionEditTeam teamId={teamId!} team={data} />;
}
export default EditTeamPage;
