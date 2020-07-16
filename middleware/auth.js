import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const secret = process.env.SECRET

module.exports = function (req, res, next) {

    //get token from header
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    } else {
        return res.status(401).json({ msg: "No token, Not authorized" })
    }

    try {
        const decoded = jwt.verify(token, secret)

        //save the decoded user to req.body

        req.user = decoded.user

        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ msg: "token is not valid" })
    }

}

