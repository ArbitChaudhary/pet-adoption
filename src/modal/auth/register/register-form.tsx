"use client";
import ControlledInput from "@/components/reusables/controlled-input";
import ControlledPhoneInput from "@/components/reusables/controlled-phone-input";
import ButtonLoading from "@/components/ui/buttons/loading-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .min(2, "Must be at least 2 characters"),
    email: z
      .string({ error: "Email is required" })
      .email("Invalid email address"),
    phoneNumber: z.coerce.string().optional(),
    password: z
      .string({ error: "Password is required" })
      .min(6, { message: "Must be at least 6 characters" }),
    confirmPassword: z.string({ error: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password did not match!",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (data: RegisterInput) => void;
  isLoading?: boolean;
}

function RegisterForm({ onSubmit, isLoading }: RegisterFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <ControlledInput
          control={control}
          name="name"
          label="Name"
          errors={errors}
        />
        <ControlledInput
          control={control}
          name="email"
          label="Email"
          type="email"
          errors={errors}
        />
        <ControlledPhoneInput
          control={control}
          name="phoneNumber"
          errors={errors}
          label="Phone Number"
        />
        <ControlledInput
          control={control}
          name="password"
          errors={errors}
          label="Password"
          type="password"
          isPassword={true}
        />
        <ControlledInput
          control={control}
          name="confirmPassword"
          errors={errors}
          label="Confirm Password"
          type="password"
          isPassword={true}
        />
        <ButtonLoading type="submit" isLoading={isLoading} />
      </div>
    </form>
  );
}

export default RegisterForm;
