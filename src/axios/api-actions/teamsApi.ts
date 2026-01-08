import type { TeamInput } from "@/pages/teams/common/team-types";
import { api } from "../axios";

export default {
  getTeams() {
    return api.get("/teams");
  },
  getTeamById(id: string) {
    return api.get(`/teams/${id}`);
  },
  addTeam(data: TeamInput) {
    return api.post("/teams", data);
  },
  updateTeam(id: string, data: TeamInput) {
    return api.patch(`/teams/${id}`, data);
  },
  deleteTeam(id: string) {
    return api.delete(`/teams/${id}`);
  },
};
