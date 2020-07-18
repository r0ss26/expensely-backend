import express from "express";
import auth from "../middleware/auth";
import {
  addTransaction,
  getTransaction,
  getTransactions,
  editTransaction,
  deleteTransaction,
  validationRules,
} from "../controllers/transactionsController";
import { validate } from "../middleware/validate";

const router = express.Router();

// @route GET /:transactionId
// @desc View a transaction
// @access Private
router.get("/:transactionId", auth, getTransaction);

// @route  GET /
// @desc View all transactions
// @access Private
router.get("/", auth, getTransactions);

// @route POST /add
// @desc Create a new expense
// @access Private
router.post("/", auth, validationRules("addTransaction"), validate, addTransaction);

// @route  PUT PATCH /:expenseId
// @desc Get all expenses
// @access Private
router.put("/:transactionId", auth, validationRules("editTransaction"), validate, editTransaction);
router.patch("/:transactionId", auth, validationRules("editTransaction"), validate, editTransaction);

// @route DELETE /:expenseId
// @desc Delete an expense
// @access Private
router.delete("/:transactionId", auth, deleteTransaction);

module.exports = router;
