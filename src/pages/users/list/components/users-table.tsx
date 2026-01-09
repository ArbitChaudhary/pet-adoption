import { DataGrid } from "@mui/x-data-grid";
import type { IUser } from "../../common/users-type";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Avatar, Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface UserTableProps {
  users: IUser[];
}

const columns: GridColDef<IUser>[] = [
  {
    field: "profilePicture",
    headerName: "Image",
    editable: false,
    sortable: false,
    filterable: false,
    width: 100,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => <Avatar src={params.value} alt={params.row.name} />,
  },
  {
    field: "name",
    headerName: "Name",
    editable: false,
    sortable: false,
    filterable: false,
    width: 250,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "email",
    headerName: "Email",
    editable: false,
    sortable: false,
    filterable: false,
    width: 250,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "actions",
    headerName: "Actions",
    editable: false,
    sortable: false,
    filterable: false,
    width: 200,
    headerAlign: "center",
    align: "center",
    renderCell: (params: GridRenderCellParams<IUser>) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          height: "100%",
          width: "100%",
        }}
      >
        <IconButton size="medium">
          <VisibilityIcon fontSize="medium" sx={{ color: "primary.main" }} />
        </IconButton>
      </Box>
    ),
  },
];

export default function UsersTable({ users }: UserTableProps) {
  return (
    <DataGrid
      rows={users}
      getRowId={(row) => row._id}
      columns={columns}
      sx={{ width: "fit-content" }}
      pagination
      pageSizeOptions={[10, 20, 30]}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      disableRowSelectionOnClick
    />
  );
}
