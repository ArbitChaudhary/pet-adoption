import mongoose from "mongoose";

export interface IReview {
  userId: string;
  petId: string;
  rating: number;
  comment?: string;
  userName: string;
  userEmail: string;
}

export const reviewSchema = new mongoose.Schema<IReview>({
  userId: { type: String, required: true },
  petId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
});

export const Review = mongoose.model<IReview>("Review", reviewSchema);
