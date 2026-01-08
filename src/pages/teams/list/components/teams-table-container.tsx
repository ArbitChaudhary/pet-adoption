import TableSkeleton from "@/components/ui/table-skeleton/table-skeleton";
import { useDeleteTeamMutation, useGetTeamsQuery } from "../../common/team-api";
import TeamsTable from "./teams-table";
import { useMemo, useState } from "react";
import type { ITeam } from "../../common/team-types";
import DeleteModal from "@/components/modal/delete-modal";
import { useNavigate } from "react-router-dom";

function TeamsTableContainer() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const navigate = useNavigate();
  const { data: teams, isLoading } = useGetTeamsQuery();
  const { isPending: isDeleting, mutateAsync } = useDeleteTeamMutation();
  const memoizedTeams = useMemo(() => teams?.teams || [], [teams]);

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
      <TeamsTable
        teams={memoizedTeams as ITeam[]}
        handleDeleteModalOpen={handleDeleteModalOpen}
        selectedTeamId={selectedTeamId}
        setSelectedTeamId={setSelectedTeamId}
        handleEdit={handleEdit}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        handleDelete={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
}

export default TeamsTableContainer;
