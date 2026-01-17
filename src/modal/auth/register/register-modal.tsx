"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SectionRegister from "./section-register";
import { useAppDispatch } from "@/hooks/redux";
import { setIsRegisterModalOpen } from "@/redux/reducers/global-slice";

function RegisterModal() {
  const dispatch = useAppDispatch();
  return (
    <Dialog
      open={true}
      onOpenChange={() => dispatch(setIsRegisterModalOpen(false))}
    >
      <DialogContent className="overflow-auto">
        <SectionRegister />
      </DialogContent>
    </Dialog>
  );
}

export default RegisterModal;
