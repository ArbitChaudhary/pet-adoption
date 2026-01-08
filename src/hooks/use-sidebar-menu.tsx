import type React from "react";
import type { SvgIconProps } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import GroupIcon from "@mui/icons-material/Group";
import PetsIcon from "@mui/icons-material/Pets";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export interface SidebarMenuItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<SvgIconProps>;
  type: "item" | "collapse" | "group";
  children?: SidebarMenuItem[];
}

export default function useSidebarMenu() {
  const menu: SidebarMenuItem[] = [
    {
      label: "Dashboard",
      type: "group",
      children: [
        {
          label: "Dashboard",
          href: "/",
          type: "item",
          icon: SpeedIcon,
        },
        {
          label: "Users",
          href: "/users",
          type: "item",
          icon: GroupIcon,
        },
        {
          label: "Pets",
          href: "/pets",
          type: "item",
          icon: PetsIcon,
        },
        {
          label: "Teams",
          href: "/teams",
          type: "item",
          icon: GroupIcon,
        },
        {
          label: "Blogs",
          href: "/blogs",
          type: "item",
          icon: MenuBookIcon,
        },
      ],
    },
  ];
  return { menu };
}
