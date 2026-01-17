"use client";
import {
  type FieldValues,
  type Control,
  type Path,
  type PathValue,
  type FieldErrors,
  Controller,
} from "react-hook-form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface ControlledTextareaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
  errors?: FieldErrors<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const ControlledTextarea = <T extends FieldValues>({
  name,
  control,
  disabled,
  defaultValue,
  errors,
  label,
  placeholder,
}: ControlledTextareaProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="relative">
          {label && <Label htmlFor={name}>{label}</Label>}
          <div className="relative w-full">
            <Textarea
              {...field}
              disabled={disabled}
              placeholder={placeholder}
              defaultValue={defaultValue}
              className="w-full mt-1.5"
            />
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

export default ControlledTextarea;
