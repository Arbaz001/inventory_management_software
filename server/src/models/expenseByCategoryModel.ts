import mongoose, { Schema, Document } from "mongoose";

export interface IExpenseByCategory extends Document {
  category: string;
  amount: number;
  date: Date;
}

const ExpenseByCategorySchema: Schema = new Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model<IExpenseByCategory>("ExpenseByCategory", ExpenseByCategorySchema); 