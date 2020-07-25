'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationRules = exports.deleteBudget = exports.updateBudget = exports.getBudget = exports.getBudgets = exports.createBudget = undefined;

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _expressValidator = require('express-validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var createBudget = exports.createBudget = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, amount, timePeriod, category, user, budget, newbudget;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, name = _req$body.name, amount = _req$body.amount, timePeriod = _req$body.timePeriod, category = _req$body.category;
            _context.next = 4;
            return _userModel2.default.findById(req.user.id);

          case 4:
            user = _context.sent;
            budget = user.budgets.find(function (budget) {
              return budget.name.toLowerCase() === name.toLowerCase();
            });

            if (!budget) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', res.status(409).json({ msg: 'budget already exists' }));

          case 8:
            newbudget = {
              name: name,
              amount: amount,
              timePeriod: timePeriod,
              category: category
            };
            _context.next = 11;
            return user.budgets.push(newbudget);

          case 11:
            _context.next = 13;
            return user.save();

          case 13:
            return _context.abrupt('return', res.status(201).json(user.budgets[user.budgets.length - 1]));

          case 16:
            _context.prev = 16;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            res.status(500).send({ msg: 'Internal server error' });

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 16]]);
  }));

  return function createBudget(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getBudgets = exports.getBudgets = function () {
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
            return _context2.abrupt('return', res.status(200).json(user.budgets));

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

  return function getBudgets(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getBudget = exports.getBudget = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var user, budget;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _userModel2.default.findById(req.user.id);

          case 3:
            user = _context3.sent;
            _context3.next = 6;
            return user.budgets.id(req.params.budgetId);

          case 6:
            budget = _context3.sent;

            if (budget) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt('return', res.status(404).json({ msg: 'Budget not found' }));

          case 9:
            return _context3.abrupt('return', res.status(200).json(budget));

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3['catch'](0);

            console.log(_context3.t0);
            res.status(500).send({ msg: 'Internal server error' });

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 12]]);
  }));

  return function getBudget(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var updateBudget = exports.updateBudget = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var user, budget;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _userModel2.default.findById(req.user.id);

          case 3:
            user = _context4.sent;
            budget = user.budgets.id(req.params.budgetId);

            if (budget) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt('return', res.status(404).json({ msg: 'budget not found' }));

          case 7:
            _context4.next = 9;
            return budget.set(req.body);

          case 9:
            _context4.next = 11;
            return user.save();

          case 11:
            return _context4.abrupt('return', res.status(200).json(budget));

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

  return function updateBudget(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var deleteBudget = exports.deleteBudget = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var user, budget;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _userModel2.default.findById(req.user.id);

          case 3:
            user = _context5.sent;
            budget = user.budgets.id(req.params.budgetId);

            if (budget) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt('return', res.status(404).json({ msg: 'budget not found' }));

          case 7:
            _context5.next = 9;
            return budget.remove();

          case 9:
            _context5.next = 11;
            return user.save();

          case 11:
            return _context5.abrupt('return', res.status(200).json(budget));

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

  return function deleteBudget(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var validationRules = exports.validationRules = function validationRules(method) {
  switch (method) {
    case 'createBudget':
      return [(0, _expressValidator.body)('name').exists().not().isEmpty(), (0, _expressValidator.body)('amount').exists().not().isEmpty(), (0, _expressValidator.body)('timePeriod').exists().not().isEmpty().isIn(['monthly', 'weekly']), (0, _expressValidator.body)('category').exists().not().isEmpty()];
    case 'updateBudget':
      return [(0, _expressValidator.param)('budgetId').exists(), (0, _expressValidator.body)('timePeriod').optional().isIn(['monthly', 'weekly'])];
    case 'deletebudget':
      return [(0, _expressValidator.param)('budgetId').exists()];
  }
};
//# sourceMappingURL=budgetsController.js.map