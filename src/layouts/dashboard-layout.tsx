import Navbar from "@/components/primary/navbar/navbar";
import Sidebar from "@/components/primary/sidebar/main";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", gap: 2 }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, mr: 2 }}>
        <Navbar />

        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
