import type { Request, Response } from "express";
import { User } from "../models/user.model.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOtp } from "../lib/generate-opt.ts";
import transporter from "../config/send-mail.ts";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (!user.isVerified) {
      const verificationCode = generateOtp();
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Verify your email",
        text: `Verify your email to get started. \n Your verification code is ${verificationCode}`,
      };
      user.verificationCode = verificationCode;
      user.verificationCodeExpiry = Date.now() + 60 * 60 * 1000;
      await user.save();
      await transporter.sendMail(mailOptions);
      return res.status(401).json({ message: "Please verify your email" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user?.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" },
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const sendResetPasswordCode = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const code = generateOtp();
    user.resetPasswordCode = code;
    user.resetPasswordCodeExpiry = Date.now() + 60 * 60 * 1000;
    await user.save();

    // Send mail with code
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your Password Reset Code",
      text: `Your password reset code is: ${code}. \n It will expire in 1 hour.`,
    };
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Password reset code sent to your email address" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email, code, password } = req.body;
  try {
    if (!email || !code || !password) {
      return res.status(400).json({ message: "Insufficient data provided" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    if (
      user?.resetPasswordCodeExpiry &&
      user?.resetPasswordCodeExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Code has expired" });
    }
    if (user.resetPasswordCode !== code) {
      return res.status(400).json({ message: "Invalid code" });
    }
    user.password = password;
    user.resetPasswordCode = null;
    user.resetPasswordCodeExpiry = 0;
    await user.save();
    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { oldPassword, newPassword } = req.body;
  try {
    if (!userId) {
      return res.status(400).json({ message: "Insufficient data provided" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Current Password did not match" });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
