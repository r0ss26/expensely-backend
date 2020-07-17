import express from 'express'
import { userRegister, validate } from '../controllers/userController'


const router = express.Router()

//  @route POST /users/register
//  @desc Create a new user
//  @access Public
router.post("/register", validate('userSignUp'), userRegister)


module.exports = router
