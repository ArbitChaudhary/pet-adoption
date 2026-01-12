import z from "zod";

export interface IPet {
  _id: string;
  name: string;
  breed: string;
  category: string;
  age: number;
  description: string;
  image: string;
  price: number;
  discount?: number;
  discountType?: "percentage" | "amount";
  isAvailable: boolean;
  gender: string;
  gallery?: string[];
  dimension: string;
  disabled?: boolean;
  disability?: string;
  enableDiscount?: boolean;
  createdAt: string;
  updatedAt: string;
}

// form validation schema
export const petSchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters"),
  breed: z
    .string("Breed is required")
    .min(2, "Breed must be at least 2 characters"),
  category: z.string("Category is required").min(1, "Category is required"),
  age: z.coerce
    .number({ error: "Age must be a number" })
    .min(0, "Age cannot be negative"),
  gender: z.string().optional(),
  dimension: z.string({ error: "Dimension is required" }),
  image: z.union([
    z.string({ error: "Image is required" }),
    z.instanceof(File, { message: "Image is required" }),
  ]),
  description: z.string().optional(),
  disabled: z.boolean().optional(),
  disability: z.string().optional(),
  isAvailable: z.boolean().default(true),
  gallery: z.array(z.union([z.string(), z.instanceof(File)])).optional(),
  price: z.coerce
    .number({ error: "Price must be a number" })
    .min(0, "Price cannot be negative"),
  discount: z.coerce
    .number({ error: "Discount must be a number" })
    .min(0, "Discount cannot be negative")
    .optional(),
  discountType: z.string().optional(),
  enableDiscount: z.boolean().optional(),
});

export type PetFormData = z.infer<typeof petSchema>;
