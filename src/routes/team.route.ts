import { Router } from "express";
import {
  addTeamMember,
  deleteTeam,
  getTeamMemberById,
  getTeams,
  updateTeam,
} from "../controllers/team.controller.ts";
import { verifyAdmin } from "../middlewares/authenticate.ts";

const router = Router();

router.get("/", getTeams);
router.get("/:id", getTeamMemberById);
router.post("/", verifyAdmin, addTeamMember);
router.patch("/:id", verifyAdmin, updateTeam);
router.delete("/:id", verifyAdmin, deleteTeam);

export default router;
