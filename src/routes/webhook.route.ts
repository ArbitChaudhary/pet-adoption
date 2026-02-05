import { Router } from "express";
import { stripePaymentEvent } from "../controllers/webhook.controller.ts";
import express from "express";
const router = Router();

router.post(
  "/stripe-payment-event",
  express.raw({ type: "application/json" }),
  stripePaymentEvent,
);

export default router;
