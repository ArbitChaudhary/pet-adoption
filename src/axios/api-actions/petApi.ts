import { api } from "../axios";

export default {
  getPets() {
    return api.get("/pets");
  },
  getPetById(id: string) {
    return api.get(`/pets/${id}`);
  },
  addPet(data: any) {
    return api.post("/pets", data);
  },
  updatePet(id: string, data: any) {
    return api.patch(`/pets/${id}`, data);
  },
};
