import express from 'express'
import User from '../models/userModel'
import { check, validationResult } from 'express-validator'


const router = express.Router()


// @route POST /users
// @desc Create a new user
// @access Public

router.post("/", [

    // username must be an email
    check("firstName", "firstName is required")
        .not()
        .isEmpty(),

    check("lastName", "lastName is required")
        .not()
        .isEmpty(),

    check('email', "Please include a valid email.").isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 6 })
],
    async (req, res) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }


        const { firstName, lastName, email, password } = req.body

        // Simple validation
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

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

            await user.save()
            res.status(400).send({ msg: "User saved" })

        } catch (error) {
            console.log(error.message)
            res.status(500).send({ msg: "Internal server error" })
        }


    })


module.exports = router