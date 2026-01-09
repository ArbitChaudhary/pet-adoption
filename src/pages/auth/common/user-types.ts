import z from "zod";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
}

export const loginSchema = z.object({
  email: z
    .string("Email is required")
    .email({ error: "Invalid email address" }),
  password: z.string("Password is required"),
});

export type ILoginSchema = z.infer<typeof loginSchema>;
