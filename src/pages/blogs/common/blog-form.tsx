import { useForm } from "react-hook-form";
import { blogSchema, type BlogInput, type IBlog } from "./blog-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid } from "@mui/material";
import ControlledInputField from "@/components/reusables/controlled-input-field";
import ControlledFileUpload from "@/components/reusables/controlled-file-upload";
import ControlledTextEditor from "@/components/reusables/controlled-text-editor";
import LoadingButtom from "@/components/ui/buttons/loading-button";

interface BlogFormProps {
  onSubmit: (data: BlogInput) => void;
  mode: "add" | "edit";
  isLoading?: boolean;
  initialData?: IBlog;
}
const BlogForm = ({
  onSubmit,
  mode,
  isLoading,
  initialData,
}: BlogFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledInputField
            control={control}
            name="title"
            label="Title"
            errors={errors}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledFileUpload
            control={control}
            name="photo"
            label="Upload Image"
            errors={errors}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextEditor
            control={control}
            name="description"
            label="Description"
            errors={errors}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledFileUpload
            control={control}
            name="gallery"
            label="Upload Gallery"
            errors={errors}
            multiple={true}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LoadingButtom
            buttonText={`${mode === "add" ? "Add Blog" : "Save Changes"}`}
            type="submit"
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </form>
  );
};
export default BlogForm;
