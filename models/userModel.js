import mongoose from 'mongoose'

import getRandomColor from '../utils/getRandomColor'

const Schema = mongoose.Schema

const UserSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    expense_categories: [
        {
            name: { type: String, trim: true },
            color: {
                type: String,
                default: getRandomColor
            }
        }
    ],
    budget_categories: [
        {
            name: { type: String, trim: true },
            color: {
                type: String,
                default: getRandomColor
            }
        }
    ],
    income_categories: [
        {
            name: { type: String, trim: true },
            color: {
                type: String,
                default: getRandomColor
            }
        }
    ],

}, {
    timestamps: true,
})

module.exports = mongoose.model("User", UserSchema)