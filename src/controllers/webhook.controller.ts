import type { Request, Response } from "express";
import Stripe from "stripe";
import { Pet } from "../models/pet.model.ts";
import { Order } from "../models/order.model.ts";
import { Notification } from "../models/notification.model.ts";
import type { Types } from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const stripePaymentEvent = async (req: Request, res: Response) => {
  let event;
  const signature = req.headers["stripe-signature"] as string;
  if (!signature) {
    return res.status(400).json({ message: "Missing Stripe signature" });
  }
  if (endpointSecret) {
    event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
    try {
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Webhook signature verification failed", error });
    }
    // HANDLE EVENTs
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const io = req.app.get("socketio");

        const petIds = JSON.parse(
          (session?.metadata?.petIds as string) || "[]",
        );
        try {
          await Order.findByIdAndUpdate(session?.metadata?.orderId, {
            paymentIntentId: session?.payment_intent,
            paymentStatus: "paid",
          });
          await Notification.create({
            message: `New order received from ${session?.customer_email}`,
            order: session?.metadata?.orderId as unknown as Types.ObjectId,
          });
          io.emit("new_order", {
            message: `New order received from ${session?.customer_email}`,
          });
        } catch (error) {
          res.status(500).json({ message: "Internal Server Error", error });
        }
        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        try {
          const petIds = JSON.parse(
            (session?.metadata?.petIds as string) || "[]",
          );
          const orderId = session?.metadata?.orderId;
          if (!orderId) {
            return res
              .status(400)
              .json({ message: "Order ID not found in session metadata" });
          }
          await Order.findByIdAndDelete(orderId);
          await Pet.updateMany(
            {
              _id: { $in: petIds },
            },
            {
              $set: { isAvailable: true },
            },
          );
        } catch (error) {
          res.status(500).json({ message: "Internal Server Error", error });
        }
        break;
      }
      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        try {
          const petIds = JSON.parse(
            (session?.metadata?.petIds as string) || "[]",
          );
          const orderId = session?.metadata?.orderId;
          if (!orderId) {
            return res
              .status(400)
              .json({ message: "Order ID not found in session metadata" });
          }
          await Order.findByIdAndDelete(orderId);
          await Pet.updateMany(
            {
              _id: { $in: petIds },
            },
            {
              $set: { isAvailable: true },
            },
          );
        } catch (error) {
          res.status(500).json({ message: "Internal Server Error", error });
        }
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}.`);
    }
    res.status(200).json({ message: "Webhook received" });
  }
};
