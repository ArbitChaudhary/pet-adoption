"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SectionLogin from "./section-login";

function LoginModal() {
  return (
    <Dialog open={true}>
      <DialogContent className="overflow-auto">
        <SectionLogin />
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
