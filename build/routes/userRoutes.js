'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('../controllers/userController');

var _validate = require('../middleware/validate');

var _upload = require('../utils/upload');

var _upload2 = _interopRequireDefault(_upload);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//  @route POST /users/register
//  @desc Create a new user
//  @access Public
router.post('/register', (0, _userController.validationRules)('userSignUp'), _validate.validate, _userController.userRegister);

//  @route PUT/PATCH /users/userId
//  @desc Update user profile 
//  @access Private


router.put('/:id', _auth2.default, _upload2.default.single('profileImage'), (0, _userController.validationRules)('userUpdate'), _validate.validate, _userController.userUpdate);
router.patch('/:id', _auth2.default, _upload2.default.single('profileImage'), (0, _userController.validationRules)('userUpdate'), _validate.validate, _userController.userUpdate);

module.exports = router;
//# sourceMappingURL=userRoutes.js.map