import "../db/mongoose";
import { Request, Response } from "express";
import Product from "../models/productModel";
import SalesSummary from "../models/salesSummaryModel";
import PurchaseSummary from "../models/purchaseSummaryModel";
import ExpenseSummary from "../models/expenseSummaryModel";
import ExpenseByCategory, { IExpenseByCategory } from "../models/expenseByCategoryModel";

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
      (item: IExpenseByCategory) => ({
        ...item.toObject(),
        amount: item.amount.toString(),
      })
    );
    const popularProductsMapped = popularProducts.map((product) => ({
      productId: product.productId || product._id,
      name: product.name,
      price: product.price,
      rating: product.rating,
      stockQuantity: product.stockQuantity,
    }));
    const salesSummaryMapped = salesSummary.map((item) => ({
      salesSummaryId: item._id,
      totalValue: item.total,
      date: item.date,
    }));
    const purchaseSummaryMapped = purchaseSummary.map((item) => ({
      purchaseSummaryId: item._id,
      totalPurchased: item.total,
      date: item.date,
    }));
    const expenseSummaryMapped = expenseSummary.map((item) => ({
      expenseSummarId: item._id,
      totalExpenses: item.total,
      date: item.date,
    }));
    const expenseByCategorySummaryMapped = expenseByCategorySummaryRaw.map((item) => ({
      expenseByCategorySummaryId: item._id,
      category: item.category,
      amount: item.amount.toString(),
      date: item.date,
    }));
    res.json({
      popularProducts: popularProductsMapped,
      salesSummary: salesSummaryMapped,
      purchaseSummary: purchaseSummaryMapped,
      expenseSummary: expenseSummaryMapped,
      expenseByCategorySummary: expenseByCategorySummaryMapped,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard metrics", error });
  }
};
