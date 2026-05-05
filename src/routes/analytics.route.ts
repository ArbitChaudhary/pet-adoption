import { Router } from "express";
import { verifyAdmin } from "../middlewares/authenticate.ts";
import {
  getAnalytics,
  getOrdersTimeseries,
} from "../controllers/analytics.controller.ts";

const router = Router();

router.get("/get-analytics", getAnalytics);
router.get("/timeseries", getOrdersTimeseries);

export default router;
