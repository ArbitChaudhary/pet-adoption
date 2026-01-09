import { Box } from "@mui/material";
import TeamForm from "../../common/team-form";
import type { TeamInput } from "../../common/team-types";
import Header from "@/components/ui/headers/header";
import { useAddTeamMutation } from "../../common/team-api";

const SectionAddTeam = () => {
  const { mutateAsync, isPending } = useAddTeamMutation();
  const onSubmit = async (data: TeamInput) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.log("Error adding team", error);
    }
  };
  return (
    <Box px={3} py={1}>
      <Header
        title="Add New Team Member"
        subtitle="Add a new member to you family"
      />
      <TeamForm onSubmit={onSubmit} mode="add" isLoading={isPending} />
    </Box>
  );
};

export default SectionAddTeam;
