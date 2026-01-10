"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SectionRegister from "./section-register";

function RegisterModal() {
  return (
    <Dialog open={true}>
      <DialogContent className="overflow-auto">
        <SectionRegister />
      </DialogContent>
    </Dialog>
  );
}

export default RegisterModal;
