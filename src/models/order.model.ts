import mongoose, { Document, Schema } from "mongoose";

export interface IOrderItem {
  petId: string;
  breed: string;
  name?: string;
  price: number;
  category: string;
  gender?: string;
  age?: number;
  dimension?: string;
  image?: string;
}

export interface IOrder extends Document {
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  status: string;
  totalAmount: number;
  orderItems: IOrderItem[];
}

export const OrderItemSchema = new Schema(
  {
    petId: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    breed: { type: String, required: true },
    name: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    gender: { type: String },
    age: { type: Number },
    dimension: { type: String },
    image: { type: String },
  },
  { _id: false }
);

export const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPhone: { type: String, required: true },
    userAddress: { type: String, required: true },
    orderItems: { type: [OrderItemSchema], required: true },
    status: { type: String, default: "Pending" },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
