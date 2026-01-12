import { Grid } from "@mui/material";
import { petSchema, type IPet, type PetFormData } from "./pets-types";
import { useForm } from "react-hook-form";
import ControlledInputField from "@/components/reusables/controlled-input-field";
import LoadingButtom from "@/components/ui/buttons/loading-button";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledTextEditor from "@/components/reusables/controlled-text-editor";
import ControlledSwitch from "@/components/reusables/controlled-switch";
import ControlledSelect from "@/components/reusables/controlled-select";
import ControlledFileUpload from "@/components/reusables/controlled-file-upload";

interface PetFormProps {
  onSubmit: (data: PetFormData) => void;
  mode: "add" | "edit";
  initialData?: IPet;
  isLoading?: boolean;
}

const PetForm = ({
  onSubmit,
  mode = "add",
  initialData,
  isLoading = false,
}: PetFormProps) => {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(petSchema), defaultValues: initialData });
  const hasDisability = watch("disabled");
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <ControlledInputField
            control={control}
            name="name"
            label="Name"
            errors={errors}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <ControlledInputField
            control={control}
            name="breed"
            label="Breed"
            errors={errors}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <ControlledInputField
            control={control}
            name="category"
            label="Category"
            errors={errors}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <ControlledInputField
            control={control}
            name="age"
            label="Age"
            errors={errors}
            type="number"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <ControlledSelect
            control={control}
            name="gender"
            label="Gender"
            errors={errors}
            selectOptions={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <ControlledInputField
            control={control}
            name="dimension"
            label="Dimension"
            errors={errors}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <ControlledFileUpload
            control={control}
            name="image"
            label="Image URL"
            errors={errors}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 8 }}>
          <ControlledTextEditor
            control={control}
            name="description"
            label="Description"
            errors={errors}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <ControlledSwitch
            control={control}
            name="disabled"
            label="Is Disabled?"
            errors={errors}
          />
        </Grid>
        {hasDisability && (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <ControlledInputField
              control={control}
              name="disability"
              label="Disability"
              errors={errors}
            />
          </Grid>
        )}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <ControlledSwitch
            control={control}
            name="isAvailable"
            label="Is Available?"
            errors={errors}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <ControlledInputField
            control={control}
            name="price"
            label="Price"
            errors={errors}
            type="number"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <ControlledInputField
            control={control}
            name="discount"
            label="Discount "
            errors={errors}
            type="number"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <ControlledSelect
            control={control}
            name="discountType"
            label="Discount Type"
            errors={errors}
            selectOptions={[
              { value: "amount", label: "Amount" },
              { value: "percentage", label: "Percentage" },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <ControlledSwitch
            control={control}
            name="enableDiscount"
            label="Enable Discount?"
            errors={errors}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <ControlledFileUpload
            control={control}
            name="gallery"
            label="Gallery"
            errors={errors}
            multiple={true}
          />
        </Grid>

        <Grid size={12}>
          <LoadingButtom
            buttonText={mode === "add" ? "Add Pet" : "Update Pet"}
            isLoading={isLoading}
            type="submit"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default PetForm;
