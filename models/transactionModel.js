import mongoose from "mongoose";
import CategoriesSchema from './categoryModel';

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    transactionType: {
      type: String,
      required: true,
      lowercase: true,
      match: /^income$|^expense$/,
    },
    amount: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
    category: CategoriesSchema,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction',TransactionSchema)