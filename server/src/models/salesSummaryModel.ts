import mongoose, { Schema, Document } from "mongoose";

export interface ISalesSummary extends Document {
  total: number;
  date: Date;
}

const SalesSummarySchema: Schema = new Schema({
  total: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model<ISalesSummary>("SalesSummary", SalesSummarySchema); 
 