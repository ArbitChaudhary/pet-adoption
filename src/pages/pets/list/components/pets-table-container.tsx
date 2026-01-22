import PetsTable from "./pets-table";
import TableSkeleton from "@/components/ui/table-skeleton/table-skeleton";
import { useDeletePetMutation, useGetPetsQuery } from "../../common/pets-api";
import { useMemo, useState } from "react";
import type { IPet } from "../../common/pets-types";
import { useNavigate } from "react-router-dom";
import DeleteModal from "@/components/modal/delete-modal";
import SearchBox from "@/components/reusables/search-box";
import { Box } from "@mui/material";

const PetsTableContainer = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedPetId, setSelectedPetId] = useState<string>("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const filter = useMemo(
    () => {
      const search = searchQuery;
      const page = String(paginationModel.page);
      const limit = String(paginationModel.pageSize);
      return { search, page, limit };
    },
    [searchQuery, paginationModel],
    // {
    //   search: searchQuery,
    //   page: String(paginationModel.page) as string,
    //   limit: String(paginationModel.pageSize) as string,
    // }, [searchQuery, paginationModel]
  );
  // const searchParams = useMemo(() => new URLSearchParams(filter), [filter]);
  const { data: pets, isLoading } = useGetPetsQuery(filter);
  const memoizedPets = useMemo(() => pets?.pets, [pets]);
  const memoizedRowCount = useMemo(() => pets?.total, [pets]);

  const { isPending, mutateAsync } = useDeletePetMutation();

  const handlePetEdit = (petId: string) => {
    navigate(`/pets/edit/${petId}`);
  };

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };
  const handleDeletePet = async () => {
    try {
      await mutateAsync(selectedPetId);
      setIsDeleteDialogOpen(false);
      // eslint-disable-next-line
    } catch (error: any) {
      console.log(
        error?.data?.message || error?.message || "Error deleting pet",
      );
    }
  };
  if (isLoading) {
    return <TableSkeleton />;
  }
  return (
    <>
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Box sx={{ mt: 2 }} />
      <PetsTable
        pets={(memoizedPets as IPet[]) || []}
        handlePetEdit={handlePetEdit}
        setSelectedPetId={setSelectedPetId}
        handleOpenDeleteDialog={handleOpenDeleteDialog}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={memoizedRowCount}
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
