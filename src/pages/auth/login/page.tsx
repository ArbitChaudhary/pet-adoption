import { Box } from "@mui/material";
import SectionLogin from "./component/section-login";

const LoginPage = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url(/login-bg.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          background: "#00000050",
        }}
      />
      <SectionLogin />
    </Box>
  );
};

export default LoginPage;
