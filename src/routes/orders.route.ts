import { Router } from "express";
import {
  createCheckoutSession,
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
} from "../controllers/orders.controller.ts";
import { verifyAdmin } from "../middlewares/authenticate.ts";

const router = Router();

router.get("/", verifyAdmin, getOrders);
router.post("/", createOrder);
router.patch("/:id", updateOrderStatus);
router.get("/:id", getOrderById);
router.post("/create-checkout-session", createCheckoutSession);

export default router;
