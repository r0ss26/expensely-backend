import User from "../models/userModel";
import { body, param, validationResult } from "express-validator";

export const addBudget = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.errors });
    }

    const user = await User.findById(req.user.id);
    console.log(user)

    const { name, amount, color } = req.body;

    // Check if budget already exists
    if (user.budgets && user.budgets.find({name})) {
      return res
        .status(400)
        .send({ msg: "A budget with that name already exists" });
    }

    const newBudget = {
      name,
      amount,
      color,
    };

    // Add budget category to user
    user.budgets.push(newBudget);
    user.save();

    return res.send(newBudget);
  } catch (error) {
    console.log(error);
  }
};

export const getBudgets = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.json(user.budgets);
  } catch (error) {
    console.log(error);
  }
};

export const getBudget = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    const budget = user.budgets.find(
      (budget) => budget.name === req.params.name
    );
    return res.status(200).json({ budget });
  } catch (error) {
    console.log(error);
  }
};

export const updateBudget = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.errors });
    }

    const { name, amount, color } = req.body;

    const user = await User.findById(req.user.id);
    const budget = user.budgets.find(
      (budget) => budget.name === req.params.name
    );

    if (!budget) return res.status(400).json({ msg: "Budget does not exist" });

    if (name) budget.name = name;
    if (amount) budget.amount = amount;
    if (color) budget.color = color;
    user.save();

    return res.json(budget);
  } catch (error) {
    console.log(error);
  }
};

export const deleteBudget = async (req, res) => {
  let user = await User.findById(req.user.id);

  user.budgets = user.budgets.filter(
    (budget) => budget.name !== req.params.name
  );
  user.save();

  return res.json(user.budgets);
};

export const validate = (method) => {
  switch (method) {
    case "addBudget":
      return [
        body("name", "Budget name doesn't exist").exists(),
        body("amount", "Amount must exist").exists(),
      ];
    case "updateBudget":
      return [
        param("name", "Please include a budget name to update").exists(),
        body("amount").optional(),
        body("color").optional(),
      ];
    case "deleteBudget":
      return [param("name", "Please include a budget name to delete").exists()];
  }
};
