import User from '../models/userModel';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { body } from 'express-validator';

dotenv.config();
const secret = process.env.SECRET;

export const getLoginUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: 'Internal server error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if email exists
    let user = await User.findOne({ email });

    //if no email, send error message
    if (!user) {
      return res.status(400).json({ msg: 'No such emails' });
    }

    //if email, match password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ msg: 'invalid credentials' });
    }

    //create payload with user id
    const payload = {
      user: {
        id: user.id,
      },
    };

    //create jwt with payload
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: '10h',
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: 'Internal server error' });
  }
};

export const changePassword = async (req, res) => {

  try {
    const { currentPassword, password } = req.body
    // console.log("currentPassord", currentPassword)
    // console.log("password", password)
    // console.log("user", user)
    //find user by id
    let user = await User.findById(req.params.id)

    //if no user return error message
    if (!user) return res.status(404).json({ msg: 'User not found' })

    //validate user if with decoded token
    if (user._id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" })
    }

    //if user and user id match, match password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      res.status(400).json({ msg: 'invalid credentials' });
    }

    //geneate salt of length 10 and save to salt
    const salt = await bcrypt.genSalt(10);

    //hash new password with salt
    user.password = await bcrypt.hash(password, salt);

    await user.save();
   return res.status(200).json(user);

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: 'Internal server error' });
  }
}

export const validationRules = (method) => {
  switch (method) {
    case 'userLogin': {
      return [
        //email required
        body('email', 'Please include a valid email.').isEmail(),

        // password must be at least 6 chars long
        body('password').isLength({ min: 6 }),
      ];
    }
    case 'changePassword': {
      return [
        body('password').isLength({ min: 6 })
      ]
    }
  }
};
