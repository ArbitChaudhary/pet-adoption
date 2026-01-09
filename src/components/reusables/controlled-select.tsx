import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form";

interface ControlledSelectProps<T extends FieldValues> {
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
  disabled?: boolean;
  selectOptions: { value: string; label: string }[];
}

const ControlledSelect = <T extends FieldValues>({
  name,
  control,
  disabled,
  defaultValue,
  errors,
  label,
  selectOptions,
}: ControlledSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Box>
          {label && <label htmlFor={name}>{label}</label>}
          <FormControl fullWidth>
            <Select
              size="small"
              {...field}
              disabled={disabled}
              defaultValue={defaultValue}
            >
              <MenuItem value="">
                <em>--Select</em>
              </MenuItem>
              {selectOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {errors && errors[name] && (
            <Typography color="error.main" variant="body2">
              {errors[name]?.message as string}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

export default ControlledSelect;
