import useSidebarMenu from "@/hooks/use-sidebar-menu";
import Group from "./group";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { WIDTH } from "@/constants/sidebar";
import Logo from "@/components/ui/logo/logo";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const theme = useTheme();
  const { menu } = useSidebarMenu();
  const content = menu.map((item) => {
    switch (item?.type) {
      case "group":
        return <Group key={item.label} item={item} />;
      default:
        return <Typography>Error loading menu item</Typography>;
    }
  });
  return (
    <Box sx={{ background: theme.palette.primary.main, width: WIDTH }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 3,
        }}
      >
        <Link to="/">
          <Logo />
        </Link>
      </Box>
      {content}
    </Box>
  );
};

export default Sidebar;
