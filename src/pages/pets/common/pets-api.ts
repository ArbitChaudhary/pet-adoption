import petApi from "@/axios/api-actions/petApi";
import { useQuery } from "@tanstack/react-query";

export const petsQueryKeys = {
  all: ["pets"] as const,
  lists: () => [...petsQueryKeys.all, "list"] as const,
  list: (filter?: string) => [...petsQueryKeys.lists(), filter] as const,
  details: () => [...petsQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...petsQueryKeys.details(), id] as const,
};

export const useGetPetsQuery = () => {
  return useQuery({
    queryKey: petsQueryKeys.list(),
    queryFn: async () => {
      const result = await petApi.getPets();
      return result.data;
    },
  });
};
