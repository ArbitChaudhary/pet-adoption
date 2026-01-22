import mongoose, { Schema } from "mongoose";

export interface IBlog {
  title: string;
  description: string;
  gallery: string[];
  author?: string;
  photo: string;
}

export const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    gallery: { type: [String] },
    author: { type: String },
    photo: { type: String, required: true },
  },
  { timestamps: true },
);

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);
