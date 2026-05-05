import { api } from "../axios";

export default {
  getAnalytics() {
    return api.get("/analytics/get-analytics");
  },
};
