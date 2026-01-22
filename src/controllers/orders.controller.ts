import type { Request, Response } from "express";
import { Order } from "../models/order.model.ts";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { search = "", page = 0, limit = 20, status = "" } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const query = {
      $or: [
        { userName: { $regex: search as string, $options: "i" } },
        { userEmail: { $regex: search as string, $options: "i" } },
      ],
      $and: [{ status: { $regex: status as string, $options: "i" } }],
    };
    const total = await Order.countDocuments(query);
    const totalPages = Math.ceil(total / limitNumber);

    const orders = await Order.find(query)
      .skip(pageNumber * limitNumber)
      .limit(limitNumber);
    res.status(200).json({ orders, total, totalPages });
  } catch (error) {
    console.log("Error fetching orders:", error);
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

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Order ID is required" });
    }
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!updatedOrder) {
      return res.status(500).json({ message: "Failed to update order status" });
    }
    res.status(200).json({ order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
