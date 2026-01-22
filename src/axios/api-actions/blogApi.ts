import type { BlogInput } from "@/pages/blogs/common/blog-types";
import { api } from "../axios";
import type { IFilter } from "@/types/common/common";

export default {
  getBlogs(filter?: IFilter) {
    return api.get("/blogs", { params: filter });
  },
  getBlogById(id: string) {
    return api.get(`/blogs/${id}`);
  },
  addBlog(data: BlogInput) {
    return api.post("/blogs", data);
  },
  updateBlog(id: string, data: BlogInput) {
    return api.patch(`/blogs/${id}`, data);
  },
  deleteBlog(id: string) {
    return api.delete(`/blogs/${id}`);
  },
};
