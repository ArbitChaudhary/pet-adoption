import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import DetailsIcon from "@mui/icons-material/Details";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useGetOrderByIdQuery } from "../../common/order-api";
import TriangleLoader from "@/components/ui/triangle-loader";
import { useMemo } from "react";
import type { IOrder } from "../../common/order-types";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { formateDate } from "@/libs/date-format";

interface IOrderDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export const OrderDetailDialog: React.FC<IOrderDetailDialogProps> = ({
  isOpen,
  onClose,
  orderId,
}) => {
  const theme = useTheme();
  const { data, isLoading } = useGetOrderByIdQuery(orderId);
  const memoizedOrder = useMemo(() => data as IOrder, [data]);
  const orderLength = memoizedOrder?.orderItems.length || 0;
  // Component implementation goes here
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          bgcolor: theme.palette.primary.main,
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DetailsIcon />
          <Box>
            <Typography fontWeight={600}>Order Details</Typography>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.grey[400],
                textTransform: "capitalize",
                borderRadius: "20px",
                border: "1px solid white",
                px: 2,
                mt: "-20px",
              }}
            >
              {memoizedOrder?.status}{" "}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon
            fontSize="medium"
            sx={{ color: theme.palette.grey[200] }}
          />
        </IconButton>
      </DialogTitle>
      {isLoading ? (
        <TriangleLoader />
      ) : (
        <DialogContent>
          <Box mt={2}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <PermIdentityIcon sx={{ color: theme.palette.grey[600] }} />
              <Typography variant="body2" fontWeight={600}>
                Customer Information
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid
                  size={{ xs: 12, sm: 6 }}
                  sx={{ display: "flex", gap: 2, alignItems: "center" }}
                >
                  <PermIdentityIcon
                    fontSize="small"
                    sx={{ color: theme.palette.grey[500] }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.palette.grey[600] }}
                    >
                      Name
                    </Typography>
                    <Typography variant="body2">
                      {memoizedOrder?.userName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 6 }}
                  sx={{ display: "flex", gap: 2, alignItems: "center" }}
                >
                  <MailOutlineIcon
                    fontSize="small"
                    sx={{ color: theme.palette.grey[500] }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.palette.grey[600] }}
                    >
                      Email
                    </Typography>
                    <Typography variant="body2">
                      {memoizedOrder?.userEmail}
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  size={{ xs: 12 }}
                  sx={{ display: "flex", gap: 2, alignItems: "center" }}
                >
                  <LocalPhoneIcon
                    fontSize="small"
                    sx={{ color: theme.palette.grey[500] }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.palette.grey[600] }}
                    >
                      Phone
                    </Typography>
                    <Typography variant="body2">
                      {memoizedOrder?.userPhone}
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  size={{ xs: 12 }}
                  sx={{ display: "flex", gap: 2, alignItems: "center" }}
                >
                  <LocationOnIcon
                    fontSize="small"
                    sx={{ color: theme.palette.grey[500] }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.palette.grey[600] }}
                    >
                      Address
                    </Typography>
                    <Typography variant="body2">
                      {memoizedOrder?.userAddress}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <DetailsIcon sx={{ color: theme.palette.grey[600] }} />
              <Typography variant="body2" fontWeight={600}>
                Order Items ({orderLength})
              </Typography>
            </Box>
            <Box sx={{ p: 2, display: "grid", gap: 1 }}>
              {memoizedOrder?.orderItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <img
                      src={item?.image}
                      alt={item?.name}
                      width={50}
                      height={50}
                      style={{ borderRadius: "4px" }}
                    />
                    <Box>
                      <Box sx={{ display: "flex", gap: 3 }}>
                        <Typography
                          variant="subtitle2"
                          textTransform={"capitalize"}
                        >
                          {item?.name}
                        </Typography>
                        <Typography
                          textTransform={"capitalize"}
                          sx={{
                            borderRadius: "20px",
                            boxShadow: theme.shadows[3],
                            px: 1.5,
                            fontSize: "12px",
                          }}
                        >
                          {item?.gender}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Typography
                          variant="caption"
                          textTransform={"capitalize"}
                          sx={{ color: theme.palette.grey[600] }}
                        >
                          {item?.category}
                        </Typography>
                        <Typography
                          variant="caption"
                          textTransform={"capitalize"}
                          sx={{ color: theme.palette.grey[600] }}
                        >
                          {item?.breed}
                        </Typography>
                        <Typography
                          variant="caption"
                          textTransform={"capitalize"}
                          sx={{ color: theme.palette.grey[600] }}
                        >
                          {item?.age} yrs
                        </Typography>
                        <Typography
                          variant="caption"
                          textTransform={"capitalize"}
                          sx={{ color: theme.palette.grey[600] }}
                        >
                          {item?.dimension}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ color: theme.palette.primary.main }}
                  >
                    ${item?.price}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <CreditCardIcon sx={{ color: theme.palette.grey[600] }} />
            <Typography variant="body2" fontWeight={600}>
              Order Summary
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: theme.palette.grey[600] }}
              >
                Subtotal
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                ${memoizedOrder?.totalAmount}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: theme.palette.grey[600] }}
              >
                Shipping
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: theme.palette.success.light, fontWeight: 600 }}
              >
                Free
              </Typography>
            </Box>
            <Divider sx={{ mt: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{}}>
                Total
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: theme.palette.primary.dark, fontWeight: 600 }}
              >
                ${memoizedOrder?.totalAmount}
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={3}>
            <Grid
              size={{ xs: 12, sm: 6 }}
              sx={{ display: "flex", gap: 2, alignItems: "center" }}
            >
              <DateRangeIcon
                fontSize="small"
                sx={{ color: theme.palette.grey[600] }}
              />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.grey[600], display: "block" }}
                >
                  Order Placed
                </Typography>
                <Typography variant="body2" sx={{}}>
                  {formateDate(memoizedOrder?.createdAt)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      )}
    </Dialog>
  );
};
