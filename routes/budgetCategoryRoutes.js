import express from "express";
import dotenv from "dotenv";
import { check, validationResult } from "express-validator";

import jwt from "jsonwebtoken";

import {
  addBudgetCategory,
  getBudgetCategories,
  updateBudgetCategory,
  deleteBudgetCategory,
  validate
} from "../controllers/budgetCategoriesController";

dotenv.config();

const secret = process.env.SECRET;

const router = express.Router();

// @route POST /
// @desc CREATE budget category
// @access private
router.post("/", validate('addBudgetCategory'), addBudgetCategory);

// @route GET /
// @desc GET all budget categories
// @access private
router.get("/", getBudgetCategories);

// @route PUT /
// @desc update a budget category
// @access private
router.put("/:name", updateBudgetCategory);
router.patch("/:name", updateBudgetCategory);

// @route DELETE /
// @desc delete a budget category
// @access private
router.delete('/:name', deleteBudgetCategory)

module.exports = router;
