import User from '../models/userModel'
import ExpenseTransaction, { findById } from "../models/expenseTransactions";
import mongoose from 'mongoose'

export const addExpense = async (req, res) => {

    try {

        //create a new expense and add req body to new expense
        let newExpense = new ExpenseTransaction(req.body)

        //find user by userId from token
        let user = await User.findById(req.user.id).select("-password")
        //console.log(user)
        //save user to newExpense user field
        newExpense.user = user

        // //find category name saved in user
        // let category = user.expense_categories.find(
        //     category => category.name === req.body.category.name.trim()
        // )

        // //if category name doesn't exist, push to expense_categories field and 
        // if (!category) {
        //     user.expense_categories.push(req.body.category);
        //     //save to user
        //     await user.save()
        //     //find category name in saved user
        //     category = user.expense_categories.find(
        //         category => category.name === req.body.category.name.trim()
        //     )
        // }

        // // ref category to new Transaction.category
        // newExpense.category = category
        //save to new transaction
        await newExpense.save()

        //return saved new transaction
        // console.log(newExpense.user._id)
        return res.status(200).json(newExpense)


    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "Error creating new expense" })
    }

}


export const editExpense = async (req, res) => {

    try {

        let expense = await ExpenseTransaction
            .findById(req.params.expenseId)
            .populate("user", "id")

        if (!expense) {
            return res.status(404).send({ error: "Transaction not found!" })
        }

        // console.log(req.user.id)
        // console.log(expense.user.id)
        // let hasAuthorization = expense.user.id == req.user.id
        // if (!hasAuthorization) {
        //     return res.status(401).json({ msg: "Permission denied." })
        // }

        expense = await ExpenseTransaction.findByIdAndUpdate(
            req.params.expenseId,
            { $set: req.body },
            { new: true }
        )

        //  console.log(expense)
        return res.status(200).json(expense)

    } catch (error) {

        console.log(error);
        return res.status(500).send({ msg: "Server Error" })
    }
}

export const deleteExpense = async (req, res) => {

    try {

        let expense = await ExpenseTransaction
            .findById(req.params.expenseId)

        if (!expense) {
            return res.status(404).send({ error: "Transaction not found!" })
        }

        await expense.remove(req.params.expenseId)

        //  console.log(expense)
        return res.status(200).json({ msg: "Expense deleted" })

    } catch (error) {

        console.log(error);
        return res.status(500).send({ msg: "Server Error" })
    }


}

export const getExpense = async (req, res) => {


    try {
        let expense = await ExpenseTransaction
            .findById(req.params.expenseId)
            .populate("user", "id")

        console.log(expense)
        return res.json(expense)

    } catch (error) {

        console.log(error);
        return res.status(500).json({ msg: "Server Error" })
    }

}

export const getAllExpenses = async (req, res) => {

    // const id = JSON.parse(req.user.id)
    // const ObjectId = new mongoose.ObjectId
    // ObjectId.createFromHexString(req.user.id)

    try {
        let expenses = await ExpenseTransaction.find({
            user: await User.findById(req.user.id)
        });

        console.log(expenses)
        res.json(expenses)

        // try {
        //     const objectId = mongoose.Types.ObjectId
        //     // const ObjectId = mongoose.Types.ObjectId
        //     //  const filter = {userreq.user.id}
        //     let expenses = await ExpenseTransaction.find({
        //         user: await User.findById(req.user.id)
        //     })

        //     return res.json(expenses)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error" })
    }
}