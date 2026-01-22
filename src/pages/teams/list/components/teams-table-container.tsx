import TableSkeleton from "@/components/ui/table-skeleton/table-skeleton";
import { useDeleteTeamMutation, useGetTeamsQuery } from "../../common/team-api";
import TeamsTable from "./teams-table";
import { useMemo, useState } from "react";
import type { ITeam } from "../../common/team-types";
import DeleteModal from "@/components/modal/delete-modal";
import { useNavigate } from "react-router-dom";
import SearchBox from "@/components/reusables/search-box";
import { Box } from "@mui/material";

function TeamsTableContainer() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [paginationModel, setPaginationModel] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 0,
    pageSize: 20,
  });
  const filter = {
    search: searchQuery,
    page: paginationModel.page,
    limit: paginationModel.pageSize,
  };
  const navigate = useNavigate();
  const { data, isLoading } = useGetTeamsQuery({ filter });
  const { isPending: isDeleting, mutateAsync } = useDeleteTeamMutation();
  const memoizedTeams = useMemo(() => (data?.teams as ITeam[]) || [], [data]);
  const memoizedRow = useMemo(() => data?.total, [data]);

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await mutateAsync(selectedTeamId);
      handleDeleteModalClose();
    } catch (error) {
      console.log("Error deleting", error);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/teams/edit/${id}`);
  };

  if (isLoading) {
    return <TableSkeleton />;
  }
  return (
    <>
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Box sx={{ mt: 2 }} />
      <TeamsTable
        teams={memoizedTeams as ITeam[]}
        handleDeleteModalOpen={handleDeleteModalOpen}
        selectedTeamId={selectedTeamId}
        setSelectedTeamId={setSelectedTeamId}
        handleEdit={handleEdit}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={memoizedRow as number}
      />
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          handleDelete={handleDelete}
          isLoading={isDeleting}
        />
      )}
    </>
  );
}

export default TeamsTableContainer;
