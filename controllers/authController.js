import User from '../models/userModel'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator'


dotenv.config()
const secret = process.env.SECRET


export const getLoginUser = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password")
        res.json(user)

    } catch (error) {

        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

export const loginUser = async (req, res) => {

    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body

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


export const validate = method => {
    switch (method) {
        case 'userLogin': {
            return [
                //email required
                body('email', "Please include a valid email.").isEmail(),

                // password must be at least 6 chars long
                body('password').isLength({ min: 6 })
            ]
        }
    }
}