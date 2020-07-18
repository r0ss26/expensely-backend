import User from "../models/userModel";
import { body, validationResult, param } from "express-validator";

export const createBudget = async (req, res) => {
  try {
    const { name, amount, timePeriod, category } = req.body;

    const user = await User.findById(req.user.id);

    const budget = user.budgets.find(
      (budget) => budget.name.toLowerCase() === name.toLowerCase()
    );
    if (budget) {
      return res.status(409).json({ msg: "budget already exists" });
    }

    const newbudget = {
      name,
      amount,
      timePeriod,
      category,
    };

    user.budgets.push(newbudget);
    user.save();
    return res.status(201).json(user.budgets[user.budgets.length - 1]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.status(200).json(user.budgets);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

export const getBudget = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const budget = user.budgets.id(req.params.budgetId);

    if (!budget) return res.status(404).json({ msg: "Budget not found" });
    return res.status(200).json(budget);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const budget = user.budgets.id(req.params.budgetId);

    if (!budget) {
      return res.status(404).json({ msg: "budget not found" });
    }

    budget.set(req.body);

    user.save();
    return res.status(200).json(budget);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const budget = user.budgets.id(req.params.budgetId);

    if (!budget) {
      return res.status(404).json({ msg: "budget not found" });
    }

    budget.remove();
    user.save();
    return res.status(200).json(budget);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

export const validationRules = (method) => {
  switch (method) {
    case "createBudget":
      return [
        body("name").exists().not().isEmpty(),
        body("amount").exists().not().isEmpty(),
        body("timePeriod").exists().not().isEmpty().isIn(["monthly", "weekly"]),
        body("category").exists().not().isEmpty(),
      ];
    case "updateBudget":
      return [
        param("budgetId").exists(),
        body("timePeriod").optional().isIn(["monthly", "weekly"]),
      ];
    case "deletebudget":
      return [param("budgetId").exists()];
  }
};
