"use client";
import ControlledInput from "@/components/reusables/controlled-input";
import ButtonLoading from "@/components/ui/buttons/loading-button";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface GetCodeFormProps {
  setIsResetPasswordModalOpen: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
}

const GetCodeForm = ({
  setEmail,
  setIsResetPasswordModalOpen,
}: GetCodeFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSubmitEmail = (data: any) => {
    try {
      setEmail(data?.email);
      setIsResetPasswordModalOpen(true);
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
        name="email"
        type="email"
        placeholder="email address"
        required={true}
        errors={errors}
      />
      <ButtonLoading buttonText="Submit" type="submit" />
    </form>
  );
};

export default GetCodeForm;
