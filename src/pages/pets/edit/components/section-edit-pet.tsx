import { Box } from "@mui/material";
import type { IPet, PetFormData } from "../../common/pets-types";
import Header from "@/components/ui/headers/header";
import PetForm from "../../common/pet-form";
import { useUpdatePetMutation } from "../../common/pets-api";

interface SectionEditPetProps {
  pet: IPet;
  id: string;
}

const SectionEditPet = ({ pet, id }: SectionEditPetProps) => {
  const { isPending, mutateAsync } = useUpdatePetMutation();
  const onSubmit = async (data: PetFormData) => {
    try {
      await mutateAsync({ id, newData: data });
    } catch (error) {
      console.log("Error updating pet:", error);
    }
  };
  return (
    <Box sx={{ p: 2 }}>
      <Header title="Edit Pet Info" />
      <Box mt={2}>
        <PetForm
          mode="edit"
          onSubmit={onSubmit}
          initialData={pet}
          isLoading={isPending}
        />
      </Box>
    </Box>
  );
};

export default SectionEditPet;
