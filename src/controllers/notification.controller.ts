import type { Request, Response } from "express";
import { Notification } from "../models/notification.model.ts";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateNotificationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isSeen } = req.body;
  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    notification.isSeen = isSeen;
    await notification.save();
    res
      .status(200)
      .json({ message: "Notification updated successfully", notification });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
