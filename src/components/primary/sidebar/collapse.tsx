import type { SidebarMenuItem } from "@/hooks/use-sidebar-menu";
import {
  Collapse,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import Group from "./group";
import Item from "./item";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";

interface CollapseProps {
  item: SidebarMenuItem;
}
function MenuCollapse({ item }: CollapseProps) {
  const [open, setOpen] = useState<boolean>(false);
  const Icon = item?.icon;
  const MenuIcon = Icon ? <Icon fontSize="small" /> : null;
  const content = item?.children?.map((item) => {
    switch (item?.type) {
      case "group":
        return <Group key={item.label} item={item} />;
      case "collapse":
        return <MenuCollapse key={item.label} item={item} />;
      case "item":
        return <Item key={item?.label} item={item} />;
      default:
        return <Typography>Error loading menu item</Typography>;
    }
  });
  return (
    <MenuList>
      <MenuItem>
        <ListItemIcon>{MenuIcon}</ListItemIcon>
        <ListItemText primary={item?.label} />
        {open ? (
          <ArrowDropUpIcon fontSize="small" onClick={() => setOpen(false)} />
        ) : (
          <ArrowDropDownIcon fontSize="small" onClick={() => setOpen(true)} />
        )}
      </MenuItem>
      <Collapse in={open} timeout={"auto"} unmountOnExit>
        {content}
      </Collapse>
    </MenuList>
  );
}

export default MenuCollapse;
