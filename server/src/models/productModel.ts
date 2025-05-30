import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  productId: string;
  name: string;
  price: number;
  rating: number;
  stockQuantity: number;
}

const ProductSchema: Schema = new Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema); 