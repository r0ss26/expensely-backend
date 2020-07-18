import User from "../models/userModel";
import { body, validationResult, param } from "express-validator";

export const addTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, transactionType, category, comment } = req.body;

    const user = await User.findById(req.user.id);

    const newTransaction = {
      amount,
      transactionType,
      category,
      comment,
    };

    await user.transactions.push(newTransaction);
    await user.save();

    return res
      .status(201)
      .json(user.transactions[user.transactions.length - 1]);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Error creating new Transaction" });
  }
};

export const editTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id);

    const transaction = await user.transactions.id(req.params.transactionId);

    const { amount, transactionType, category, comment } = req.body;

    if (!transaction) {
      return res.status(404).send({ error: "Transaction not found!" });
    }

    if (amount) transaction.amount = amount;
    if (transactionType) transaction.transactionType = transactionType;
    if (category) transaction.category = category;
    if (comment) transaction.comment = comment;

    await user.save();

    return res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Server Error" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)

    let transaction = user.transactions.id(req.params.transactionId);

    if (!transaction) {
      return res.status(404).send({ error: "Transaction not found!" });
    }

    transaction.remove();
    user.save();

    //  console.log(Transaction)
    return res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Server Error" });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id);

    const transaction = await user.transactions.id(req.params.transactionId);

    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id);

    const transactions = user.transactions;

    if (!transactions) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    return res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Inernal server error" });
  }
};

export const validate = (method) => {
  switch (method) {
    case "addTransaction":
      return [
        body("transactionType")
          .exists()
          .not()
          .isEmpty()
          .isIn(["income", "expense"]),
        body("amount").exists().not().isEmpty(),
        body("category").exists().not().isEmpty(),
      ];
    case "editTransaction":
      return [
        body("transactionType").optional().isIn(["income", "expense"])
      ]
  }
};
