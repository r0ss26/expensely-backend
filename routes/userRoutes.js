import express, { request } from 'express';
import { userRegister, validationRules, userUpdate } from '../controllers/userController';
import { validate } from '../middleware/validate';
import upload from '../utils/upload'
import auth from '../middleware/auth';

const router = express.Router();

//  @route POST /users/register
//  @desc Create a new user
//  @access Public
router.post('/register', validationRules('userSignUp'), validate, userRegister);

//  @route PUT/PATCH /users/userId
//  @desc Update user profile 
//  @access Private


router.put('/:id', auth, upload.single('profileImage'), validationRules('userUpdate'), validate, userUpdate);
router.patch('/:id', auth, upload.single('profileImage'), validationRules('userUpdate'), validate, userUpdate);

module.exports = router;
