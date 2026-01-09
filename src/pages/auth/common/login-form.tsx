import { Box, Grid } from "@mui/material";
import { loginSchema, type ILoginSchema } from "./user-types";
import ControlledInputField from "@/components/reusables/controlled-input-field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButtom from "@/components/ui/buttons/loading-button";

interface LoginFormProps {
  onSubmit: (data: ILoginSchema) => void;
  isLoading?: boolean;
}

const LoginForm = ({ onSubmit, isLoading = false }: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <ControlledInputField
              control={control}
              name="email"
              placeholder="Email"
              type="email"
              errors={errors}
            />
          </Grid>
          <Grid size={12}>
            <ControlledInputField
              control={control}
              name="password"
              placeholder="Password"
              type="password"
              errors={errors}
            />
          </Grid>
          <Grid size={12}>
            <LoadingButtom
              buttonText="Login"
              isLoading={isLoading}
              type="submit"
              width={"100%"}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default LoginForm;
