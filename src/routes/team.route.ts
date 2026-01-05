import { Router } from "express";
import {
  addTeamMember,
  deleteTeam,
  getTeams,
  updateTeam,
} from "../controllers/team.controller.ts";

const router = Router();

router.get("/", getTeams);
router.post("/", addTeamMember);
router.patch("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
