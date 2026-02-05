import mongoose, { Schema, Types } from "mongoose";

export interface INotification {
  message: string;
  order: Types.ObjectId;
  isSeen: boolean;
}

const notificationSchema = new Schema<INotification>({
  message: { type: String, required: true },
  order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  isSeen: { type: Boolean, default: false },
});

export const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema,
);
