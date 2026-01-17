"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import SectionLogin from "./section-login";
import { useAppDispatch } from "@/hooks/redux";
import { setIsLoginModalOpen } from "@/redux/reducers/global-slice";

function LoginModal() {
  const dispatch = useAppDispatch();
  return (
    <Dialog
      open={true}
      onOpenChange={() => dispatch(setIsLoginModalOpen(false))}
    >
      <DialogContent className="overflow-auto">
        <DialogTitle></DialogTitle>
        <SectionLogin />
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
