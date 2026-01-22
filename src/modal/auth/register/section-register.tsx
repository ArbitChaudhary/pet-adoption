"use client";

import Logo from "@/components/reusables/logo";
import RegisterForm, { RegisterInput } from "./register-form";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux";
import {
  setEmail,
  setIsRegisterModalOpen,
  setIsUserVerifyModalOpen,
} from "@/redux/reducers/global-slice";
import { useRegisterUserMutation } from "@/redux/actions/auth-slice";

function SectionRegister() {
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const onSubmit = async (data: RegisterInput) => {
    try {
      await registerUser(data).unwrap();
      dispatch(setEmail(data.email));
      dispatch(setIsRegisterModalOpen(false));
      dispatch(setIsUserVerifyModalOpen(true));
      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Registration failed",
      );
    }
  };
  return (
    <div className="">
      <div className="flex justify-center items-center mt-4 mb-8">
        <Logo />
      </div>
      <RegisterForm onSubmit={onSubmit} isLoading={isLoading} />
      <div className="text-center mt-2">
        <span>
          Already have an account?{" "}
          <b className="text-primary hover:cursor-pointer">Login in</b>{" "}
        </span>
        <span className="block font-bold text-muted-foreground"> OR </span>
        <span className="text-sm text-muted-foreground ">Continue with</span>
      </div>
    </div>
  );
}

export default SectionRegister;
