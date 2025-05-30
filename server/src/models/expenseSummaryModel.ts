import mongoose, { Schema, Document } from "mongoose";

export interface IExpenseSummary extends Document {
  total: number;
  date: Date;
}

const ExpenseSummarySchema: Schema = new Schema({
  total: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model<IExpenseSummary>("ExpenseSummary", ExpenseSummarySchema); 