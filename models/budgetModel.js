import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Budget", BudgetSchema)