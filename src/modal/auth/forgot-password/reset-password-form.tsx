"use client";
import ControlledInput from "@/components/reusables/controlled-input";
import ButtonLoading from "@/components/ui/buttons/loading-button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ResetPasswordFormProps {
  email: string;
}

const ResetPasswordForm = ({ email }: ResetPasswordFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSubmitEmail = (data: any) => {
    try {
      // eslint-disable-next-line
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.message || error?.message || "Something went wrong",
      );
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitEmail)} className="space-y-5">
      <ControlledInput
        control={control}
        name="code"
        placeholder="verification code"
        required={true}
        errors={errors}
      />
      <ControlledInput
        control={control}
        name="password"
        placeholder="new password"
        required={true}
        errors={errors}
      />
      <ButtonLoading buttonText="Submit" type="submit" />
    </form>
  );
};

export default ResetPasswordForm;
