import blogApi from "@/axios/api-actions/blogApi";
import type { IFilter } from "@/types/common/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BlogInput, IBlog } from "./blog-types";

export const blogQueryKeys = {
  all: ["blogs"] as const,
  lists: () => [...blogQueryKeys.all, "list"] as const,
  list: (filters?: IFilter) => [...blogQueryKeys.lists(), { filters }] as const,
  details: () => [...blogQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...blogQueryKeys.details(), id] as const,
};

export const useGetBlogsQuery = (filter?: IFilter) => {
  return useQuery({
    queryKey: blogQueryKeys.list(filter),
    queryFn: async () => {
      const result = await blogApi.getBlogs(filter);
      return result.data;
    },
  });
};

export const useGetBlogByIdQuery = (id: string) => {
  return useQuery({
    queryKey: blogQueryKeys.detail(id),
    queryFn: async () => {
      const result = await blogApi.getBlogById(id);
      return result.data;
    },
    staleTime: Infinity,
  });
};

export const useAddBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: BlogInput) => {
      const result = await blogApi.addBlog(data);
      return result.data;
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: blogQueryKeys.lists() });
      const previousList = queryClient.getQueryData(blogQueryKeys.lists());

      if (previousList) {
        queryClient.setQueriesData(
          { queryKey: blogQueryKeys.lists() },
          (old: IBlog[] | undefined) => {
            // eslint-disable-next-line
            // @ts-ignore
            if (!old) return [data as IBlog];
            // eslint-disable-next-line
            // @ts-ignore
            return [...old, data as IBlog];
          },
        );
      }
      return { previousList };
    },
    onError(error, newBlog, context) {
      console.log("Error adding blog", error, newBlog);
      if (context?.previousList) {
        queryClient.setQueryData(blogQueryKeys.lists(), context?.previousList);
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.lists() });
    },
  });
};

export const useUpdateBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string; newData: BlogInput }) => {
      const result = await blogApi.updateBlog(data.id, data.newData);
      return result.data;
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: blogQueryKeys.lists() });
      await queryClient.cancelQueries({
        queryKey: blogQueryKeys.detail(data.id),
      });
      const previousList = queryClient.getQueryData(blogQueryKeys.lists());
      const previousBlog = queryClient.getQueryData(
        blogQueryKeys.detail(data.id),
      );

      if (previousBlog) {
        queryClient.setQueryData(blogQueryKeys.detail(data.id), {
          ...previousBlog,
          ...data.newData,
        });
      }
      if (previousList) {
        queryClient.setQueriesData(
          { queryKey: blogQueryKeys.lists() },
          (old: IBlog[] | undefined) => {
            // eslint-disable-next-line
            // @ts-ignore
            if (!old) return [data.newData as IBlog];
            return old.map((blog) =>
              blog._id === data?.id ? { ...blog, ...data.newData } : blog,
            );
          },
        );
      }
      return { previousList, previousBlog, newData: data.newData };
    },
    onError(error, newBlog, context) {
      console.log("Error adding blog", error, newBlog);
      if (context?.previousList) {
        queryClient.setQueryData(blogQueryKeys.lists(), context?.previousList);
      }
      if (context?.previousBlog) {
        queryClient.setQueryData(
          blogQueryKeys.detail(newBlog.id),
          context?.previousBlog,
        );
      }
    },
    onSuccess(blog) {
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: blogQueryKeys.detail(blog._id),
      });
    },
  });
};

export const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const result = await blogApi.deleteBlog(id);
      return result.data;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: blogQueryKeys.lists() });
      await queryClient.cancelQueries({
        queryKey: blogQueryKeys.detail(id),
      });
      const previousList = queryClient.getQueryData(blogQueryKeys.lists());
      const previousBlog = queryClient.getQueryData(blogQueryKeys.detail(id));

      if (previousList) {
        queryClient.setQueriesData(
          { queryKey: blogQueryKeys.lists() },
          (old: { data: IBlog[] | undefined } | undefined) => {
            if (!old?.data) return { data: [] };
            return {
              data: old.data?.filter((blog) => blog._id !== id),
            };
          },
        );
      }
      queryClient.removeQueries({ queryKey: blogQueryKeys.detail(id) });
      return { previousList, previousBlog, id };
    },
    onError(error, id, context) {
      console.log("Error adding blog", error, id);
      if (context?.previousList) {
        queryClient.setQueryData(blogQueryKeys.lists(), context?.previousList);
      }
      if (context?.previousBlog) {
        queryClient.setQueryData(
          blogQueryKeys.detail(id),
          context?.previousBlog,
        );
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.lists() });
    },
  });
};
