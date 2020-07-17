import express from 'express'
import dotenv from 'dotenv'
import auth from '../middleware/auth'
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  validate
} from '../controllers/categoriesController'

dotenv.config();

const router = express.Router()

// @route POST /categories
// @desc Create a new category
// @access private
router.post('/', auth, validate('createCategory'), createCategory)

// @route GET /categories
// @desc Get a list of categories
// @access private
router.get('/', auth, getCategories)

// @route PUT/PATCH /categories
// @desc Edit an existing category
// @access private
router.put('/:categoryId', auth, updateCategory)
router.patch('/:categoryId', auth, updateCategory)

// @route DELETE /categories
// @desc Delete an existing category
// @access private
router.delete('/:categoryId', auth, deleteCategory)

module.exports = router;