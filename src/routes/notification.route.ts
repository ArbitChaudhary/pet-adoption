import { Router } from "express";
import { verifyAdmin } from "../middlewares/authenticate.ts";
import {
  getNotifications,
  updateNotificationById,
} from "../controllers/notification.controller.ts";

const router = Router();

router.get("/", verifyAdmin, getNotifications);
router.patch("/:id", verifyAdmin, updateNotificationById);

export default router;
