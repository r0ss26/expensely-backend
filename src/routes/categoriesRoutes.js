import express from 'express';
import dotenv from 'dotenv';
import auth from '../middleware/auth';
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  validationRules,
} from '../controllers/categoriesController';
import { validate } from '../middleware/validate';

dotenv.config();

const router = express.Router();

// @route POST /
// @desc Create a new category
// @access private
router.post(
  '/',
  auth,
  validationRules('createCategory'),
  validate,
  createCategory);

// @route GET /
// @desc Get a list of categories
// @access private
router.get('/', auth, getCategories);

// @route GET /categoryId
// @desc Get a list of categories
// @access private
router.get('/:categoryId', auth, getCategory);

// @route PUT/PATCH /
// @desc Edit an existing category
// @access private
router.put(
  '/:categoryId',
  auth,
  validationRules('updateCategory'),
  validate,
  updateCategory
);
router.patch(
  '/:categoryId',
  auth,
  validationRules('updateCategory'),
  validate,
  updateCategory
);

// @route DELETE /categoryId
// @desc Delete an existing category
// @access private
router.delete('/:categoryId', auth, deleteCategory);

module.exports = router;
