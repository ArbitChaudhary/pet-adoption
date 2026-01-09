import PetsTable from "./pets-table";
import TableSkeleton from "@/components/ui/table-skeleton/table-skeleton";
import { useDeletePetMutation, useGetPetsQuery } from "../../common/pets-api";
import { useMemo, useState } from "react";
import type { IPet } from "../../common/pets-types";
import { useNavigate } from "react-router-dom";
import DeleteModal from "@/components/modal/delete-modal";

const PetsTableContainer = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedPetId, setSelectedPetId] = useState<string>("");
  const navigate = useNavigate();
  const { data: pets, isLoading } = useGetPetsQuery();
  const memoizedPets = useMemo(() => pets, [pets]);

  const { isPending, mutateAsync } = useDeletePetMutation();

  const handlePetEdit = (petId: string) => {
    navigate(`/pets/edit/${petId}`);
  };

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };
  const handleDeletePet = async () => {
    await mutateAsync(selectedPetId);
  };
  if (isLoading) {
    return <TableSkeleton />;
  }
  return (
    <>
      <PetsTable
        pets={(memoizedPets as IPet[]) || []}
        handlePetEdit={handlePetEdit}
        setSelectedPetId={setSelectedPetId}
        handleOpenDeleteDialog={handleOpenDeleteDialog}
      />
      <DeleteModal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        handleDelete={handleDeletePet}
        isLoading={isPending}
      />
    </>
  );
};

export default PetsTableContainer;
