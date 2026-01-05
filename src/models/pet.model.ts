import mongoose from "mongoose";

export interface IPet {
  breed: string;
  category: string;
  age: number;
  description: string;
  image: string;
  price: number;
  discount?: number;
  discountType?: "percentage" | "amount";
  isAvailable: boolean;
  gender: string;
  gallery?: string[];
  totalQuantity: number;
  dimension: string;
}

export const petSchema = new mongoose.Schema<IPet>({
  breed: { type: String, required: true },
  category: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  discountType: {
    type: String,
    enum: ["percentage", "amount"],
    default: "amount",
  },
  isAvailable: { type: Boolean, required: true },
  gender: { type: String, required: true },
  gallery: { type: [String], default: [] },
  totalQuantity: { type: Number, required: true },
  dimension: { type: String, required: true },
});

export const Pet = mongoose.model<IPet>("Pet", petSchema);
