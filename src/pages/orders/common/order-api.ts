import orderApi from "@/axios/api-actions/orderApi";
import type { IFilter } from "@/types/common/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IOrder } from "./order-types";

export const orderQueryKeys = {
  all: ["orders"] as const,
  lists: () => [...orderQueryKeys.all, "list"] as const,
  list: (filter?: IFilter) => [...orderQueryKeys.lists(), { filter }] as const,
  details: () => [...orderQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...orderQueryKeys.details(), id] as const,
};

export const useGetOrdersQuery = (filter: IFilter) => {
  return useQuery({
    queryKey: orderQueryKeys.list(filter),
    queryFn: async () => {
      const result = await orderApi.getOrders(filter);
      return result.data;
    },
    // staleTime: Infinity,
  });
};

export const useGetOrderByIdQuery = (id: string) => {
  return useQuery({
    queryKey: orderQueryKeys.detail(id),
    queryFn: async () => {
      const result = await orderApi.getOrderById(id);
      return result.data;
    },
    staleTime: Infinity,
  });
};

// export const useUpdateOrderStatusMutation = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async ({ id, status }: { id: string; status: string }) => {
//       const result = await orderApi.updateStatus(id, status);
//       return result.data;
//     },
//     onMutate: async (data) => {
//       await queryClient.cancelQueries({ queryKey: orderQueryKeys.list() });
//       await queryClient.cancelQueries({
//         queryKey: orderQueryKeys.detail(data.id),
//       });
//       const previousList = await queryClient.getQueryData(
//         orderQueryKeys.list(),
//       );
//       const previousOrder = await queryClient.getQueryData(
//         orderQueryKeys.detail(data.id),
//       );

//       if (previousOrder) {
//         queryClient.setQueryData<IOrder>(
//           orderQueryKeys.detail(data.id),
//           (old) => (old ? { ...old, status: data.status } : old),
//         );
//       }
//       queryClient.setQueriesData(
//         { queryKey: orderQueryKeys.list() },
//         (old: IOrder[] | undefined) => {
//           if (!old) {
//             return [];
//           }
//           return old.map((order) => {
//             console.log("Updating Order", order);
//             return order._id === data.id
//               ? { ...order, status: data.status }
//               : order;
//           });
//         },
//       );
//       return { previousList, previousOrder, status: data.status };
//     },
//     onError: (err, data, context) => {
//       console.log("Error updating order status:", err, data);
//       queryClient.setQueryData(orderQueryKeys.list(), context?.previousList);
//       queryClient.setQueryData(
//         orderQueryKeys.detail(data.id),
//         context?.previousOrder,
//       );
//     },
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({
//         queryKey: orderQueryKeys.list(),
//       });
//       queryClient.invalidateQueries({
//         queryKey: orderQueryKeys.detail(data.order?._id),
//       });
//     },
//   });
// };

export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const result = await orderApi.updateStatus(id, status);
      return result.data;
    },
    onMutate: async (data) => {
      // Cancel all order-related queries to prevent race conditions
      await queryClient.cancelQueries({ queryKey: orderQueryKeys.all });

      // Get previous data for rollback
      const previousOrder = queryClient.getQueryData<IOrder>(
        orderQueryKeys.detail(data.id),
      );

      // Optimistically update the specific order detail
      if (previousOrder) {
        queryClient.setQueryData<IOrder>(
          orderQueryKeys.detail(data.id),
          //eslint-disable-next-line
          // @ts-ignore
          (old) => (old ? { ...old, status: data.status } : old),
        );
      }

      // Optimistically update ALL order lists (with or without filters)
      queryClient.setQueriesData<{ data: IOrder[] }>(
        { queryKey: orderQueryKeys.lists() },
        //eslint-disable-next-line
        // @ts-ignore
        (old) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((order) =>
              order._id === data.id ? { ...order, status: data.status } : order,
            ),
          };
        },
      );

      return { previousOrder };
    },
    onError: (err, data, context) => {
      console.error("Error updating order status:", err);

      // Rollback the specific order detail
      if (context?.previousOrder) {
        queryClient.setQueryData(
          orderQueryKeys.detail(data.id),
          context.previousOrder,
        );
      }

      // Rollback all order lists
      queryClient.invalidateQueries({ queryKey: orderQueryKeys.lists() });
    },
    //eslint-disable-next-line
    onSettled: (data, error, variables) => {
      // Always invalidate on completion to ensure fresh data
      queryClient.invalidateQueries({ queryKey: orderQueryKeys.all });
    },
    onSuccess: (data) => {
      console.log("Order status updated successfully:", data);
      // You can also update the cache with the returned data
      if (data) {
        queryClient.setQueryData(orderQueryKeys.detail(data._id), data);
      }
    },
  });
};
