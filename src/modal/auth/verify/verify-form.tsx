import ButtonLoading from "@/components/ui/buttons/loading-button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export const verifySchema = z.object({
  code: z.string().length(5, "Code must be 5 characters long"),
});

interface VerifyFormProps {
  onSubmit: (code: z.infer<typeof verifySchema>) => void;
  isLoading: boolean;
}
const VerifyForm = ({ onSubmit, isLoading }: VerifyFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(verifySchema) });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full gap-3 flex-col justify-center items-center"
    >
      <Controller
        control={control}
        name="code"
        render={({ field }) => {
          return (
            <>
              <InputOTP {...field} maxLength={5}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                </InputOTPGroup>
              </InputOTP>
              {errors.code && (
                <p className="text-sm text-destructive mt-1">
                  {errors?.code?.message}
                </p>
              )}
            </>
          );
        }}
      />
      <ButtonLoading
        type="submit"
        isLoading={isLoading}
        className="w-full"
        buttonText="Submit"
      />
    </form>
  );
};

export default VerifyForm;
