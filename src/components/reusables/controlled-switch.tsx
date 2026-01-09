import { shadows } from "@/theme/shadows";
import { Box, Switch, Typography } from "@mui/material";
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form";

interface ControlledSwitchProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
  label?: string;
  disabled?: boolean;
  description?: string;
  errors?: FieldErrors<T>;
}

const ControlledSwitch = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  label,
  disabled,
  description,
  errors,
}: ControlledSwitchProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      render={({ field }) => (
        <>
          <Box
            sx={{
              width: "100%",
              boxShadow: shadows[1],
              p: { xs: 1, sm: 2 },
              borderRadius: 1,
              mt: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="button">{label}</Typography>
                <Typography variant="caption">{description}</Typography>
              </Box>
              <Switch
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                disabled={disabled}
              />
            </Box>
          </Box>
          {errors && errors[name] && (
            <Typography variant="body2" color="error.main">
              {errors[name]?.message as string}
            </Typography>
          )}
        </>
      )}
    />
  );
};

export default ControlledSwitch;
