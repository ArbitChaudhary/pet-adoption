import { IPet } from "@/app/pets/(pets)/_common/pet-types";

export interface IWishlistItem {
  _id: string;
  userId: string;
  petId: IPet;
  createdAt: string;
  updatedAt: string;
}
