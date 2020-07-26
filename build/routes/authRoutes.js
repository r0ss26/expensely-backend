'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _authController = require('../controllers/authController');

var _validate = require('../middleware/validate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// @route GET /auth
// @desc get login user
// @access Private
router.get('/', _auth2.default, _authController.getLoginUser);

// @route POST /auth/login
// @desc login user
// @access public
router.post('/login', (0, _authController.validationRules)('userLogin'), _validate.validate, _authController.loginUser);

// @route PUT /auth/reset/:id
// @desc change password
// @access private
router.put('/reset/:id', _auth2.default, (0, _authController.validationRules)('changePassword'), _validate.validate, _authController.changePassword);
router.patch('/reset/:id', _auth2.default, (0, _authController.validationRules)('changePassword'), _validate.validate, _authController.changePassword);

module.exports = router;
//# sourceMappingURL=authRoutes.js.map