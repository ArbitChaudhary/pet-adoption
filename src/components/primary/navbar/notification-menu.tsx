import { Box, Menu, MenuItem, Skeleton } from "@mui/material";
import type { INotification } from "./common/nav-types";
import { Fragment, type Dispatch, type SetStateAction } from "react";
import { useGetNotificationsQuery } from "./common/nav-api";

interface NotificationMenuProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  open: boolean;
}

const NotificationMenu = ({
  anchorEl,
  setAnchorEl,
  open,
}: NotificationMenuProps) => {
  const { isLoading, data: notifications } = useGetNotificationsQuery();

  if (isLoading) {
    return (
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  }
  return (
    <Fragment>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: "250px",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {notifications.length === 0 ? (
          <MenuItem>No new notifications</MenuItem>
        ) : (
          <>
            {notifications.map((notification: INotification) => (
              <MenuItem
                key={notification._id}
                sx={{ whiteSpace: "wrap", width: "100%", fontSize: "14px" }}
              >
                {notification?.message}
              </MenuItem>
            ))}
          </>
        )}
      </Menu>
    </Fragment>
  );
};

export default NotificationMenu;
