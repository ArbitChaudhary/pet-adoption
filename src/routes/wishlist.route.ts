import { Router } from "express";
import {
  addWishlist,
  getWishlistByUser,
  removeWishlistItem,
} from "../controllers/wishlist-controller.ts";
import { authenticate } from "../middlewares/authenticate.ts";

const router = Router();

router.post("/", authenticate, addWishlist);
router.get("/:userId", authenticate, getWishlistByUser);
router.delete("/:id", authenticate, removeWishlistItem);

export default router;
