import type { Request, Response } from "express";
import { User } from "../models/user.model.ts";
import { Pet } from "../models/pet.model.ts";
import { Wishlist } from "../models/wishlist-model.ts";

export const addWishlist = async (req: Request, res: Response) => {
  try {
    const { userId, petId } = req.body;

    if (!userId || !petId) {
      return res.status(400).json({ message: "Insufficient data provided" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet does not exist" });
    }

    const wishlist = new Wishlist(req.body);
    await wishlist.save();
    return res.status(201).json({ message: "Added to wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getWishlistByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Insufficient data provided" });
    }
    const wishlist = await Wishlist.find({ userId }).populate("petId");
    return res.status(200).json({ wishlist });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const removeWishlistItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Insufficient data provided" });
    }
    await Wishlist.findByIdAndDelete(id);
    res.status(200).json({ message: "Wishlist item removed" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
