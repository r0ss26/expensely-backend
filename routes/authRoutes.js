import express from 'express'
import auth from '../middleware/auth'
import { getLoginUser, loginUser, validate } from '../controllers/authController'

const router = express.Router()

// @route GET /auth
// @desc get login user
// @access Private
router.get('/', auth, getLoginUser)


// @route POST /login
// @desc login user
// @access public
router.post('/login', validate('userLogin'), loginUser)



module.exports = router