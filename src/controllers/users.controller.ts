import type { Request, Response } from "express";
import { User } from "../models/user.model.ts";
import { generateOtp } from "../lib/generate-opt.ts";
import transporter from "../config/send-mail.ts";
import jwt from "jsonwebtoken";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { search = "", page = 0, limit = 20 } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const query = {
      $or: [
        { name: { $regex: search as string, $options: "i" } },
        { email: { $regex: search as string, $options: "i" } },
      ],
    };
    const total = await User.countDocuments(query);
    const totalPages = Math.ceil(total / limitNumber);
    const currentPage = pageNumber;
    const users = await User.find(query)
      .select("-password")
      .skip(pageNumber * limitNumber)
      .limit(limitNumber);
    res.status(200).json({ users, total, totalPages, currentPage });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(403).json({ message: "Email already exists" });
    }
    const newUser = await User.create(req.body);
    const verificationCode = generateOtp();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: "Welcome to Pet Adoption",
      text: `Welcome to Pet Adoption! Your account has been successfully created. \n Verify you email to get started. \n Your verification code is ${verificationCode}`,
    };
    newUser.verificationCode = verificationCode;
    newUser.verificationCodeExpiry = Date.now() + 60 * 60 * 1000;
    await newUser.save();
    await transporter.sendMail(mailOptions);
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const sendVerificationCode = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user?.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }
    const code = generateOtp();
    user.verificationCode = code;
    user.verificationCodeExpiry = Date.now() + 60 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your Verification Code",
      text: `Your verification code is: ${code}. It will expire in 1 hour.`,
    };
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Verification code sent to your email address" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    return res.status(400).json({ message: "Missing required details" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }
    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    if (
      user.verificationCodeExpiry &&
      user.verificationCodeExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Verification code has expired" });
    }
    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpiry = 0;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user?.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" },
    );
    res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
