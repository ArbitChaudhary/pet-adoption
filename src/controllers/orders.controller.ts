import type { Request, Response } from "express";
import { Order, type IOrderItem } from "../models/order.model.ts";
import Stripe from "stripe";
import { Pet } from "../models/pet.model.ts";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-12-15.clover",
});

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
      $nor: [{ paymentMethod: "stripe", paymentStatus: "pending" }],
    };
    const total = await Order.countDocuments(query);
    const totalPages = Math.ceil(total / limitNumber);

    const orders = await Order.find(query)
      .skip(pageNumber * limitNumber)
      .limit(limitNumber);
    res.status(200).json({ orders, total, totalPages });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { orderItems, totalAmount } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const petIds = orderItems.map((item: IOrderItem) => item?.petId);

    orderItems.forEach(async (item: IOrderItem) => {
      const pet = await Pet.findOneAndUpdate(
        { _id: item?.petId, isAvailable: true },
        {
          $set: {
            isAvailable: false,
          },
        },
        { new: true },
      );
      if (!pet) {
        return res
          .status(404)
          .json({ message: `${item?.name} is not available` });
      }
    });

    const order = await Order.create(req.body);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: orderItems.map((item: IOrderItem) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item?.name || item.breed,
            // image: item.image,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart?canceled=true`,
      expires_at: Math.floor(Date.now() / 1000 + 30 * 60),
      metadata: {
        name: "Pet Adoption Order",
        orderId: order._id.toString(),
        petIds: JSON.stringify(petIds),
      },
      customer_email: req.body.userEmail,
    });
    res.status(200).json({ message: "Checkout successful", session });
  } catch (error) {
    const { orderItems } = req.body;
    orderItems.forEach(async (item: IOrderItem) => {
      const pet = await Pet.findOneAndUpdate(
        { _id: item?.petId, isAvailable: false },
        {
          $set: {
            isAvailable: true,
          },
        },
        { new: true },
      );
      if (!pet) {
        return res
          .status(404)
          .json({ message: `${item?.name} is not available` });
      }
    });
    console.log("Checkout session error:", error);
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
