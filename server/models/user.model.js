
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
// const bcrypt = require('bcrypt');

const CardSchema = new mongoose.Schema(
    {
        product: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 1 // Cantidad predeterminada
        }
    }
);


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    role:{
        type: String,
        default: "user",
        required: false
    },
    phone:{
        type: Number,
        default: null
    },
    reference:{
        type: String,
        default:null
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    Card: [CardSchema],
    total: {
        type: Number
    },
    
}, { timestamps: true });

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

// UserSchema.pre('save', function (next) {
//     bcrypt.hash(this.password, 10)
//         .then(hash => {
//             this.password = hash;
//             next();
//         });
// });

UserSchema.plugin(uniqueValidator, { message: "Email already in use" });

module.exports.UserModel = mongoose.model('User', UserSchema)
