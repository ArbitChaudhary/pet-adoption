import { Box } from "@mui/material";
import type { IPet, PetFormData } from "../../common/pets-types";
import Header from "@/components/ui/headers/header";
import PetForm from "../../common/pet-form";
import { useUpdatePetMutation } from "../../common/pets-api";
import { uploadToCloudinary } from "@/config/cloudinary";
import { useNavigate } from "react-router-dom";

interface SectionEditPetProps {
  pet: IPet;
  id: string;
}

const SectionEditPet = ({ pet, id }: SectionEditPetProps) => {
  const { isPending, mutateAsync } = useUpdatePetMutation();
  const navigate = useNavigate();
  const normalizedPet = {
    ...pet,
    gallery: Array.isArray(pet.gallery)
      ? pet.gallery
      : typeof pet.gallery === "string"
      ? JSON.parse(pet.gallery)
      : [],
  };
  const onSubmit = async (data: PetFormData) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (value instanceof File) {
          if (Array.isArray(value)) {
            for (const file of value) {
              const uploadedFile = await uploadToCloudinary(file);
              formData.append(key, uploadedFile);
            }
          } else {
            const file = await uploadToCloudinary(value);
            formData.append(key, file as unknown as string);
          }
        } else if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      }
      await mutateAsync({ id, newData: formData as unknown as PetFormData });
      navigate("/pets");
    } catch (error) {
      console.log("Error submitting new pet:", error);
    }
  };
  return (
    <Box sx={{ p: 2 }}>
      <Header title="Edit Pet Info" />
      <Box mt={2}>
        <PetForm
          mode="edit"
          onSubmit={onSubmit}
          initialData={normalizedPet}
          isLoading={isPending}
        />
      </Box>
    </Box>
  );
};

export default SectionEditPet;
