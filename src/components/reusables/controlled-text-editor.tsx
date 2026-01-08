import { Box, Typography } from "@mui/material";
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface ControlledTextEditorProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  errors?: FieldErrors<T>;
  disabled?: boolean;
}

const isQuillEmpty = (value: string): boolean => {
  if (!value) return true;
  // Remove HTML tags and check if only whitespace remains
  const strippedValue = value.replace(/<(.|\n)*?>/g, "").trim();
  return strippedValue.length === 0;
};

const ControlledTextEditor = <T extends FieldValues>({
  control,
  name,
  label,
  errors,
  disabled,
}: ControlledTextEditorProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Box>
          {label && <label htmlFor={name}>{label}</label>}
          <ReactQuill
            disabled={disabled}
            {...field}
            theme="snow"
            onChange={(content) => {
              // Convert "empty" Quill content to empty string
              field.onChange(isQuillEmpty(content) ? "" : content);
            }}
          />
          {errors && errors[name] && (
            <Typography variant="body2" sx={{ color: "error.main" }}>
              {errors[name]?.message as string}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

export default ControlledTextEditor;
