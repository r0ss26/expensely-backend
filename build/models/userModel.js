'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _getRandomColor = require('../utils/getRandomColor');

var _getRandomColor2 = _interopRequireDefault(_getRandomColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CategoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  icon: {
    type: String
  },
  color: {
    type: String,
    default: _getRandomColor2.default,
    lowercase: true
  },
  transactionType: {
    type: String,
    required: true,
    match: /^income$|^expense$/,
    lowercase: true
  }
});

var BudgetSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  amount: {
    type: Number,
    required: true
  },
  timePeriod: {
    type: String,
    required: true,
    match: /^monthly$|^weekly$/,
    lowercase: true
  },
  category: {
    // Store the id of the category as a string
    type: String,
    required: true
  }
});

var TransactionSchema = new Schema({
  transactionType: {
    type: String,
    required: true,
    lowercase: true,
    match: /^income$|^expense$/
  },
  amount: {
    type: Number,
    required: true
  },
  comment: {
    type: String
  },
  category: {
    type: String, // The id of the category
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

var UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String
  },
  categories: [CategoriesSchema],
  transactions: [TransactionSchema],
  budgets: [BudgetSchema]
}, {
  timestamps: true
});

module.exports = _mongoose2.default.model('User', UserSchema);
//# sourceMappingURL=userModel.js.map