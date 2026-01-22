import type { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createCheckout = async (req: Request, res: Response) => {
  try {
    const { totalAmount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      ui_mode: "custom",
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: req.body,
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
