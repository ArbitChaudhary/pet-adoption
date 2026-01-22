import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import type { NextFunction } from "express";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: string;
  profilePicture?: string;
  isVerified?: boolean;
  verificationCode?: string | null;
  verificationCodeExpiry?: number;
  resetPasswordCode?: string | null;
  resetPasswordCodeExpiry?: number;
}

export const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    profilePicture: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String, default: null },
    verificationCodeExpiry: { type: Number, default: 0 },
    resetPasswordCode: { type: String, default: null },
    resetPasswordCodeExpiry: { type: Number, default: 0 },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const User = mongoose.model<IUser>("User", userSchema);
