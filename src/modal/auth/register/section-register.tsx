"use client";

import Logo from "@/components/reusables/logo";
import RegisterForm, { RegisterInput } from "./register-form";

function SectionRegister() {
  const onSubmit = (data: RegisterInput) => {
    console.log(data);
  };
  return (
    <div className="">
      <div className="flex justify-center items-center mt-4 mb-8">
        <Logo />
      </div>
      <RegisterForm onSubmit={onSubmit} isLoading={false} />
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
