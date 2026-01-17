import { Router } from "express";
import {
  addPet,
  deletePet,
  getAllPets,
  getAvailablePets,
  getPet,
  updatePet,
} from "../controllers/pet.controller.ts";
import { verifyAdmin } from "../middlewares/authenticate.ts";

const router = Router();

router.get("/", getAllPets);
router.get("/available", getAvailablePets);
router.get("/:id", getPet);
router.post("/", verifyAdmin, addPet);
router.patch("/:id", verifyAdmin, updatePet);
router.delete("/:id", verifyAdmin, deletePet);

export default router;
