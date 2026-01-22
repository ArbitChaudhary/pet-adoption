import type { Request, Response } from "express";
import { Pet } from "../models/pet.model.ts";

export const getAllPets = async (req: Request, res: Response) => {
  try {
    const { search = "", page = 0, limit = 20 } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const query = {
      $or: [
        { name: { $regex: search as string, $options: "i" } },
        { breed: { $regex: search as string, $options: "i" } },
        { description: { $regex: search as string, $options: "i" } },
        { category: { $regex: search as string, $options: "i" } },
      ],
    };
    const total = await Pet.countDocuments(query);
    const pets = await Pet.find(query)
      .skip(pageNumber * limitNumber)
      .limit(limitNumber);
    return res.status(200).json({
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      pets,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getAvailablePets = async (req: Request, res: Response) => {
  try {
    const pets = await Pet.aggregate([{ $match: { isAvailable: true } }]);
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getPet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const addPet = async (req: Request, res: Response) => {
  try {
    const newPet = new Pet(req.body);
    await newPet.save();
    res.status(201).json({ pet: newPet });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updatePet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    const updatedPet = await Pet.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ pet: updatedPet });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deletePet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    await Pet.findByIdAndDelete(id);
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
