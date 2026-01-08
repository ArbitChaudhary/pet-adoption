export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}
