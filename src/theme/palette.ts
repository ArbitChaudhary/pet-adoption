import type { PaletteOptions } from "@mui/material/styles";

export const primary = {
  main: "#3D445E",
  dark: "#454545",
  light: "#C2D2D5",
};

export const secondary = {
  main: "#F6F4F1",
  dark: "#BFA888",
  light: "#FFFFFF",
};

export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: primary,
  secondary: secondary,
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)",
  },
  background: {
    default: "#FFFFFF",
    paper: "#F6F4F1",
  },
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: primary,
  secondary: secondary,
  text: {
    primary: "#fff",
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
  },
  background: {
    paper: "#121212",
    default: "#121212",
  },
};
