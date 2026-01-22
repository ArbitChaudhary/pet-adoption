import LoadingButtom from "@/components/ui/buttons/loading-button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import { useState, type FormEvent } from "react";
import {
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from "./order-api";
import TriangleLoader from "@/components/ui/triangle-loader";

const selectOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

const UpdateStatusModal = ({
  isOpen,
  onClose,
  orderId,
}: UpdateStatusModalProps) => {
  const { data: order, isLoading } = useGetOrderByIdQuery(orderId);
  const [status, setStatus] = useState<string>("");
  const { isPending, mutateAsync } = useUpdateOrderStatusMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync({ id: orderId, status: status as string });
      onClose();
      // eslint-disable-next-line
    } catch (error: any) {
      console.log(
        error?.data?.message || error?.message || "Something went wrong",
      );
    }
  };
  if (isLoading) {
    return <TriangleLoader />;
  }
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <DialogTitle sx={{ textAlign: "center" }}>Update Status</DialogTitle>
        <form onSubmit={handleSubmit}>
          <Select
            value={status || order?.status}
            sx={{ width: "100%" }}
            size="small"
            onChange={(e) => setStatus(e.target.value)}
          >
            {selectOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <LoadingButtom
            type="submit"
            buttonText="Update"
            isLoading={isPending}
          />
          <DialogActions></DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatusModal;
