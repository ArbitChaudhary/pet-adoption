import { Router } from "express";
import {
  createUser,
  getUsers,
  sendVerificationCode,
  verifyEmail,
} from "../controllers/users.controller.ts";
import {
  forgotPassword,
  getUserProfile,
  login,
  logout,
  sendResetPasswordCode,
} from "../controllers/auth.controller.ts";
import { authenticate } from "../middlewares/authenticate.ts";

const router = Router();

router.get("/", getUsers);
router.post("/register", createUser);
router.post("/login", login);
router.get("/:userId", authenticate, getUserProfile);
router.post("/logout", authenticate, logout);
router.post("/send-verification-code", sendVerificationCode);
router.post("/verify-email", verifyEmail);
router.post("/send-reset-password-code", sendResetPasswordCode);
router.post("/forgot-password", forgotPassword);

export default router;
