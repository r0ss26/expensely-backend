import express from 'express'
import dotenv from 'dotenv'
import auth from '../middleware/auth'
import {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
  validate
} from '../controllers/categoriesController'

dotenv.config();

const router = express.Router()

// @route POST /categories
// @desc Create a new category
// @access private
router.post('/', auth, validate('createBudget'), createBudget)

// @route GET /categories
// @desc Get a list of categories
// @access private
router.get('/', auth, getBudgets)

// @route PUT/PATCH /categories
// @desc Edit an existing category
// @access private
router.put('/:budgetId', auth, updateBudget)
router.patch('/:budgetId', auth, updateBudget)

// @route DELETE /categories
// @desc Delete an existing category
// @access private
router.delete('/:budgetId', auth, deleteBudget)

module.exports = router;