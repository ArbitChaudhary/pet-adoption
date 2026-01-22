import type { IFilter } from "@/types/common/common";
import { api } from "../axios";

export default {
  getOrders(filter: IFilter) {
    return api.get("/orders/", { params: filter });
  },
  updateStatus(id: string, status: string) {
    return api.patch(`/orders/${id}`, { status });
  },
  getOrderById(id: string) {
    return api.get(`/orders/${id}`);
  },
};
