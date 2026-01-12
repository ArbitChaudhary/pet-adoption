import SectionEditPet from "./components/section-edit-pet";
import { useGetPetByIdQuery } from "../common/pets-api";
import { useParams } from "react-router-dom";
import TriangleLoader from "@/components/ui/triangle-loader";
import { Suspense, useMemo } from "react";

const EditPetPage = () => {
  const { petId } = useParams();
  const { data: pet, isLoading } = useGetPetByIdQuery(petId!);
  const memoizedPet = useMemo(() => pet, [pet]);

  if (isLoading) return <TriangleLoader />;
  return (
    <Suspense fallback={<TriangleLoader />}>
      <SectionEditPet pet={memoizedPet} id={petId!} />
    </Suspense>
  );
};

export default EditPetPage;
