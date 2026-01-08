import { DataGrid } from "@mui/x-data-grid";
import type { ITeam } from "../../common/team-types";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { Dispatch, SetStateAction } from "react";

interface TeamsTableProps {
  teams: ITeam[];
  handleDeleteModalOpen: () => void;
  selectedTeamId: string;
  setSelectedTeamId: Dispatch<SetStateAction<string>>;
  handleEdit: (id: string) => void;
}

export default function TeamsTable({
  teams,
  handleDeleteModalOpen,
  setSelectedTeamId,
  handleEdit,
}: TeamsTableProps) {
  const columns: GridColDef<ITeam>[] = [
    {
      field: "profileImage",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <img
            src={params.value}
            alt={params.row.name}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "4px",
            }}
          />
        </Box>
      ),
      filterable: false,
      editable: false,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "post",
      headerName: "Post",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      editable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<ITeam>) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <IconButton size="medium">
            <VisibilityIcon fontSize="medium" sx={{ color: "primary.main" }} />
          </IconButton>
          <IconButton size="medium">
            <EditIcon
              fontSize="medium"
              sx={{ color: "warning.main" }}
              onClick={() => handleEdit(params?.row?._id)}
            />
          </IconButton>
          <IconButton size="medium">
            <DeleteIcon
              fontSize="medium"
              sx={{ color: "error.main" }}
              onClick={() => {
                handleDeleteModalOpen();
                setSelectedTeamId(params?.row?._id);
              }}
            />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <DataGrid
      rows={teams}
      getRowId={(row) => row._id}
      columns={columns}
      disableRowSelectionOnClick
    />
  );
}
