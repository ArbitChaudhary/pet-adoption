import type { Request, Response } from "express";
import { Blog } from "../models/blog.model.ts";

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const { search = "", page = 0, limit = 20 } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const query = {
      $or: [
        { title: { $regex: search as string, $options: "i" } },
        { description: { $regex: search as string, $options: "i" } },
      ],
    };
    const total = await Blog.countDocuments(query);
    const totalPages = Math.ceil(total / limitNumber);
    const blogs = await Blog.find(query)
      .skip(pageNumber * limitNumber)
      .limit(limitNumber);
    return res.status(200).json({ blogs, total, totalPages });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Details required" });
    }
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
    if (!id) {
      return res.status(400).json({ message: "Details required" });
    }
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
    if (!id) {
      return res.status(400).json({ message: "Details required" });
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog does not exist" });
    }
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
