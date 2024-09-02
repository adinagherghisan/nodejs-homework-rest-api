import { Schema, model } from "mongoose";
import Joi from 'joi';
import { handleMongooseError, runValidatorsAtUpdate } from "../helpers/hooks.js";

const emailValidPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    password: {
        type: String,
        minlength: 5,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        match: emailValidPattern,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    avatarURL: {
        type: String,
        require: true
    },
    token: {
        type: String,
        default: ''
    }
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);
userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);
userSchema.post("findOneAndUpdate", handleMongooseError);

export const registerSchema = Joi.object({
    password: Joi.string().min(5).required(),
    email: Joi.string().pattern(emailValidPattern).required(),
});

export const logInSchema = Joi.object({
    password: Joi.string().min(5).required(),
    email: Joi.string().pattern(emailValidPattern).required(),
});

export const patchSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required()
});

export const User = model('user', userSchema);