import { Button, CircularProgress } from "@mui/material";

interface LoadingButtonProps {
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  buttonText: string;
  type?: "button" | "submit" | "reset";
}

const LoadingButtom = ({
  isLoading,
  onClick,
  disabled,
  buttonText,
  type = "button",
}: LoadingButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
      sx={{
        minWidth: "120px",
      }}
      size="medium"
    >
      {isLoading && (
        <CircularProgress size={20} sx={{ color: "primary.dark" }} />
      )}
      {isLoading ? "Loading..." : buttonText}
    </Button>
  );
};

export default LoadingButtom;
