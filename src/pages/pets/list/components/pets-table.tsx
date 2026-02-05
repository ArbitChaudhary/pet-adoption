import { DataGrid } from "@mui/x-data-grid";
import type { IPet } from "../../common/pets-types";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { Dispatch, SetStateAction } from "react";
import { useTheme } from "@mui/material/styles";

interface PetsTableProps {
  pets: IPet[];
  setSelectedPetId: Dispatch<SetStateAction<string>>;
  handleOpenDeleteDialog: () => void;
  handlePetEdit: (petId: string) => void;
  paginationModel: { pageSize: number; page: number };
  onPaginationModelChange: Dispatch<
    SetStateAction<{ pageSize: number; page: number }>
  >;
  rowCount?: number;
}

const PetsTable = ({
  pets,
  setSelectedPetId,
  handleOpenDeleteDialog,
  handlePetEdit,
  paginationModel,
  onPaginationModelChange,
  rowCount,
}: PetsTableProps) => {
  const theme = useTheme();
  const columns: GridColDef<IPet>[] = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      headerAlign: "center",
      align: "center",

      renderCell: (params: GridRenderCellParams<IPet>) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={params.value}
            alt={params.row.breed}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "4px",
            }}
          />
        </Box>
      ),
    },
    {
      field: "breed",
      headerName: "Breed",
      width: 250,
      headerAlign: "center",
      align: "center",
      sortable: true,
      editable: false,
      filterable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
      headerAlign: "center",
      align: "center",
      sortable: true,
      editable: false,
      filterable: true,
    },
    {
      field: "age",
      headerName: "Age",
      width: 100,
      headerAlign: "center",
      align: "center",
      sortable: true,
      editable: false,
      filterable: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      headerAlign: "center",
      align: "center",
      sortable: true,
      editable: false,
      filterable: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
      headerAlign: "center",
      align: "center",
      sortable: true,
      editable: false,
      filterable: true,
    },
    {
      field: "totalQuantity",
      headerName: "Quantity",
      width: 100,
      headerAlign: "center",
      align: "center",
      sortable: true,
      editable: false,
      filterable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<IPet>) => (
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
              onClick={() => {
                // setSelectedPetId(params.row._id);
                handlePetEdit(params.row._id);
              }}
            />
          </IconButton>
          <IconButton size="medium">
            <DeleteIcon
              fontSize="medium"
              sx={{ color: "error.main" }}
              onClick={() => {
                handleOpenDeleteDialog();
                setSelectedPetId(params.row._id);
              }}
            />
          </IconButton>
        </Box>
      ),
    },
  ];
  return (
    <DataGrid
      rows={pets}
      getRowId={(row) => row?._id}
      columns={columns}
      rowCount={rowCount}
      // initialState={{
      //   // ...pets,
      //   pagination: { paginationModel: { pageSize: 2 } },
      // }}
      pageSizeOptions={[5]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={onPaginationModelChange}
      sx={{
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
          // maxHeight: "40px",
        },
      }}
    />
  );
};

export default PetsTable;
