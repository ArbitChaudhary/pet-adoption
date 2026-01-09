import type { Request, Response } from "express";
import { User } from "../models/user.model.ts";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(403).json({ message: "Email already exists" });
    }
    const newUser = await User.create({ name, email, password });
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
