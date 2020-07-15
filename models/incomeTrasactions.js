const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const expenseTransactionSchema = new Schema({
    user: { type: ObjectId, ref: "User" },
    category: { name: String, color: String },
    amount: Number,
    comment: String,
    type: {
        type: String,
        default: "Expense"
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("ExpenseTransaction", expenseTransactionSchema);