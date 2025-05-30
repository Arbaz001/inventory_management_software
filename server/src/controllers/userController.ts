import "../db/mongoose";
import { Request, Response } from "express";
import User from "../models/userModel";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    const usersMapped = users.map((user) => ({
      userId: user._id,
      name: user.name,
      email: user.email,
    }));
    res.json(usersMapped);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
};
