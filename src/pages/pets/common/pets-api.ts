import petApi from "@/axios/api-actions/petApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IPet, PetFormData } from "./pets-types";

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
    staleTime: Infinity,
  });
};

export const useGetPetByIdQuery = (id: string) => {
  return useQuery({
    queryKey: petsQueryKeys.detail(id),
    queryFn: async () => {
      const result = await petApi.getPetById(id);
      return result.data;
    },
    staleTime: Infinity,
  });
};

export const useAddPetMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PetFormData) => {
      const result = await petApi.addPet(data);
      return result.data;
    },
    onMutate: (newPet) => {
      queryClient.cancelQueries({ queryKey: petsQueryKeys.list() });

      const previousList = queryClient.getQueryData(petsQueryKeys.list());
      if (previousList) {
        queryClient.setQueriesData(
          { queryKey: petsQueryKeys.list() },
          (old: IPet[] | undefined) => {
            if (!old) return [newPet as IPet];
            return [...old, newPet as IPet];
          }
        );
      }
      return { previousList };
    },
    onError: (error, newPet, context) => {
      console.log("Error adding pet", error, newPet);
      if (context?.previousList) {
        queryClient.setQueryData(petsQueryKeys.list(), context.previousList);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: petsQueryKeys.list() });
    },
  });
};

export const useUpdatePetMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string; newData: PetFormData }) => {
      const result = await petApi.updatePet(data?.id, data?.newData);
      return result.data;
    },
    onMutate: (data) => {
      queryClient.cancelQueries({ queryKey: petsQueryKeys.list() });
      queryClient.cancelQueries({ queryKey: petsQueryKeys.detail(data?.id) });

      const previousList = queryClient.getQueryData(petsQueryKeys.list());
      const previousPet = queryClient.getQueryData(
        petsQueryKeys.detail(data?.id)
      );

      if (previousPet) {
        queryClient.setQueryData(petsQueryKeys.detail(data.id), {
          ...previousPet,
          ...data.newData,
        });
      }
      queryClient.setQueriesData(
        {
          queryKey: petsQueryKeys.list(),
        },
        (old: { data: IPet[] | undefined } | undefined) => {
          if (!old?.data) {
            return { data: [data.newData as IPet] };
          }
          return { data: [...old.data, data.newData as IPet] };
        }
      );
      return { previousList, previousPet, id: data.id };
    },
    onError: (err, data, context) => {
      console.log("Error updating pet:", err, data);
      queryClient.setQueryData(petsQueryKeys.list(), context?.previousList);
      queryClient.setQueryData(
        petsQueryKeys.detail(data?.id),
        context?.previousPet
      );
    },
    onSuccess: (newPet) => {
      queryClient.invalidateQueries({ queryKey: petsQueryKeys.list() });
      queryClient.invalidateQueries({
        queryKey: petsQueryKeys.detail(newPet?._id),
      });
    },
  });
};

export const useDeletePetMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const result = await petApi.deletePet(id);
      return result.data;
    },
    onMutate: (id) => {
      queryClient.cancelQueries({ queryKey: petsQueryKeys.list() });
      queryClient.cancelQueries({ queryKey: petsQueryKeys.detail(id) });

      const previousList = queryClient.getQueryData(petsQueryKeys.list());
      const previousPet = queryClient.getQueryData(petsQueryKeys.detail(id));

      if (previousList) {
        queryClient.setQueriesData(
          { queryKey: petsQueryKeys.list() },
          (old: { data: IPet[] | undefined } | undefined) => {
            if (!old?.data) return { data: [] };
            return { data: old.data.filter((pet) => pet?._id !== id) };
          }
        );
      }
      queryClient.removeQueries({ queryKey: petsQueryKeys.detail(id) });
      return { id, previousList, previousPet };
    },
    onError: (err, id, context) => {
      console.log("Error deleting pet:", err, id);
      queryClient.setQueryData(petsQueryKeys.list(), context?.previousList);
      queryClient.setQueryData(petsQueryKeys.detail(id), context?.previousPet);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: petsQueryKeys.list() });
    },
  });
};
