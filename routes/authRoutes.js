import express from 'express'
import User from '../models/userModel'
import { check, validationResult } from 'express-validator'
import auth from '../middleware/auth'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const secret = process.env.SECRET

const router = express.Router()

// @route GET /auth
// @desc get login user
// @access Private

router.get('/', auth, async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password")
        res.json(user)

    } catch (error) {

        console.error(error.message)
        res.status(500).send("Server Error")
    }
})


// @route POST /login
// @desc login user
// @access public

router.post('/login', [

    // // firstname required
    // check("firstName", "firstName is required")
    //     .not()
    //     .isEmpty(),

    // //last name required
    // check("lastName", "lastName is required")
    //     .not()
    //     .isEmpty(),

    //email required
    check('email', "Please include a valid email.").isEmail(),

    // password must be at least 6 chars long
    check('password').isLength({ min: 6 })
],
    async (req, res) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body

        try {

            //check if email exists
            let user = await User.findOne({ email })

            //if no email, send error message
            if (!user) {
                return res.status(400).json({ msg: "No such emails" })
            }

            //if email, match password
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                res.status(400).json({ msg: "invalid credentials" })
            }

            //create payload with user id
            const payload = {
                user: {
                    id: user.id
                }
            }

            //create jwt with payload
            jwt.sign(payload, secret, {
                expiresIn: "10h"
            }, (err, token) => {
                if (err) throw err;
                res.json({ token })
            })

        } catch (error) {
            console.log(error.message)
            res.status(500).send({ msg: "Internal server error" })

        }
    }
)




module.exports = router