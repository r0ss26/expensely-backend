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

// @route POST /login
// @desc login user
// @access public
router.post('/login', (0, _authController.validationRules)('userLogin'), _validate.validate, _authController.loginUser);

module.exports = router;
//# sourceMappingURL=authRoutes.js.map