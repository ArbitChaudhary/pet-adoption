import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import type { IOrder } from "../../common/order-types";
import { Box, IconButton, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import type { Dispatch, SetStateAction } from "react";

interface OrderTableProps {
  orders: IOrder[];
  rowCount?: number;
  paginationModel?: { page: number; pageSize: number };
  onPaginationModelChange?: Dispatch<
    SetStateAction<{ page: number; pageSize: number }>
  >;
  handleOpenUpdateStatusModal: (id: string) => void;
}

const OrderTable = ({
  orders,
  rowCount,
  paginationModel,
  onPaginationModelChange,
  handleOpenUpdateStatusModal,
}: OrderTableProps) => {
  const columns: GridColDef<IOrder>[] = [
    {
      field: "_id",
      headerName: "Order ID",
      width: 100,
      filterable: false,
      editable: false,
      sortable: false,
    },
    {
      field: "userName",
      headerName: "Name",
      width: 150,
      filterable: false,
      editable: false,
      sortable: false,
    },
    {
      field: "userEmail",
      headerName: "Email",
      width: 150,
      filterable: false,
      editable: false,
      sortable: false,
    },
    {
      field: "userPhone",
      headerName: "Phone",
      width: 120,
      filterable: false,
      editable: false,
      sortable: false,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 100,
      filterable: false,
      editable: false,
      sortable: false,
    },
    {
      field: "orders",
      headerName: "Order Items",
      width: 150,
      filterable: false,
      editable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<IOrder>) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {params.row?.orderItems?.map((item) => (
            <Typography key={item?.petId} variant="button">
              {item?.name}({item?.breed})
            </Typography>
          ))}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      filterable: false,
      editable: false,
      sortable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      headerAlign: "center",
      sortable: false,
      editable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<IOrder>) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton size="medium">
            <VisibilityIcon fontSize="medium" />
          </IconButton>
          <IconButton
            size="medium"
            onClick={() => handleOpenUpdateStatusModal(params.row?._id)}
          >
            <EditIcon fontSize="medium" />
          </IconButton>
        </Box>
      ),
    },
  ];
  return (
    <DataGrid
      rows={orders}
      columns={columns}
      getRowId={(row) => row?._id}
      rowCount={rowCount}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={onPaginationModelChange}
      pageSizeOptions={[10, 20, 40]}
      sx={{ height: "fit-content" }}
    />
  );
};

export default OrderTable;
