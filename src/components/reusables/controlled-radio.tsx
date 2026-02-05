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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Field, FieldContent, FieldLabel, FieldTitle } from "../ui/field";
import { StaticImageData } from "next/image";

interface ControlledRadioProps<T extends FieldValues> {
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
  radioOptions: { label: string; value: string; icon?: StaticImageData }[];
}

const ControlledRadio = <T extends FieldValues>({
  name,
  control,
  disabled,
  defaultValue,
  errors,
  label,
  radioOptions,
}: ControlledRadioProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className="relative">
          {label && <Label htmlFor={name}>{label}</Label>}
          <div className="relative w-full mt-2">
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex flex-wrap gap-3"
            >
              {radioOptions.map((option) => (
                <Field
                  key={option.value}
                  orientation={"horizontal"}
                  className="w-fit"
                >
                  <FieldLabel
                    key={option.value}
                    className="p-1 md:p-2 border border-primary/20 transition ease-in-out duration-200 rounded-lg w-fit min-w-[150px] flex items-center"
                  >
                    <RadioGroupItem
                      value={option?.value}
                      disabled={disabled}
                      className="mt-1"
                    />
                    <FieldContent>
                      <FieldTitle className="capitalize font-medium text-sm md:text-base">
                        {option.label}
                      </FieldTitle>
                    </FieldContent>
                  </FieldLabel>
                </Field>
              ))}
            </RadioGroup>
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

export default ControlledRadio;
