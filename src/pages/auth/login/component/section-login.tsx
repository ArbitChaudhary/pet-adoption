import { Box, Typography } from "@mui/material";
import LoginForm from "../../common/login-form";
import type { ILoginSchema } from "../../common/user-types";
import Logo from "@/components/ui/logo/logo";
import { useLoginMutation } from "../../common/auth-api";
import { useAppDispatch } from "@/hooks/redux";
import { setIsAuthenticated } from "@/redux/reducers/auth-slice";
import { useNavigate } from "react-router-dom";

const SectionLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useLoginMutation();
  const onSubmit = async (data: ILoginSchema) => {
    try {
      const res = await mutateAsync(data);
      if (res.user.role !== "admin") {
        throw new Error("Unauthorized");
        return;
      }
      if (res.user?.role === "admin") {
        localStorage.setItem("access_token", res.token);
        dispatch(setIsAuthenticated(true));
        navigate("/");
      }
    } catch (error) {
      console.log("Login Error", error);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          p: { xs: 2, md: 5 },
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: 2,
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Logo />
          <Typography variant="h5" fontWeight={600} color="primary.main">
            Admin Login
          </Typography>
        </Box>
        <LoginForm onSubmit={onSubmit} isLoading={isPending} />
      </Box>
    </Box>
  );
};

export default SectionLogin;
