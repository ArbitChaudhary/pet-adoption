import { useForm } from "react-hook-form";
import { teamSchema, type TeamInput } from "./team-types";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledInputField from "@/components/reusables/controlled-input-field";
import { Grid } from "@mui/material";
import LoadingButtom from "@/components/ui/buttons/loading-button";
import ControlledTextEditor from "@/components/reusables/controlled-text-editor";
import ControlledPhoneInput from "@/components/reusables/controlled-phone-input";

interface TeamFormProps {
  onSubmit: (data: TeamInput) => void;
  defaultValues?: TeamInput;
  mode: "add" | "edit";
  isLoading?: boolean;
}

const TeamForm = ({
  onSubmit,
  defaultValues,
  mode = "add",
  isLoading = false,
}: TeamFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamInput>({
    resolver: zodResolver(teamSchema),
    defaultValues: defaultValues,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ControlledInputField
            control={control}
            name="name"
            label="Name"
            errors={errors}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ControlledInputField
            control={control}
            name="email"
            label="Email"
            errors={errors}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ControlledInputField
            control={control}
            name="post"
            label="Post"
            errors={errors}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ControlledInputField
            control={control}
            name="profession"
            label="Profession"
            errors={errors}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ControlledPhoneInput
            control={control}
            name="phoneNumber"
            label="Phone"
            errors={errors}
          />
        </Grid>
        <Grid size={12}>
          <ControlledTextEditor
            control={control}
            name="description"
            label="Biography"
            errors={errors}
          />
        </Grid>
        <Grid size={12}>
          <LoadingButtom
            buttonText={mode === "add" ? "Add Team" : "Save Changes"}
            isLoading={isLoading}
            type="submit"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default TeamForm;
