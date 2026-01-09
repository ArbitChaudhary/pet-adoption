import { Box } from "@mui/material";
import SectionEditPet from "./components/section-edit-pet";
import { useGetPetByIdQuery } from "../common/pets-api";
import { useParams } from "react-router-dom";
import TriangleLoader from "@/components/ui/triangle-loader";

const EditPetPage = () => {
  const { petId } = useParams();
  const { data: pet, isLoading } = useGetPetByIdQuery(petId!);

  if (isLoading) return <TriangleLoader />;
  return (
    <Box>
      <SectionEditPet pet={pet} id={petId!} />
    </Box>
  );
};

export default EditPetPage;
