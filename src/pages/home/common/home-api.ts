import analyticsApi from "@/axios/api-actions/analyticsApi";
import { useQuery } from "@tanstack/react-query";

export const analyticsQueryKeys = {
  getAnalytics: ["get-analytics"] as const,
  timeseries: () => [...analyticsQueryKeys.getAnalytics, "timeseries"] as const,
};

export const useGetAnalyticsQuery = () => {
  return useQuery({
    queryKey: analyticsQueryKeys.getAnalytics,
    queryFn: async () => {
      const result = await analyticsApi.getAnalytics();
      return result.data;
    },
    staleTime: Infinity,
  });
};
