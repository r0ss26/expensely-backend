import express from 'express';
import auth from '../middleware/auth';
import {
  getLoginUser,
  loginUser,
  changePassword,
  validationRules,
} from '../controllers/authController';
import { validate } from '../middleware/validate';

const router = express.Router();

// @route GET /auth
// @desc get login user
// @access Private
router.get('/', auth, getLoginUser);

// @route POST /auth/login
// @desc login user
// @access public
router.post('/login', validationRules('userLogin'), validate, loginUser);


// @route PUT /auth/reset/:id
// @desc change password
// @access private
router.put('/reset/:id', auth, validationRules('changePassword'), validate, changePassword);
router.patch('/reset/:id', auth, validationRules('changePassword'), validate, changePassword);

module.exports = router;
