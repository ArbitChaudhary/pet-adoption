import { useNavigate } from "react-router-dom";
import { useAddBlogMutation } from "../../common/blog-api";
import BlogForm from "../../common/blog-form";
import type { BlogInput } from "../../common/blog-types";
import { uploadToCloudinary } from "@/config/cloudinary";

const BlogFormContainer = () => {
  const { mutateAsync, isPending } = useAddBlogMutation();
  const navigate = useNavigate();
  const onSubmit = async (data: BlogInput) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        console.log("key", key, "value", value);
        if (Array.isArray(value)) {
          const urls: string[] = [];
          for (const file of value) {
            if (file instanceof File) {
              const url = await uploadToCloudinary(file);
              urls.push(url as string);
            } else if (typeof file === "string") {
              urls.push(file); // Keep existing URL strings
            }
          }
          // Append each URL separately with the same key name
          urls.forEach((url) => {
            formData.append(key, url);
          });
        } else if (value instanceof File) {
          const url = await uploadToCloudinary(value);
          formData.append(key, url);
        } else if (value !== undefined && value !== null) {
          // Convert boolean values to strings
          if (typeof value === "boolean") {
            formData.append(key, value);
          } else {
            formData.append(key, value as string);
            console.log("object", value);
          }
        }
      }
      await mutateAsync(formData as unknown as BlogInput);
      navigate("/blogs");
      //eslint-disable-next-line
    } catch (error: any) {
      console.log(
        error?.data?.message || error?.message || "Error adding blog",
      );
    }
  };
  return (
    <>
      <BlogForm onSubmit={onSubmit} mode="add" isLoading={isPending} />
    </>
  );
};
export default BlogFormContainer;
