'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _transactionsController = require('../controllers/transactionsController');

var _validate = require('../middleware/validate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// @route GET /:transactionId
// @desc View a transaction
// @access Private
router.get('/:transactionId', _auth2.default, _transactionsController.getTransaction);

// @route  GET /
// @desc View all transactions
// @access Private
router.get('/', _auth2.default, _transactionsController.getTransactions);

// @route POST /add
// @desc Create a new expense
// @access Private
router.post('/', _auth2.default, (0, _transactionsController.validationRules)('addTransaction'), _validate.validate, _transactionsController.addTransaction);

// @route  PUT PATCH /:expenseId
// @desc Get all expenses
// @access Private
router.put('/:transactionId', _auth2.default, (0, _transactionsController.validationRules)('editTransaction'), _validate.validate, _transactionsController.editTransaction);
router.patch('/:transactionId', _auth2.default, (0, _transactionsController.validationRules)('editTransaction'), _validate.validate, _transactionsController.editTransaction);

// @route DELETE /:expenseId
// @desc Delete an expense
// @access Private
router.delete('/:transactionId', _auth2.default, _transactionsController.deleteTransaction);

module.exports = router;
//# sourceMappingURL=transactionRoutes.js.map