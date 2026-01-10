import { LoaderCircle } from "lucide-react";
import { Button } from "../button";

interface IButtonLoadingProps {
  disabled?: boolean;
  buttonText?: string;
  isLoading?: boolean;
  onClick?: () => void;
  loadingText?: string;
  type?: "button" | "submit" | "reset";
}

const ButtonLoading = ({
  disabled,
  buttonText = "Submit",
  isLoading,
  onClick,
  loadingText = "Loading...",
  type = "button",
}: IButtonLoadingProps) => {
  return (
    <Button disabled={disabled || isLoading} onClick={onClick} type={type}>
      {isLoading && <LoaderCircle className="animate-spin" />}
      {isLoading ? `${loadingText}` : `${buttonText}`}
    </Button>
  );
};

export default ButtonLoading;
