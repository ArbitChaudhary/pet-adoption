import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Label } from "../ui/label";

interface ControlledPhoneInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  errors?: FieldErrors<T>;
  label?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "datetme-local"
    | "date"
    | "time"
    | "url";
  disabled?: boolean;
}

const ControlledPhoneInput = <T extends FieldValues>({
  name,
  control,
  disabled,
  errors,
  label,
}: ControlledPhoneInputProps<T>) => {
  return (
    <>
      <style>
        {`
        .phone-input{
        padding: 10px;
         border: 1px solid #a4a9b0ff;
            border-radius: 4px;

        }
            .phone-input-input {
            outline: none;
            border: none;
            }

            .phone-input:hover {
            border-color: #000000;
            }
            .phone-input:focus-within {
            border-color: #000000;
            box-shadow: 0 0 0 1px #3D445E;
            }
        
            `}
      </style>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div>
            {label && <Label htmlFor={name}>{label}</Label>}
            <PhoneInput
              {...field}
              disabled={disabled}
              defaultCountry="NP"
              limitMaxLength={true}
              maxLength={14}
              autoComplete="on"
              //   style={{
              //     border: "1px solid black",
              //     padding: "10px",
              //     borderRadius: "4px",
              //   }}
              className=" mt-1.5 p-1.5 rounded-sm border border-solid-[#a4a9b0ff]"
              // inputComponent={}
              numberInputProps={{
                className: "phone-input-input",
              }}
            />
            {errors && errors[name] && (
              <p className="text-sm text-destructive">
                {errors[name]?.message as string}
              </p>
            )}
          </div>
        )}
      />
    </>
  );
};

export default ControlledPhoneInput;
