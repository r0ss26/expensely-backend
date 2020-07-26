import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const secret = process.env.SECRET;

module.exports = function (req, res, next) {

  //change token header for backend testing with postman
  const token = req.header('x-auth-token');
  console.log(token)
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, Not authorized' });
  }

  //token header for frontend
  // let token;
  // if (req.headers.authorization) {

  //   //   //get token from headers
  //   token = req.headers.authorization;
  //   console.log(token)
  // } else {
  //   //return error if no token
  //   return res.status(401).json({ msg: 'No token, Not authorized' });
  // }

  try {
    const decoded = jwt.verify(token, secret);

    //save the decoded user to req.body
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};
