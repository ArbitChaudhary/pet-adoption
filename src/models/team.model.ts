import mongoose, { Schema } from "mongoose";

export interface ITeam {
  name: string;
  description: string;
  post: string;
  profession: string;
  profileImage: string;
  email: string;
  phoneNumber: string;
}

export const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    post: { type: String },
    profession: { type: String },
    profileImage: { type: String },
    email: { type: String, unique: true, required: true },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Team = mongoose.model<ITeam>("Team", teamSchema);
