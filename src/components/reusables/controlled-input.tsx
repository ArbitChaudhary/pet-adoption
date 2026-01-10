"use client";
import {
  type FieldValues,
  type Control,
  type Path,
  type PathValue,
  type FieldErrors,
  Controller,
} from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface ControlledInputProps<T extends FieldValues> {
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
    | "datetime-local"
    | "date"
    | "time"
    | "url";
  placeholder?: string;
  disabled?: boolean;
  isPassword?: boolean;
}

const ControlledInput = <T extends FieldValues>({
  name,
  control,
  type = "text",
  disabled,
  defaultValue,
  errors,
  label,
  placeholder,
  isPassword = false,
}: ControlledInputProps<T>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [toggleType, setToggleType] = useState<string>(type);
  const handleToggleType = (type: string) => {
    setShowPassword(!showPassword);
    setToggleType(type);
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="relative">
          {label && <Label htmlFor={name}>{label}</Label>}
          <div className="relative w-full">
            <Input
              {...field}
              type={isPassword ? toggleType : type}
              disabled={disabled}
              placeholder={placeholder}
              defaultValue={defaultValue}
              className={`w-full mt-1.5 ${isPassword ? "pr-3" : ""}`}
            />
            {isPassword && !showPassword && (
              <Eye
                className="absolute top-[50%] translate-y-[-50%] right-1 text-muted-foreground h-5 w-5"
                onClick={() => handleToggleType("text")}
              />
            )}
            {isPassword && showPassword && (
              <EyeOff
                className="absolute top-[50%] translate-y-[-50%] right-1 text-muted-foreground h-5 w-5"
                onClick={() => handleToggleType("password")}
              />
            )}
          </div>
          {errors && errors[name] && (
            <p className="text-sm text-destructive">
              {errors[name]?.message as string}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default ControlledInput;
