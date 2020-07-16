import express from "express";
import dotenv from "dotenv";

import {
  addBudget,
  getBudgets,
  getBudget,
  updateBudget,
  deleteBudget,
  validate
} from "../controllers/budgetController";

dotenv.config();

const router = express.Router();

// @route POST /
// @desc CREATE budget
// @access private
router.post("/", validate('addBudget'), addBudget);

// @route GET /
// @desc GET all budgets
// @access private
router.get("/", getBudgets);

// @route GET /
// @desc GET a budget
// @access private
router.get("/:name", getBudget);

// @route PUT /
// @desc update a budget
// @access private
router.put("/:name", validate('updateBudget'), updateBudget);
router.patch("/:name", validate('updateBudget'), updateBudget);

// @route DELETE /
// @desc delete a budget
// @access private
router.delete('/:name', validate('deleteBudget'), deleteBudget)

module.exports = router;
