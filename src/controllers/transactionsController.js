import User from '../models/userModel';
import { body, validationResult, param } from 'express-validator';

export const addTransaction = async (req, res) => {

  try {
    const { amount, date, transactionType } = req.body;
    const user = await User.findById(req.user.id);

    const newTransaction = {}
    const category = {}
    user.categories.map(item => {
      if (item._id.toString() === req.body.category.toString()) {
        for (const i in item) {
          category[i] = item[i]
        }
      }
    })

    newTransaction.category = category
    if (amount) newTransaction.amount = amount
    if (date) newTransaction.date = date
    if (transactionType) newTransaction.transactionType = transactionType

    await user.transactions.push(newTransaction);
    await user.save();

    return res
      .status(201)
      .json(user.transactions[user.transactions.length - 1]);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: 'Error creating new Transaction' });
  }
};

export const editTransaction = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const transaction = await user.transactions.id(req.params.transactionId);

    if (!transaction) {
      return res.status(404).send({ error: 'Transaction not found!' });
    }

    await transaction.set(req.body);
    await user.save();

    return res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: 'Internal Server Error' });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const transaction = user.transactions.id(req.params.transactionId);

    if (!transaction) {
      return res.status(404).send({ error: 'Transaction not found!' });
    }

    await transaction.remove();
    await user.save();

    return res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: 'Internal Server Error' });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const transaction = await user.transactions.id(req.params.transactionId);

    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const transactions = user.transactions;

    if (!transactions) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    return res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    return res.json({ msg: 'Internal server error' });
  }
};

export const validationRules = (method) => {
  switch (method) {
    case 'addTransaction':
      return [
        body('transactionType')
          .exists()
          .not()
          .isEmpty()
          .isIn(['income', 'expense']),
        body('amount').exists().not().isEmpty(),
        body('category').exists().not().isEmpty(),
      ];
    case 'editTransaction':
      return [body('transactionType').optional().isIn(['income', 'expense'])];
  }
};
