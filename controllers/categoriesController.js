import User from "../models/userModel";
import { body, validationResult, param } from "express-validator";

export const createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { name, color, type } = req.body;

    const user = await User.findById(req.user.id);

    if (user.categories.find((category) => category.name === name)) {
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
  }
};

export const getCategories = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const user = await User.findById(req.user.id);
    return res.status(200).json(user.categories);
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, color, type } = req.body;

    const user = await User.findById(req.user.id);
    const category = user.categories.id(req.params.categoryId);

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    if (name) category.name = name;
    if (color) category.color = color;
    if (type) category.type = type;
    user.save();

    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
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
  }
};

export const validate = (method) => {
  switch (method) {
    case "createCategory":
      return [
        body("name").exists().not().isEmpty(),
        body("color").optional().isRgbColor(),
        body("type").not().isEmpty().isIn(["income", "expense"]),
      ];
    case "updateCategory":
      return [param("categoryId").exists()];
    case "deleteCategory":
      return [param("categoryId").exists()];
  }
};
