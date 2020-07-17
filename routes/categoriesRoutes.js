import express from 'express'
import dotenv from 'dotenv'

dotenv.config();

const router = express.Router()

// @route POST /categories
// @desc Create a new category
// @access private
router.post('/', createCategory)

// @route GET /categories
// @desc Get a list of categories
// @access private
router.get('/', getCategories)

// @route PUT/PATCH /categories
// @desc Edit an existing category
// @access private
router.put('/', updateCategory)
router.patch('/', updateCategory)

// @route DELETE /categories
// @desc Delete an existing category
// @access private
router.delete('/', deleteCategory)