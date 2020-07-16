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
});

module.exports = mongoose.model('Category', CategoriesSchema)