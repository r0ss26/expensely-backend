import express from "express";
import auth from "../middleware/auth";
import {
  getLoginUser,
  loginUser,
  validationRules,
} from "../controllers/authController";
import { validate } from "../middleware/validate";

const router = express.Router();

// @route GET /auth
// @desc get login user
// @access Private
router.get("/", auth, getLoginUser);

// @route POST /login
// @desc login user
// @access public
router.post("/login", validationRules("userLogin"), validate, loginUser);

module.exports = router;
