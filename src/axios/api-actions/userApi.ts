import type { IUser } from "@/pages/users/common/users-type";
import { api } from "../axios";

export default {
  getUsers() {
    return api.get("/users/");
  },
  registerUser(data: IUser) {
    return api.post("/users", data);
  },
  login() {
    return api.post("/users/login");
  },
};
