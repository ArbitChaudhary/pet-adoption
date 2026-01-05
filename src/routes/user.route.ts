import { Router } from "express";
import { createUser, getUsers } from "../controllers/users.controller.ts";
import { getUserProfile, login } from "../controllers/auth.controller.ts";
import { authenticate } from "../middlewares/authenticate.ts";

const router = Router();

router.get("/", getUsers);
router.post("/register", createUser);
router.post("/login", login);
router.get("/:userId", authenticate, getUserProfile);

export default router;
