import mongoose from "mongoose";

export interface IPet {
  name: string;
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
  dimension: string;
  disabled?: boolean;
  disability?: string;
  enableDiscount?: boolean;
  isAdopted: boolean;
}

export const petSchema = new mongoose.Schema<IPet>(
  {
    name: { type: String, required: true },
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
    dimension: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    disability: { type: String, default: "" },
    enableDiscount: { type: Boolean, default: false },
    isAdopted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Pet = mongoose.model<IPet>("Pet", petSchema);
