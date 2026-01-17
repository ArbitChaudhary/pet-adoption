import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import type { NextFunction } from "express";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  profilePicture?: string;
}

export const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    profilePicture: { type: String, default: null },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const User = mongoose.model<IUser>("User", userSchema);
