"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.seedCategories = undefined;

var _getRandomColor = require("../utils/getRandomColor");

var _getRandomColor2 = _interopRequireDefault(_getRandomColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var categoriesData = [{
    name: "Eating Out",
    icon: "fas fa-utensils",
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "Apparel",
    icon: "fas fa-tshirt",
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "Entertainment",
    icon: "fas fa-tablet-alt",
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "Fuel",
    icon: "fas fa-gas-pump",
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "Gifts",
    icon: "fas fa-gift",
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "Holidays",
    icon: "fas fa-luggage-cart",
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "Grocery",
    icon: "fas fa-shopping-basket",
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "Transportation",
    icon: "fas fa-bus",
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "Sports",
    icon: "directions_bike",
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "Books",
    icon: "fas fa-book-open",
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "Medical",
    icon: "fas fa-notes-medical",
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "Utilities",
    icon: "fas fa-bolt",
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "Movies",
    icon: 'fas fa-film',
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "Work-related",
    icon: "fas fa-briefcase",
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "Pets",
    icon: "fas fa-paw",
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "Mobile",
    icon: "fas fa-mobile-alt",
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "general expenses",
    icon: "fas fa-tags",
    color: (0, _getRandomColor2.default)(),
    transactionType: "expense"
}, {
    name: "Salary",
    icon: "fas fa-money-bill-wave",
    color: (0, _getRandomColor2.default)(),
    transactionType: "income"
}];

var seedCategories = exports.seedCategories = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(model) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        categoriesData.map(function (item) {
                            model.categories.push(item);
                        });
                        _context.next = 3;
                        return model.save();

                    case 3:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function seedCategories(_x) {
        return _ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=categoriesData.js.map