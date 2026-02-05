import { Badge } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import NotificationMenu from "./notification-menu";

const socket = io("http://localhost:8080", {
  transports: ["websocket", "polling"],
});
const Notifications = () => {
  const theme = useTheme();
  const [notificationCount, setNotificationCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    const handleNewOrder = (data: { message: string }) => {
      console.log("New order notification received:", data);
      // alert(data?.message);
      setNotificationCount((prev) => prev + 1);
    };
    socket.on("new_order", handleNewOrder);

    return () => {
      socket.off("new_order", handleNewOrder);
    };
  }, []);
  return (
    <Badge
      badgeContent={notificationCount}
      color="error"
      // sx={{
      //   "& .MuiBadge-badge": {
      //     right: 2,
      //     top: 5,
      //   },
      // }}
    >
      <NotificationsNoneIcon
        component={"svg"}
        // eslint-disable-next-line
        // @ts-ignore
        onClick={(e: React.MouseEvent<HTMLElement>) =>
          setAnchorEl(e?.currentTarget)
        }
        sx={{
          color: theme.palette.primary.contrastText,
          cursor: "pointer",
        }}
      />
      <NotificationMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        open={open}
      />
    </Badge>
  );
};

export default Notifications;
