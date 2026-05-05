import { useGetOrdersQuery } from "../../common/order-api";
import OrderTable from "./order-table";
import { useMemo, useState } from "react";
import SearchBox from "@/components/reusables/search-box";
import { Box } from "@mui/material";
import StatusFilter from "./status-filter";
import UpdateStatusModal from "../../common/update-status-modal";
import { OrderDetailDialog } from "./order-detail-dialog";
import TableSkeleton from "@/components/ui/table-skeleton/table-skeleton";

const OrderContainer = () => {
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] =
    useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [paginationModel, setPaginationModel] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 0,
    pageSize: 20,
  });
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [isOrderDetailDialogOpen, setIsOrderDetailDialogOpen] =
    useState<boolean>(false);
  const filter = {
    search: searchQuery,
    page: paginationModel.page,
    limit: paginationModel.pageSize,
    status: statusFilter,
  };
  const { isLoading, data, error } = useGetOrdersQuery(filter);

  const memoizedOrders = useMemo(() => data?.orders, [data]);
  const rowCount = useMemo(() => data?.total || 0, [data]);

  const handleCloseUpdateStatusModal = () => {
    setIsUpdateStatusModalOpen(false);
  };

  const handleOpenUpdateStatusModal = (id: string) => {
    setSelectedOrderId(id);
    setIsUpdateStatusModalOpen(true);
  };

  const handleOpenOrderDetailDialog = (id: string) => {
    setSelectedOrderId(id);
    setIsOrderDetailDialogOpen(true);
  };
  const handleCloseOrderDetailDialog = () => {
    setIsOrderDetailDialogOpen(false);
  };
  if (isLoading) {
    return <TableSkeleton />;
  }
  if (error) {
    return (
      <div className="text-2xl font-semibold text-destructive">
        {error?.message}
      </div>
    );
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
        }}
      >
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <StatusFilter status={statusFilter} setStatus={setStatusFilter} />
      </Box>
      <Box sx={{ mt: 2 }} />
      <OrderTable
        orders={memoizedOrders || []}
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        handleOpenUpdateStatusModal={handleOpenUpdateStatusModal}
        handleOpenOrderDetailDialog={handleOpenOrderDetailDialog}
      />
      {isUpdateStatusModalOpen && (
        <UpdateStatusModal
          isOpen={isUpdateStatusModalOpen}
          onClose={handleCloseUpdateStatusModal}
          orderId={selectedOrderId}
        />
      )}
      {isOrderDetailDialogOpen && (
        <OrderDetailDialog
          orderId={selectedOrderId}
          isOpen={isOrderDetailDialogOpen}
          onClose={handleCloseOrderDetailDialog}
        />
      )}
    </>
  );
};

export default OrderContainer;
