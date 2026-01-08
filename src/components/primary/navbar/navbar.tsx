import { Badge, Box, Typography } from "@mui/material";
import { useColorScheme, useTheme } from "@mui/material/styles";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function Navbar() {
  const theme = useTheme();
  const { setMode } = useColorScheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.main,
        p: 1,
        position: "relative",
        my: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color={theme.palette.primary.contrastText}>
          Navbar
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Badge
            badgeContent={2}
            color="error"
            // sx={{
            //   "& .MuiBadge-badge": {
            //     right: 2,
            //     top: 5,
            //   },
            // }}
          >
            <NotificationsNoneIcon
              sx={{
                color: theme.palette.primary.contrastText,
                cursor: "pointer",
              }}
            />
          </Badge>
          {theme.palette.mode === "light" ? (
            <DarkModeIcon
              sx={{
                color: theme.palette.primary.contrastText,
                cursor: "pointer",
              }}
              onClick={() => setMode("dark")}
            />
          ) : (
            <LightModeIcon
              onClick={() => setMode("light")}
              sx={{
                color: theme.palette.primary.contrastText,
                cursor: "pointer",
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
