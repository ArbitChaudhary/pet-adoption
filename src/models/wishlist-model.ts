import mongoose, { Schema } from "mongoose";

export interface IWishlist {
  userId: string;
  petId: string;
}

const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    petId: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
  },
  {
    timestamps: true,
  },
);

export const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);
