import type { IUser } from "@/pages/users/common/users-type";
import { api } from "../axios";
import type { IFilter } from "@/types/common/common";

export default {
  getUsers(filter: IFilter) {
    return api.get("/users", { params: filter });
  },
  registerUser(data: IUser) {
    return api.post("/users", data);
  },
  login() {
    return api.post("/users/login");
  },
};
