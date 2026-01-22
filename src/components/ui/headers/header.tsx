import { Box, Typography } from "@mui/material";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

function Header({ title, subtitle }: HeaderProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", my: 2 }}>
      <Typography variant="h6" sx={{ color: "text.primary" }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

export default Header;
