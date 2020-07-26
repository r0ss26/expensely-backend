'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationRules = exports.getTransactions = exports.getTransaction = exports.deleteTransaction = exports.editTransaction = exports.addTransaction = undefined;

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _expressValidator = require('express-validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var addTransaction = exports.addTransaction = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, amount, date, transactionType, user, newTransaction, category;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, amount = _req$body.amount, date = _req$body.date, transactionType = _req$body.transactionType;
            _context.next = 4;
            return _userModel2.default.findById(req.user.id);

          case 4:
            user = _context.sent;

            //console.log("cate", user.categories)
            // let getCategory = {}

            //console.log("re parse", req.body.category)

            newTransaction = {};
            category = {};

            user.categories.map(function (item) {
              if (item._id.toString() === req.body.category.toString()) {
                for (var i in item) {
                  // if (i === 'color' || i === 'name')
                  category[i] = item[i];
                }
              }
            });

            newTransaction.category = category;
            if (amount) newTransaction.amount = amount;
            if (date) newTransaction.date = date;
            if (transactionType) newTransaction.transactionType = transactionType;
            console.log(newTransaction);

            _context.next = 15;
            return user.transactions.push(newTransaction);

          case 15:
            _context.next = 17;
            return user.save();

          case 17:
            return _context.abrupt('return', res.status(201).json(user.transactions[user.transactions.length - 1]));

          case 20:
            _context.prev = 20;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            return _context.abrupt('return', res.status(400).json({ msg: 'Error creating new Transaction' }));

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 20]]);
  }));

  return function addTransaction(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var editTransaction = exports.editTransaction = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user, transaction;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _userModel2.default.findById(req.user.id);

          case 3:
            user = _context2.sent;
            _context2.next = 6;
            return user.transactions.id(req.params.transactionId);

          case 6:
            transaction = _context2.sent;

            if (transaction) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt('return', res.status(404).send({ error: 'Transaction not found!' }));

          case 9:
            _context2.next = 11;
            return transaction.set(req.body);

          case 11:
            _context2.next = 13;
            return user.save();

          case 13:
            return _context2.abrupt('return', res.status(200).json(transaction));

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);
            return _context2.abrupt('return', res.status(500).send({ msg: 'Internal Server Error' }));

          case 20:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 16]]);
  }));

  return function editTransaction(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteTransaction = exports.deleteTransaction = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var user, transaction;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _userModel2.default.findById(req.user.id);

          case 3:
            user = _context3.sent;
            transaction = user.transactions.id(req.params.transactionId);

            if (transaction) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt('return', res.status(404).send({ error: 'Transaction not found!' }));

          case 7:
            _context3.next = 9;
            return transaction.remove();

          case 9:
            _context3.next = 11;
            return user.save();

          case 11:
            return _context3.abrupt('return', res.status(200).json(transaction));

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3['catch'](0);

            console.log(_context3.t0);
            return _context3.abrupt('return', res.status(500).send({ msg: 'Internal Server Error' }));

          case 18:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 14]]);
  }));

  return function deleteTransaction(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var getTransaction = exports.getTransaction = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var user, transaction;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _userModel2.default.findById(req.user.id);

          case 3:
            user = _context4.sent;
            _context4.next = 6;
            return user.transactions.id(req.params.transactionId);

          case 6:
            transaction = _context4.sent;

            if (transaction) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt('return', res.status(404).json({ msg: 'Transaction not found' }));

          case 9:
            return _context4.abrupt('return', res.status(200).json(transaction));

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4['catch'](0);

            console.log(_context4.t0);
            return _context4.abrupt('return', res.status(500).json({ msg: 'Internal Server Error' }));

          case 16:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 12]]);
  }));

  return function getTransaction(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var getTransactions = exports.getTransactions = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var user, transactions;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _userModel2.default.findById(req.user.id);

          case 3:
            user = _context5.sent;
            transactions = user.transactions;

            if (transactions) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt('return', res.status(404).json({ msg: 'Transaction not found' }));

          case 7:
            return _context5.abrupt('return', res.status(200).json(transactions));

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5['catch'](0);

            console.log(_context5.t0);
            return _context5.abrupt('return', res.json({ msg: 'Internal server error' }));

          case 14:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 10]]);
  }));

  return function getTransactions(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var validationRules = exports.validationRules = function validationRules(method) {
  switch (method) {
    case 'addTransaction':
      return [(0, _expressValidator.body)('transactionType').exists().not().isEmpty().isIn(['income', 'expense']), (0, _expressValidator.body)('amount').exists().not().isEmpty(), (0, _expressValidator.body)('category').exists().not().isEmpty()];
    case 'editTransaction':
      return [(0, _expressValidator.body)('transactionType').optional().isIn(['income', 'expense'])];
  }
};
//# sourceMappingURL=transactionsController.js.map