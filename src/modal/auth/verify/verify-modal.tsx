"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  setIsUserVerifyModalOpen,
  setUser,
} from "@/redux/reducers/global-slice";
import z from "zod";
import VerifyForm, { verifySchema } from "./verify-form";
import ButtonLoading from "@/components/ui/buttons/loading-button";
import { useVerifyEmailMutation } from "@/redux/actions/auth-slice";
import { toast } from "sonner";

const UserVerifyModal = () => {
  const { isUserVerifyModalOpen, email } = useAppSelector(
    (state) => state.global,
  );
  const dispatch = useAppDispatch();

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const onSubmit = async (code: z.infer<typeof verifySchema>) => {
    try {
      const res = await verifyEmail({
        email,
        verificationCode: code.code,
      }).unwrap();
      console.log("Verification Response:", res);
      dispatch(setUser(res.user));
      toast.success("Welcome!");
      dispatch(setIsUserVerifyModalOpen(false));
      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Verification failed",
      );
    }
  };

  return (
    <Dialog
      open={isUserVerifyModalOpen}
      onOpenChange={() => dispatch(setIsUserVerifyModalOpen(false))}
    >
      <DialogContent>
        <DialogTitle className="">
          <span className="block text-center font-bold text-lg">
            Check Your Email
          </span>
          <span className="block text-muted-foreground text-sm mt-1 text-center">
            Please enter the verification code sent to you email
          </span>
        </DialogTitle>
        <VerifyForm onSubmit={onSubmit} isLoading={isLoading} />
        <DialogFooter className="flex flex-col gap-0 justify-center">
          <ButtonLoading
            buttonText="Re-send code"
            type="button"
            className="w-full"
            isLoading={isLoading}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserVerifyModal;
