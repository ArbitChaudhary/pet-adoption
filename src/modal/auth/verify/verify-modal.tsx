"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setIsUserVerifyModalOpen } from "@/redux/reducers/global-slice";
import z from "zod";
import VerifyForm, { verifySchema } from "./verify-form";
import ButtonLoading from "@/components/ui/buttons/loading-button";

const UserVerifyModal = () => {
  const { isUserVerifyModalOpen } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  const onSubmit = async (code: z.infer<typeof verifySchema>) => {
    console.log("Code", code);
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
        <VerifyForm onSubmit={onSubmit} isLoading={false} />
        <DialogFooter className="flex flex-col gap-0 justify-center">
          <ButtonLoading
            buttonText="Re-send code"
            type="button"
            className="w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserVerifyModal;
