import express from 'express'
import User from '../models/userModel'
import { check, validationResult } from 'express-validator'
import auth from '../middleware/auth'

const router = express.Router()

// @route GET /user/auth
// @desc get login user
// @access Private

router.get('/auth', auth, async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password")
        res.json(user)

    } catch (error) {

        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router