import User from '../models/userModel';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { body, check } from 'express-validator';
import { seedCategories } from '../models/categoriesData'


dotenv.config();
const secret = process.env.SECRET;

export const userRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //check if email exists
    let user = await User.findOne({ email });

    //if user email exist, send a message
    if (user) {
      return res.status(400).send({ msg: 'Email already exists.' });
    }
    // or if email not exist, create a new user
    user = new User({
      firstName,
      lastName,
      email,
      password,
    })

    //seed user model with categories data
    await seedCategories(user)

    //geneate salt of length 10 and save to salt
    const salt = await bcrypt.genSalt(10);

    //hash password with salt
    user.password = await bcrypt.hash(password, salt);

    await user.save();

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


export const userUpdate = async (req, res) => {

  try {
   
    let profileImage;
    if (req.file) {
      profileImage = req.file.location
    }

    const { firstName, lastName, email } = req.body

    const userInput = {}
    if (firstName) userInput.firstName = firstName
    if (lastName) userInput.lastName = lastName
    if (email) userInput.email = email
    if (profileImage) userInput.profileImage = profileImage

    let user = await User.findById(req.params.id).select('-password')
    // console.log("nopass", user)

    if (!user) return res.status(404).json({ msg: 'User not found' })

    if (user._id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" })
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userInput },
      { new: true })
    //   await user.set({firstName, lastName, email});
   //console.log("user2", user)
    return res.status(200).json(user);

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: 'Internal server error' });
  }
}

export const validationRules = (method) => {
  switch (method) {
    case 'userSignUp': {
      return [
        // firstname required
        body('firstName', 'First name is required').not().isEmpty(),

        //last name required
        body('lastName', 'Last name is required').not().isEmpty(),

        //email required
        body('email', 'Please include a valid email.').isEmail(),

        // password must be at least 6 chars long
        body('password').isLength({ min: 6 }),
      ];
    }
    case 'userUpdate': {
      return [
        // firstname required
        body('firstName', 'First name is required').not().isEmpty(),

        //last name required
        body('lastName', 'Last name is required').not().isEmpty(),

        //email required
        body('email', 'Please include a valid email.').isEmail(),
      ]
    }
  }
};

