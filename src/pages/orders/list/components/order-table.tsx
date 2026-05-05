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
import { shadows } from "@/theme/shadows";
import {
  getOrderPaymentStatusBgColor,
  getOrderStatusBgColor,
} from "@/libs/order-status";

interface OrderTableProps {
  orders: IOrder[];
  rowCount?: number;
  paginationModel?: { page: number; pageSize: number };
  onPaginationModelChange?: Dispatch<
    SetStateAction<{ page: number; pageSize: number }>
  >;
  handleOpenUpdateStatusModal: (id: string) => void;
  handleOpenOrderDetailDialog: (id: string) => void;
}

const OrderTable = ({
  orders,
  rowCount,
  paginationModel,
  onPaginationModelChange,
  handleOpenUpdateStatusModal,
  handleOpenOrderDetailDialog,
}: OrderTableProps) => {
  const columns: GridColDef<IOrder>[] = [
    {
      field: "_id",
      headerName: "Order ID",
      width: 100,
      filterable: false,
      editable: false,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "userName",
      headerName: "Name",
      width: 150,
      filterable: false,
      editable: false,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "userEmail",
      headerName: "Email",
      width: 150,
      filterable: false,
      editable: false,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "userPhone",
      headerName: "Phone",
      width: 120,
      filterable: false,
      editable: false,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 100,
      filterable: false,
      editable: false,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      filterable: false,
      editable: false,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<IOrder>) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              px: 2,
              borderRadius: 3,
              boxShadow: shadows[2],
              color: "white",
              bgcolor: getOrderPaymentStatusBgColor(params?.value),
              textTransform: "capitalize",
              fontSize: "14px",
            }}
          >
            {params?.value}
          </Typography>
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
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<IOrder>) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              px: 2,
              borderRadius: 3,
              boxShadow: shadows[2],
              color: "white",
              bgcolor: getOrderStatusBgColor(params?.value),
              textTransform: "capitalize",
              fontSize: "14px",
            }}
          >
            {params?.value}
          </Typography>
        </Box>
      ),
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
          <IconButton
            size="medium"
            onClick={() => handleOpenOrderDetailDialog(params.row?._id)}
          >
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
      sx={{
        height: "fit-content",
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        },
      }}
    />
  );
};

export default OrderTable;
