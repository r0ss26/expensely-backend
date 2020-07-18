import User from "../models/userModel";
import { body, validationResult, param } from "express-validator";

export const createCategory = async (req, res) => {
  try {
    const { name, color, type } = req.body;

    const user = await User.findById(req.user.id);

    if (
      user.categories.find(
        (category) => category.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return res.status(409).json({ msg: "Category already exists" });
    }

    const newCategory = {
      name,
      color,
      type,
    };

    user.categories.push(newCategory);
    user.save();
    return res.status(201).json(user.categories[user.categories.length - 1]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.status(200).json(user.categories);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const category = user.categories.id(req.params.categoryId);

    if (!category) return res.status(404).json({ msg: "category not found" });
    return res.status(200).json(user.categories.id(req.params.categoryId));
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const category = user.categories.id(req.params.categoryId);

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    await category.set(req.body);
    await user.save();

    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const category = user.categories.id(req.params.categoryId);

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    category.remove();
    user.save();
    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

export const validationRules = (method) => {
  switch (method) {
    case "createCategory":
      return [
        body("name").exists().not().isEmpty(),
        body("color").optional().isRgbColor(),
        body("type").not().isEmpty().isIn(["income", "expense"]),
      ];
    case "updateCategory":
      return [
        param("categoryId").exists(),
        body("type").not().isEmpty().isIn(["income", "expense"]),
      ];
    case "deleteCategory":
      return [param("categoryId").exists()];
  }
};
