import teamsApi from "@/axios/api-actions/teamsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ITeam, TeamInput } from "./team-types";

export const teamsQueryKeys = {
  all: ["teams"] as const,
  lists: () => [...teamsQueryKeys.all, "list"] as const,
  list: (filter?: string) => [...teamsQueryKeys.lists(), { filter }] as const,
  details: () => [...teamsQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...teamsQueryKeys.details(), id] as const,
};

export const useGetTeamsQuery = () => {
  return useQuery({
    queryKey: teamsQueryKeys.list(),
    queryFn: async () => {
      const result = await teamsApi.getTeams();
      return result.data;
    },
  });
};
export const useGetTeamByIdQuery = (id: string) => {
  return useQuery({
    queryKey: teamsQueryKeys.detail(id),
    queryFn: async () => {
      const result = await teamsApi.getTeamById(id);
      return result.data;
    },
  });
};

export const useAddTeamMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TeamInput) => {
      const result = await teamsApi.addTeam(data);
      return result.data;
    },
    onMutate: (newTeam) => {
      queryClient.cancelQueries({ queryKey: teamsQueryKeys.list() });
      const previousTeams = queryClient.getQueryData(teamsQueryKeys.list());
      if (previousTeams) {
        queryClient.setQueryData(
          teamsQueryKeys.list(),
          (old: ITeam[] | undefined) => {
            if (!old) return [newTeam as ITeam];
            return [...old, newTeam as ITeam];
          }
        );
      }
      return { previousTeams };
    },
    onError: (err, newTeam, context) => {
      console.log("Error adding team:", err, newTeam);
      if (context?.previousTeams) {
        queryClient.setQueryData(teamsQueryKeys.list(), context.previousTeams);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamsQueryKeys.list() });
    },
  });
};

export const useDeleteTeamMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const result = await teamsApi.deleteTeam(id);
      return result.data;
    },
    onMutate: (id) => {
      queryClient.cancelQueries({ queryKey: teamsQueryKeys.list() });
      queryClient.cancelQueries({ queryKey: teamsQueryKeys.detail(id) });
      const previousList = queryClient.getQueryData(teamsQueryKeys.list());
      const previousTeam = queryClient.getQueryData(teamsQueryKeys.detail(id));

      queryClient.setQueriesData(
        { queryKey: teamsQueryKeys.list() },
        (old: { data: ITeam[] | undefined } | undefined) => {
          if (!old?.data) {
            return { data: [] };
          }
          return { data: old.data.filter((item) => item?._id !== id) };
        }
      );

      queryClient.removeQueries({ queryKey: teamsQueryKeys.detail(id) });

      return { id, previousTeam, previousList };
    },
    onError: (err, id, context) => {
      console.log("Error adding team:", err, id);
      queryClient.setQueryData(teamsQueryKeys.list(), context?.previousList);
      queryClient.setQueryData(
        teamsQueryKeys.detail(id),
        context?.previousTeam
      );
    },
    onSuccess: (_, error, id) => {
      queryClient.invalidateQueries({ queryKey: teamsQueryKeys.list() });
      if (!error) {
        queryClient.invalidateQueries({
          queryKey: teamsQueryKeys.detail(id.id),
        });
      }
    },
  });
};

export const useUpdateTeamMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string; updateData: TeamInput }) => {
      const result = await teamsApi.updateTeam(data?.id, data?.updateData);
      return result.data;
    },
    onMutate: (data) => {
      queryClient.cancelQueries({ queryKey: teamsQueryKeys.list() });
      queryClient.cancelQueries({ queryKey: teamsQueryKeys.detail(data?.id) });

      const previousList = queryClient.getQueryData(teamsQueryKeys.list());
      const previousTeam = queryClient.getQueryData(
        teamsQueryKeys.detail(data?.id)
      );

      if (previousTeam) {
        queryClient.setQueryData(teamsQueryKeys.detail(data?.id), {
          ...previousTeam,
          ...data?.updateData,
        });
      }
      queryClient.setQueriesData(
        {
          queryKey: teamsQueryKeys.list(),
        },
        (old: { data: ITeam[] | undefined } | undefined) => {
          if (!old?.data) {
            return { data: [data.updateData as ITeam] };
          }
          return {
            data: [...old.data, data.updateData as ITeam],
          };
        }
      );
      return { id: data.id, previousList, previousTeam };
    },
    onError: (error, newTeam, context) => {
      console.log("Could not update team", error, newTeam);

      queryClient.setQueryData(teamsQueryKeys.list(), context?.previousList);
      queryClient.setQueryData(
        teamsQueryKeys.detail(context?.id as string),
        context?.previousTeam
      );
    },
    onSettled: (newTeam) => {
      queryClient.invalidateQueries({ queryKey: teamsQueryKeys.list() });
      if (newTeam?.id) {
        queryClient.invalidateQueries({
          queryKey: teamsQueryKeys.detail(newTeam?.id),
        });
      }
    },
  });
};
