import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import LoadingButtom from "../ui/buttons/loading-button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
  isLoading?: boolean;
}

const DeleteModal = ({
  isOpen,
  onClose,
  handleDelete,
  isLoading,
}: DeleteModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <Typography variant="h6" textAlign={"center"}>
          Are you sure you want to delete this?
        </Typography>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            alignItems: "center",
            mt: 3,
          }}
        >
          <LoadingButtom
            buttonText="Delete"
            isLoading={isLoading}
            onClick={handleDelete}
            disabled={isLoading}
          />
          {/* <LoadingButtom
            buttonText="Cancel"
            isLoading={isLoading}
            onClick={onClose}
          /> */}
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ minWidth: "120px" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
