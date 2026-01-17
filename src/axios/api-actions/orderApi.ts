import { api } from "../axios";

export default {
  getOrders() {
    return api.get("/orders");
  },
  createOrder(data: any) {
    return api.post("/orders", data);
  },
  updateStatus(id: string, status: string) {
    return api.patch(`/orders/${id}`, { status });
  },
};
