import { Box } from "@mui/material";
import TeamForm from "../../common/team-form";
import type { TeamInput } from "../../common/team-types";
import Header from "@/components/ui/headers/header";
import { useAddTeamMutation } from "../../common/team-api";
import { uploadToCloudinary } from "@/config/cloudinary";
import { useNavigate } from "react-router-dom";

const SectionAddTeam = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useAddTeamMutation();
  const onSubmit = async (data: TeamInput) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (value instanceof File) {
          const file = await uploadToCloudinary(value);
          formData.append(key, file as unknown as string);
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      }
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      await mutateAsync(formData as any);
      navigate("/teams");
      // await mutateAsync(data);
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
