import notificationApi from "@/axios/api-actions/notificationApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { INotification } from "./nav-types";

export const notificationQueryKeys = {
  all: ["notifications"] as const,
  lists: () => [...notificationQueryKeys.all, "list"] as const,
  details: () => [...notificationQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...notificationQueryKeys.details(), id] as const,
};

export const useGetNotificationsQuery = () => {
  return useQuery({
    queryKey: notificationQueryKeys.lists(),
    queryFn: async () => {
      const result = await notificationApi.getNotifications();
      return result.data;
    },
    staleTime: Infinity,
  });
};

export const useUpdateNotificationByIdMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { isSeen: boolean }) => {
      const result = await notificationApi.updateNotificationById(id, data);
      return result.data;
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: notificationQueryKeys.lists(),
      });

      const previousList = queryClient.getQueryData(
        notificationQueryKeys.lists(),
      );
      const previousNotification = queryClient.getQueryData(
        notificationQueryKeys.detail(id),
      );

      if (previousNotification) {
        queryClient.setQueryData(notificationQueryKeys.detail(id), {
          ...previousNotification,
          ...data,
        });
      }
      if (previousList) {
        queryClient.setQueriesData(
          { queryKey: notificationQueryKeys.lists() },
          (old: { data: INotification[] | undefined } | undefined) => {
            if (!old?.data) return old;
            return {
              ...old,
              data: old.data.map((notification) =>
                notification._id === id
                  ? { ...notification, isSeen: data.isSeen }
                  : notification,
              ),
            };
          },
        );
      }
      return { previousList, previousNotification, data };
    },
    onError: (error, data, context) => {
      console.log("Reverting due to error", error, data);
      queryClient.setQueryData(
        notificationQueryKeys.lists(),
        context?.previousList,
      );
      queryClient.setQueryData(
        notificationQueryKeys.detail(id),
        context?.previousNotification,
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.detail(data?.data?._id),
      });
    },
  });
};
