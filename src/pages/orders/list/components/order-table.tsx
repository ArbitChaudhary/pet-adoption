import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import type { IOrder } from "../../common/order-types";
import { Box, IconButton, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

interface OrderTableProps {
  orders: IOrder[];
}

const OrderTable = ({ orders }: OrderTableProps) => {
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
      width: 200,
      filterable: false,
      editable: false,
      sortable: false,
    },
    {
      field: "userEmail",
      headerName: "Email",
      width: 200,
      filterable: false,
      editable: false,
      sortable: false,
    },
    {
      field: "userPhone",
      headerName: "Phone",
      width: 150,
      filterable: false,
      editable: false,
      sortable: false,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 150,
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
          <IconButton size="medium">
            <EditIcon fontSize="medium" />
          </IconButton>
        </Box>
      ),
    },
  ];
  return (
    <DataGrid rows={orders} columns={columns} getRowId={(row) => row?._id} />
  );
};

export default OrderTable;
