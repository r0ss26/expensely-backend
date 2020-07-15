import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const secret = process.env.SECRET

module.exports = function (req, res, next) {

    //get token from header
    const token = req.header("x-auth-token")

    //check if there is token
    if (!token) {
        return res.status(401).json({ msg: "No token, Not authorized" })
    }

    try {
        const decoded = jwt.verify(token, secret)

        //save the decoded user to req.body

        req.user = decoded.user

        next()

    } catch (error) {
        res.status(401).json({ msg: "token is not valid" })
    }

}

