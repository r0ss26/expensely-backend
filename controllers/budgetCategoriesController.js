import User from '../models/userModel'

import { body } from 'express-validator'

export const addBudgetCategory = async (req, res) => {
  
  const { name, color } = req.body

  try {
    let user = await User.findById(req.user.id)

    // Check if category already exists
    if (user.budget_categories.filter(category => category.name === name)) {
      // return res.status(400).send(({ msg: 'Category already exists'}))
    }
    
    // Add budget category to user
    user.budget_categories.push({name, color})
    user.save()

    return res.send(user.budget_categories)

  } catch(error) {
    console.log(error)
  }
}

export const getBudgetCategories = async (req, res) => {

  try {
    let user = await User.findById(req.user.id)
    return res.json(user.budget_categories)
  } catch(error) {
    console.log(error)
  }
}

export const updateBudgetCategory = async (req, res) => {

  const { name, color } = req.body

  let user = await User.findById(req.user.id)
  let budgetCategory = user.budget_categories.filter((category) => category.name === req.params.name )[0]

  if (!budgetCategory) return res.status(400).send({ msg: 'Category does not exists'})

  if (name) budgetCategory.name = name;
  if (color) budgetCategory.color = color;
  user.save()

  return res.json(budgetCategory)
}

export const deleteBudgetCategory = async (req, res) => {
  let user = await User.findById(req.user.id)

  user.budget_categories = user.budget_categories.filter((category) => category.name !== req.params.name )

  user.save()
  return res.json(user.budget_categories)
}

export const validate = method => {
  switch(method) {
    case 'addBudgetCategory':
      return [
        body('name', 'Category name doesn\'t exist').exists(),
        body('color', 'Color must be an RGB color').isRgbColor()
      ]
  }
}