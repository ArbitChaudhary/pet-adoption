import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from "../controllers/blog.controller.ts";
import { verifyAdmin } from "../middlewares/authenticate.ts";

const router = Router();

router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/", verifyAdmin, createBlog);
router.patch("/:id", verifyAdmin, updateBlog);
router.delete("/:id", verifyAdmin, deleteBlog);

export default router;
