import Header from "@/components/ui/headers/header";
import { Box } from "@mui/material";
import TeamForm from "../../common/team-form";
import { useUpdateTeamMutation } from "../../common/team-api";
import type { ITeam, TeamInput } from "../../common/team-types";
import { useNavigate } from "react-router-dom";

interface SectionEditTeamProps {
  teamId: string;
  team?: ITeam;
}

function SectionEditTeam({ teamId, team }: SectionEditTeamProps) {
  const { isPending, mutateAsync } = useUpdateTeamMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: TeamInput) => {
    try {
      await mutateAsync({ id: teamId, updateData: data });
      navigate("/teams");
    } catch (error) {
      console.log("Error updating team", error);
    }
  };
  return (
    <Box>
      <Header title="Update Team Infor" />
      <Box mt={3}>
        <TeamForm
          mode="edit"
          onSubmit={onSubmit}
          isLoading={isPending}
          defaultValues={team}
        />
      </Box>
    </Box>
  );
}

export default SectionEditTeam;
