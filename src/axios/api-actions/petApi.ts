import type { PetFormData } from "@/pages/pets/common/pets-types";
import { api } from "../axios";
import type { IFilter } from "@/pages/pets/common/pets-api";

export default {
  getPets(filter: IFilter) {
    return api.get(
      `/pets?search=${filter.search}&page=${filter.page}&limit=${filter.limit}`,
    );
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
