import orderApi from "@/axios/api-actions/orderApi";
import { useQuery } from "@tanstack/react-query";

export const orderQueryKeys = {
  all: ["orders"] as const,
  lists: () => [...orderQueryKeys.all, "list"] as const,
  list: (filters?: string) => [...orderQueryKeys.lists(), { filters }] as const,
  details: () => [...orderQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...orderQueryKeys.details(), id] as const,
};

export const useGetOrdersQuery = () => {
  return useQuery({
    queryKey: orderQueryKeys.list(),
    queryFn: async () => {
      const result = await orderApi.getOrders();
      return result.data;
    },
    staleTime: Infinity,
  });
};
