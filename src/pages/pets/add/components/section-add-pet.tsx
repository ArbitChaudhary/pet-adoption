import Header from "@/components/ui/headers/header";
import { Box } from "@mui/material";
import type { PetFormData } from "../../common/pets-types";
import PetForm from "../../common/pet-form";
import { useAddPetMutation } from "../../common/pets-api";
import { uploadToCloudinary } from "@/config/cloudinary";

function SectionAddPet() {
  const { isPending, mutateAsync } = useAddPetMutation();
  const onSubmit = async (data: PetFormData) => {
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
          const urls: string[] = [];
          for (const file of value) {
            if (file instanceof File) {
              const url = await uploadToCloudinary(file);
              urls.push(url as string);
            } else if (typeof file === "string") {
              urls.push(file); // Keep existing URL strings
            }
          }
          // Append each URL separately with the same key name
          urls.forEach((url) => {
            formData.append(key, url);
          });
        } else if (value instanceof File) {
          const url = await uploadToCloudinary(value);
          formData.append(key, url);
        } else if (value !== undefined && value !== null) {
          // Convert boolean values to strings
          if (typeof value === "boolean") {
            formData.append(key, value.toString());
          } else {
            formData.append(key, value as string);
          }
        }
      }

      await mutateAsync(formData as unknown as PetFormData);
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
