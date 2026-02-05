import { api } from "../axios";

export default {
  getNotifications() {
    return api.get("/notifications");
  },
  updateNotificationById(id: string, data: { isSeen: boolean }) {
    return api.patch(`/notifications/${id}`, data);
  },
};
