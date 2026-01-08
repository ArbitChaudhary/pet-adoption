import { Box, Button, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useTheme } from "@mui/material/styles";
import PetsTableContainer from "./pets-table-container";

const SectionPetsList = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <Button
          variant="outlined"
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <AddBoxIcon fontSize="small" />
          <Typography>New Pet</Typography>
        </Button>
      </Box>
      <PetsTableContainer />
    </Box>
  );
};

export default SectionPetsList;
