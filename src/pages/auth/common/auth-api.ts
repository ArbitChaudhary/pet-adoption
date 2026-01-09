import { useMutation } from "@tanstack/react-query";
import type { ILoginSchema, IUser } from "./user-types";
import { api } from "@/axios/axios";

export interface LoginResponse {
  user: IUser;
  token: string;
}

export const useLoginMutation = () => {
  return useMutation<LoginResponse, unknown, ILoginSchema>({
    mutationFn: async (data: ILoginSchema) => {
      try {
        const result = await api.post("/users/login", data);
        return result.data;
      } catch (error) {
        return error;
      }
    },
  });
};
