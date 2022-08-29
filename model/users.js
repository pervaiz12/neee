const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,

    },
    fname: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is in valid')
            }
        },
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50

    },
    company: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50

    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
}, {
    timestamps: true, toJSON: { virtuals: false }
});

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})
const Users = mongoose.model('Users', userSchema)

module.exports = Users