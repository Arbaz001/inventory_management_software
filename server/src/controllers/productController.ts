import "../db/mongoose";
import { Request, Response } from "express";
import Product from "../models/productModel";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const products = await Product.find(
      search ? { name: { $regex: search, $options: "i" } } : {}
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId, name, price, rating, stockQuantity } = req.body;
    const product = new Product({
      productId,
      name,
      price,
      rating,
      stockQuantity,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};
