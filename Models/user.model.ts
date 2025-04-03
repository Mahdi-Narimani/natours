import { Schema, model } from 'mongoose';
import validator from 'validator';

interface UserSchema extends Document {
    name: string;
    email: string;
    photo?: string;
    password: string;
    passwordConfirm: string;
}

const userSchema = new Schema<UserSchema>({
    name: { type: String, required: [true, 'Please tell us your name!'] },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
    },
});

const User = model('User', userSchema);

export default User;
