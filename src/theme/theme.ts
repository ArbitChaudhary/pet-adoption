import { createTheme } from "@mui/material/styles";
import { shadows } from "./shadows";
import { darkPalette, lightPalette } from "./palette";
import type { Theme } from "@mui/material/styles";

let theme: Theme;
theme = createTheme({
  colorSchemes: { light: true, dark: true },
  palette: lightPalette,
  shadows: shadows,
});

theme = createTheme(theme, {
  colorSchemes: { light: true, dark: true },
  palette: darkPalette,
  shadows: shadows,
});
export default theme;
