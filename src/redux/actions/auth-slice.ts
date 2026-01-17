import { RegisterInput } from "@/modal/auth/register/register-form";
import { api } from "./api";
import { IUser } from "@/types/user-types";
import { LoginInput } from "@/modal/auth/login/login-form";

interface LoginResponse {
  user: IUser;
  token: string;
}

const authSlice = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<IUser, RegisterInput>({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: { user: IUser }, meta, arg) =>
        response.user,
      invalidatesTags: ["User"],
    }),
    loginUser: build.mutation<LoginResponse, LoginInput>({
      query: (loginData) => ({
        url: "/users/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authSlice;
