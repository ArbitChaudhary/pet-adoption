import type { Dispatch, SetStateAction } from "react";
import type { IBlog } from "../../common/blog-types";
import {
  DataGrid,
  type GridCellParams,
  type GridColDef,
} from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface BlogTableProps {
  blogs: IBlog[];
  rowCount?: number;
  handleDeleteBlog?: (id: string) => void;
  handleEditBlog?: (id: string) => void;
  paginationModel?: { page: number; pageSize: number };
  onPaginationModelChange?: Dispatch<
    SetStateAction<{ page: number; pageSize: number }>
  >;
}

const BlogTable = ({
  blogs,
  rowCount,
  handleDeleteBlog,
  paginationModel,
  onPaginationModelChange,
  handleEditBlog,
}: BlogTableProps) => {
  const columns: GridColDef<IBlog>[] = [
    {
      field: "photo",
      headerName: "Photo",
      width: 70,
      filterable: false,
      editable: false,
      sortable: false,
      renderCell: (params: GridCellParams<IBlog>) => (
        <img
          src={params.value as string}
          alt={params.row.title}
          style={{ width: "60px", height: "60px" }}
        />
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 300,
      sortable: false,
      editable: false,
      filterable: false,
    },
    {
      field: "description",
      headerName: "Description",
      width: 500,
      sortable: false,
      editable: false,
      filterable: false,
      renderCell: (params: GridCellParams<IBlog>) => (
        // <Typography>{params.value as string}</Typography>
        <div dangerouslySetInnerHTML={{ __html: params.value as string }} />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params: GridCellParams<IBlog>) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            height: "100%",
            width: "100%",
          }}
        >
          <IconButton size="small">
            <VisibilityIcon fontSize="small" sx={{ color: "primary.main" }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleEditBlog?.(params.row._id)}
          >
            <EditIcon fontSize="small" sx={{ color: "warning.main" }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDeleteBlog?.(params.row._id)}
          >
            <DeleteIcon fontSize="small" sx={{ color: "error.main" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <DataGrid
      rows={blogs}
      columns={columns}
      getRowId={(row) => row?._id}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={onPaginationModelChange}
      rowCount={rowCount}
      pageSizeOptions={[10, 20, 40]}
      disableRowSelectionOnClick
      sx={{
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: "primary.main",
          color: "white",
        },
      }}
    />
  );
};

export default BlogTable;
