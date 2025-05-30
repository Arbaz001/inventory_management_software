import "../db/mongoose";
import { Request, Response } from "express";
import Product from "../models/productModel";
import SalesSummary from "../models/salesSummaryModel";
import PurchaseSummary from "../models/purchaseSummaryModel";
import ExpenseSummary from "../models/expenseSummaryModel";
import ExpenseByCategory from "../models/expenseByCategoryModel";

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularProducts = await Product.find().sort({ stockQuantity: -1 }).limit(15);
    const salesSummary = await SalesSummary.find().sort({ date: -1 }).limit(5);
    const purchaseSummary = await PurchaseSummary.find().sort({ date: -1 }).limit(5);
    const expenseSummary = await ExpenseSummary.find().sort({ date: -1 }).limit(5);
    const expenseByCategorySummaryRaw = await ExpenseByCategory.find().sort({ date: -1 }).limit(5);
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
      (item: any) => ({
        ...item.toObject(),
        amount: item.amount.toString(),
      })
    );
    res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  }
};
