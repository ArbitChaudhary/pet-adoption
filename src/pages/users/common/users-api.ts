import userApi from "@/axios/api-actions/userApi";
import { useQuery } from "@tanstack/react-query";

export const userQueryKeys = {
  all: ["users"] as const,
  lists: () => [...userQueryKeys.all, "lists"] as const,
  list: (filter: string) => [...userQueryKeys.lists(), filter] as const,
  details: () => [...userQueryKeys.all, "details"] as const,
  detail: (id: string) => [...userQueryKeys.details(), id] as const,
};

export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: userQueryKeys.lists(),
    queryFn: async () => {
      const users = await userApi.getUsers();
      return users.data;
    },
  });
};
