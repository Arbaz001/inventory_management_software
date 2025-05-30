import mongoose, { Schema, Document } from "mongoose";

export interface IPurchaseSummary extends Document {
  total: number;
  date: Date;
}

const PurchaseSummarySchema: Schema = new Schema({
  total: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model<IPurchaseSummary>("PurchaseSummary", PurchaseSummarySchema); 