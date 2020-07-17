import mongoose from "mongoose";

import getRandomColor from "../utils/getRandomColor";

const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  color: {
    type: String,
    default: getRandomColor,
    lowercase: true,
  },
  type: {
    type: String,
    required: true,
    match: /^income$|^expense$/,
    lowercase: true,
  },
});

export const BudgetSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true,
  },
  timePeriod: {
    type: String,
    required: true,
    match: /^monthly$|^weekly$/,
    lowercase: true,
  },
  category: {
    type: String,
    lowercase: true,
    required: true,
  },
});

export const TransactionSchema = new Schema(
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

export const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    categories: [CategoriesSchema],
    transactions: [TransactionSchema],
    budgets: [BudgetSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
