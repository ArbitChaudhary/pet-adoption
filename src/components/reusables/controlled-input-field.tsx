import { Box, TextField, Typography } from "@mui/material";
import {
  type FieldValues,
  type Control,
  type Path,
  type PathValue,
  type FieldErrors,
  Controller,
} from "react-hook-form";
interface ControlledInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
  errors?: FieldErrors<T>;
  label?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "datetme-local"
    | "date"
    | "time"
    | "url";
  placeholder?: string;
  disabled?: boolean;
}

const ControlledInputField = <T extends FieldValues>({
  name,
  control,
  type = "text",
  disabled,
  defaultValue,
  errors,
  label,
  placeholder,
}: ControlledInputFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Box>
          {label && <label htmlFor={name}>{label}</label>}
          <TextField
            {...field}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            defaultValue={defaultValue}
            size="small"
            sx={{
              width: "100%",
            }}
          />
          {errors && errors[name] && (
            <Typography variant="body2" color="error">
              {errors[name]?.message as string}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

export default ControlledInputField;
