import express from 'express'
import User from '../models/userModel'
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const secret = process.env.SECRET

const router = express.Router()

// @route POST /users/register
// @desc Create a new user
// @access Public

router.post("/register", [

    // firstname required
    check("firstName", "firstName is required")
        .not()
        .isEmpty(),

    //last name required
    check("lastName", "lastName is required")
        .not()
        .isEmpty(),

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

        const { firstName, lastName, email, password } = req.body

        try {

            //check if email exists
            let user = await User.findOne({ email })

            //if user email exist, send a message
            if (user) {
                return res.status(400).send({ msg: "Email already exists." })
            }
            // or if email not exist, create a new user 
            user = new User({
                firstName,
                lastName,
                email,
                password
            })

            //geneate salt of length 10 and save to salt
            const salt = await bcrypt.genSalt(10)

            //hash password with salt
            user.password = await bcrypt.hash(password, salt)

            await user.save()
            //res.send(user)
            // res.status(400).send({ msg: "User saved" })

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

    })




module.exports = router