"use client";

import Logo from "@/components/reusables/logo";
import LoginForm, { LoginInput } from "./login-form";
import { useLoginUserMutation } from "@/redux/actions/auth-slice";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux";
import {
  setIsLoginModalOpen,
  setIsRegisterModalOpen,
  setUser,
} from "@/redux/reducers/global-slice";

function SectionLogin() {
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const onSubmit = async (data: LoginInput) => {
    try {
      const response = await loginUser(data).unwrap();

      if (response.token) {
        localStorage.setItem("access_token", response.token);
      }
      dispatch(setUser(response.user));
      dispatch(setIsLoginModalOpen(false));
    } catch (error) {
      console.log("Login Error:", error);
      toast.error(error?.data?.message as string);
    }
  };

  const handleSignUp = () => {
    dispatch(setIsLoginModalOpen(false));
    dispatch(setIsRegisterModalOpen(true));
  };
  return (
    <div className="">
      <div className="flex justify-center items-center mt-4 mb-8">
        <Logo />
      </div>
      <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
      <div className="text-center mt-2">
        <span>
          Don&apos;t have an account?{" "}
          <b
            onClick={handleSignUp}
            className="text-primary hover:cursor-pointer"
          >
            Sign Up
          </b>{" "}
        </span>
        <span className="block font-bold text-muted-foreground"> OR </span>
        <span className="text-sm text-muted-foreground ">Continue with</span>
      </div>
    </div>
  );
}

export default SectionLogin;
