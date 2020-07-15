import express from 'express'
import User from '../models/userModel'


const router = express.Router()


// @route POST /users
// @desc Create a new user
// @access Public

router.post("/", async (req, res) => {

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

        await user.save()
        res.status(400).send({ msg: "User saved" })

    } catch (error) {

        console.log(error.message)

    }


})


module.exports = router