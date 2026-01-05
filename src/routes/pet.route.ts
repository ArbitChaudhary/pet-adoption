import { Router } from "express";
import {
  addPet,
  deletePet,
  getAllPets,
  getAvailablePets,
  getPet,
  updatePet,
} from "../controllers/pet.controller.ts";

const router = Router();

router.get("/", getAllPets);
router.get("/available", getAvailablePets);
router.get("/:id", getPet);
router.post("/", addPet);
router.patch("/:id", updatePet);
router.delete("/:id", deletePet);

export default router;
