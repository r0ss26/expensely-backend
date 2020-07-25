'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _budgetsController = require('../controllers/budgetsController');

var _validate = require('../middleware/validate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var router = _express2.default.Router();

// @route POST /
// @desc Create a new budget
// @access private
router.post('/', _auth2.default, (0, _budgetsController.validationRules)('createBudget'), _validate.validate, _budgetsController.createBudget);

// @route GET /
// @desc Get a list of a users budgets
// @access private
router.get('/', _auth2.default, _budgetsController.getBudgets);

// @route GET /budgetId
// @desc Get a list of a users budgets
// @access private
router.get('/:budgetId', _auth2.default, _budgetsController.getBudget);

// @route PUT/PATCH /budgetId
// @desc Edit an existing budget
// @access private
router.put('/:budgetId', _auth2.default, (0, _budgetsController.validationRules)('updateBudget'), _validate.validate, _budgetsController.updateBudget);
router.patch('/:budgetId', _auth2.default, (0, _budgetsController.validationRules)('updateBudget'), _validate.validate, _budgetsController.updateBudget);

// @route DELETE /budgetId
// @desc Delete an existing budget
// @access private
router.delete('/:budgetId', _auth2.default, _budgetsController.deleteBudget);

module.exports = router;
//# sourceMappingURL=budgetsRoutes.js.map