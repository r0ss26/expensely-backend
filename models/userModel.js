import mongoose from "mongoose";

import getRandomColor from "../utils/getRandomColor";

const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: getRandomColor,
  },
  type: {
    type: String,
    required: true,
    lowercase: true,
    match: /^income$|^expense$/,
  },
});

const BudgetSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  timePeriod: {
    type: String,
    required: true,
    match: /^monthly$|^weekly$/,
  },
  categories: [CategoriesSchema],
});

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
    category: {
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        default: getRandomColor,
      },
      type: {
        type: String,
        required: true,
        lowercase: true,
        match: /^income$|^expense$/,
      },
    },
    category: String,
  },
  {
    timestamps: true,
  }
);

const UserSchema = new Schema(
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
    transactions: [TransactionSchema],
    budgets: [BudgetSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
