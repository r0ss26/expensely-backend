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
    lowercase: true,
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
  category: { // Store the id of the category as a string
    type: String,
    required: true,
  }, 
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
      type: String, // The id of the category
      required: true,
    }, 
    date: {
      type: Date,
      default: Date.now
    }
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
    categories: [CategoriesSchema],
    transactions: [TransactionSchema],
    budgets: [BudgetSchema],
  },
  {
    timestamps: true,
  }
);

mongoose.model("Budget", BudgetSchema);
module.exports = mongoose.model("User", UserSchema);
