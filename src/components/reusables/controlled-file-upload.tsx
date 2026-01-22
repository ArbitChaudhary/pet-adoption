import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useRef } from "react";
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
import AddIcon from "@mui/icons-material/Add";

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
  const theme = useTheme();
  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

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
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          const files = event.target.files;

          if (files && files.length > 0) {
            if (!multiple) {
              onChange(files?.[0]);
            }
            if (multiple) {
              const existingFiles = Array.isArray(value) ? value : [];
              onChange([...existingFiles, ...Array.from(files)]);
            }
          }
          if (fileRef.current) {
            fileRef.current.value = "";
          }
        };

        // handle remove image with index
        const handleRemoveImage = (index: number) => {
          // files.filter((file) => file !== files[index]);\
          files.splice(index, 1);
          onChange(files);
          console.log("files after removal", files);
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
                    <Box
                      key={index}
                      sx={{ position: "relative", width: "fit-content" }}
                    >
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
                          style={{ width: "100px", height: "100px" }}
                        />
                      )}
                      <CloseIcon
                        onClick={() => handleRemoveImage(index)}
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          cursor: "pointer",
                          zIndex: 2,
                          borderRadius: "50%",
                          backgroundColor: "white",
                          color: theme.palette.error.main,
                          fontSize: "20px",
                          p: "2px",
                        }}
                      />
                    </Box>
                  ))}
                  {multiple && files.length > 0 && (
                    <Box
                      sx={{
                        position: "relative",
                        width: "100px",
                        height: "100px",
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          // position: "absolute",
                          inset: 0,
                          zIndex: 1,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <IconButton size="large" onClick={handleClick}>
                          <AddIcon
                            fontSize="large"
                            sx={{ color: theme.palette.success.main }}
                          />
                        </IconButton>
                        <Typography
                          variant="caption"
                          color={theme.palette.success.main}
                        >
                          Upload More
                        </Typography>
                      </Box>
                    </Box>
                  )}
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
