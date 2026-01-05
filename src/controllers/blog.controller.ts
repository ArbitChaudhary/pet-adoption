import type { Request, Response } from "express";
import { Blog } from "../models/blog.model.ts";

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    return res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
