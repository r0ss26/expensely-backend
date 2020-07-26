'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationRules = exports.userUpdate = exports.userRegister = undefined;

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _expressValidator = require('express-validator');

var _categoriesData = require('../models/categoriesData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_dotenv2.default.config();
var secret = process.env.SECRET;

var userRegister = exports.userRegister = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, firstName, lastName, email, password, user, salt, payload;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password;

            //check if email exists

            _context.next = 4;
            return _userModel2.default.findOne({ email: email });

          case 4:
            user = _context.sent;

            if (!user) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', res.status(400).send({ msg: 'Email already exists.' }));

          case 7:
            // or if email not exist, create a new user
            user = new _userModel2.default({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password
            });

            //seed user model with categories data
            (0, _categoriesData.seedCategories)(user);

            //geneate salt of length 10 and save to salt
            _context.next = 11;
            return _bcryptjs2.default.genSalt(10);

          case 11:
            salt = _context.sent;
            _context.next = 14;
            return _bcryptjs2.default.hash(password, salt);

          case 14:
            user.password = _context.sent;
            _context.next = 17;
            return user.save();

          case 17:

            //create payload with user id
            payload = {
              user: {
                id: user.id
              }
            };

            //create jwt with payload

            _jsonwebtoken2.default.sign(payload, secret, {
              expiresIn: '10h'
            }, function (err, token) {
              if (err) throw err;
              res.json({ token: token });
            });
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0.message);
            res.status(500).send({ msg: 'Internal server error' });

          case 25:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 21]]);
  }));

  return function userRegister(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var userUpdate = exports.userUpdate = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var profileImage, _req$body2, firstName, lastName, email, userInput, user;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            profileImage = void 0;

            if (req.file) {
              profileImage = req.file.location;
            }

            _req$body2 = req.body, firstName = _req$body2.firstName, lastName = _req$body2.lastName, email = _req$body2.email;
            userInput = {};

            if (firstName) userInput.firstName = firstName;
            if (lastName) userInput.lastName = lastName;
            if (email) userInput.email = email;
            if (profileImage) userInput.profileImage = profileImage;

            _context2.next = 11;
            return _userModel2.default.findById(req.params.id).select('-password');

          case 11:
            user = _context2.sent;

            if (user) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt('return', res.status(404).json({ msg: 'User not found' }));

          case 14:
            if (!(user._id.toString() !== req.user.id)) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt('return', res.status(401).json({ msg: "Not authorized" }));

          case 16:
            _context2.next = 18;
            return _userModel2.default.findByIdAndUpdate(req.params.id, { $set: userInput }, { new: true });

          case 18:
            user = _context2.sent;
            return _context2.abrupt('return', res.status(200).json(user));

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0.message);
            res.status(500).send({ msg: 'Internal server error' });

          case 26:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 22]]);
  }));

  return function userUpdate(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var validationRules = exports.validationRules = function validationRules(method) {
  switch (method) {
    case 'userSignUp':
      {
        return [
        // firstname required
        (0, _expressValidator.body)('firstName', 'First name is required').not().isEmpty(),

        //last name required
        (0, _expressValidator.body)('lastName', 'Last name is required').not().isEmpty(),

        //email required
        (0, _expressValidator.body)('email', 'Please include a valid email.').isEmail(),

        // password must be at least 6 chars long
        (0, _expressValidator.body)('password').isLength({ min: 6 })];
      }
    case 'userUpdate':
      {
        return [
        // firstname required
        (0, _expressValidator.body)('firstName', 'First name is required').not().isEmpty(),

        //last name required
        (0, _expressValidator.body)('lastName', 'Last name is required').not().isEmpty(),

        //email required
        (0, _expressValidator.body)('email', 'Please include a valid email.').isEmail()];
      }
  }
};
//# sourceMappingURL=userController.js.map