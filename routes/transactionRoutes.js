import express from 'express'
import auth from '../middleware/auth'
import {
    addTransaction,
} from '../controllers/transactionsController'

const router = express.Router()

// @route GET /:expenseId
// @desc View an expense
// @access Private

// router.get('/:expenseId', auth, getExpense)


// @route  GET /all
// @desc View all expenses
// @access Private

// router.get('/view/all', auth, getAllExpenses)

// @route POST /add
// @desc Create a new expense
// @access Private
router.post('/', auth, addTransaction)

// @route  PUT /:expenseId
// @desc Get all expenses
// @access Private

// router.put("/:expenseId", auth, editExpense)

// @route DELETE /:expenseId
// @desc Delete an expense
// @access Private

// router.delete("/:expenseId", auth, deleteExpense)




module.exports = router