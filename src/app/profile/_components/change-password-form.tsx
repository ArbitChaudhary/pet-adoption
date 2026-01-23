import ControlledInput from "@/components/reusables/controlled-input";
import ButtonLoading from "@/components/ui/buttons/loading-button";
import { useAppSelector } from "@/hooks/redux";
import { useResetPasswordMutation } from "@/redux/actions/auth-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const resetSchema = z
  .object({
    oldPassword: z.string({ error: "Currrent password is required" }),
    newPassword: z.string({ error: "New password is required" }),
    confirmPassword: z.string({ error: "Please confirm your new password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password did not match",
    path: ["confirmPassword"],
  });

export type IResetSchema = z.infer<typeof resetSchema>;

const ChangePasswordForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetSchema),
  });
  const { user } = useAppSelector((state) => state.global);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const onSubmit = async (data: IResetSchema) => {
    try {
      await resetPassword({
        id: user!._id,
        formData: {
          oldPassword: data.oldPassword,
          newPassword: data?.newPassword,
        },
      }).unwrap();
      toast.success("Password reset successful");
      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Password reset failed",
      );
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-[50%]">
      <div className="flex flex-col gap-5 w-full">
        <ControlledInput
          control={control}
          name="oldPassword"
          label="Current Password"
          errors={errors}
          type="password"
        />
        <ControlledInput
          control={control}
          name="newPassword"
          label="New Password"
          errors={errors}
          type="password"
        />
        <ControlledInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          errors={errors}
          type="password"
        />
        <ButtonLoading
          buttonText="Save Change"
          type="submit"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default ChangePasswordForm;
