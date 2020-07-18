import express from "express";
import auth from "../middleware/auth";
import {
  addTransaction,
  getTransaction,
  getTransactions,
  validate,
} from "../controllers/transactionsController";

const router = express.Router();

// @route GET /:transactionId
// @desc View a transaction
// @access Private

router.get("/:transactionId", auth, getTransaction);

// @route  GET /all
// @desc View all transactions
// @access Private

router.get('/', auth, getTransactions)

// @route POST /add
// @desc Create a new expense
// @access Private
router.post("/", auth, validate("addTransaction"), addTransaction);

// @route  PUT /:expenseId
// @desc Get all expenses
// @access Private

// router.put("/:expenseId", auth, editExpense)

// @route DELETE /:expenseId
// @desc Delete an expense
// @access Private

// router.delete("/:expenseId", auth, deleteExpense)

module.exports = router;
