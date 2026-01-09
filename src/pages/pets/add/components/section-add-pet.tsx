import Header from "@/components/ui/headers/header";
import { Box } from "@mui/material";
import type { PetFormData } from "../../common/pets-types";
import PetForm from "../../common/pet-form";
import { useAddPetMutation } from "../../common/pets-api";

function SectionAddPet() {
  const { isPending, mutateAsync } = useAddPetMutation();
  const onSubmit = async (data: PetFormData) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.log("Error submitting new pet:", error);
    }
  };
  return (
    <Box>
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        <Header title="Add a New Pet" />
        <Box sx={{ mt: { xs: 1, md: 2 } }}>
          <PetForm onSubmit={onSubmit} mode="add" isLoading={isPending} />
        </Box>
      </Box>
    </Box>
  );
}

export default SectionAddPet;
