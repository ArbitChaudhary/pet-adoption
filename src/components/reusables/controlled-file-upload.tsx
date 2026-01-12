import { Box, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import {
  type FieldValues,
  type Control,
  type Path,
  type PathValue,
  type FieldErrors,
  Controller,
} from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useTheme } from "@mui/material/styles";

type FileOrString = File | string;

interface ControlledFileUploadProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
  errors?: FieldErrors<T>;
  label?: string;
  disabled?: boolean;
  multiple?: boolean;
}

const ControlledFileUpload = <T extends FieldValues>({
  name,
  control,
  disabled,
  defaultValue,
  errors,
  label,
  multiple,
}: ControlledFileUploadProps<T>) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | string[]>("");
  const theme = useTheme();
  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };
  const handleRemoveImage = () => {};

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...rest } }) => {
        const files = Array.isArray(value)
          ? (value as FileOrString[])
          : value
          ? ([value] as FileOrString[])
          : ([] as FileOrString[]);

        const handleFileChange = (
          event: React.ChangeEvent<HTMLInputElement>
        ) => {
          const files = event.target.files;

          if (files && files.length > 0) {
            if (!multiple) {
              const url = URL.createObjectURL(files[0]);
              setPreviewUrl(url);
              onChange(files?.[0]);
            }
            if (multiple) {
              const urls: string[] = [];
              for (let i = 0; i < files.length; i++) {
                const url = URL.createObjectURL(files[i]);
                urls.push(url);
              }
              setPreviewUrl(urls);
              onChange(files ? Array.from(files) : []);
            }
          }
        };
        return (
          <Box>
            {label && <label htmlFor={name}>{label}</label>}
            <TextField
              {...rest}
              // onChange={(e) =>
              //   handleFileChange(e as React.ChangeEvent<HTMLInputElement>)
              // }
              onChange={handleFileChange}
              inputRef={fileRef}
              type={"file"}
              disabled={disabled}
              defaultValue={defaultValue}
              size="small"
              inputProps={{ multiple: multiple }}
              sx={{
                width: "100%",
                display: "none",
              }}
            />
            <Box
              sx={{
                p: 2,
                border: `1px solid ${theme.palette.primary.light}`,
                borderRadius: 1,
                mb: 1,
              }}
            >
              <Box
                sx={{
                  padding: 2,
                  borderRadius: 1,
                  border: ` 2px dashed ${theme.palette.primary.light}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <CloudUploadOutlinedIcon
                  fontSize="large"
                  sx={{ color: theme.palette.primary.dark, cursor: "pointer" }}
                  onClick={handleClick}
                />
                <Typography
                  variant="caption"
                  color={theme.palette.success.main}
                >
                  Click to upload file
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {files.length > 0 && (
                <>
                  {files.map((file, index) => (
                    <Box key={index}>
                      {file instanceof File ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt=""
                          style={{ width: "100px", height: "100px" }}
                        />
                      ) : (
                        <img
                          src={file}
                          alt=""
                          style={{ width: "100%", height: "100px" }}
                        />
                      )}
                    </Box>
                  ))}
                </>
              )}
            </Box>
            {errors && errors[name] && (
              <Typography variant="body2" color="error">
                {errors[name]?.message as string}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
};

export default ControlledFileUpload;
