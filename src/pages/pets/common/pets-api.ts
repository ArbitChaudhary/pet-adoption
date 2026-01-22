import petApi from "@/axios/api-actions/petApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IPet, PetFormData } from "./pets-types";

export type IFilter = {
  search?: string;
  page?: string;
  limit?: string;
};

export const petsQueryKeys = {
  all: ["pets"] as const,
  lists: () => [...petsQueryKeys.all, "list"] as const,
  list: (filter?: IFilter) => [...petsQueryKeys.lists(), { filter }] as const,
  details: () => [...petsQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...petsQueryKeys.details(), id] as const,
};

export const useGetPetsQuery = (filter: IFilter) => {
  return useQuery({
    queryKey: petsQueryKeys.list(filter),
    queryFn: async () => {
      const result = await petApi.getPets(filter);
      console.log(result);
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
      queryClient.cancelQueries({ queryKey: petsQueryKeys.lists() });

      const previousList = queryClient.getQueryData(petsQueryKeys.lists());
      if (previousList) {
        queryClient.setQueriesData(
          { queryKey: petsQueryKeys.lists() },
          (old: IPet[] | undefined) => {
            if (!old) return [newPet as IPet];
            return [...old, newPet as IPet];
          },
        );
      }
      return { previousList };
    },
    onError: (error, newPet, context) => {
      console.log("Error adding pet", error, newPet);
      if (context?.previousList) {
        queryClient.setQueryData(petsQueryKeys.lists(), context.previousList);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: petsQueryKeys.lists() });
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
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: petsQueryKeys.list() });
      await queryClient.cancelQueries({
        queryKey: petsQueryKeys.detail(data?.id),
      });

      const previousList = queryClient.getQueryData(petsQueryKeys.list());
      const previousPet = queryClient.getQueryData(
        petsQueryKeys.detail(data?.id),
      );

      if (previousPet) {
        queryClient.setQueryData(petsQueryKeys.detail(data.id), {
          ...previousPet,
          ...data?.newData,
        });
      }
      queryClient.setQueriesData(
        {
          queryKey: petsQueryKeys.list(),
        },
        (old: IPet[] | undefined) => {
          if (!old) {
            return [data.newData as IPet];
          }
          return old.map((pet) =>
            pet?._id === data?.id ? { ...pet, ...data.newData } : pet,
          );
        },
      );
      return { newData: data.newData, previousList, previousPet };
    },
    onError: (err, data, context) => {
      console.log("Error updating pet:", err, data);
      queryClient.setQueryData(petsQueryKeys.list(), context?.previousList);
      queryClient.setQueryData(
        petsQueryKeys.detail(data?.id as string),
        context?.previousPet,
      );
    },
    onSuccess: (newPet) => {
      queryClient.invalidateQueries({ queryKey: petsQueryKeys.lists() });
      if (newPet)
        queryClient.invalidateQueries({
          queryKey: petsQueryKeys.detail(newPet?.pet?._id),
        });
      // queryClient.setQueryData(petsQueryKeys.detail(newPet?.data?._id), newPet);
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
      queryClient.cancelQueries({ queryKey: petsQueryKeys.lists() });
      queryClient.cancelQueries({ queryKey: petsQueryKeys.detail(id) });

      const previousList = queryClient.getQueryData(petsQueryKeys.lists());
      const previousPet = queryClient.getQueryData(petsQueryKeys.detail(id));

      if (previousList) {
        queryClient.setQueriesData(
          { queryKey: petsQueryKeys.lists() },
          (old: { data: IPet[] | undefined } | undefined) => {
            if (!old?.data) return { data: [] };
            return { data: old.data.filter((pet) => pet?._id !== id) };
          },
        );
      }
      queryClient.removeQueries({ queryKey: petsQueryKeys.detail(id) });
      return { id, previousList, previousPet };
    },
    onError: (err, id, context) => {
      console.log("Error deleting pet:", err, id);
      queryClient.setQueryData(petsQueryKeys.lists(), context?.previousList);
      queryClient.setQueryData(petsQueryKeys.detail(id), context?.previousPet);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: petsQueryKeys.lists() });
    },
  });
};
