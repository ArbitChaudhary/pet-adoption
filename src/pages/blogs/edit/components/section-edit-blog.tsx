import Header from "@/components/ui/headers/header";
import EditFormContainer from "./edit-form-container";
import { useParams } from "react-router-dom";
import { useGetBlogByIdQuery } from "../../common/blog-api";
import TriangleLoader from "@/components/ui/triangle-loader";

const SectionEditBlog = () => {
  const { blogId } = useParams();
  const { data, isLoading } = useGetBlogByIdQuery(blogId as string);

  if (isLoading) {
    return <TriangleLoader />;
  }
  return (
    <>
      <Header title=" Edit Blog" />
      <EditFormContainer data={data} id={blogId as string} />
    </>
  );
};

export default SectionEditBlog;
