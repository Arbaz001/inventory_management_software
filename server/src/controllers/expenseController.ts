import "../db/mongoose";
import { Request, Response } from "express";
import ExpenseByCategory from "../models/expenseByCategoryModel";

export const getExpensesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenseByCategorySummaryRaw = await ExpenseByCategory.find().sort({ date: -1 });
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
      (item: any) => ({
        ...item.toObject(),
        amount: item.amount.toString(),
      })
    );
    res.json(expenseByCategorySummary);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving expenses by category" });
  }
};
