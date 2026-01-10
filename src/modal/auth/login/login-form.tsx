"use client";
import ControlledInput from "@/components/reusables/controlled-input";
import ButtonLoading from "@/components/ui/buttons/loading-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const loginSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .email("Invalid email address"),
  password: z.string({ error: "Password is required" }),
});

export type LoginInput = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginInput) => void;
  isLoading: boolean;
}

function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <ControlledInput
          control={control}
          name="email"
          label="Email"
          type="email"
          errors={errors}
        />

        <ControlledInput
          control={control}
          name="password"
          errors={errors}
          label="Password"
          type="password"
          isPassword={true}
        />

        <ButtonLoading type="submit" isLoading={isLoading} />
      </div>
    </form>
  );
}

export default LoginForm;
