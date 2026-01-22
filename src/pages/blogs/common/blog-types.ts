import z from "zod";

export interface IBlog {
  _id: string;
  title: string;
  description: string;
  gallery: string[];
  author?: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

export const blogSchema = z.object({
  title: z.string({ error: "Title is required" }),
  description: z.string({ error: "Description is required" }),
  photo: z.union([
    z.string({ error: "Image is required" }),
    z.instanceof(File, { message: "Must be a file" }),
  ]),
  gallery: z
    .array(z.union([z.string().optional(), z.instanceof(File).optional()]))
    .optional(),
});

export type BlogInput = z.infer<typeof blogSchema>;
