import type { PetFormData } from "@/pages/pets/common/pets-types";
import { api } from "../axios";

export default {
  getPets() {
    return api.get("/pets");
  },
  getPetById(id: string) {
    return api.get(`/pets/${id}`);
  },
  addPet(data: PetFormData) {
    return api.post("/pets", data);
  },
  updatePet(id: string, data: PetFormData) {
    return api.patch(`/pets/${id}`, data);
  },
  deletePet(id: string) {
    return api.delete(`/pets/${id}`);
  },
};
