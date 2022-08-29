const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');


const userAccountSchema = new mongoose.Schema({
    timeZone: {
        type: Date,
        trim: true,

    },
    role: {
        type: String,
        trim: true
    },
   
    
}, {
    timestamps: true, toJSON: { virtuals: false }
});

const UserAccount = mongoose.model('UserAccount', userAccountSchema)

module.exports = UserAccount