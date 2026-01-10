"use client";

import Logo from "@/components/reusables/logo";
import LoginForm, { LoginInput } from "./login-form";

function SectionLogin() {
  const onSubmit = (data: LoginInput) => {
    console.log(data);
  };
  return (
    <div className="">
      <div className="flex justify-center items-center mt-4 mb-8">
        <Logo />
      </div>
      <LoginForm onSubmit={onSubmit} isLoading={false} />
      <div className="text-center mt-2">
        <span>
          Don&apos;t have an account?{" "}
          <b className="text-primary hover:cursor-pointer">Sign Up</b>{" "}
        </span>
        <span className="block font-bold text-muted-foreground"> OR </span>
        <span className="text-sm text-muted-foreground ">Continue with</span>
      </div>
    </div>
  );
}

export default SectionLogin;
