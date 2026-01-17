import type { Request, Response } from "express";
import { Order } from "../models/order.model.ts";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    res.status(201).json({ order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
