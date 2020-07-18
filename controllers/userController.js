import User from '../models/userModel'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator'


dotenv.config()
const secret = process.env.SECRET


export const userRegister = async (req, res) => {

    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { firstName, lastName, email, password } = req.body

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
        case 'userSignUp': {
            return [
                // firstname required
                body("firstName", "First name is required").not().isEmpty(),

                //last name required
                body("lastName", "Last name is required").not().isEmpty(),

                //email required
                body('email', "Please include a valid email.").isEmail(),

                // password must be at least 6 chars long
                body('password').isLength({ min: 6 })
            ]
        }
    }
}