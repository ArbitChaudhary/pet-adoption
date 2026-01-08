import type { SidebarMenuItem } from "@/hooks/use-sidebar-menu";
import Collapse from "./collapse";
import Item from "./item";
import { Box } from "@mui/material";

interface GroupProps {
  item: SidebarMenuItem;
}
export default function Group({ item }: GroupProps) {
  const content = item?.children?.map((item) => {
    switch (item?.type) {
      case "collapse":
        return <Collapse key={item?.label} item={item} />;
      case "item":
        return <Item key={item?.label} item={item} />;
      default:
        return null;
    }
  });
  return <Box>{content}</Box>;
}
