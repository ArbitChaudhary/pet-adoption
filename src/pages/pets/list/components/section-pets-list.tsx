import { Box, Button, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useTheme } from "@mui/material/styles";
import PetsTableContainer from "./pets-table-container";
import { useNavigate } from "react-router-dom";

const SectionPetsList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <Button
          variant="outlined"
          onClick={() => navigate("/pets/add")}
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
