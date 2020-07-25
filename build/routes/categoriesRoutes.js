'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _categoriesController = require('../controllers/categoriesController');

var _validate = require('../middleware/validate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var router = _express2.default.Router();

// @route POST /
// @desc Create a new category
// @access private
router.post('/', _auth2.default, (0, _categoriesController.validationRules)('createCategory'), _validate.validate, _categoriesController.createCategory);

// @route GET /
// @desc Get a list of categories
// @access private
router.get('/', _auth2.default, _categoriesController.getCategories);

// @route GET /categoryId
// @desc Get a list of categories
// @access private
router.get('/:categoryId', _auth2.default, _categoriesController.getCategory);

// @route PUT/PATCH /
// @desc Edit an existing category
// @access private
router.put('/:categoryId', _auth2.default, (0, _categoriesController.validationRules)('updateCategory'), _validate.validate, _categoriesController.updateCategory);
router.patch('/:categoryId', _auth2.default, (0, _categoriesController.validationRules)('updateCategory'), _validate.validate, _categoriesController.updateCategory);

// @route DELETE /categoryId
// @desc Delete an existing category
// @access private
router.delete('/:categoryId', _auth2.default, _categoriesController.deleteCategory);

module.exports = router;
//# sourceMappingURL=categoriesRoutes.js.map