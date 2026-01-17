export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}
