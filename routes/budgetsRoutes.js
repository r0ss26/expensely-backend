import express from 'express'
import dotenv from 'dotenv'
import auth from '../middleware/auth'
import {
  createBudget,
  getBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
  validationRules
} from '../controllers/budgetsController'
import { validate } from '../middleware/validate'

dotenv.config();

const router = express.Router()

// @route POST /budgets
// @desc Create a new budget
// @access private
router.post('/', auth, validationRules('createBudget'), validate, createBudget)

// @route GET /budgets
// @desc Get a list of a users budgets
// @access private
router.get('/', auth, getBudgets)

// @route GET /budgets/budgetId
// @desc Get a list of a users budgets
// @access private
router.get('/:budgetId', auth, getBudget)

// @route PUT/PATCH /budgets/budgetId
// @desc Edit an existing budget
// @access private
router.put('/:budgetId', auth, validationRules('updateBudget'), validate, updateBudget)
router.patch('/:budgetId', auth, validationRules('updateBudget'), validate, updateBudget)

// @route DELETE /budgets
// @desc Delete an existing budget
// @access private
router.delete('/:budgetId', auth, deleteBudget)

module.exports = router;