"use client";
import ControlledInput from "@/components/reusables/controlled-input";
import ButtonLoading from "@/components/ui/buttons/loading-button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useAppDispatch } from "@/hooks/redux";
import { setIsForgotPasswordModalOpen } from "@/redux/reducers/global-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const emailSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .email({ error: "Invalid email address" }),
});

const verifySchema = z.object({
  code: z.string({ error: "Verification code is required" }),
  password: z.string({ error: "Password is required" }),
});
const ForgotPasswordModal = () => {
  //   const { isForgotPasswordModalOpen } = useAppSelector((state) => state.global);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  // First form for email
  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  // Second form for password reset
  const verifyForm = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
      password: "",
    },
  });

  const handleSubmitEmail = (emailData: any) => {
    try {
      console.log(emailData);
      setIsResetPasswordModalOpen(true);
      // eslint-disable-next-line
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.message || error?.message || "Something went wrong",
      );
    }
  };
  const handleResetPassword = async (data: any) => {
    console.log(data);
  };

  //   if (isResetPasswordModalOpen) {
  //     return (
  //       <Dialog
  //         open={true}
  //         onOpenChange={() => {
  //           setIsForgotPasswordModalOpen(false);
  //           dispatch(setIsForgotPasswordModalOpen(false));
  //         }}
  //       >
  //         <DialogContent>
  //           <DialogTitle>
  //             <h1 className="text-lg font-bold ">Reset Your Password</h1>
  //             <span className="block text-sm text-muted-foreground">
  //               Enter the verification code and your new password
  //             </span>
  //           </DialogTitle>
  //           <form
  //             onSubmit={verifyForm.handleSubmit(handleResetPassword)}
  //             className="space-y-5"
  //           >
  //             <ControlledInput
  //               control={verifyForm.control}
  //               name="code"
  //               type="text"
  //               placeholder="Verification Code"
  //               errors={verifyForm.formState.errors}
  //             />
  //             <ControlledInput
  //               control={verifyForm.control}
  //               name="password"
  //               placeholder="New Password"
  //               type="password"
  //               isPassword={true}
  //               errors={verifyForm.formState.errors}
  //             />
  //             <ButtonLoading buttonText="Reset Password" type="submit" />
  //           </form>
  //         </DialogContent>
  //       </Dialog>
  //     );
  //   }

  return (
    <Dialog
      open={true}
      onOpenChange={() => dispatch(setIsForgotPasswordModalOpen(false))}
    >
      <DialogContent className="overflow-auto">
        <DialogTitle>
          <h1 className="text-lg font-bold ">Get your account</h1>
          <span className="block text-sm text-muted-foreground">
            Please enter your email address
          </span>
        </DialogTitle>

        {isResetPasswordModalOpen === true ? (
          <form
            onSubmit={verifyForm.handleSubmit(handleResetPassword)}
            className="space-y-5"
          >
            <ControlledInput
              control={verifyForm.control}
              name="code"
              placeholder="Verification Code"
              errors={verifyForm.formState.errors}
            />
            <ControlledInput
              control={verifyForm.control}
              name="password"
              placeholder="New Password"
              type="password"
              isPassword={true}
              errors={verifyForm.formState.errors}
            />

            <ButtonLoading buttonText="Reset Password" type="submit" />
          </form>
        ) : (
          <form
            onSubmit={emailForm.handleSubmit(handleSubmitEmail)}
            className="space-y-5"
          >
            <ControlledInput
              control={emailForm.control}
              name="email"
              type="email"
              placeholder="email address"
              errors={emailForm.formState.errors}
            />
            <ButtonLoading buttonText="Submit" type="submit" />
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
