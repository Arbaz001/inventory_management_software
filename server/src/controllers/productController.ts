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
    const productsMapped = products.map((product) => ({
      productId: product.productId || product._id,
      name: product.name,
      price: product.price,
      rating: product.rating,
      stockQuantity: product.stockQuantity,
    }));
    res.json(productsMapped);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let { productId, name, price, rating, stockQuantity } = req.body;
    // If productId is not provided, use MongoDB _id after creation
    const product = new Product({
      productId,
      name,
      price,
      rating,
      stockQuantity,
    });
    await product.save();
    if (!product.productId) {
      product.productId = (product._id as string).toString();
      await product.save();
    }
    res.status(201).json({
      productId: product.productId,
      name: product.name,
      price: product.price,
      rating: product.rating,
      stockQuantity: product.stockQuantity,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};
