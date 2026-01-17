import { Router } from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/orders.controller.ts";

const router = Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.patch("/:id", updateOrderStatus);

export default router;
