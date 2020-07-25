'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationRules = exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.getCategories = exports.createCategory = undefined;

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _expressValidator = require('express-validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createCategory = exports.createCategory = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, color, transactionType, user, newCategory;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, name = _req$body.name, color = _req$body.color, transactionType = _req$body.transactionType;
            _context.next = 4;
            return _userModel2.default.findById(req.user.id);

          case 4:
            user = _context.sent;

            if (!user.categories.find(function (category) {
              return category.name.toLowerCase() === name.toLowerCase();
            })) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', res.status(409).json({ msg: 'Category already exists' }));

          case 7:
            newCategory = {
              name: name,
              color: color,
              transactionType: transactionType
            };
            _context.next = 10;
            return user.categories.push(newCategory);

          case 10:
            _context.next = 12;
            return user.save();

          case 12:
            return _context.abrupt('return', res.status(201).json(user.categories[user.categories.length - 1]));

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            res.status(500).send({ msg: 'Internal server error' });

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 15]]);
  }));

  return function createCategory(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getCategories = exports.getCategories = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _userModel2.default.findById(req.user.id);

          case 3:
            user = _context2.sent;
            return _context2.abrupt('return', res.status(200).json(user.categories));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);
            res.status(500).send({ msg: 'Internal server error' });

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function getCategories(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getCategory = exports.getCategory = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var user, category;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _userModel2.default.findById(req.user.id);

          case 3:
            user = _context3.sent;
            category = user.categories.id(req.params.categoryId);

            if (category) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt('return', res.status(404).json({ msg: 'category not found' }));

          case 7:
            return _context3.abrupt('return', res.status(200).json(user.categories.id(req.params.categoryId)));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3['catch'](0);

            console.log(_context3.t0);
            res.status(500).send({ msg: 'Internal server error' });

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 10]]);
  }));

  return function getCategory(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var updateCategory = exports.updateCategory = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var user, category;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _userModel2.default.findById(req.user.id);

          case 3:
            user = _context4.sent;
            category = user.categories.id(req.params.categoryId);

            if (category) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt('return', res.status(404).json({ msg: 'Category not found' }));

          case 7:
            _context4.next = 9;
            return category.set(req.body);

          case 9:
            _context4.next = 11;
            return user.save();

          case 11:
            return _context4.abrupt('return', res.status(200).json(category));

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4['catch'](0);

            console.log(_context4.t0);
            res.status(500).send({ msg: 'Internal server error' });

          case 18:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 14]]);
  }));

  return function updateCategory(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var deleteCategory = exports.deleteCategory = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var user, category;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _userModel2.default.findById(req.user.id);

          case 3:
            user = _context5.sent;
            category = user.categories.id(req.params.categoryId);

            if (category) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt('return', res.status(404).json({ msg: 'Category not found' }));

          case 7:
            _context5.next = 9;
            return category.remove();

          case 9:
            _context5.next = 11;
            return user.save();

          case 11:
            return _context5.abrupt('return', res.status(200).json(category));

          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5['catch'](0);

            console.log(_context5.t0);
            res.status(500).send({ msg: 'Internal server error' });

          case 18:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 14]]);
  }));

  return function deleteCategory(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var validationRules = exports.validationRules = function validationRules(method) {
  switch (method) {
    case 'createCategory':
      return [(0, _expressValidator.body)('name').exists().not().isEmpty(), (0, _expressValidator.body)('color').optional().isRgbColor(), (0, _expressValidator.body)('transactionType').not().isEmpty().isIn(['income', 'expense'])];
    case 'updateCategory':
      return [(0, _expressValidator.param)('categoryId').exists(), (0, _expressValidator.body)('transactionType').optional().isIn(['income', 'expense'])];
    case 'deleteCategory':
      return [(0, _expressValidator.param)('categoryId').exists()];
  }
};
//# sourceMappingURL=categoriesController.js.map