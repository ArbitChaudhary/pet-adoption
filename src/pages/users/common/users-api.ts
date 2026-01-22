import userApi from "@/axios/api-actions/userApi";
import type { IFilter } from "@/types/common/common";
import { useQuery } from "@tanstack/react-query";

export const userQueryKeys = {
  all: ["users"] as const,
  lists: () => [...userQueryKeys.all, "lists"] as const,
  list: (filter: IFilter) => [...userQueryKeys.lists(), { filter }] as const,
  details: () => [...userQueryKeys.all, "details"] as const,
  detail: (id: string) => [...userQueryKeys.details(), id] as const,
};

export const useGetUsersQuery = (filter: IFilter) => {
  return useQuery({
    queryKey: userQueryKeys.list(filter),
    queryFn: async () => {
      const users = await userApi.getUsers(filter);
      return users.data;
    },
  });
};
