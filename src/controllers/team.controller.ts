import type { Request, Response } from "express";
import { Team } from "../models/team.model.ts";

export const getTeams = async (req: Request, res: Response) => {
  try {
    const { search = "", page = 0, limit = 20 } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const query = {
      $or: [
        { name: { $regex: search as string, $options: "i" } },
        { email: { $regex: search as string, $options: "i" } },
        { phoneNumber: { $regex: search as string, $options: "i" } },
      ],
    };
    const total = await Team.countDocuments(query);
    const teams = await Team.find(query)
      .skip(pageNumber * limitNumber)
      .limit(limitNumber);
    res.status(200).json({
      total: total,
      totalPages: Math.ceil(total / limitNumber),
      currentPage: pageNumber,
      teams: teams,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const addTeamMember = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber } = req.body;
    if (email && phoneNumber) {
      const existingMember = await Team.findOne({
        $or: [{ email }, { phoneNumber }],
      });
      if (existingMember) {
        return res.status(400).json({
          message:
            "Team member with given email or phone nnumber already exists",
        });
      }
    }
    const newMember = new Team(req.body);
    await newMember.save();
    res.status(201).json({ newMember });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await Team.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Team member not found" });
    }
    const updatedUser = await Team.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await Team.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Team member not found" });
    }
    await Team.findByIdAndDelete(id);
    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getTeamMemberById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await Team.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
