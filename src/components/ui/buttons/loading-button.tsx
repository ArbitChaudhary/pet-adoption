import { LoaderCircle } from "lucide-react";
import { Button } from "../button";
import { cn } from "@/lib/utils";

interface IButtonLoadingProps {
  disabled?: boolean;
  buttonText?: string;
  isLoading?: boolean;
  onClick?: () => void;
  loadingText?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const ButtonLoading = ({
  disabled,
  buttonText = "Submit",
  isLoading,
  onClick,
  loadingText = "Loading...",
  type = "button",
  className,
}: IButtonLoadingProps) => {
  return (
    <Button
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
      className={cn(className)}
    >
      {isLoading && <LoaderCircle className="animate-spin" />}
      {isLoading ? `${loadingText}` : `${buttonText}`}
    </Button>
  );
};

export default ButtonLoading;
