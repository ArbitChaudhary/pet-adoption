import type { SidebarMenuItem } from "@/hooks/use-sidebar-menu";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";

interface ItemProps {
  item: SidebarMenuItem;
}
function Item({ item }: ItemProps) {
  const theme = useTheme();
  const location = useLocation();
  const Icon = item?.icon;
  const menuIcon = Icon ? <Icon fontSize="small" /> : null;
  const href = item.href ?? "/";

  return (
    <MenuItem
      component={Link}
      to={href}
      selected={location.pathname === href}
      sx={{
        padding: "12px 20px",
        color: "white",
        "&.Mui-selected": {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.text.secondary,
          "&:hover": {
            background: theme.palette.primary.light,
          },
        },
      }}
    >
      <ListItemIcon>{menuIcon}</ListItemIcon>
      <ListItemText primary={item.label} />
    </MenuItem>
  );
}

export default Item;
