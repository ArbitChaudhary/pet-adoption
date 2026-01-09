import type { ILoginSchema } from "@/pages/auth/common/user-types";
import { api } from "../axios";

export default {
  login(data: ILoginSchema) {
    return api.post("/users/login", data);
  },
};
