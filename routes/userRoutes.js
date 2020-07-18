import express from "express";
import { userRegister, validationRules } from "../controllers/userController";
import { validate } from "../middleware/validate";

const router = express.Router();

//  @route POST /users/register
//  @desc Create a new user
//  @access Public
router.post("/register", validationRules("userSignUp"), validate, userRegister);

module.exports = router;
