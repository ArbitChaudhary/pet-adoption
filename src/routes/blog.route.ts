import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from "../controllers/blog.controller.ts";

const router = Router();

router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/", createBlog);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
