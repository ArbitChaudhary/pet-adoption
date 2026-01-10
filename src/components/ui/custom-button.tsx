import { cn } from "@/lib/utils";
import { Button } from "./button";

interface CustomButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive";
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
}

const CustomButton = ({
  label,
  disabled,
  onClick,
  variant = "default",
  className,
  size = "default",
}: CustomButtonProps) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      className={cn("bg-primary", className)}
      size={size}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
