import * as z from "zod";

export interface ITeam {
  _id: string;
  name: string;
  description: string;
  post: string;
  profession: string;
  profileImage: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export const teamSchema = z.object({
  name: z.string("Name is required").min(2, "Must be at least 2 characters"),
  description: z
    .string("Description is required")
    .min(1, "Description is required"),
  post: z.string().optional(),
  profession: z.string().optional(),
  profileImage: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
});

export type TeamInput = z.infer<typeof teamSchema>;
